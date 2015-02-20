John Heintz
[responded](http://johnheintz.blogspot.com/2007/08/rest-serendipity-and-hard-work.html)
to my [serendipitous reuse
post](http://devhawk.net/2007/07/31/Is+Serendipity+The+Heart+Of+The+WSREST+Debate.aspx).
Nice to see I misunderstood his opinions about how easy RESTful systems
are to integrate:

> I didn’t mean to imply that building RESTful system would lead to
> magical integration without any hard work. I can see how that came
> across in my post, and I guess I got the reaction I asked for
> :wink:

I get the feeling that John would be a good guy to have a beer with.

John spends most of his post writing about the [SOA in the Real
World](http://blogs.msdn.com/jevdemon/archive/2007/07/20/soa-in-the-real-world-now-available.aspx)
book. I’ve flipped thru it and I’m familiar with the model (it is my old
team after all) but I haven’t read it so I don’t really want to comment
about the book specifically. But there were two things John mentioned
that I did want to comment on.

First, at the end of his post John writes:

> Can some of the constraints of REST be applied to SOA? Absolutely. I
> think an asynchronous, message-passing architecture with a uniform
> interface would be astoundingly interesting! I’m not the only one: see
> [MEST](http://savas.parastatidis.name/2005/01/29/544a6902-40e1-47e8-a51c-18776f3dd036.aspx),
> [AMPQ](http://www.ampq.com/), and [Erlang](http://www.erlang.org/).

This goes back to [a REST
question](http://devhawk.net/2007/06/05/A+REST+Question.aspx) I asked
two months ago: is it still REST if you don’t use HTTP? I’m guessing
John would say yes.

I might be going out on a limb here, I’ll bet the core of John’s problem
with SOA is how toolkits like WCF all but force you to build RPC style
services that can easily be modeled as [method
calls](http://msdn2.microsoft.com/en-us/library/system.servicemodel.operationcontractattribute.aspx).
That’s certainly one of *my* problems with SOA. Tim Ewald [said it
best](http://pluralsight.com/blogs/tewald/archive/2007/04/26/46984.aspx):

> It’s depressing to think that SOAP started just about 10 years ago and
> that now that everything is said and done, we built RPC again. I know
> SOAP is really an XML messaging protocol, you can do oneway async
> stuff, etc, etc, but let’s face it. The tools make the technology and
> the tools (and the examples and the advice you get) point at RPC. And
> we know what the problems with RPC are. If you want to build something
> that is genuinely loosely-coupled, RPC is a pretty hard path to take.

If SOA == RPC and REST == loosely coupled messages, then I’ll start
growing dreadlocks right now. Frankly, as Tim says, I think it’s a
problem with the tools (I’m looking at you WCF) and not the underlying
architecture, but how many people can distinguish the architecture from
the tools? Not many, I’m afraid.

Second, John asks an interesting question:

> Where are the SOA mashups?

That’s easy! They’re inside the firewall where you can’t see them!
:wink:

Seriously, I’m not sure about “SOA” mashups, but I’m working with what
you might call a huge “enterprise” mashup system inside Microsoft. Our
Enterprise Data Integration Services push around massive amounts of data
to downstream systems. There are over fifty datasets in production, each
with scores of tables, millions of rows and hundreds of subscribing
systems. One example, our Products dataset, has over 100 tables and
nearly 300 subscribing systems.

Is it “service oriented”? No, but then again it was originally developed
ten years ago on SQL 6.5. But is it a mashup? Is it an “[application
that combines content from more than one source into an integrated
experience](http://en.wikipedia.org/wiki/Mashup_%28web_application_hybrid%29)“?
Yep. Is it easy to work with? No, but guess why I’m involved? We’re
looking at ways to “modernize” the system. Am I going to build RPC style
services as part of this modernization? Hell, no.

So John, am I right or wrong about that beer?

