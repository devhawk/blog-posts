I just finished my Data in SOA talk for TechEd Malaysia. The room was
very hot and the session was right after lunch – not exactly optimal
conditions. I did OK – could have been better. Between time in hotels
and on airplanes with nothing to do but code, I’ve written more in the
last four days than the previous four months combined. I didn’t spend as
much time as I could have reviewing the deck, so I guess I can’t say
that I was [*utterly*
prepared](http://www.hanselman.com/blog/fromradio.ashx?external_referrer=http://devhawk.net/SearchView.aspx?q=presentation&url=http://radio.weblogs.com/0106747/stories/2003/01/22/scottHanselmansTipsForASuccessfulMsftPresentation.html).
But I have delivered this talk many times and spend a significant amount
of time thinking about the concepts and discussing them with teammates.
BTW, this talk is now available as a
[whitepaper](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnbda/html/dataoutsideinside.asp)
on [Architecture Center](http://msdn.microsoft.com/architecture).

This morning, Gurpreet delivered his Enterprise Architecture talk. I
thought it was pretty good, esp. given that he wrote quite a bit of the
deck on the plane to Malaysia. I had only seen him present once before
when he was exhausted (hotel screwed up his room) and on pain killers
(he fell of the stage and messed up his back). He was much better this
time – he’s a great storyteller. He also had a few choice quotes I
thought I’d share:

> “We could spend the next month in this room talking about enterprise
> architecture and only just be getting started.”
>
> “Don’t tie your ego to your design.”
>
> “If you don’t do EA, you can’t do SOA.”

He spent most of his time talking general EA topics, with the remainder
spent on MSFT incarnations of those topics, such as
[EASOT](http://msdn.microsoft.com/architecture/patterns/default.aspx?pull=/library/en-us/dnpag/html/entarch.asp).
What was funny was that when he showed me his deck, I thought the MSFT
stuff play better with the audience, but it turned out the general EA
stuff was great. For example, Gurpreet started by talking about the
[Winchester Mystery House](http://www.winchestermysteryhouse.com/),
built by Sarah Winchester (of Winchester Rifles fame). This place is an
architectural nightmare with stairs that lead into the ceiling and
nearly half of the doors that open onto walls. It’s also over
provisioned with 40 bedrooms, 5 kitchens and 17 chimneys. An
over-provisioned architectural nightmare? Sounds like a typical
enterprise.

He talked about the typical conceptual/logical/physical viewpoint of the
enterprise with an interesting twist – the contextual level. This
viewpoint is above conceptual in the model. To take his example, if a
bank builds an online banking system, we’re all very familiar with the
conceptual, logical and physical views of that system. The contextual
view might be something like “We’re losing customers due to the fact we
don’t have an online banking system.” I need to spend more time thinking
about this, and how to map between these views, but I thought the
contextual viewpoint was very interesting.

I really wanted to blog what Gurpreet claimed was EA’s biggest fallacy:
that it doesn’t change. Because we’ve based the concepts of software
architecture on building architecture, there’s this belief that you
first design your architecture and then you build things to that
architecture – i.e. like a building. For example, when I saw John
Zachman [present his
framework](http://devhawk.net/2003/07/16/where-ive-been/),
he was asked how one goes about implementing the framework. His response
was something along the lines of: “Build all the layer one models, then
build all the layer two models, etc. etc. etc. and then hit compile.”
Obviously, that kind of revolutionary waterfall approach to enterprise
architecture just won’t work. While [buildings evolve and
“learn”](http://www.amazon.com/exec/obidos/tg/detail/-/0140139966?v=glance),
they aren’t in a constant state of flux the way enterprises are. This is
where Gurpreet made the comment about not tying your ego to a particular
architecture – you have to realize it’s going to change.

I’m hoping that Gurpreet’s Architecture Vision & Direction talk will be
equally good. Now, I just need to pester him into publishing this
material in a whitepaper or blog or something. He’s presenting at
Strategic Architect Forum next month, so I expect these talks will
continue to improve.
