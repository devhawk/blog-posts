Via [Larkware](http://www.larkware.com/dg8/TheDailyGrind1193.aspx) and
[InfoQ](http://www.infoq.com/news/2007/07/worthless-code), I discovered
a great post on code reuse by Dennis Forbes: [Internal Code Reuse
Considered
Dangerous](http://www.yafla.com/dennisforbes/Internal-Code-Reuse-Considered-Dangerous/Internal-Code-Reuse-Considered-Dangerous.html).
I’ve [written
about](http://devhawk.net/2006/09/19/a-question-of-context/)[reuse
before](http://devhawk.net/2006/09/20/feasible-service-reuse/),
albeit in the context of services. But where I wrote about the impact of
context on reuse (high context == low or no reuse), Dennis focused on
the idea of accidental reuse. Here’s the money quote from Dennis:

> Code reuse doesn’t happen by accident, or as an incidental – *reusable
> code is designed and developed to be generalized reusable code*. Code
> reuse as a *by-product* of project development, usually the way
> organizations attempt to pursue it, is almost always detrimental to
> both the project and anyone tasked with reusing the code in the
> future. [Emphasis in original]

I’ve seen many initiatives of varying “officialness” to identify and
produce reusable code assets over the years, both inside and outside
Microsoft. Dennis’ point that code has to be specifically designed to be
reusable is right on the money. Accidental code (or service) reuse just
doesn’t happen. Dennis goes so far as to describe such efforts as
“almost always detrimental to both the project and anyone tasked with
reusing the code in the future”.

One of the more recent code reuse efforts I’ve seen went so far as to
identify a reusable asset lifecycle model. While it was fairly detailed
at the lifecycle steps that came *after* said asset came into existence,
it was maddeningly vague as to how these reusable assets got built in
the first place. The lifecycle said that a reusable asset “comes into
existence during the planning phases”. That’s EA-speak for “and then a
miracle happens”.

Obviously, the hard part about reusable assets is designing and building
them in the first place. So the fact that they skimped on this part of
the lifecycle made it very clear they had no chance of success with the
project. I shot back the following questions, but never got a response.
If you are attempting such a reuse effort, I’d strongly advise answering
these questions first:

-   How does a project know a given asset is reusable?
-   How does a project design a given asset to be reusable?
-   How do you incent
    ([incentivize?](http://dictionary.reference.com/browse/incentivize))
    a project to invest the extra resources (time, people, money) in
    takes to generalize an asset to be reusable?

And to steal one from Dennis:

-   What, realistically, would competitors and new entrants in the field
    offer for a given reusable asset?

Carl Lewis wonders [Is your code
worthless?](http://cysquatch.net/blog/2007/06/08/is-your-code-worthless/)
As a reusable asset, probably yes.
