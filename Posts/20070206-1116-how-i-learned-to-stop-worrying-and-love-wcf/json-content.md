Regular readers of DevHawk are likely aware of my ~~obsession~~ interest
in [SQL Service
Broker](http://msdn2.microsoft.com/en-us/library/ms166043.aspx) (aka
SSB). I’ve also been doing a lot of
[WCF](http://msdn2.microsoft.com/en-us/library/aa388579.aspx) work
lately. While there are parts of WCF that [I think
rock](http://devhawk.net/2006/10/27/Custom+Authentication+With+WCF+Is+Top+Shelf.aspx),
overall I’ve found WCF lacking due to it’s [lack of support for long
running
services](http://devhawk.net/2006/10/29/Is+WCF+QuotStraightforwardquot+For+Long+Running+Tasks.aspx),
which SSB excels at.

So it was with great interest that I read this recent article on
[Integrating WF and
WCF](http://msdn2.microsoft.com/en-us/library/bb266709.aspx). WF is
expressly designed for long running systems, so I wanted to see how the
article dealt with the WCF’s lack of support for such
scenarios. Unfortunately, the article basically sidesteps the issue.
While it has lots of great info about hosting WF inside a WCF service,
the article [uses duplex
channels](http://msdn2.microsoft.com/en-us/library/bb266709.aspx#intgrwfwcf_topic8) for
communication between the service and its clients. As [I have pointed
out
before](http://devhawk.net/2006/10/29/Is+WCF+QuotStraightforwardquot+For+Long+Running+Tasks.aspx),
this approach is impractical because it requires that both the service
and its consumer remain alive in memory until the WF end.

Remember [this quote from Essential
WF](http://devhawk.net/2006/11/01/Essential+Windows+Workflow+Foundation.aspx)?

> “It is wishful thinking to assume that the operating system process
> (or CLR application domain) in which the program begins execution will
> survive for the required duration.”

So basically this WCF/WF sample is wishful thinking. Fine for a demo,
but given the severe lack of information out there on integrating these
two technologies, I’m worried that many people will read this article as
best practice guidance, which in my opinion would be a mistake.

But instead of firing up my blog (that is, like [last
time](http://devhawk.net/2006/10/17/WF+Clarifications+And+Corrections.aspx))
to write a scathing post about how broken this sample is, I emailed
[Paul](http://blogs.msdn.com/pandrew/) which led to a concall with
[Shy](http://blogs.msdn.com/shycohen) to discuss WCF’s lack of support
for long running services. Imagine my surprise when Shy agreed with me
completely, furthermore saying that support for long running services
had been “out of scope” for v1 of WCF. I thought that the whole point of
[duplex
channels](http://msdn2.microsoft.com/en-us/library/ms731064.aspx) was
for long running services. But apparently I was wrong.

Shy said to think of the duplex channel in terms of sockets, rather than
long running conversations. And just like that, WCF made a ton more
sense to me. I had been directly comparing the SSB and WCF communication
models, but that’s apples and oranges. It would be like comparing SSB to
TCP.

If you think about it, vanilla HTTP works a lot more like UDP, even
though it’s layered on top of TCP. Both UDP and HTTP support
connectionless operations and neither UDP nor HTTP are reliable or
provide message ordering. The comparison isn’t perfect: for example, UDP
isn’t limited to a single response for an incoming request. But by and
large, HTTP is a very UDP style protocol.

If HTTP is basically UDP, then WS-\* is trying to be TCP. Frankly, I
never understood the point of
[WS-ReliableMessaging](http://msdn2.microsoft.com/en-us/library/ms951271.aspx). I
always thought reliability == durability == SSB or MSMQ. But when you
realize that HTTP lacks TCP-like reliability and ordering capabilities,
suddenly this WS spec makes sense. In fact, Shy made [this exact
point](http://blogs.msdn.com/shycohen/archive/2006/02/20/535717.aspx)
almost a year ago. At the time, I didn’t get it because I didn’t
understand the duplex channel as sockets analogy. Now, I see the value
of adding these capabilities to HTTP.

What Shy said was clear and to the point but unfortunately completely
missing in the official WCF documentation. For example, the [docs on
Duplex Services](http://msdn2.microsoft.com/en-us/library/ms731064.aspx)
say this:

> A duplex service contract is a message exchange pattern in which both
> endpoints can send messages to the other independently. A duplex
> service, therefore, can send messages back to the client endpoint,
> providing event-like behavior. Duplex communication occurs when a
> client connects to a service and provides the service with a channel
> on which the service can send messages back to the client.

The docs make no mention that the “event-like behavior” of
duplex services only works within a session. And I’m not the only one
who mistakenly believed that duplex services could be used for long
running services (here’s [an article in
DDJ](http://ddj.com/dept/webservices/193104809?pgno=6) that makes the
same mistake). Shy used the term “episodic” to describe services that
span session boundaries. I’d like to see the docs updated to include
that concept.

Taking the TCP/UDP analogy even further, I think it demonstrates how
pointless the REST vs. SOAP debate is. As UDP is a thin layer on top of
IP, REST is a thin layer on top of HTTP. But nobody argues much about
UDP vs. TCP these days. I was in grade school when UDP and TCP were
standardized, so maybe there were big TCP vs UDP flame wars at the time.
But twenty five years later, it’s pretty clear that TCP vs UDP is not an
either-or proposition. Some protocols are better built on UDP while
others are better built on TCP. I’m guessing we’ll see a similar
evolution with SOAP and REST.

Personally, I would expect that message exchanges between services will
become more complex over time. Complex message exchanges would seem to
favor stateful SOAP over stateless REST for the same reason complex
network protocols favor connection-oriented TCP over connectionless UDP.
But SOAP could never displace REST any more than TCP could ever displace
UDP. Furthermore, as Larry O’Brien [recently
wrote](http://www.knowing.net/PermaLink,guid,3fc3b88d-ff3a-4149-bb6c-e5091d93a6ce.aspx) “the
onus is on the WS-\* advocates to prove the need”. TCP standardization
only lagged a year behind UDP standardization where WS-\* has lagged at
least six years behind REST. I wonder if UDP would be more prevalent
today if it had gotten a six year head start on TCP.

Finally, this “SOAP as Sockets” flash of understanding has also helped
me understand how SSB / WCF can evolve together in the future. Some
folks have suggested an [SSB transport for
WCF](http://blog.yassers.com/2006/09/25/ssb-transport-anyone.aspx) and
I’ve personally looked into such an approach. But given since SSB is at
a higher level of abstraction than WCF, it makes much more sense to
layer SSB on top of WCF instead of the other way around. Today, SSB uses
[two protocol
layers](http://msdn2.microsoft.com/en-us/library/ms166061.aspx): the top
level Dialog Protocol, which is built on top of the lower-level Adjacent
Broker Protocol (ABP), which in turn is built on TCP. I’d like to see a
version of ABP that was built on top of WCF instead of directly on top
of TCP. SSB’s Dialog Protocol would tie together the WCF duplex sessions
into a long-running conversation the same way that it ties together TCP
sessions today.

Eventually, I would love to see something that has the programming
semantics of SSB and the interoperability of WCF. That would be like the
the Reese’s Peanut Butter Cup of service messaging.
