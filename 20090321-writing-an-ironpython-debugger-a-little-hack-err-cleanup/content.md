Yesterday, I pushed out two commits to
[ipydbg](http://github.com/devhawk/ipydbg/). [The
first](http://github.com/devhawk/ipydbg/commit/41285e5c6a639708b9ae9e4886f2f8f4ae159540)
was simple, I removed all of the embedded ConsoleColorMgr code in favor
of the separate [consolecolor.py
module](http://devhawk.net/2009/03/19/ironpython-consolecolormgr/) I
blogged about Thursday. The [second
commit](http://github.com/devhawk/ipydbg/commit/b53ac99f95e0018db782abd52efea8e1fa56abd8)…well,
let’s just say it’s not quite so simple.

Last weekend, I was experimenting with breakpoints when I discovered
that the [MoveNext
method](http://github.com/devhawk/ipydbg/blob/5858695ff85ed4740ad06466d4f54394e7f00f9b/CorDebug/CorDebug/BreakpointEnumerator.cs#L53)
of BreakpointEnumerator was throwing a NotImplementedException. Up to
that point, I hadn’t modified any of the MDbg C\# source code except to
merge the [corapi and raw
assemblies](http://devhawk.net/2009/02/27/writing-an-ironpython-debugger-mdbg-101/)
into a single assembly. But since I had to [fix
BreakpointEnumerator](http://github.com/devhawk/ipydbg/commit/4ca5f2af90b73950f85cadfed7f3ca07cb783bba),
I figured I should make some improvements to the C\# code as well. For
example, I [added helper
functions](http://github.com/devhawk/ipydbg/commit/0b50760d522c71be78839d3c38bc9f3e2ee2a168)
to easily retrieve the metadata for a
[class](http://github.com/devhawk/ipydbg/blob/0b50760d522c71be78839d3c38bc9f3e2ee2a168/CorDebug/CorDebug/Class.cs#L79)
or
[function](http://github.com/devhawk/ipydbg/blob/0b50760d522c71be78839d3c38bc9f3e2ee2a168/CorDebug/CorDebug/Thread.cs#L1102).

In my latest commit, I’ve added a [SymbolReader property to
CorModule](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Module.cs#L132).
Previously, I managed the mapping from CorModules to SymbolReaders in my
IPyDebugProcess class via the symbol\_readers field. However, since
mapping CorModules to SymbolReaders is something pretty much any
debugger app would have to do, it made more sense to have that be a part
of CorModule directly. So now, you can set and retrieve the SymbolReader
directly on the module. Furthermore, I moved the logic to retrieve a
SymbolReader from the IStream provided in the OnUpdateModuleSymbols
event into the CorModule class as well.

I wouldn’t have bothered to blog this change at all, except that if you
look at how the SymbolReader property is implemented under the hood,
it’s not what you would expect. Instead of having SymbolReader as an
instance variable on CorModule – as you might expect -CorModule has a
static dictionary mapping CorModules to SymbolReaders. The instance
SymbolReader property simply then access to the underlying static
dictionary.

``` csharp
//code taken from CorModule class in CorModule.cs
private static Dictionary<CorModule, ISymbolReader> _symbolsMap = 
    new Dictionary<CorModule, ISymbolReader>();

public ISymbolReader SymbolReader
{
    get
    {
        if (_symbolsMap.ContainsKey(this))
            return _symbolsMap[this];
        else
            return null;
    }
    set
    {
        _symbolsMap[this] = value;
    }
}
```

Now obviously, this the way you typically implement properties. However,
the problem is that there isn’t a 1-to-1 mapping between the underlying
debugger COM object instances and the managed objects instances that
wrap them. For example, if you look at the
[CorClass:Module](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Class.cs#L25)
property, it constructs a new managed wrapper for the COM interface it
gets back from
[ICorDebugClass.GetModule](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/NativeApi/ICorDebugWrappers.cs#L727).
That means that I can’t store the symbol reader as an instance field in
the managed wrapper since I probably will never see a given managed
wrapper module instance ever again.

All of the debugger API wrapper classes including CorModule inherit from
a class named
[WrapperBase](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/WrapperBase.cs)
which overrides Equals and GetHashCode. The overridden implementations
defer to the wrapped COM interface, which means that two separate
managed wrapper instances of the same COM interface will have the same
hash code and will evaluate as equal. The upshot is that object
uniqueness is determined by the wrapped COM object rather that the
managed object instance itself.

Using a static dictionary to store a module instance property provides
the necessary “it doesn’t matter what managed object instance you use as
long as they all wrap the same COM object underneath” semantics. If I
create multiple instances CorModule that all wrap the same underlying
COM interface pointer, they’ll all share the same SymbolReader instance
from the dictionary.

Yeah, it’s feels kinda hacky, but it works.
