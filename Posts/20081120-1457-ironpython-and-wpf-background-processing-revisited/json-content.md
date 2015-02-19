[Yesterday](http://devhawk.net/2008/11/19/IronPython+And+WPF+Part+4+Background+Processing.aspx),
I blogged about using decorators to indicate if a given function should
execute on the UI or background thread. While the solution works, I
wrote “I’m thinking there might be a way to use
[SynchronizationContext](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.aspx)
to marshal it automatically, but I haven’t tried to figure that out
yet.” I had some time this morning so I figured out how to use
SynchronizationContext instead of the WPF dispatcher.

Leslie Sanford wrote a [pretty good
overview](http://www.codeproject.com/KB/cpp/SyncContextTutorial.aspx),
but the short version is that SyncContext is an abstraction for
concurrency management. It lets you write code that is ignorant of
specific synchronization mechanisms in concurrency-aware managed
frameworks like WinForms and WPF. For example, while my previous version
worked fine, it was specific to WPF. If I wanted to provide similar
functionality that worked with WinForms, I’d have to rewrite my
decorators to use Control.Invoke. But if I port them over to use
SyncContext, they would work with WinForms, WPF and any other library
that plugs into SyncContext.

SyncContext abstracts away both initially obtaining the sync context as
well as marshaling calls back to the UI thread. SyncContext provides a
[static
property](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.current.aspx)
to access  current context, instead of a framework specific mechanism
like accessing the
[Dispatcher](http://msdn.microsoft.com/en-us/library/system.windows.threading.dispatcherobject.dispatcher.aspx)
property of the WPF
[Window](http://msdn.microsoft.com/en-us/library/system.windows.window.aspx)
class. Once you have a context, you can call
[Send](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.send.aspx)
or
[Post](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.post.aspx)
to marshal the call back to the UI thread (Send blocks the calling
thread, Post doesn’t).

With that in mind, here’s the new version of BGThread and UIThread.
Slightly more complex, but still pretty simple clocking in at just under
30 lines.

``` {.brush: .python}
def BGThread(fun):  
  def argUnpacker(args):  
    oldSyncContext = SynchronizationContext.Current     
    try:     
      SynchronizationContext.SetSynchronizationContext(args[-1])     
      fun(*args[:-1])     
    finally:     
      SynchronizationContext.SetSynchronizationContext(oldSyncContext)     
   
  def wrapper(*args):     
    args2 = args + (SynchronizationContext.Current,)     
    ThreadPool.QueueUserWorkItem(WaitCallback(argUnpacker), args2)     
   
  return wrapper     

def UIThread(fun):     
  def unpack(args):  
    ret = fun(*args)     
    if ret != None:     
      import warnings     
      warnings.warn(fun.__name__ + " function returned " + str(ret) + " but that return value isn't propigated to the calling thread")     

  def wrapper(*args):     
    if SynchronizationContext.Current == None:     
      fun(*args)     
    else:     
      SynchronizationContext.Current.Send(SendOrPostCallback(unpack), args)     
      
  return wrapper
```

In the BGThread wrapper, I add the current SyncContext to the parameter
tuple that I pass to the background thread. Once on the background
thread, I set the current SyncContext to the last element of the the
parameter tuple then call the decorated function with the remaining
parameters. (for the non pythonic: args[:-1] is [Python slicing
syntax](http://www.python.org/doc/2.5.2/ref/slicings.html) that means
“all but the last element of args”). Using a try/finally block is
probably overkill – I expect the current SyncContext to be either None
or leftover garbage – but the urge to clean up after myself is
apparently much stronger on the background thread than it is in say my
office.
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)

In the UIThread wrapper, I grab the current context and invoke the
decorated method via the Send method. Like QueueUserWorkItem,
SyncContext Send and Post only support a single parameter, so I use the
same \*args trick I
[described](http://devhawk.net/2008/11/19/IronPython+And+WPF+Part+4+Background+Processing.aspx)
in my last post. (I changed the name to unpack in the code above for
blog formatting purposes)

One major caveat about this approach is that there’s no way to return a
value from a function decorated as UIThread. I understand why
SyncContext.Post doesn’t return a value (it’s async) but
SyncContext.Send is synchronous call, so why doesn’t it marshal the
return value back to the calling thread? WPF’s
[Dispatcher.Invoke](http://msdn.microsoft.com/en-us/library/cc647509.aspx)
and WinForm’s
[Control.Invoke](http://msdn.microsoft.com/en-us/library/a1hetckb.aspx)
both return a value. I didn’t handle the return value in my original
version of UIThread, but now that I’ve moved over to using SyncContext,
I can’t. Not sure why the SyncContext is designed that way – seems like
a design flaw to me. Since the return value won’t propagate, I sniff the
result decorated function’s return value and raise a warning if it’s not
None.

I’ve uploaded the SyncContext version [to my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/WpfThreadDemo2.zip)
in case you want the code for yourself. Note, I’ll thinking I’ll revise
code this one more time – I want to rebuild the WPF version so that it
propagates return values and picks up an dispatcher via
Application.Current.MainWindow rather than having to have a dispatcher
property on my class.
