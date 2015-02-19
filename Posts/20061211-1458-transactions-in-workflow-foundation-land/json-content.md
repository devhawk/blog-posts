I’ve been spending some quality time with SSB and WF of late. On the
balance, my opinion of both these technologies is very positive, though
each has some warts of note. For Service Broker, they got
the transactional messaging semantics right, but much of the lower level
connection management – what SSB calls “routes” are clumsy to deal with.
For Workflow Foundation, the execution model is amazingly flexible.
Unfortunately, WF’s support for transactions is significantly more
rigid.

If you’re build a SSB app, you’re typical execution thread looks like
this:

1.  Start a transaction.
2.  Receive message(s) from top of the queue.
3.  Execute service business logic. Obviously, this varies from service
    to service but it typically involves reading and writing data in the
    database as well as sending messages to other services.
4.  Commit the transaction

When I sat down to marry SSB and WF, I naively assumed I could simply
use WF for step three above. Alas, that turns out to be impossible.
[This
thread](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=843580&SiteID=1)
on MSDN Forums has most of the gory details, but the short version is
that WF does not support flowing host managed transactions into the
workflow instance. As per [Joel
West](http://forums.microsoft.com/MSDN/User/Profile.aspx?UserID=154457&SiteID=1) in
the aforementioned thread:

> “[T]he WF runtime in V1 only supports flowing in a transaction on
> WorkflowInstance.Unload. There are various ways that you could try and
> hack this (with a custom persistence service or
> WorkflowCommitWorkBatchService) but if you do this it won’t work
> correctly 100% of the time and the times when it fails (error
> conditions or failures causing the tx to rollback) will be exactly
> when you are expecting transactional consistency.
>
> Bottom line – the only way to make this work is to call
> WorkflowInstance.Unload inside your transaction scope.  This was the
> best that we could do in V1 to try and enable this pattern in some
> form.  Not always ideal but it can be made to work for most scenarios
> that require usage of an external transaction.”

So the WF compatible execution thread looks like this:

Start a transaction

Receive message(s) from the top of the queue

Load/Create the associated workflow instance for the received messages

-   All messages received are guaranteed to be from the same SSB
    conversation group, which is roughly analogous to a WF instance, so
    this turns out to be fairly easy

Enqueue the received message in the workflow instance

Unload the workflow instance

Commit the host transaction

Reload the workflow instance

Run the workflow instance (note, I’m using the manual scheduling
service)

-   Workflow instance creates a transaction if needed

Unload the workflow instance (typically done via UnloadOnIdle in the
persistence service)

-   Assuming the workflow instance needed a transaction, it gets
    committed after unload

Basically, you use two transactions. One host managed transaction to
move the message from SSB to WF instance and one WF managed transaction
to process the message.The need for two transaction instead of one is
unfortunate, but required given the current design of WF. And frankly,
given the importance and difficulty of transaction management, I’m not
that surprised that WF has hard coded transaction semantics. Trying to
build a generic transaction flow model that would work in the myriad of
scenarios WF is targeting would have been extremely difficult. At least
there is a work around, even if it means using two transactions and
loading and unloading the workflow instance twice.

However, there is a silver lining to the two transaction approach: two
unexpected benefits when dealing with poison messages. First, SSB
doesn’t have dead letter queue like MSMQ does. Moving a poison message
to a dead letter queue would break SSB’s exactly once and in order
semantics.(MSMQ doesn’t guarantee in order delivery) But moving all
messages into the WF instance gets them out of the main SSB queue so
poison messages don’t continue to get processed over and over.

Second, because the workflow instance is peristed after the messages are
enqueued, there’s a representation of the workflow after the message is
received but before the message is processed. If there’s a poison
message, attempting to processing the message will fail and rollback to
this state. This persisted workflow instance could be sent to a
developer who could step through it to determine the cause of the error.
We could even have developer versions of runtime workflow services so we
could read remote data and simulate data updates. I wouldn’t want the
developer updating production data in this way, but it would be great
for troubleshooting issues.
