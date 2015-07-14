Before I start writing any debugger code, I thought it would help to
quickly review the .NET debugger infrastructure that is available as
well as the design of the MDbg command line debugger. Please note, my
understanding of this stuff is fairly rudimentary – [Mike
Stall](http://blogs.msdn.com/jmstall/default.aspx) is “da man” if you’re
looking for a .NET debugger blogger to read.

The CLR provides a series of unmanaged APIs for things like [hosting the
CLR](http://msdn.microsoft.com/en-us/library/ms404385.aspx), [reading
and writing CLR
metadata](http://msdn.microsoft.com/en-us/library/ms404384.aspx) and –
more relevant to our current discussion –
[debugging](http://msdn.microsoft.com/en-us/library/ms404520.aspx) as
well as [reading and writing debugger
symbols](http://msdn.microsoft.com/en-us/library/ms404519.aspx). These
APIs are exposed as COM objects. The CLR Debugging API allows you to do
those all the things you would expect to be able to do in a debugger:
[attach to
processes](http://msdn.microsoft.com/en-us/library/ms230107.aspx)
(actually, app domains), [create
breakpoints](http://msdn.microsoft.com/en-us/library/ms233573.aspx),
[step thru code](http://msdn.microsoft.com/en-us/library/ms233136.aspx),
etc. Of course, being an unmanaged API, it’s pretty much unavailable to
be used from IronPython. Luckily, MDbg wraps this unmanaged API for us,
making it available to any managed language, including IronPython.

The basic design of MDbg looks like this:

![image](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog?20090227-writing-an-ironpython-debugger-mdbg-101/mdbg_layers.png)

At the bottom is the “raw” assembly, which contains the C\# definitions
of the unmanaged debugger API – basically anything that starts with
[ICorDebug](http://msdn.microsoft.com/en-us/library/ms230588.aspx) and
[ICorPublish](http://msdn.microsoft.com/en-us/library/ms231592.aspx).
Raw also defines some of the metadata API, since that’s how type
information is exposed to the debugger.

The next level up is the “corapi” assembly, which I refer to as the
low-level managed debugger API. This is a fairly thin layer that
translates the unmanaged paradigm into something more palatable to
managed code developers. For example, COM enumerators such as
[ICorDebugAppDomainEnum](http://msdn.microsoft.com/en-us/library/ms233115.aspx)
are exposed as IEnumerable types. Also, the [managed callback
interface](http://msdn.microsoft.com/en-us/library/ms232496.aspx) gets
exposed as .NET events. It’s not perfect – the code is written in C\#
1.0 style so there are no generics or yields.

Where corapi is the low-level API, “mdbgeng” is the high-level managed
debugger API. As you would expect, it wraps the low-level API and
provides automatic implementations of common operations. For example,
this layer maintains a list of breakpoints so you can create them before
the relevant assembly has been loaded. Then when assemblies are loaded,
it goes thru the list of unbound breakpoints to see if any can be bound.
It’s also this layer that automatically creates the main entrypoint
breakpoint.

Finally, at the top we have the MDbg application itself, as well as any
MDbg extensions (represented by the … in the diagram above). The mdbgext
assembly defines the types shared between MDbg.exe and the extension
assemblies. MDbg has some cool extensions – including an [IronPython
extension](http://blogs.msdn.com/jmstall/archive/2005/08/31/Mdbg_Python_ext.aspx)
– but for now I’m focused on building something as lightweight as
possible, so I’m going to forgo an extensibility mechanism, at least for
now.

My initial prototype was written against the high-level API. There were
two problems with this approach. The first is that there’s no support
for Just My Code in the high-level API. As I mentioned in [my last
post](http://devhawk.net/2009/02/27/writing-an-ironpython-debugger-introduction/),
JMC support is critical for this project. Adding JMC support isn’t hard,
but I’m trying to make as few changes as possible to the MDbg source,
since I’m not interested in forking and maintaining that code. Second,
while the low-level API provides an event-based API (OnModuleLoad,
OnBreakpoint, OnStepComplete, etc), the high-level API provides a more
console-oriented looping API. I found the event-driven API to be cleaner
to work with and I’m thinking it will work better if I ever build a GUI
version of ipydbg. So I’ve decided to work against the low-level API
(aka corapi).

I mentioned above that I didn’t want to change the MDbg source, but I
did make one small change. The separation of corapi and raw into two
separate assemblies is an outdated artifact of an earlier version of
MDbg. So I decided to combine these two into a single assembly called
CorDebug. Other than some simple cleanup to assembly level attributes to
make a single assembly possible, I haven’t changed the source code at
all.
