Among the responses to my [endangered middle-tier
post](http://devhawk.net/2004/04/12/is-the-middle-tier-endangered/)
was [this
one](http://weblogs.asp.net/draper/archive/2004/04/14/112851.aspx) by Ed
Draper, architect evangelist for MSFT. While Ed makes some interesting
points, on the whole his argument doesn’t hold much water.

First off, his point about Moore’s law is accurate, yet irrelevant.
While Moore’s law does relate to CPU speed, I was using it as an example
of the rate that overall computing power improves. Storage capacity and
network speed improve along a similar trajectory. 64-bit machines are at
the early stages of becoming commonplace. And while it’s true that
scalability doesn’t equal performance, having better performing hardware
can significantly improve scalability.

(Side note – if we’re going to be truly picky, [Moore’s
law](http://www.intel.com/research/silicon/mooreslaw.htm) actually
refers to rate of improvement of the number of transistors per IC, which
only roughly equates to performance. Intel’s
[Centrino](http://www.intel.com/products/mobiletechnology/index.htm?iid=ipp_note_proc+highlight_mobiletech&)
technology is all about using those increasing numbers of transistors
for other things like wireless networking and battery management.)

Ed spends quite a bit of time covering very low level computing concepts
such as threads, locks, instruction cache, registers and the stack. I’m
not sure why he does this. It almost feels like he only read the first
part of my post, stopping right before he got to the part where I wrote:
“Of course, it will be a long long time before Moore’s law can provide a
single machine to run a BIG enterprise app”. In other words, I don’t
expect to run my ERP, SCM, CRM or other BFD enterprise-scale app on one
machine!

Ed has missed a basic point of my post that I didn’t spell out as I
thought it was obvious: **the independent services that make up a BIG
enterprise class app can all run on different machines**. I’m guessing
he missed that point by the way he ended his post: 

> “Yes, distributed computing is a good thing.”

As Ted [points
out](http://www.neward.net/ted/weblog/index.jsp?date=20040414), it’s not
just a good thing, “distributed computing is a *necessary* thing.” And a
system of 100′s or 1000′s of independent services – which is what I’m
describing – is significantly more distributable than the multi-tier
monolithic applications we build today.

Of course, it is guaranteed that a small percentage of services will
continue to need to use scale out techniques to reach their scalability
requirements. For example, it will be a very very long time (if ever)
before a single piece of hardware could handle the order processing load
Amazon.com generates a week before Christmas or the tax return filing
load at the IRS on April 15th. This problem isn’t unique to application
design. To draw a parallel to the database design world, there are a
small percentage of tables that benefit from using
[filegroups](http://msdn.microsoft.com/library/en-us/optimsql/odp_tun_1_2upf.asp)
to isolate them on separate drives from the rest of the database. It
happens – but it doesn’t *always* happen. It doesn’t even *usually*
happen. I like Josh’s
[comment](http://www.netcrucible.com/blog/PermaLink.aspx?guid=ddfa5a46-5c50-43b2-8e52-326c01269739)
that “the vast majority of people who think they have workloads which
require partition for scale are actually indulging in delusions of
grandeur.”

The point I was making is that computers are going to continue getting
faster **and** service-oriented systems are likely to consist of
boatloads of independent services with only modest scalability
requirements. The combination of these two forces drastically reduces
the number of scenarios where you need to use multi-tier scale out
techniques to achieve the scalability requirements. If you don’t need a
multi-tier deployment, then there is a *huge* performance and
scalability benefit to running the service logic in the database
process. If you don’t need to scale-out to achieve your requirement, why
would you take the performance and scalability hit to run your code
outside the database?

It’s pointless to argue that computer aren’t getting faster or that
running the code in process with the database doesn’t perform better. Ed
(and Ted and Josh and everyone else reading this), I’d love to hear you
opinions on the following:

-   Will a service-oriented approach likely result in of boatloads of
    independent services where today we have one BIG app?
-   If yes, will the vast majority of these boatloads of independent
    services have modest enough scalability requirements to run on a
    single piece of hardware in the near future?

