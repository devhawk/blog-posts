[Chris Bilson](http://www.factored-software.com/iimplement) left the
following
[comment](http://devhawk.net/CommentView,guid,6e17873f-9d5b-401e-a9b4-609394e97e3f.aspx)
to my [Thoughts on
CAB](http://devhawk.net/2005/11/23/thoughts-on-cab/) post

> I hesitate to agree that raising the abstraction level of tools is a
> good idea. That’s just hiding the complexity that’s already there
> inside of more complexity. If you ever need to look under the hood,
> it’s even harder to grok. I think it would be better to go the other
> way. Try removing stuff to combat complexity.

Given that the software industry has been raising the level of
abstraction of tools since the start, I found this comment surprising.
Assuming Chris doesn’t write in assembly code, he’s leveraging something
at a higher level of abstraction that’s “just hiding the complexity
that’s already there”. As I wrote in [Code is
Model](http://devhawk.net/2005/10/05/code-is-model/):

> The only code that the CPU can understand is machine code. But nobody
> wants to write and debug all their code using 0’s and 1’s. So we move
> up a level of abstraction and use a language that humans can read more
> easily and that can be automatically translated (i.e. compiled) into
> machine code the CPU can execute. The simplest step above machine code
> is assembly language. **But ASM isn’t particularly productive so work
> with, so the industry has continuously raised the level of abstraction
> in the languages they use. C is a higher level of abstraction than
> ASM, adding concepts like types and functions. C++ is a higher level
> of abstraction than C, adding concepts like classes and inheritance.
> Each of these levels of abstraction presents a new model of the
> execution environment with new features that make programming more
> productive (and sometimes [more
> portable](http://devhawk.net/2005/09/08/portability-without-productivity/))**.\
> [emphasis added]

I feel like Chris has mischaracterized what I wrote. Here it is again:

> If you can’t lower the complexity of your framework, it’s time to
> raise the abstraction of your tools.

Note I’m not advocating raising the level of abstraction for
abstractions sake. Believe me, I’m hate overly complex code. The project
I’ve been on (and can blog about soon I hope) had a tone of overly
complex code that wasn’t particularly germane to solving the problem. I
yanked all that code and have reduced the framework to a quarter it’s
original size while adding functionality. But the reality is,
simplification can’t *always* be achieved by removing code. To
[paraphrase Albert
Einstein](http://en.wikipedia.org/wiki/Occam's_Razor), solutions to
problems should be as simple as possible, *but no simpler*.

CAB is the simplest solution to the problem it addresses, and no
simpler. Since we can’t make CAB simpler and still solve the problem,
the *only* alternative we have is to have the tools hide that
complexity. Given how well this has worked in the past, I see no reason
why it can’t work again in the future.
