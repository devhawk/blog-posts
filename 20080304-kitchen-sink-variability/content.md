Nick Malik forwarded the [last ZapFlash
newsletter](http://www.zapthink.com/report.html?id=ZAPFLASH-2008228) to
me. I gave up on analyst newsletters like this long ago, but Nick shared
it with me because it “hit directly on what [Nick] thinks an ESB is and
does, and why an ESB is not a hub.” I’m [not a fan of the whole ESB
concept](http://devhawk.net/2007/04/25/enterprise-service-bus-give-me-an-extra-special-bitter-instead/)
and frankly this article didn’t do much to change my opinion. However,
this passage did sorta jump out at me.

> [T]he main concept of SOA is that we want to deal with frequent and
> unpredictable change by constructing an architectural model,
> discipline, and abstraction that loosely-couples the providers of
> capability from the consumers of capability in an environment of
> continuous heterogeneity. This means that we have to somehow develop
> capabilities without the knowledge of how they might be used…[T]his
> means that we need to have significant variability at a variety of
> aspects including the implementation, infrastructure, contract,
> process, policy, data schema, and semantic aspects. Having this
> variability allows companies to have stability in their business and
> IT even though the IT and business continue to change. Agility,
> predictability, reliability, visibility, and cost-effectiveness all
> become that much more realistic when we can achieve that sort of
> abstraction.

My reading of this is that the author, [Ronald
Schmelzer](http://www.zapthink.com/management.html), is advising
organizations to introduce “significant variability at a variety of
aspects” in their services in order to deal with what he openly admits
is “unpredictable change”.

This sounds like a mind-boggling awful idea to me.

At it’s heart, any practical design – including a service-oriented one –
needs to be an exercise in tradeoff analysis. You can’t add “significant
variability” without also adding significant complexity, effort, time
and cost. So the real question is: Is the significant variability Ronald
describes worth the inevitable tradeoff in significant time, effort,
cost and complexity?

I seriously doubt it.

Since unpredictable change is – by definition – unpredictable, you have
no way of knowing if you will actually need any specific aspect of
variability down the road. Ronald’s strategy – if you can call it that –
seems to be let everything he can think of vary except the kitchen sink.
That way, when said unpredictable change happens, you might get lucky
and have already enabled the variability you need to handle the change
with a minimum of effort.

Getting lucky is not a strategy.

Chances are, a specific aspect of variability won’t ever be needed. In
other words, most of the the time, effort and money you spent building
these aspects of variability will be wasted. And remember, this isn’t
just a one time cost – the increased complexity from including this
significant variability means you’ll pay the price in additional time,
effort and money every time you have to change the system.

I wonder if Ronald is familiar with the term “[You Aren’t Gonna Need
It](http://xp.c2.com/YouArentGonnaNeedIt.html)“. He talks about
increasing business agility, but he eschews many of the principles of
[agile
development](http://en.wikipedia.org/wiki/Agile_software_development). I
realize they aren’t the same thing, but I have a hard time believing
that they are so diametrically opposed that a [core
principle](http://www.extremeprogramming.org/rules/early.html) of agile
development should be readily violated in order to enable business
agility.

Maybe it’s cliche, but I try to always come back to “[What’s the
simplest thing that could possibly
work?](http://c2.com/xp/DoTheSimplestThingThatCouldPossiblyWork.html)”.
I would think that building a ton of currently-unnecessary variability
into your system on the off chance that someday you’ll need it fails the
“simplest thing that could possibly work” test spectacularly.

Personally, given the choice of taking advice from [Ward
Cunningham](http://c2.com/cgi/wiki?WardCunningham) or pretty much any
enterprise analyst on the planet, I’ll pick Ward every time.
