I haven’t seen much in the way of response to my [Hi-Fi
Models](http://devhawk.net/2006/01/03/hi-fi-models/) post, but I did
come across this [great
article](http://msdn.microsoft.com/netframework/default.aspx?pull=/library/en-us/dndotnet/html/linqcomparisons.asp)
by [Ted Neward](http://blogs.tedneward.com/) on the history of the
tumultuous marriage of objects and relational databases, primarily in
the context of
[LINQ](http://msdn.microsoft.com/netframework/future/linq/default.aspx).
In the context of [Code is
Model](http://devhawk.net/2005/10/05/code-is-model/), the following
passage from the summary was the most interesting:

> While Project LINQ doesn’t purport to be the “final answer” to all of
> the world’s object-relational mismatch problems, it does represent a
> significant shift in direction to solving the problem; instead of
> taking an approach that centers around code generation, or automated
> mapping based around metadata and type inference, both of which are
> exercises in slaving the relational model to an object-oriented one,
> Project LINQ instead chooses to elevate relations and queries as a
> first-class concept within language semantics and library-based
> extensions.\
> [[Comparing LINQ and Its
> Contemporaries](http://msdn.microsoft.com/netframework/default.aspx?pull=/library/en-us/dndotnet/html/linqcomparisons.asp)
> – [Ted Neward](http://blogs.tedneward.com/)]

When Ted says relations and queries are elevated to “first class
concepts” within the language, it makes me think of
[Stuart’s](http://blogs.msdn.com/stuart_kent/)[comment](http://blogs.msdn.com/stuart_kent/archive/2005/12/22/506687.aspx)
about language fidelity. I’m not sure I would say C\# 3.0 is at a higher
level of abstraction than 2.0, but I would say that the inclusion of
these new abstractions does improve the language’s fidelity. This
fidelity improvement does come at the cost of complexity
([TANSTAAFL](http://en.wikipedia.org/wiki/TANSTAAFL)) but compared to
the current alternatives, I’m willing to pay that price.

The problem with increasing the language fidelity like this is dealing
with the outdated code it leaves behind. You see this today with the
addition of generics in the 2.0 CLR. How many hand-coded or
[generated](http://www.sellsbrothers.com/tools/#collectionGen) strongly
typed collections are floating around out there from the 1.x days? Lots.
(As if 1.x was so long ago!) How much database access code is floating
around out there today? An astronomical amount. Every app that touches a
database or processes XML will be outdated with the arrival of C\# 3.0
and VB 9.0. But the price of converting this outdated code to use the
new abstractions probably won’t be worth the time or risk. That means
you’re left with maintaining the outdated code while also writing any
new functionality with the new language features.

I wonder how DSLs will be impacted by this evolving language fidelity
issue? On the one hand, the nature of DSLs is that they have much
narrower usage (i.e. one domain) than something like generics or LINQ.
On the other hand, I expect DSLs to evolve faster than general
mainstream languages like C\# can. So I’m thinking the impact will be
about the same.
