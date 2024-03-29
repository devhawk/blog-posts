Every organization has some operations or processes that have to happen
Exactly Once. Your employer needs to make sure they issue your paycheck
exactly once. Your bank needs to make sure that paycheck is deposited in
your account exactly once. Exactly Once isn’t something that just
“traditional” enterprises like banks care about. Google needs to make
sure your AdSense check is issued exactly once. Amazon needs to make
sure your credit card is charged exactly once. Especially when there’s
money involved, the company wants to make sure it gets handled correctly
– Exactly Once.

In application (aka siloed) development, transactions are often used to
ensure stuff happens Exactly Once, to good effect. But how do we
guarantee Exactly Once now that we’re connecting systems together? Given
how well transactions work inside applications, it’s not surprising that
early attempts to guarantee Exactly Once between systems relied on
distributed transactions, this time to not-so-good effect. Pat Helland
summarized the problems with distributed transactions this way:

> “The two-phase commit protocol will ensure perfect consistency given
> infinite time.  I say that because it will wait and wait and wait
> until the transaction is resolved and then provide perfect
> consistency.   Of course, while partitioned and waiting, arbitrary
> swaths of the application’s database may be locked up rendering the
> application unusable.  For this reason, I’ve frequently referred to
> the two phase commit protocol as the “Anti-Availability Protocol”. “\
> Pat Helland, [SOA and Newton’s
> Universe](http://blogs.msdn.com/pathelland/archive/2007/05/20/soa-and-newton-s-universe.aspx)

So now we’re faced with a dilemma. Transactions are, for all practical
purposes, unusable to ensure Exactly Once processing between connected
systems. And yet, the business requirement to ensure Exactly Once hasn’t
gone away. We need another way.

The first [fallacy of distributed
computing](http://en.wikipedia.org/wiki/Fallacies_of_Distributed_Computing)
is that the network is reliable. It’s usually works, but usually isn’t a
guarantee. If I send a message to a remote system but don’t get an
acknowledgement, which got lost: the original message or the ack?
There’s no way to know, so I have to send the message again. But if I
send it again and it’s the ack that got lost, then the target system
will receive the message multiple times.

Since the network is not reliable, there’s no way to guarantee that a
message will be delivered exactly once. The best we can go is ensure a
message will be delivered at least once. However, that implies the
target system will receive some messages multiple times. If we need to
ensure Exactly Once, we need to make sure the target system won’t
duplicate the work if it receives duplicate messages. In other words, we
need the target system to be
[idempotent](http://en.wikipedia.org/wiki/Idempotence). 

> “In [computer science](http://en.wikipedia.org/wiki/Computer_science),
> the term idempotent is used to describe
> [method](http://en.wikipedia.org/wiki/Method_%28computer_science%29)
> or [subroutine](http://en.wikipedia.org/wiki/Subroutine) calls which
> can safely be called multiple times, as invoking the procedure a
> single time or multiple times results in the system maintaining the
> same state i.e. after the method call all variables have the same
> value as they did before.

> Example: Looking up some customer’s name and address are typically
> idempotent, since the system will not change state based on this.
> However, placing an order for a car for the customer is not, since
> running the method/call several times will lead to several orders
> being placed, and therefore the state of the system being changed to
> reflect this.”\
> Wikipedia, [Idempotence (Computer
> Science)](http://en.wikipedia.org/wiki/Idempotence#Computer_Science)

Or more succinctly:

> “Idempotent Means It’s OK to Arrive Multiple Times”\
> Pat Helland (again)

I can’t overstate the importance of designing your cross-system
communication to be idempotent. If you care about ensuring Exactly Once,
each step of your process has to be either transactional or idempotent,
or you’ll be screwed. It’s interesting to note that you have to be
transactional *\*OR\** idempotent, but not both. You can chain together
multiple steps in long business process, across multiple disparate
systems, but as long as each step is either transactional or idempotent,
you can guarantee Exactly Once across the entire process. In other
words:

> Transactional/Exactly Once == Idempotent/At Least Once

This implies that you can substitute an idempotent operation for a
transactional operation, and still ensure Exactly Once.

Let’s look at an example. Typically you ensure Exactly Once processing
with MSMQ by receiving messages within the scope of a transaction along
with whatever other work you’re doing. But what if you can’t use a
transactional receive, say because it’s a remote queue? What would an
idempotent equivalent for transactional receive look like?

How about:

1.  [Peek](http://msdn2.microsoft.com/library/system.messaging.messagequeue.peek)
    a message from the remote queue
2.  Insert the message into the target system database, using the
    [unique MSMQ Message
    ID](http://msdn2.microsoft.com/en-us/library/system.messaging.message.id.aspx)
    as the primary key
3.  [Remove the
    message](http://msdn2.microsoft.com/library/system.messaging.messagequeue.receivebyid.aspx)
    from the queue by ID

Each of those steps is idempotent. Peek is a read, which is naturally
idempotent. Inserting the message into the database is idempotent, since
we use the message ID as the primary key. As long as that ID is unique,
we can never insert it into the database more than once. Finally,
removing a message based on it’s unique ID is also naturally idempotent.
Once the message is in the target system database, we can use
traditional transactions to ensure it gets processed Exactly Once.

So we took a single transactional operation and turned it into a series
of idempotent steps. Both ensure each message is processed Exactly Once.
Given the choice, I’d rather write the transactional operation – it’s
much less code since we’re we can use existing infrastructure – aka the
distributed transaction coordinator. But if the transactional
infrastructure isn’t available, I’d rather write multiple idempotent
steps and ensure Exactly Once rather than risk losing or duplicating
messages.

I’ve got more on this topic, but in the meantime think about this: How
do you think durable messaging infrastructure like MSMQ ensures exactly
once delivery? You can use that pattern, even if you’re not using
durable messaging infrastructure.
