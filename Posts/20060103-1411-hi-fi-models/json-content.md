I’m slowly but surely working through my holiday backlog of email and
weblogs. Slowly being the operative word here.

Anyway, [Stuart](http://blogs.msdn.com/stuart_kent/) has a [great
post](http://blogs.msdn.com/stuart_kent/archive/2005/12/22/506687.aspx)
on the process by which we build models. And he’s not talking
theoretically here, he’s working on a model for the designer definition
file in the DSL toolkit. (Which is good news in and of itself as
hand-writing the XML dsldd file is a pain in the butt. Though until then
there’s the great [Dm2Dd tool](http://www.modelisoft.com/Dmd2dd.aspx)
from Modelisoft). The iterative process he describes certainly looks a
lot like development, in the same way that C\# development looks like C
development. Similar steps taken on different concepts. Additionally,
he’s working bottom up – the output of the model will eventually be a
working program (a designer in this case) which is the point I made in
[Abstraction Gap
Leapfrog](http://devhawk.net/2005/12/20/abstraction-gap-leapfrog/).
There are existing abstractions that work now (i.e. the code generated
from the existing dsldd file) and he’s trying to building something one
level up from there.

I also like Stuart’s use of “fidelity” instead of my use of “complete”.
Stuart uses it as an indication of how correct a given model is. That’s
what I was implying when I said “complete” but “fidelity” captures the
idea much better. I could imagine both lo-fidelity and hi-fidelity
models for a given domain, though I would imagine you would always want
to use the highest fidelity model available. The difference would be the
amount of custom code you have to write – the higher the model fidelity,
the less code you write by hand. And I would imagine the model’s
fidelity would evolve over time, which introduces interesting questions
regarding language evolution as well as the evolution of projects built
with those languages.

I hope Stuart keeps blogging about this project.
