Via [Udi](http://udidahan.weblogs.us/archives/018938.html) and
[Tiago](http://weblogs.asp.net/tspascoal/archive/2004/04/05/107949.aspx),
I found an article on DevX called “[Kiss the Middle-tier Goodbye with
SQL Server
Yukon](http://www.devx.com/dbzone/Article/20471/1954?pf=true)“. While
that article should have been titled “XML Technologies in SQL Server
Yukon”, both Udi and Tiago have interesting posts about SQL Server as a
platform and the role of the database going forward. Personally, I see
two primary forces at work that I believe will drive the middle tier
into extinction: Moore’s Law and Service-Orientation.

Why do we distribute applications across multiple systems today? Is it
because we like managing multiple systems? No! It’s for scalability. We
exploit the fact that tiers of a multi-tier app have different
processing loads and scalability methods. Typically, we scale the
web/app tier by throwing more servers at the farm while we scale the
data tier with bigger servers. However, as Moore’s law increases the
performance of these machines, the need to scale becomes reduced, From
my experience, many smaller apps could easily run a single machine today
(esp. when you consider the increased efficiency of eliminating the
network and process hops). Moore’s law will continue increase the
headroom these machines provide and expand the definition of “smaller
apps”. If you can run the app on a single hardware node, there’d be
little reason not to run as much of it as you can inside the database,
other than “we might want to scale this out someday”.

Of course, it will be a long long time before Moore’s law can provide a
single machine to run a BIG enterprise app (think something like SAP).
This is where service-orientation comes in. While some people see
services as a way to interoperate BIG apps, I think the future of
services is to free us from building BIG apps, or at least from build
BIG apps as monoliths. If you figure a BIG app like SAP has hundreds or
thousands of business process or resource management operations, you
could build that system where each operation is implemented as an
independent service. The benefit of this approach is that it is orders
of magnitude more flexible in the face of process change than the BIG
app approach. If you haven’t seen it, check out the Technology Roadmap
session from the [Architecture Strategy
Series](http://msdn.microsoft.com/architecture/overview/series/). One of
the points that the presenter Norm Judah makes is that “it is the
business processes in an organization that are unstable, but the
individual things that people do…are the things that are stable.” (He
says that during Slide 9 – “Why Do Architecture Projects Re-Occur?”) If
you accept that, then having your business processes hard coded in a BIG
inflexible app starts to look like a bad idea. These “individual things
that people do” (such as sending out invoices) get mapped to services
and are aggregated into business processes by some tool we haven’t seen
yet (though I think [BTS 2004](http://www.microsoft.com/biztalk/) is a
good start).

If service-orientation shreds your BIG app into many pieces, it is
highly likely that those pieces will be small enough to run on a single
hardware node. In addition, as services communicate with asynchronous
messages, they tend to have lower scalability needs than synchronous
systems. And since these services all need a database
([Pat](http://blogs.msdn.com/pathelland) refers to the database as the
soul of the service) it makes sense to run the service inside the
database itself. It even makes sense to build a both an application and
a messaging infrastructure directly into the database engine. SQL Yukon
provides the application infrastructure by hosting the .NET framework
and provides the messaging infrastructure with the [SQL Service
Broker](http://www.winnetmag.com/SQLServer/Article/ArticleID/41887/41887.html).

However, we need more than faster computers and service-oriented systems
to eliminate the middle tier. We also need better management. And not
incrementally better, orders of magnitudes better. If you’re going to
replace a single BIG app with hundreds of independent services,
incremental manageability improvements are not going to cut it. Because
we realize this too, Microsoft is investing heavily in the [Dynamic
System Initiative](http://www.microsoft.com/dsi). If you’re a developer,
you’ve probably seen the
[Whitehorse](http://msdn.microsoft.com/vstudio/productinfo/roadmap.aspx#enterprise)
designers coming with Whidbey. That’s just part of DSI. We’ve got a
great architectural overview of DSI as part of our [Architecture
Strategy
Series](http://msdn.microsoft.com/architecture/overview/series/) or you
can read more on the [DSI homepage](http://www.microsoft.com/dsi).

Do you think the middle-tier will become extinct? If it does, is that a
good thing? Obviously, it’s an unknown and a big change, which makes it
hard to gauge. But what does your gut tell you?
