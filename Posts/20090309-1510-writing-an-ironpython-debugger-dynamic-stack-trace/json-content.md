Now that I can [interact with my
debugger](http://devhawk.net/2009/03/04/writing-and-ironpython-debugger-adding-interactivity/),
it’s time to add a command. I decided to start with something simple –
or at least something I thought would be simple – printing a stack
trace.

In the [unmanaged debugger
API](http://msdn.microsoft.com/en-us/library/ms404520.aspx), threads
have the concept of both [stack
chains](http://msdn.microsoft.com/en-us/library/ms233401.aspx) and
[stack frames](http://msdn.microsoft.com/en-us/library/ms230151.aspx). A
stack chain represents a segment of the physical stack. In a typical
managed app, you’ll have at least two stack chains: the unmanaged stack
chain and the managed stack chain. You can interate through the stack
chains for a given thread via the Chains property. However, ipydbg is a
managed only debugger, so I can ignore the unmanaged stack chain.
Instead, I just retrieve the current (managed) chain via the thread’s
ActiveChain property.

Within a managed stack chain, there is a collection of stack frames.
This is the call stack that managed developers are typically used to
working with. It turns out that printing a raw stack trace is very easy
to do. Here was my first stab at it:

``` python
elif k.Key == ConsoleKey.T:
  print "nManaged Stack Trace"
  for f in active_thread.ActiveChain.Frames:
    offset, sp = get_location(f)
    metadata_import = CorMetadataImport(f.Function.Module)
    method_info = metadata_import.GetMethodInfo(f.FunctionToken)
    print "  ",
      "%s::%s --" % (method_info.DeclaringType.Name, method_info.Name),
      sp if sp != None else "(offset %d)" % offset
```

This elif block is part of the input method I showed last time. It loops
thru the frames in the Active Chain of the active thread and prints some
data to the console. As I said, pretty easy. Of course, the devil is in
the details.

First detail I should call out is that active\_thread variable. [As per
Mike
Stall](http://blogs.msdn.com/jmstall/archive/2006/03/21/attach_asyncbreak.aspx),
“there is no notion of “active thread” in the underlying debug APIs.
It’s purely a construct in a debugger UI to make it easier for
end-users.” My console based UI may be rudimentary, but it’s still a UI.
Events like OnBreakpoint include the active thread as a event argument,
so I stash that away in a variable so it’ll be available to the input
loop.

Second detail is the call to get\_location. When we [last saw
get\_location](http://github.com/devhawk/ipydbg/blob/112c3acdcf726c3ad89ce2def8258ecc2fb55513/ipydbg.py#L50),
it was returning a formatted string. Since my last post, I’ve refactored
the code so it returns the raw location data – a tuple of the raw IP
offset and the associated sequence point, if available. I’ve also added
a \_\_str\_\_ method to my sequence point object, so when I print it to
the console, I get the filename and line nicely formatted.

Finally, there’s all CorMetadataImport code. In addition to wrapping the
unmanaged debugger API, CorDebug also wraps the [unmanaged metadata
API](http://msdn.microsoft.com/en-us/library/ms404384.aspx). This code
lets me get
[MethodInfo](http://msdn.microsoft.com/en-us/library/system.reflection.methodinfo.aspx)
compatible view of the function metadata for a given stack frame. I use
it here to get the type and function name for each frame on the stack.

The end result looks something like this. Note, I’ve replaced
“Microsoft.Scripting” with “MS.Scripting” to avoid word wrapping.

``` 
OnBreakpoint Initialize Location: simpletest.py:1 (offset: 84)
» t
Managed Stack Trace
   S$2::Initialize simpletest.py:1 (offset: 84)
   MS.Scripting.Runtime.OptimizedScriptCode::InvokeTarget (offset 72)
   MS.Scripting.ScriptCode::Run (offset 0)
   IronPython.Hosting.PythonCommandLine::RunFileWorker (offset 77)
   IronPython.Hosting.PythonCommandLine::RunFile (offset 15)
   MS.Scripting.Hosting.Shell.CommandLine::Run (offset 46)
   IronPython.Hosting.PythonCommandLine::Run (offset 240)
   MS.Scripting.Hosting.Shell.CommandLine::Run (offset 74)
   MS.Scripting.Hosting.Shell.ConsoleHost::RunCommandLine (offset 158)
   MS.Scripting.Hosting.Shell.ConsoleHost::ExecuteInternal (offset 32)
   MS.Scripting.Hosting.Shell.ConsoleHost::Execute (offset 63)
   MS.Scripting.Hosting.Shell.ConsoleHost::Run (offset 390)
   PythonConsoleHost::Main — (offset 125)
```

As we can see, we may be on the first line of the python script, but
we’ve got a pretty deep stack trace already. Everything but the top-most
frame are from the underlying IronPython implementation. Those extra
frames obscure the stack frames I actually care about, so it would be
nice to hide any stack frames from IronPython or the DLR. It’s easy
enough to write a python generator function that filters out frames that
from the DLR or IronPython namespaces. In order to get the type name, we
need the method\_info like we did above. I’ve factored that code into a
separate function in order to avoid code duplication.

``` python
def get_method_info_for_frame(frame)
    if frame.FrameType != CorFrameType.ILFrame:
      return None
    metadata_import = CorMetadataImport(frame.Function.Module)
    return metadata_import.GetMethodInfo(frame.FunctionToken)

def get_dynamic_frames(chain):
  for f in chain.Frames:
    method_info = get_method_info_for_frame(f)
    if method_info == None:
      continue
    typename = method_info.DeclaringType.Name
    if typename.startswith("Microsoft.Scripting.")
      or typename.startswith("IronPython.")
      or typename == "PythonConsoleHost":
        continue
    yield f
```

You’ll notice I’ve added a guard to get\_method\_info\_for\_frame in
order to ensure that the frame argument is an IL Frame. There are [three
types of stack
frames](http://github.com/devhawk/ipydbg/blob/dab527c9bb39e61cc4a464d840db8ee6a2aef753/CorDebug/CorDebug/Thread.cs#L272)
in the debugger API:
[IL](http://msdn.microsoft.com/en-us/library/ms232990.aspx), native and
[internal](http://msdn.microsoft.com/en-us/library/ms232469.aspx). Most
of the frames we’re dealing with are IL frames, but you do run into the
occasional [lightweight
function](http://msdn.microsoft.com/en-us/library/system.reflection.emit.dynamicmethod.aspx)
(i.e.
[DynamicMethod](http://msdn.microsoft.com/en-us/library/system.reflection.emit.dynamicmethod.aspx))
frame when debugging IronPython code. Typically, IronPython generates
DynamicMethods for all python code except for a few cases related to
.NET interop. However, you can’t debug DynamicMethods, so when you run
with –D, we generate normal non-dynamic methods instead. However, even
when running with –D, we still use DynamicMethods for call site
dispatch. Since they’re an implementation detail, we want to filter
those out in get\_dynamic\_frames too.

This gives us a much more manageable stack trace:

```
OnBreakpoint Initialize Location: simpletest.py:1 (offset: 84)
» t
Stack Trace
   S$2::Initialize -- simpletest.py:1 (offset: 84)
```

As usual, the [latest ipydbg
source](http://github.com/devhawk/ipydbg/blob/c33cf75c4e9273a21ada00abe2403c392e4ca0a0/ipydbg.py)
is up on GitHub.
