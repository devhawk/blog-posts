Conceptually, I like both Service Oriented Architecture (aka SOA) and
Software as a Service (aka SaaS). However, I think we’ve done the
industry a disservice by overloading the term “service”.

John deVadoss
[likes](http://blogs.msdn.com/jdevados/archive/2007/03/04/what-is-software-as-a-service.aspx)
the following definition of SaaS from
[Wikipedia](http://en.wikipedia.org/wiki/Software_as_a_Service). So do
I.

> **Software as a service** (**SaaS**) is a model of software delivery
> where the software company provides maintenance, daily technical
> operation, and support for the software provided to their client. SaaS
> is a model of software delivery rather than a market segment; it
> assumes the software is delivered over the Internet. Software can be
> delivered using this method to any market segment including home
> consumers, small business, medium and large business.

To paraphrase, SaaS is software that traditionally you might have
bought, installed and run yourself but instead now can access over the
network where someone else is responsible for installing and running it.
For example, instead of buying, setting up and managing my own mail
server to handle a [single @devhawk.net email
address](mailto:devhawk@outlook.com), I use the [WL Custom
Domains](http://domains.live.com/) service.

SOA on the other hand isn’t a model of software delivery, it’s a model
of software segmentation. Again, here’s the [Wikipedia
definition](http://en.wikipedia.org/wiki/Service-oriented_architecture),
this time for SOA:

> There is no widely-agreed upon definition of **Service-oriented
> architecture** other than its literal translation that it is an
> architecture that relies on service-orientation as its fundamental
> design principle.

Err, that’s not very helpful. Let’s check out the
[OASIS](http://www.oasis-open.org/) definition (cribbed from Wikipedia).

> [SOA is] A paradigm for organizing and utilizing distributed
> capabilities that may be under the control of different ownership
> domains. It provides a uniform means to offer, discover, interact with
> and use capabilities to produce desired effects consistent with
> measurable preconditions and expectations.

Well, at least it’s not a self-referential recursive definition. But it
is littered with committee-speak. (Who talks like that in real life?)
Frak it, here’s my definition:

> SOA is a way of implementing IT systems as a web of interconnected yet
> independent loosely coupled subsystems (typically called services)
> instead of as big honking systems we have traditionally built that
> tend to be unwieldy, in-agile, difficult to change and probably
> obsolete by the time they were deployed.

We could argue about the language, but you get the point. There would be
a ton of argument about the *size* of the subsystems (i.e. the service
granularity), but I think most people can agree that SOA encourages
building multiple smaller interconnected subsystems instead of one big
(honking) system.

Which brings me back to my original point: Service, in the SOA sense,
describes the approach to factoring parts of an software solution.
Service, in the SaaS sense, describes a software delivery mechanism.
Certainly, you can use both together and take an SOA approach to
building a SaaS product. But you don’t have to. So having the same term
“service” used in both is very confusing.

How many SaaS products use SOA today? I would guess “not many” since
there hasn’t been much demand for it. When you’re selling to the long
tail of the LOB market, support for service-oriented integration isn’t a
critical selling feature. As SaaS becomes more attractive to larger
companies (i.e. ones with dedicated IT staffs), using a SOA approach
will be more important to SaaS product vendors. So they will converge in
a way, but not in the way their naming suggests.

Of the two uses, SaaS seems closer to the [dictionary
definition](http://dictionary.reference.com/browse/service) of service.
Maybe the S in SOA should stand for “Subsystem”? Nah, I like the term
“[connected
systems](http://msdn2.microsoft.com/en-us/architecture/aa699418.aspx)”
better than “service oriented” anyway.
