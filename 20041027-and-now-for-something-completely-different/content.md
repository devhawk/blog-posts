We interupt this blog’s coverage of OOPSLA with a quick observation &
question related to development…

I’m hacking around writing a Word 2003 SmartTag in C\# (more on the why
later). I wanted my
[recognizer](http://msdn.microsoft.com/library/en-us/stagsdk/html/stobjISmartTagRecognizer2.asp)
to be document-dependent – i.e. depending on some custom document
properties, I wanted to change what gets recognized. A little digging
reveils that there is no way (that I could find) to access the Word
object model from the recognizer! The
[Recognize](http://msdn.microsoft.com/library/en-us/stagsdk/html/stmthRecognize.asp)
(and
[Recognize2](http://msdn.microsoft.com/library/en-us/stagsdk/html/stmthRecognize2.asp))
method receives strings as parameters, but it doesn’t receive an
app-specific target object. This is unlike the Smart Tag
[Action](http://msdn.microsoft.com/library/en-us/stagsdk/html/stobjISmartTagAction.asp)‘s
[InvokeVerb](http://msdn.microsoft.com/library/en-us/stagsdk/html/stmthInvokeVerb.asp)
(and
[InvokeVerb2](http://msdn.microsoft.com/library/en-us/stagsdk/html/stmthInvokeVerb2.asp))
method which receives a [Range
object](http://msdn.microsoft.com/library/en-us/vbawd11/html/woobjRange1.asp) (from
which you can navigate to the containing document, application and
window) when running inside of Word. Bummer.

I think the reason for this is that the recognizer appears to run on a
background thread while the action appears to run on the main app
thread. Furthermore, both threads are STA apartment threaded, so if I
can access the COM-based object model from the action thread, I can’t
access it directly from the recognizer thread. I actually hacked up an
add-in to provide the
[ActiveDocument](http://msdn.microsoft.com/library/en-us/vbawd11/html/woproActiveDocument1.asp)
to the recognizer thru a backchannel and it hangs Word on shutdown. I
thought there might be an issue releasing the COM reference, but
explicitly releasing it crashes the recognizer the next time it accesses
the ActiveDocument.

So I’ve come to the conclusion that I somehow need to marshal this call
from the background thread to the main app thread the action and addin
are runing on (I did verify that both of those run on the same thread).
The question is, what’s the best way to do that given that I’m writing
this in C\#? I thought I might use a system similar to Windows Form’s
[Control.Invoke(…)](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemWindowsFormsControlClassInvokeTopic.asp),
but it turns out that works by sending windows messages which isn’t
particularly feasible for my problem. So now I’m thinking I have pass
the ActiveDocument reference to the background thread using
[CoMarshalInterface](http://msdn.microsoft.com/library/en-us/com/htm/cmf_a2c_8205.asp).
Or I might be able to use
[RemotingServices.Marshal()](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemRuntimeRemotingRemotingServicesClassMarshalTopic.asp)
instead.

Anyone have any ideas? If so, leave a comment or [drop me a
line](mailto:hpierson@microsoft.com).
