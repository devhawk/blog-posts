I was recently contacted by [Nathanael
Jones](http://nathanaeljones.com/) of the [ImageResizer
project](http://imageresizing.net/) about a
[question](http://stackoverflow.com/questions/11025100/escape-catch-22-with-extension-attributes-in-net-2-0)
he had posted on Stack Overflow:

> How can a single .NET assembly, targeting 2.0, 3.0, 3.5, 4.0, and 4.5
> concurrently, support extension methods for both C\# and VB.NET
> consumers?

**Short Answer**: *You can’t.* You think you can, but if you’re serious
about targeting .NET 2.0/3.0 and 3.5+ as well as that whole C\# and VB
support thing, you can’t. Not really.

**Long Answer**: People *love* extension methods. Seriously, I think
some people want to marry extension methods they love them so much. They
just can’t stand to be without their extension methods, even when
they’re using .NET 2.0.

Rather than go without,
[some](http://www.danielmoth.com/Blog/Using-Extension-Methods-In-Fx-20-Projects.aspx)
[people](http://msdn.microsoft.com/en-us/magazine/cc163317.aspx#S7)
[figured](http://www.codethinked.com/using-extension-methods-in-net-20)
[out](http://kohari.org/2008/04/04/extension-methods-in-net-20/) how to
get extension methods support on older versions of the .NET Runtime.
Extension methods are essentially a compile time technology – the IL
that gets emitted for calling an extension method is identical to the IL
for calling a normal static method. The only runtime dependency for
extension methods is the
[ExtensionAttribute](http://msdn.microsoft.com/en-us/library/system.runtime.compilerservices.extensionattribute.aspx)
which is used to mark methods intended to be used as extension methods
(as well as classes and assemblies that contain them).
ExtensionAttribute is defined in System.Core from .NET 3.5, but it’s
just a marker. If you define your own copy of ExtensionAttribute and use
the VS 2008 or later version of the C\# compiler, you can get extension
methods to work on .NET 2.0.

Back when I was working on IronPython, we ran into this exact issue when
we merged DLR expression trees with LINQ expression trees. LINQ trees
used extension methods all over the place, but we still needed to
support .NET 2.0 in IronPython. We were already using the VS08 compiler
so all we had to do was add our own copy of ExtensionAttribute to the
DLR and we were good to go…or so we thought. Instead, [we
discovered](http://devhawk.net/2008/09/17/dlr-namespace-change-fire-drill/)
that this approach doesn’t work as advertised – at least not if you care
about VB support.

The problem stems from having multiple copies of ExtensionAttribute.
IronPython and DLR had no problem – they were compiled for .NET 2.0 and
thus had only the one copy of ExtensionAttribute that we added to the
DLR. But people who used IronPython or DLR in a .NET 3.5 project ended
up two copies of ExtensionAttribute – the copy we added to DLR and the
official System.Core version. Two copies of a system provided type ==
start of a big problem.

Actually, if you’re only using C\#, having multiple copies of
ExtensionAttribute isn’t that big a deal. The C\# compiler raises a
[warning](http://msdn.microsoft.com/en-us/library/8xys0hxk.aspx) when it
find multiple definitions of a type in the System namespace. Because
ExtensionAttribute is in the System namespace, C\# has to pick one of
the colliding type definitions to use. However, since the copies of
ExtensionAttribute are identical it doesn’t matter which version the C\#
compiler picks.

Unfortunately, Visual Basic is much less forgiving when it encounters
multiple versions of the same type. Instead of a warning like C\#, the
VB compiler raises an
[error](http://msdn.microsoft.com/en-us/library/8f0k13d2.aspx) when it
encounters multiple definitions of ExtensionAttribute. So the “define
your own ExtensionAttribute” approach leaves you with a DLL that won’t
work from VB on .NET 3.5 or later.

Excluding VB on what was the most recent version of .NET at the time was
a non starter for us, so we investigated other options. We discovered
that we could “solve” this issue (again “or so we thought”) by having an
internal definition of ExtensionAttribute in every assembly that needed
it. Since the types weren’t public, VB stopped complaining about type
collisions. C\# still had the compiler warning, but we had already
decided not to care about that.

I [said at the
time](http://devhawk.net/2008/09/17/dlr-namespace-change-fire-drill/)
“It seems counterintuitive, doesn’t it? To solve a multiple type
definition problem, we defined even more copies of the type in
question.” Yeah, turns out I was kinda way wrong about that. We
[discovered later](http://devhawk.net/2008/10/21/the-fifth-assembly/)
that having an internal ExtensionAttribute per project solved the VB
ambiguous type error but introduced a new “break all the other extension
methods in the project error”.

Remember earlier when I wrote it didn’t matter which copy of
ExtensionAttribute the C\# compiler picks because they are “identical”?
Remember when I wrote we could solve the VB ambiguous type error by
changing the visibility of ExtensionAttribute? Woops. Changing the
visibility of our ExtensionAttribute meant it was no longer identical
which meant it kinda mattered which copy of ExtensionAttribute the C\#
compiler choose. If the C\# compiler picked one of our internal
ExtensionAttributes, it would break every use of extension methods in
the project referencing IronPython or the DLR!

We investigated a bunch of ways to control which version of
ExtensionAttribute was selected by the C\# compiler, but we couldn’t
find an easy, obvious way in MSBuild to control the order of references
passed to the compiler. In the end, we moved the custom
ExtensionAttribute into its own DLL. That way, we could reference it
from our IronPython and DLR projects to get extension method support but
.NET 3.5 projects referencing either IronPython or DLR could reference
System.Core instead. We still got the C\# warning, but since we were
back to identical ExtensionAttribute  definitions, the warning could be
ignored.

Believe me, if there had been any way to remove the extension methods
from the DLR and IronPython, we would have done it. Having a separate
assembly with just a single custom attribute definition is an ugly hack,
pure and simple. But the DLR was essentially the .NET 4.0 version
System.Core – getting it to run along side the .NET 3.5 version of
System.Core was bound to require hacks.

My [advice to Nathanial on SO](http://stackoverflow.com/a/11113191) was
the same as I gave at the top of this post: don’t use the “define your
own ExtensionAttribute” hack to try and get extension method support on
.NET 2.0. Extensions methods are nice, but they aren’t worth the
headache of dealing with the errors that stem from multiple definitions
of ExtensionAttribute when you try to use your library from .NET 3.5 or
later.
