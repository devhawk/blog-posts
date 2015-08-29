If you’ve compiled IronPython from source recently, you may have noticed
a new DLL:
[Microsoft.Scripting.Debugging](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908451).
This DLL contains a lightweight, non-blocking debugger for DLR based
languages that is going to enable both new scenarios as well as better
compatibility with CPython. Needless to say, we’re very excited about
it.

When I was actively working on my [ipydbg
series](http://devhawk.net/CategoryView,category,Debugger.aspx), I got
several emails asking about using it in an embedded scripting scenario.
Unfortunately, the ipydbg approach doesn’t work very well in the
embedded scripting scenario. ipydbg uses
[ICorDebug](http://msdn.microsoft.com/en-us/library/ms230588.aspx) and
friends, which completely blocks the application being debugged. This
means, your debugger *has* to run in a separate process. So either you
run your debugger in your host app process and your scripts in a
separate process or you run your debugger in a separate process
debugging both the scripts and the host app. Neither option is very
appealing.

Now with the DLR Debugger, you can run all three components in the same
process. I think of the DLR debugger as a “cooperative” debugger in much
the same way that Windows 3.x supported [cooperative
multitasking](http://en.wikipedia.org/wiki/Cooperative_multitasking#Cooperative_multitasking.2Ftime-sharing).
It’s also known as trace or traceback debugging. Code being debugged
yields to the debugger at set points during its execution. The debugger
then does whatever it wants, including showing UI and/or letting the
developer inspect or modify program state. When the debugger returns,
execution of the original code continues until the next set point
wherein the process repeats itself.

The primary point of entry for the DLR Debugger is the [DebugContext
class](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908446).
Notable there is the TransformLambda method, which takes a normal DLR
LambdaExpression and transforms it into a cooperatively debugged
LambdaExpression. LambdaExpressions can contain DebugInfoExpressions –
typically we insert them at the start of every Python code line as well
as one at the end of the function. When we run IronPython in debug mode
(i.e. –D), those get turned into sequence points [as we
saw](http://devhawk.net/2009/03/02/writing-an-ironpython-debugger-setting-a-breakpoint/)
back when I was working on ipydbg. When using the DLR Debugger, those
DebugInfoExpressions are transformed into calls out to
[IDebugCallback](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908429).OnDebugEvent.
The DLR Debugger implements the IDebugCallback interface on the
[TracePipeline](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908413)
class which also implements
[ITracePipeline](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908414).
In OnDebugEvent, TracePipeline calls out to an
[ITraceCallback](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#908415)
instance you provide. The extra layer of indirection means you can
change your traceback handler without having to regenerate the
debuggable version of your functions.

Of course, we hide all this DLR Debugger goo from you in IronPython.
Python already has a mechanism for doing traceback debugging –
[sys.settrace](http://docs.python.org/library/sys.html#sys.settrace).
Our ITraceCallback,
[PythonTracebackListener](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#922366),
wrapps the DLR Debugger API to expose the sys.settrace API. That makes
this feature a twofer – new capability for IronPython + better
compatibility with CPython. Instead of needing a custom tool (i.e.
ipydbg) you can now use [PDB](http://docs.python.org/library/pdb.html)
from the standard Python library (modulo bugs in our implementation). I
haven’t been working on ipydbg recently since you’ll be able to use PDB
soon enough.

For those hosting IronPython, we also have a couple of static extension
methods in our hosting API (look for the SetTrace functions in
[IronPythonHostingPython.cs](http://ironpython.codeplex.com/SourceControl/changeset/view/56115#490056)).
These are simply wrappers around sys.settrace, so it has the same API
regardless if you access it from inside IronPython or from the hosting
API. But if you’re hosting IronPython in a C\# application, those
extension methods are very convenient to use.

This debugger will be in our regular releases of IronPython as of 2.6
beta 2 which is
[scheduled](http://ironpython.codeplex.com/Wiki/View.aspx?title=2.6%20Release%20Plan)
to drop at the end of this month. For those who just can’t wait, it’s
available as source code starting with yesterday’s
changeset. Please let us know what you think!
