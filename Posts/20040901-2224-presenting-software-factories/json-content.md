I presented [Software
Factories](http://msdn.microsoft.com/architecture/overview/softwarefactories/)
for the first time today and I think I did a pretty good job. We had
some architects were in town from a new managed SI partner and they
wanted to discuss modeling. They are (were?) an IBM partner, so they’re
a big WebSphere shop. They’re also XDE users, so I laid out the Software
Factories concept as well as the [modeling tools that are coming in
VS2005](http://msdn.microsoft.com/msdnmag/issues/04/07/whitehorse/default.aspx).
They seemed pretty impressed. Of course, they’re having what I expect is
a typical experience with UML tools – they use XDE for documentation and
communication only (i.e.
[UmlAsSketch](http://www.martinfowler.com/bliki/UmlAsSketch.html)). They
don’t even try to generate code from the models anymore.

To help explain the Factories concept, I used Steve Maine’s
[Efficiency/Precision/Generality modeling
approach](http://hyperthink.net/blog/PermaLink,guid,6a264d60-3652-4662-bfff-77bdc3ebf2b2.aspx)
(and gave him credit for it, of course. Steve, I will find a way to
properly thank you for that brain.save) as well as my own ideas about
[VB as a Software
Factory](http://devhawk.net/PermaLink.aspx?guid=beb13ac1-f5a0-42e0-9670-f6843601d33e).
Both worked out very well to help communicate the goals of the Factories
approach, though I could refine the delivery quite a bit. I also talked
about the [Evolving Frameworks Pattern
Language](http://st-www.cs.uiuc.edu/users/droberts/evolve.html), which
Jack outlines in the [JOURNAL factories
article](http://msdn.microsoft.com/architecture/overview/softwarefactories/default.aspx?pull=/library/en-us/dnmaj/html/aj3softfac.asp)
this way:

> -   After developing a number of systems in a given problem domain, we
>     identify a set of reusable abstractions for that domain, and then
>     we document a set of patterns for using those abstractions.
> -   We then develop a runtime, such as a framework or server, to
>     codify the abstractions and patterns. This lets us build systems
>     in the domain by instantiating, adapting, configuring, and
>     assembling components defined by the runtime.
> -   We then define a language and build tools that support the
>     language, such as editors, compilers, and debuggers, to automate
>     the assembly process. This helps us respond faster to changing
>     requirements, since part of the implementation is generated, and
>     can be easily changed.

The problem is that each of these steps is much much harder than the
preceding ones. Identifying problem domain abstractions & patterns is
something that most organizations are already doing, even if they don’t
do it explicitly today. Codifying those abstractions in a reusable
framework is much harder, primarily because it’s hard to think through
all the usage variations a framework may experience. Still, many
companies have the skills to develop reusable frameworks. However few
companies have the language and tool development experience to make
investing in custom tools cost effective. For example, even though
[Gregor](http://www.eaipatterns.com/gregor.html) and Bobby have defined
a [language](http://www.eaipatterns.com/Introduction.html) for
[integration patterns](http://www.eaipatterns.com/), the only tooling
available is a [Visio
stencil](http://www.eaipatterns.com/downloads.html).

For Software Factories to work, we need to make it much easier to build
domain specific languages and modeling environments. This is one of the
big hurdles to adopting the factories approach today.
