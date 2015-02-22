I just pushed out a new drop of ipydbg that includes the first cut of
support for showing local variables. Getting the value for a local
variable is actually pretty simple. The CorFrame object (which hangs off
active\_thread) includes a method to [get a local variable by
index](http://github.com/devhawk/ipydbg/blob/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2/CorDebug/CorDebug/Thread.cs#L448)
as well getting a [count of all local
variables](http://github.com/devhawk/ipydbg/blob/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2/CorDebug/CorDebug/Thread.cs#L475).
The problem with these functions is that they don’t provide the name of
the variable. For that, you’ve got to look in debug symbols.

From a CorFrame, you can retrieve the associated CorFunction. Since I
added [symbol reader support to
CorModule](http://devhawk.net/2009/03/21/writing-an-ironpython-debugger-a-little-hack-err-cleanup/),
I [added support for directly
retrieving](http://github.com/devhawk/ipydbg/commit/fc6dd0684f6b299db2eabcfe1803cab6231ea93f#diff-2)
the ISymbolMethod for a CorFunction. From the method symbols, I can get
the [root lexical
scope](http://github.com/devhawk/ipydbg/blob/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2/CorDebug/CorSymbolStore/symmethod.cs#L167)
of the method. And from the symbol scope, I can [get the
locals](http://github.com/devhawk/ipydbg/blob/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2/CorDebug/CorSymbolStore/SymScope.cs#L156).
Scopes can be nested, so to get all the locals for a given function, you
need to iterate thru all the [child
scopes](http://github.com/devhawk/ipydbg/blob/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2/CorDebug/CorSymbolStore/SymScope.cs#L119)
as well.

So here’s my get\_locals function:

``` python
def get_locals(frame, scope=None, offset=None, show_hidden=False):  
    #if the scope is unspecified, try and get it from the frame
    if scope == None:  
        symmethod = frame.Function.GetSymbolMethod()  
        if symmethod != None:  
            scope = symmethod.RootScope  
        #if scope still not available, yield the local variables
        #from the frame, with auto-gen'ed names (local_1, etc)
        else:  
          for i in range(frame.GetLocalVariablesCount()):  
            yield "local_%d" % i, frame.GetLocalVariable(i)  
          return  

    #if we have a scope, get the locals from the scope  
    #and their values from the frame
    for lv in scope.GetLocals():  
        #always skip $site locals - they are cached callsites and  
        #not relevant to the ironpython developer
        if lv.Name == "$site": continue  
        if not lv.Name.startswith("$") or show_hidden:  
          v = frame.GetLocalVariable(lv.AddressField1)  
          yield lv.Name, v  

    if offset == None: offset = frame.GetIP()[0]  

    #recusively call get_locals for all the child scopes
    for s in scope.GetChildren():  
      if s.StartOffset <= offset and s.EndOffset >= offset:  
        for ret in get_locals(frame, s, offset, show_hidden):  
          yield ret
```

The function is designed to automatically retrieve the scope and offset,
if they’re available. That way, I can simply call get\_locals with the
frame argument and it does the right thing. For example, if you don’t
pass in a symbol scope explicitly get\_locals will attempt to retrieve
the debug symbols. If debug symbols aren’t available, iterates over the
locals in the frame and yields each with a fake name (local\_0,
local\_1, etc). If the debug symbols are available, then it iterates
over the locals in the scope, then calls itself for each of the child
scopes (skipping child scopes who’s offset range doesn’t overlap with
the current offset).

The other feature of get\_locals is deciding which locals to include. As
you might expect, IronPython emits some local variables that are for
internal runtime use. These variables get prefixed with a dollar sign.
The dollar sign is not a legal identifier character in C\# or Python,
but IL has no problem with it. If you pass in False for show\_hidden (or
use the default value), then get\_locals skips over any local variables
who’s name starts with the dollar sign.

Even if you pass in True for show\_hidden, get\_locals still skips over
any variable named “\$site”. \$site variables are [dynamic call site
caches](http://msdn.microsoft.com/en-us/magazine/cc163344.aspx#S7), a
DLR feature that are used to efficiently dispatch dynamic calls by
caching the results of previous invocations. Martin Maly’s blog [has
more
details](http://blogs.msdn.com/mmaly/archive/2008/04/22/dlr-caches.aspx)
on these caches. As they are part of method dispatch, I never want to
show them to the ipydbg user, so they get skipped regardless of the
value of show\_hidden.

Now that I can get the local variables for a given frame, we need to
convert those variables to something you can print on the screen. That
turns out to be more complicated that you might expect, so it’ll have to
wait for the next post (which may be a while, given that
[PyCon](http://devhawk.net/2009/03/11/ironpython-at-pycon/) is this
weekend). In the meantime, you can get the [latest version of
ipydbg](http://github.com/devhawk/ipydbg/tree/442527b0aed3ac2f7ecf6ab8f5f7e93ad03090f2)
from GitHub.
