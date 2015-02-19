When I read [Larry O’Brien’s](http://www.knowing.net/) post [IronPython
as a Foundation for
DSLs](http://www.knowing.net/PermaLink,guid,fde14e86-4d1e-461d-9751-950a1f2e6974.aspx),
I had a strong sense of deja-vu. I went thru a very similar thought
process when I discovered the early versions of IronPython were written
in Python. I figured that meant Python must have some support that makes
building compilers easier. Unfortunately, that doesn’t turn out to be
the case. Python provides a [standard module called
parser](http://docs.python.org/lib/module-parser.html) which “provides
an interface to Python’s internal parser”. That means that compiling
Python is easy, but there’s no support for compiling any language other
than Python.

I’ve been doing a little experimenting in this space. First, as I’ve
[written before](http://devhawk.net/2006/08/15/Modular+Compilers.aspx),
I’ve been playing with [parsing expression
grammars](http://pdos.csail.mit.edu/~baford/packrat/). Second, I want to
take a close look at
[Metaphor](http://plas.fit.qut.edu.au/metaphor/) from
[QUT](http://plas.fit.qut.edu.au/Default.aspx):

> Metaphor is a programming language with support for type-safe run-time
> code generation — a form of meta-programming. Metaphor is based on a
> subset of C\# or Java and combines the imperative, object-oriented
> nature of these languages with the multi-stage programming constructs
> from [MetaOCaml](http://www.metaocaml.org). Metaphor uses the static
> type system of multi-stage languages to achieve compile-time safety of
> run-time generated code…
>
> Metaphor is implemented as a compiler on the Microsoft CLR.

Finally, I need to take a closer look at [ANTLR](http://www.antlr.org/).
Don’t know how I missed it, but I had never seen
[ANTLRWorks](http://www.antlr.org/works/) until Larry linked to it.
