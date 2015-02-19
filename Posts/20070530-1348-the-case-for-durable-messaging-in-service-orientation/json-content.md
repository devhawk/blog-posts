Nick [jumps
on](http://blogs.msdn.com/nickmalik/archive/2007/05/27/reliability-in-soa-is-huge.aspx)
the durable messaging bandwagon, pointing out that it’s HUGE. Not just
huge, or Huge but HUGE. But for my taste, he could emphasis it even more
– ***HUGE*** – and still not capture just how important I think durable
messaging is. But while he could use more bolding and italics, he
certainly explains the problem well:

> The reason that [reliability] becomes a problem in SOA is because the
> basic strength of SOA is the message, and the weakest link is the
> mechanism used to move the message. If we create a message but we
> cannot be certain that it gets delivered, then we have created a point
> of failure that is difficult to surpass.

Durable messaging solves two fundamental reliability issues:

1.  Transactional Message Send. I want to send a message to some
    external service as part of a transaction. That is, I only want to
    send the message if the transaction commits. If the transaction
    aborts, I don’t want to send the message. The *only* way to do this
    is to durably record the *intent* to send the message within the
    transaction and then deliver the message after the transaction
    successfully commits.
2.  External System Unavailable. I’m sending a message to an external
    service that is unavailable at the moment. Maybe it’s a temporary
    network condition, maybe it’s scheduled downtime, maybe the data
    center burned down, I don’t know. But because the message is durably
    stored, I can retry long after the sending transaction has
    committed. Furthermore, I can continue to retry (until success of
    course) even if my sending system reboots, fails over to a hot
    standby or has to be restored from backup (assuming you backed up
    after message was sent).

However, Nick points out that reliability has to be considered as part
of our design, so do Agility, Flexibility, Scalability, Maintainability,
etc. etc. etc. Agility and flexibility require standard transport
protocols while scalability and maintainability require intermediation.
Unfortunately, at this time there is no standard transport that provides
intermediation and durability. Nick says that Microsoft’s “platform is
lacking here”, but I’d say it’s an industry wide problem.

Nick mentions least three Microsoft technologies that provide some sort
of durable messaging – MSMQ, SSB and BizTalk – but they’re all
proprietary. The market leader in this space is MQ Series, which is also
proprietary. WS-RM was *supposed* to be support durable messaging, but
[doesn’t](http://devhawk.net/2007/02/20/Reliably+Beating+A+Dead+Horse.aspx).
There is the [Advanced Message Queuing Protocol
group](http://www.amqp.org/), which is defining an open protocol for MQ
style systems, but without involvement from any major platform vendors
I’m hard pressed to see this go anywhere. Personally, I’d love to see
the SSB protocol published, and apparently the SSB wire protocol [was
designed](http://blogs.msdn.com/nickmalik/archive/2007/05/14/is-it-service-oriented-if-the-message-cannot-be-intermediated.aspx#comments)
“to be completely SQL Server agnostic.” Here’s hoping that happens.

Nick [goes
on](http://blogs.msdn.com/nickmalik/archive/2007/05/30/system-reliability-requires-message-durability-immature-wcf.aspx)
to call WCF “immature” because of the lack support for message
durability. I think that’s somewhat unfair: I think it’s WS-\* that’s
immature here, not WCF. It’s easy to confuse the two since they’re so
joined at the hip in WCF v1. But WCF’s support for MSMQ shows that it
*can* handle durable messaging, even though there is no usable standard
for durable messaging in the WS-\* stable. Over time, I think WCF will
evolve to support a larger variety of messaging scenarios – WS-\*, REST,
durable messaging, etc. – out of the box. But for those of us who care
deeply about durable messaging, WCF’s current lack of support is pretty
frustrating.
