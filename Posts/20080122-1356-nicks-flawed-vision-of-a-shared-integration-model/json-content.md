Of all the things you might say about [Nick
Malik](http://blogs.msdn.com/nickmalik), “thinks small” is not one of
them. He takes on a significant percentage of the .NET developer
community over the [definition of
Mort](http://blogs.msdn.com/nickmalik/archive/2007/06/15/tools-for-mort.aspx).
He wants to [get IT out of the applications
business](http://blogs.msdn.com/nickmalik/archive/2007/07/30/free-code-getting-it-out-of-the-applications-business.aspx).
He invents his own architecture TLA: SDA (aka [Solution Domain
Architecture](http://blogs.msdn.com/nickmalik/archive/2007/05/04/mining-for-services-with-solution-domain-architecture.aspx)).
He’s a man on a mission, no doubt. And for the most part, I’m with him
110% on his ideas.

However, when he starts going on about a [shared global integration
model](http://blogs.msdn.com/nickmalik/archive/2008/01/09/towards-a-shared-global-integration-model.aspx),
I start to wonder if he has both hands on the steering wheel, as it
were.

Nick’s been [talking about
this](http://blogs.msdn.com/nickmalik/archive/2006/12/19/the-roadblock-to-software-as-a-service.aspx)
for over a year. As he points out, SaaS integration layer is the new
[vendor lock-in](http://en.wikipedia.org/wiki/Vendor_lock-in). One of
the attractions of SaaS is that you could – theoretically, anyway –
switch SaaS application providers easily which would drive said SaaS
companies to constantly innovate. However, if the integration layers
aren’t compatible, the cost to switch goes up dramatically, leaving the
customer locked-in to whatever SaaS company they initially bet on – even
if that bet turns out to be bad.

OK, I’m with him so far. Not exactly breaking news here – we’ve seen the
same integration issues inside the enterprise for decades. SaaS adds new
wrinkles – if your ERP vendor goes belly-up, they can’t take your data
with them or worse sell it to your competition – but otherwise it sounds
like the same old story to me.

However, where Nick loses me is when he [recommends this
solution](http://blogs.msdn.com/nickmalik/archive/2006/12/20/internet-wide-services-integration-architecture-needed-now.aspx):

> “To overcome this conflict, it is imperative that we begin, now, to
> embark on a new approach. We need a single canonical mechanism for all
> enterprise app modules to integrate with each other. If done
> correctly, each enterprise will be able to pick and choose modules
> from different vendors and the integration will be smooth and
> relatively painless.”

Yeah, and if a frog had wings, it wouldn’t bump its ass when it
hopped.[1] There are so many things wrong with this approach, I’m not
sure I can get them all into a single web post.

First off, it won’t, in fact, be done correctly – at least, not the
first time. I realize everyone knocks MSFT for never getting an
application right before version 3.0, but I believe it’s actually
systemic to the industry. Whatever you think you know about the problem
to be solved, it’s at best woefully incomplete and at worst wrong on all
counts. So getting it right the first time is simply not possible.
Getting it right the second time is very unlikely. It isn’t until the
third time that you really start to get a handle on the problem you’re
really trying to solve. Getting an effort like this off the ground in
the first place would be a Herculean task. Keeping it together thru a
couple of bad spec revisions would be impossible.

Meanwhile, the vendors aren’t going to be waiting around twiddling their
thumbs waiting for the specs to be done. We’ve seen efforts to unify
multiple completing vendors around a single interoperable specification.
By and large, those efforts (UNIX, CORBA, Java) have been failures. The
technologies themselves haven’t been failures, but the idea that there
was going to be “relatively painless” portability or interoperability
among different vendors never really materialized. If it didn’t work for
UNIX, CORBA or Java, what makes Nick think it will work for the
significantly more complex concept of a shared global integration model?
Not only more complex in terms of spec density, but the mind-boggling
number of vendors in this space.

Nick [is
worried](http://blogs.msdn.com/nickmalik/archive/2006/12/19/the-roadblock-to-software-as-a-service.aspx)
that either “we do this as a community or one vendor will do it and
force it on the rest of us.” But if you look at how specifications
evolve, retroactive realization of defacto standards is the way the best
standards get created. For example, I could argue that TCP was forced on
us by the US Military, but I don’t hear anyone complaining. I realize
there’s a big difference between having a vendor force a spec down our
throat vs. a single big customer, but either way it’s not designed by
committee. Besides, if we do see get an enterprise integration standard
forced on us, I don’t believe it will be the vendors doing the forcing.
If I were a betting man, I’d bet on Wal-Mart. Business leverage trumps
IT leverage and Wal-Mart has more business leverage than anyone in this
space these days.

BTW, would design-by-committee be an extreme example of
[BDUF](http://en.wikipedia.org/wiki/BDUF)? Do we really want to develop
a this critical integration model using the same process that produced
the [XSD](http://www.w3.org/XML/Schema) spec?

Finally, Nick thinks that this model will improve innovation, where I
think it will have the exact opposite effect. Once you lay a standard in
place, the way you innovate is to build proprietary extensions on top of
that standard. However, by definition, these extensions aren’t going to
be interoperable. If someone has a good idea, others will copy it and
eventually it will become a defacto standard.

A recent example of the process of defacto standardization is
[XMLHttpRequest](http://en.wikipedia.org/wiki/Xmlhttprequest). Microsoft
created it in 1999 for IE 5, Mozilla copied it for their browser a
couple of years later, followed by the other major browser vendors.
Google innovated with it, Jesse James Garrett coined the term AJAX,
everyone else started doing it and then finally – nearly a decade later
and still counting – a standards body is getting around to putting their
[stamp of approval](http://www.w3.org/TR/XMLHttpRequest/) on it.

However, if you’re worried about painless integration and not having
something forced on you by some vendor, then you’re not going to embrace
these innovations – which means, you won’t embrace *any* innovation.
Well, there may be some innovation in the systems themselves that
doesn’t affect the interface, but once that interface is cast in stone,
the amount of innovation will go way down. How do vendors differentiate
themselves? There’s only two ways: price and innovation. Take away
innovation with standardization, and you’re left with a race to the rock
bottom price with no incentive to actually improve the products.

I get where Nick is going with this. He looks around our enterprise and
sees duplication of effort and massive resources being spent on [hooking
shit together](http://devhawk.net/2004/02/10/Pat+On+SOA.aspx). It sure
would be nice to spend those resources on something more useful to the
bottom line. But standardizing – or worse
[legislating](http://blogs.msdn.com/nickmalik/archive/2006/12/20/internet-wide-services-integration-architecture-needed-now.aspx)
– the problem out of existence isn’t going to work. What will? IMO,
applying Nick’s ideas of [Free
Code](http://blogs.msdn.com/nickmalik/archive/2007/07/30/free-code-getting-it-out-of-the-applications-business.aspx)
to interop code. If we’re going to get IT out of the app business, can’t
we get out of the integration business at the same time?

------------------------------------------------------------------------

[1] It’s exceedingly rare that you get to quote [Wayne’s
World](http://www.imdb.com/title/tt0105793/quotes) or [Raising
Arizona](http://www.imdb.com/title/tt0093822/quotes) in a discussion
about Enterprise Architecture, much less both at the same time. Savor
it.
