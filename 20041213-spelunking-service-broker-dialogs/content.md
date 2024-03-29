The simplest way to describe SQL Service Broker is “message queues in
the database.” If the queues are tables in the database then you can do
your entire message processing using a local transaction. If you use a
separate queuing technology like MSMQ, you can still pull items off the
queue, update data in the database and send out messages in the scope of
a transaction – it just has to be a distributed transaction. Being able
to use a local tx gives us a big performance gain. But, while important,
this perf gain isn’t the most compelling reason to use SSB. It turns out
that SSB provides important semantic messaging benefits in addition to
perf benefits.

If you study at the semantic messaging model defined by message queuing
systems such as MSMQ, MQ Series and
[WS-RM](http://msdn.microsoft.com/library/en-us/dnglobspec/html/ws-reliablemessaging.asp)
you’ll notice that it is inherently one way. Section 2 of the WS-RM spec
defines the reliable messaging model to be between a source sending the
messages and a destination receiving them. The problem with this model
is that as message patterns between services gets richer, we’re going to
want bi-directional reliable messaging. SSB calls this a dialog.

Before you can send messages between services in SSB (assuming
everything’s been configured), you first have to BEGIN DIALOG and
provide the initiating and target service, plus the message contract
(more on that in a later post). Note that it’s called initiator and
target, not sender and receiver. Either side of the dialog can send
messages to the other as part of the contract by using SEND ON
CONVERSATION – the only requirement is that the initiator sends the
first message (hence the name “initiator”). All messages are guaranteed
to be delivered exactly once and in order, or both sides of the
conversation are notified of the failure and the dialog is torn down.
I’m not sure if it guarantees in-order delivery of messages in opposite
directions. There are cases where this might be important – I send an
order cancellation as I send you a shipping notification – but typically
there’s a business reason for who “wins” such a conflict. In this
shipping/cancellation example, even if you sent me the cancellation
before I sent shipment notification, it’s not like I can recall the
shipment.

My only issue with this bi-directional reliable messaging is that I’m so
used to thinking in terms of one-way RM that it’s taking me a while to
wrap my head around it. Many of the sample interactions I come up with
are simple patterns where the target simply acknowledges the incoming
message. Order processing is a good example where I may get meaningful
messages (i.e. not simple acks) coming from both ends. What are some
others?
