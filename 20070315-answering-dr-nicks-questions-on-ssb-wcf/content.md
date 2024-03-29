Nick Allen [asked on his
blog](http://blogs.msdn.com/drnick/archive/2007/03/15/looking-for-sql-service-broker-users.aspx)
about how people would like to see SSB and WCF work together. He’s
already heard these from me, but I figured I’d put them out there for
everyone to see and debate. Plus, I had several beers last night at the
MVP dinner, so this is likely to be more coherent than I was yesterday!
:smile:

1\. Are you interested in SSB because you’d like to have your service
closer to the database? How close is close enough to the database?

> I’ve first blogged about the [endangered middle
> tier](http://devhawk.net/2004/04/21/the-endangered-middle-tier-part-2/)
> almost three years ago. My point at the time was that as you break
> your monolithic system up into services, the vast majority of those
> services won’t need to scale out. You performance gets better the
> closer you are to the data. If you don’t need to scale out, why not
> get the maximum boost by running in the database process itself?
>
> Furthermore, in large IT shops, the database files are stored out on
> the SAN rather than on hard drives attached to the database server
> itself. That means the database server is effectively stateless. Why
> add a second stateless tier if you don’t need scale out? If you need
> more performance in a given service, you can detach the database file
> from it’s current SQL server box and attach it on another more beefy
> SQL server box without physically moving the database files at all.
> This enables what I call the “Star Trek Effect”, where you can shift
> computing power where it is needed most (more power to the payroll
> system!).
>
> Of course, if you’re going to move the service, you do need to bring
> it down for a short time. That implies a need for durable messaging so
> that service consumers aren’t affected by the brief service
> interruption. Which brings us to…

2\. Are you interested in SSB because you need durable, duplex messaging
between two services? Do you need exactly-once-in-order message
delivery?

> Yes. SSB has a bunch of other nice features, but durable duplex
> messaging is what I need the most. Exactly-once-in-order is also
> fairly critical, though there may be scenarios where it’s not really
> necessary. Those are the exception, not the rule however.
>
> Doesn’t WS-RM already do EOIO already?

3\. Are you interested in using SSB from WCF because you want a better
asynchronous messaging experience than MSMQ? What makes you prefer SSB
to other queuing products?

> My primary problem with MSMQ for the problems I’m tasked with solving
> is that MSMQ is one way while SSB supports duplex messaging. You could
> do duplex messaging with MSMQ if you didn’t mind managing multiple
> queues (one for each side of the conversation) but SSB does this for
> you for free. I’m sure there are scenarios where pure one-way
> messaging are useful, but they are few and far between in my day job.
>
> Furthermore, SSB has the explicit idea of a service instance (they
> call it a conversation group) which MSMQ lacks. SSB’s implementation
> is conceptually similar to the new WCF/WF integration work in the
> latest Orcas CTP.
>
> Finally, SSB uses logical naming. You have conversations between
> services, but services get mapped to physical addresses at the routing
> layer. This allows services to move around more easily (see the “Star
> Trek Effect” in \#1 above). Both MSMQ and WCF use physical addresses,
> which makes them much more difficult to move.

4\. Are you interested in having your data contracts defined in WCF, SQL,
or both?

> I like WCF’s data contract infrastructure. We did a early prototype
> long-running service with both WCF and SSB. the messaging stack code
> was obviously different, but we used the exact same data contract
> code. I even wrote some code to automatically deserialize the SSB
> message by mapping the SSB message type to a data contract.
>
> I want my services to run inside the database, but that doesn’t mean I
> want to write them in T-SQL. Personally, I’m much more productive in
> C\# and/or WF. So WCF data contracts are fine by me.

