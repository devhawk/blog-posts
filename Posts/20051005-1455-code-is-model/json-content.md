In the foreword to [Architecture Journal
3](http://www.microsoft.com/architecture/default.aspx?pid=journal.3), I
wrote the following:

> Abstraction is the architect’s key tool for dealing with complexity.
> We’ve seen the evolution of architectural abstractions techniques such
> as models and patterns; however, we have yet to realize much in the
> way of measurable value from them. Models and patterns are useful for
> communicating effectively with our peers, but so far they haven’t
> helped drastically reduce the amount of resources it takes to build
> and operate a system. In order to continue to deal with increasing
> complexity, we need to get much more pragmatic about using abstraction
> to solve problems.

Because the lack of measurable value to date, the IT industry at large
has come to view models at best as “pretty pictures” and at worst as a
pointless waste of time and resources. But the reality is, we use models
in the IT industry all the time. I don’t know what you’re favorite
modeling tool it, but my current favorite is C\#. Before that was VB and
before that was C++. I realize some of my readers might be more partial
to Java, Ruby, or even Assembly. But the reality is: all of these
so-called “higher level” programming languages are simply models of the
CPU execution environment.

The only code that the CPU can understand is machine code. But nobody
wants to write and debug all their code using 0’s and 1’s. So we move up
a level of abstraction and use a language that humans can read more
easily and that can be automatically translated (i.e. compiled) into
machine code the CPU can execute. The simplest step above machine code
is assembly language. But ASM isn’t particularly productive so work
with, so the industry has continuously raised the level of abstraction
in the languages they use. C is a higher level of abstraction than ASM,
adding concepts like types and functions. C++ is a higher level of
abstraction than C, adding concepts like classes and inheritance. Each
of these levels of abstraction presents a new model of the execution
environment with new features that make programming more productive (and
sometimes [more
portable](http://devhawk.net/2005/09/08/Portability+Without+Productivity.aspx)).
Different languages offer different models of the execution environment.
For example, the Ruby model of the execution environment allows for the
manipulation of class instances while the C++ model allows for multiple
inheritance. This isn’t to say one is better than the other – they are
just different.

In the past decade, we’ve seen the rise in popularity of VM based
programming environments – primarily Java and CLR. In these
environments, there are multiple models at work. CLR languages and Java
are models above the underling VM execution environment. The VM
execution environment is, in turn, a model of the physical execution
environment. As an example, a C\#/Java program is translated into
IL/bytecode at compile time and then from IL/bytecode to machine code at
runtime. So in these VMs, two model translations have to occur in order
to go from programming language to machine code. It turns out that this
multiple step translation approach is also useful in non-VM
environments. For example, the original C++ compiler output vanilla C
code which was, in turn, compiled with a vanilla C compiler. C\# and
Java use a similar approach, except that the second translation occurs
at runtime, not compile time.

So if Code is Model, what can we learn from looking at the success of
mainstream text-based programming languages to help us in the
development of higher abstraction modeling languages that are actually
useful. This isn’t an exhaustive list, but here are a few things
(tenets?) I’ve thought of:

-   **Models must be Precise**\
    There must be no ambiguity in the meaning of the elements in a
    model. In C\#, every statement and keyword has an exact well-defined
    meaning. There is never a question as to what any given piece of C\#
    code means. There may be context-sensitive meanings, such as how the
    keyword “using” has different meanings in C\# depending on where it
    is used. If you don’t have a similar level of precision in your
    model, there’s no way to transform it to lower abstraction models in
    a deterministic fashion. Models that can’t be transformed into lower
    abstraction models are nothing more than pretty pictures – perhaps
    useful for communication with other people on the project, but
    useless as development artifacts.
-   **Model Transformation must be Deterministic**\
    By definition (or at least by convention), models are at a higher
    level of abstraction than both your execution domain and mainstream
    programming languages – perhaps significantly higher. In order to
    derive value from a model, you must be able to transform it into the
    execution domain. Like the C\# to IL to machine code example, the
    model transformation may comprise multiple steps. But each
    transformation between models must be as precise as the models
    themselves. When you compile a given piece of C\# code, you get the
    same IL output every time. However, this transformation can vary
    across target models. For example, when you run a managed app on a
    x86 machine you get different machine code than if you ran it on an
    x64 machine.
-   **Models must be Intrinsic to the Development Process\
    **Even if you have precise models and deterministic transformations,
    you have to make them first class citizens of the development
    process or they will become outdated quickly. How often have you
    blueprinted your classes with UML at the start of the project, only
    to have that class diagram be horribly out of date by the end of the
    project? In order to keep models up to date, they must be used
    through-out the development process. If you need to make a change,
    make the change to the model and then retransform into the execution
    domain. Think of C\# and IL – do we use C\# as a blueprint,
    transform once to IL and then hand edit the IL? No! We change the
    C\# directly and retransform into IL. We need to have the same
    process even as we move into higher levels of abstraction.
-   **Models Aren’t Always Graphical\
    **Some things are best visualized as pictures, some things aren’t.
    To date, we’re much better at graphically modeling static structure
    than dynamic behavior. That’s changing – for example, check out the
    [BTS](http://msdn.microsoft.com/library/en-us/sdk/htm/ebiz_prog_useod.gif)
    or
    [WF](http://www.windowsworkflow.net/images/Temp/WWF%20Designer%20Screenshot%20-%20thumbnail2.jpg)
    tools. But generally, it’s easier to model structure than behavior
    graphically. Don’t try and put a square peg in a round hole. If a
    text based language is the best choice, that’s fine. Think about the
    Windows Forms Designer in VS – you use a graphical “language” to lay
    out your user interface, but you implement event handlers using a
    text-based language.
-   **Explicitly Call Out Models vs. Views\
    **One of the areas that I get easily confused about is model views.
    If I’m looking at two different model visualizations (text or
    graphical), when are they different models and when are they views
    into the same model. People don’t seem to care much one way or the
    other, but I think the difference is critical. For example, a UML
    class model and a C\# class are two separate models – you need a
    transformation to go back and forth between them. However, the VS
    [Class Designer](http://blogs.msdn.com/classdesigner/) is a
    graphical view into the model described by the C\# class
    definitions. Changes in one view are immediately visible in the
    other – no transformation required. If you look at the [Class
    Designer file
    format](http://blogs.msdn.com/classdesigner/archive/2005/07/29/444501.aspx),
    you’ll notice only diagram rendering specific information is stored
    (ShowAsAssociation, Position, Collapsed, etc.). I guess this could
    fall under “Models must be Precise” – i.e. you should precisely
    define if a given visualization is a view or a model – but I think
    this area is muddy enough to warrant it’s own tenet.

I’m sure there are more thoughts for this list, but that’s a good start.
Please feel free to leave your opinion on these tenets and suggestions
for new ones in [my
comments](http://devhawk.net/CommentView,guid,7d6d6cb2-2300-4e39-8ad8-a2910d81d498.aspx).
