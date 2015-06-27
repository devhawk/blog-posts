I didn’t get much done today – recovering from the norovirus and all.
But I did figure out an important point about State Machine Workflows.

For my SSB/WF prototype, I decided to implement my business logic as
both as a
[sequential](http://msdn2.microsoft.com/en-us/library/ms735937.aspx) and
[state machine](http://msdn2.microsoft.com/en-us/library/ms735937.aspx)
workflow. While everything worked fine in my sequential prototype,
things started failing *once I got to my second state*. Turns out that I
was trying to bind property values across states, which is a no-no.
Since states may be entered more than once, they are executed in their
own subordinate [activity execution
context](http://msdn2.microsoft.com/en-us/library/aa349099.aspx). As per
the [State Activity
docs](http://msdn2.microsoft.com/en-us/library/ms735957.aspx), “the
definition of the child activity in the activity tree (referred to as
the template) is never executed and is always in the **Intialized**
state”.

I’m fairly sure that when you try to property bind across states, you’re
connecting to this template activity, rather than the activity that was
actually executed. So instead of getting real data (in my case, the
handle of a SSB conversation) you get whatever that value was set to in
the designer.

Of course, once I figured out about the subordinate AEC, this behavior
makes perfect sense. But it could be better documented. So far, the best
information on them is in the Advanced Activity Execution chapter of
[Essential
WF](http://www.aw-bc.com/catalog/academic/product/0,1144,0321399838,00.html).

::: image-right
![Activity Property Bind
Dialog](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/BindingAcrossStatesinWF_E0EC/BindDialog[5].gif)
:::

BTW, to deal with this, you need to promote the values that matter out
of the individual activity instance up into the workflow instance
itself. In the databind dialog box, there are two tabs: “Bind to an
existing member” and “Bind to a new member”. I’m not sure why the WF
dialog existing member tab is there for state machine workflow since it
doesn’t do what you might expect it to. Instead, you should create a new
member as I’ve done here. This creates a field or dependency property
(whichever you choose) on the parent workflow itself, which is then
available to all activities in all states within the workflow.

I wonder how this works with XAML only workflows? There doesn’t appear
to be any way to declare a field or dependency property in XAML. The
templates that ship with the WF SDK aren’t XAML-only, they’re a
combination of XAML and code. When you create a new member, it’s always
created in code. The idea of XAML only workflows is very appealing – it
severely cuts down the surface area that can be meddled with in your
host. But you still need to easily share data between activities!
