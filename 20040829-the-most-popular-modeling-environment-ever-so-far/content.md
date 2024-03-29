Steve’s
[post](http://hyperthink.net/blog/PermaLink,guid,6a264d60-3652-4662-bfff-77bdc3ebf2b2.aspx%20)
on “the modeling problem” hits the nail on the head. We’re all familiar
with the concept of “fast, good, cheap – pick two”. Steve breaks down
modeling into “general, precise, efficient – pick two (and favor one)”.
Furthermore, you can’t have a language that is both general and precise.
UML takes what Steve calls the “Favor efficiency, accept generality and
compromise precision” approach:

> The UML metamodel is flexible enough to allow it to describe virtually
> any system out there. However, from a formal semantic perspective, the
> resultant model is gooey and formless which makes it very difficult to
> compile into anything useful. At best, we can get some approximation
> of the underlying system via codegen, but even the best UML tools only
> generate a fraction of the code required to fully realize the model.
> The lack of precision within the model itself requires operating in
> both the model domain and the system domain, and implies that some
> facility exist to synchronize the two. Thus, the imprecision of UML
> forces us to solve the round-tripping/decompilation problem with 100%
> fidelity, which is generally difficult to do.

[Software
Factories](http://msdn.microsoft.com/architecture/softwarefactories), on
the other hand, takes what he calls the “Favor efficiency, accept
precision, and compromise generality” approach:

> This, I think, it the sweet spot for Microsoft’s vision of Software
> Factories. Here’s why: the classic problem faced by modeling languages
> is Turing equivalency. How do you model a language that is
> Turing-complete in one that’s not without sacrificing something? The
> answer is: you don’t. You can either make the modeling language itself
> Turing-complete (which sacrifices efficiency) or you can limit the
> scope of the problem by confining yourself to modeling only a specific
> subset of the things that be expressed in the underlying system
> domain. Within that subset, it might be possible to model things
> extremely precisely, but that precision can only be gained by first
> throwing out the idea that you’re going to be able to efficiently and
> precisely model *everything*.

When describing Software Factories, I have two analogies that I use to
explain the idea. The first is the “houses in my neighborhood” example I
[blogged
before](http://devhawk.net/2004/08/16/reading-is-fundamental-to-forming-an-educated-opinion/).
That does a good job describing economies of scope, but doesn’t really
cover the modeling aspect of software factories. Talking about how you
model cars or skyscrapers doesn’t really capture the essence of software
modeling – you don’t generate the construction plans from a scale model
of a skyscraper. However, it turns out that all developers have at least
a passing familiarity with my second analogy: Visual Basic, the most
popular DSL and modeling tool of all time (so far).

The original Visual Basic was a rudimentary software factory for
building “form-based windows apps”. (Today, VB.net has been generalized
to support more problem domains) Like the factory approach that Steve
describes, VB was very efficient, sufficiently precise, yet not
particularly general (especially in the early years). There were entire
domains of problems that you couldn’t build VB apps to solve. Yet,
within those targets problem domains, VB was massively productive,
because it provided both a domain specific language (DSL) as well as a
modeling environment for that domain.

A DSL incorporates higher-order abstractions from a specific problem
domain. In the case of VB, abstractions such as Form, Control and Event
were incorporated directly into the language. This allowed developer to
directly manipulate the relevant abstractions of the problem domain.
Abstractions extraneous to the problem domain, such as pointers and
objects in this case, got excluded, simplifying the language immensely.
Both of these lead directly to productivity improvements while limiting
the scope of the DSL to a particular problem domain.

In his post, Steve makes the point that it’s pointless to distinguish
between modeling and programming languages. VB certainly blurred that
line to the point of indistinguishably. Regardless, graphical languages
are typically more compelling and productive than textual ones. It’s
hard to argue with the productivity that VB form designer brought to the
industry. Dragging and dropping controls to position them, double
clicking on them to associate event handlers, changing properties in
drop down boxes – these idioms have been widely implemented to the point
that essentially all  UI platforms provide a drag-and-drop based
modeler. It’s such a great design that 10 years later, UI modelers are
essentially unchanged.

Once you realize that VB’s DSL and modeling environment was a
rudimentary software factory, you realize that Software Factories
methodology is about generalizing what VB accomplished – building tools
that achieve large gains in efficiency by limiting generality. Since
each of these tools focuses on a limited problem domain, you need
different tools for different problem domains. The problem is that while
building apps with VB may be easy, but building VB itself was not. Most
enterprises have the expertise to develop abstractions in their domain
of expertise and to codify those abstractions in frameworks, but very
few can develop tools and DSLs for manipulating those frameworks. One of
the goals of Software Factories (and [VSTS
Architect](http://msdn.microsoft.com/vstudio/teamsystem/architect) for
that matter) is to make it easier to build tools that are really good at
building a narrow range of applications.

Note, it’s important to note that the term “narrow range” is relative.
Darrell [seems to
think](http://dotnetjunkies.com/WebLog/darrell.norton/archive/2004/08/17/22302.aspx)
narrow range only means vertical market applications that don’t “solve
new and interesting problems”. It’s true that the narrower the range,
the more productive the tool can be. But VB shows us that you can
achieve large productivity gains while solving new and interesting
problems even in broad scope problem domains.
