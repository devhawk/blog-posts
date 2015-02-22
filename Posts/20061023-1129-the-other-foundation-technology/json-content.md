I mentioned last week that WF “is one of two foundation technologies
that my project absolutely depends on”. [Sam Gentile
assumes](http://codebetter.com/blogs/sam.gentile/archive/2006/10/17/New-and-Notable-115.aspx)
the other foundation technology is WCF. It’s not.

As a quick reminder, my [day
job](http://devhawk.net/2006/06/15/moving-on/) these days is to
architect and deliver shared service-oriented infrastructure for
Microsoft’s IT division. These services will be automating long running
business operations. And when I say long running, I mean days, weeks or
longer. While there will surely be some atomic or stateless services, I
expect most of the services we build will be long running. Thus, the
infrastructure I’m responsible for has to enable and support long
running services.

The other foundation technology my project depends on is [Service
Broker](http://msdn2.microsoft.com/en-us/library/ms166043.aspx). Service
Broker was expressly designed for building these types of long running
services. It supports several capabilities that I consider absolutely
critical for long running services:

-   Service Initiated Interaction![Use SHIFT+ENTER to open the menu (new
    window).](http://team/_layouts/images/blank.gif). Polling for
    changes is inefficient. Long running operations need support for the
    [Solicit-Response](http://www.w3.org/TR/2001/NOTE-wsdl-20010315#_solicit-response)
    and/or
    [Notification](http://www.w3.org/TR/2001/NOTE-wsdl-20010315#_notification)
    message exchange patterns.
-   Durable Messaging. The first [fallacy of distributed
    computing](http://en.wikipedia.org/wiki/Fallacies_of_Distributed_Computing)
    is that the network is reliable. If you need to be 100% sure the
    message gets delivered, you have to write it to disk on both sides.
-   Service Instance Dehydration. It’s both dangerous and inefficient to
    keep an instance of a long running service in memory when it’s idle.
    In order to maximize integrity (i.e. service instances survive a
    system crash) as well as resource utilization (i.e. we’re not
    wasting memory/CPU/etc on idle service instances), service instances
    must be dehydrated to disk.

In addition to these capabilities, Service Broker supports something
called [Conversation Group
Locking](http://msdn2.microsoft.com/en-us/library/ms171615.aspx), which
turns out to be important when building highly scalable long running
services. Furthermore, my understanding is that Conversation Group
Locking is a feature unique to Service Broker, not only across
Microsoft’s products but across the industry. Basically, it means that
inbound messages for a specific long running service instance are locked
so they can’t be processed on more than one thread at a time.

Here’s an example: let’s say I’m processing a Cancel Order message for a
specific order when the Ready to Ship message arrives for that order
arrives. With Conversation Group Locking, the Ready to Ship message
stays locked in the queue until the Cancel Order message transaction is
complete, regardless of the number of service threads there are. Without
Conversation Group Locking, the Ready to Ship message might get
processed by another service thread at the same time the Cancel Order
message is being processed. The customer might get notified that the
cancellation succeeded while the shipping service gets notified to ship
the product. Oops.

There’s also an almost-natural fit between Service Broker and Windows
Workflow. For example, a Service Broker Conversation Group and a
WorkflowInstance are roughly analogous. They even both use a Guid for
identification, making mapping between Conversation Group and WF
Instance simple and direct. I was able to get prototype Service Broker /
WF integration up and running in about a day. I’ll post more on that
integration later this week.

Last but not least, Service Broker is wicked fast. Unfortunately, I
don’t have any public benchmarks to point to, but the Service Broker
team told me about a private customer benchmark that handled almost
9,000 messages per second! One of the reasons Service Broker is so fast
is because it’s integrated into SQL Server 2005, which is is pretty fast
in it’s own right. Since Service Broker is baked right in, you can do
all your messaging work and your data manipulation within the scope of a
local transaction.

Service Broker has a few rough areas and it lacks a supported managed
api (though there is a [sample managed
api](http://msdn2.microsoft.com/en-us/library/ms160848.aspx) available).
Probably the biggest issue is that Service Broker has almost no interop
story. If you need to interop with a Service Broker service, you can use
SQL Server’s [native Web Service
support](http://msdn2.microsoft.com/en-us/library/ms191274.aspx). or
the [BizTalk adapter for Service
Broker](http://adapterworx.com/cs/products/servicebroker.aspx) from
[AdapterWORX](http://adapterworx.com/). However, I’m not sure how many
of Service Broker’s native capabilities are exposed if you use these
interop mechanisms. You would probably have to write a bunch of
application code to make these capabilities work in an interop scenario.

Still, I feel Service Broker’s unique set of capabilities, its natural
fit with WF and its high performance make it the best choice for
building my project’s long running services. Is it the best choice for
your project? I have no idea. One of the benefits of working for MSIT is
that I get to focus on solving a specific problem and not on solving
general problems. I would say that if you’re doing exclusively atomic or
stateless services, Service Broker is probably overkill. If you’re doing
any long running services at all, I would at least give Service Broker a
serious look.
