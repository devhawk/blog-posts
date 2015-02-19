A while back I
[wondered](http://devhawk.net/2007/06/05/A+REST+Question.aspx) if it’s
still REST if you don’t use HTTP. The reason I wondered that is because
like many I’ve become disillusioned with the WS-\* stack over time and
see REST as a viable alternative to all that spec-driven complexity.
However, just because I’m looking to REST means I’m willing to give up
on [durable
messaging](http://devhawk.net/2007/05/30/The+Case+For+Durable+Messaging+In+Service+Orientation.aspx).
So I shouldn’t be asking “can I do REST without HTTP?” I should be
asking “what protocol can I use to do durable messaging with REST?”

It turns out HTTP is just fine for RESTful durable messaging, if you
take the time to make your POSTs idempotent. There’s even a IETF RFC
that builds on HTTP and specifies a mechanism to do it.

As I wrote last month, [idempotence is critically
important](http://devhawk.net/2007/11/09/The+Importance+Of+Idempotence.aspx)
to ensuring “things” happen exactly once when connecting disparate
systems together. At the end of that post, I asked you, dear reader, to
contemplate just how durable messaging systems ensures exactly once
delivery. They do it by assigning messages to be delivered a unique
identifier. Any non-idempotent operations can be made idempotent with
unique identifiers and a message ID log.

> “Not Idempotent:\
>      Withdrawing \$1 Billion.\
> Idempotent:\
>      If Haven’t Yet Done Withdrawal \#XYZ for \$1 Billion,\
>      Then Withdraw \$1 Billion and Label as \#XYZ”\
> Pat Helland

For example, when you send a message in MSMQ, it’s assigned a [20 byte
identifier](http://msdn2.microsoft.com/en-us/library/ms705091.aspx)
which is “unique within your enterprise.” [1] If the destination system
receives multiple messages with the same message ID, it knows they are
duplicates and can safely toss all but one of the messages with the same
ID. Exactly once, no transactions.

While many operations in REST are naturally idempotent, using REST
doesn’t magically make all your operations idempotent, contrary to
[popular belief](http://diveintomark.org/archives/2004/09/29/restagra).
Have you ever seen a message like “please don’t press submit order
twice” on the checkout page of an e-commerce website? It’s there because
POST is not naturally idempotent and the site hasn’t taken any extra
steps to identify duplicate POSTs. If the site embedded a unique ID in a
hidden form field, it could use that to identify duplicate orders.

If you’re a RESTifarian, haven’t you [seen this approach somewhere
before](http://bitworking.org/projects/atom/rfc5023.html)?

Given that POST isn’t naturally idempotent, I think it’s kinda
surprising that new [resources are created in
AtomPub](http://bitworking.org/projects/atom/rfc5023.html#crwp) by
POSTing them to a collection rather than PUTting them to a specific URL.
[RESTful Web Services](http://www.oreilly.com/catalog/9780596529260/)
specifically points out that PUT is idempotent, so I wonder why AtomPub
uses POST. I’d guess most AtomPub implementations (aka blogs) aren’t
much concerned about ensuring Exactly Once. If an blog entry gets posted
twice, you delete one and go on with your life.

However, if you wanted to use AtomPub and ensure Exactly Once, you can
use the fact that Atom entries [must contain exactly one ID
element](http://tools.ietf.org/html/rfc4287#section-4.1.2) which as per
the spec [must be universally
unique](http://tools.ietf.org/html/rfc4287#section-4.2.6). From reading
the Atom spec, the ID element seems primarily designed for Atom feed
consumers, but AtomPub servers could also use it as an “idempotence
identifier”, similar to how MSMQ uses the message ID. If you end up with
multiple entries with the same entry ID, discard all but one.

So by creating a unique identifier on the client side and logging that
identifier on the server side, we can make any REST service idempotent.
We can make it a durable service if we write the outgoing message – with
the message ID we generate – to a durable store before trying to send
it. If you write it to a durable store within the scope of a local
transaction, you’re even closer to duplicating MSMQ’s functionality, yet
the only protocol requirement beyond vanilla HTTP is having a unique
message ID.

The one problem with the Atom entity ID approach is that it requires
cracking the message in order to see if we should process it. For REST
services, I would think we’d want to stick the idempotence identifier in
an HTTP header. We already headers to implement [conditional
GET](http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers),
why not a header for what amounts to conditional POST?

Turns out such a header exists in the [AS2
spec](http://www.ietf.org/rfc/rfc4130.txt), i.e. “MIME-Based Secure
Peer-to-Peer Business Data Interchange Using HTTP”. AS2 defines a
[Message-Id HTTP
header](http://tools.ietf.org/html/rfc4130#section-5.3.3) which “SHOULD
be globally unique”. In the case of [an HTTP
error](http://tools.ietf.org/html/rfc4130#section-5.5), AS2 specifies
the “POST operation with identical content, including same Message-ID,
SHOULD be repeated” and that “Servers SHOULD be prepared to receive a
POST with a repeated Message-ID.” I assume this implies a server
shouldn’t process a message with the same ID twice.

So what would a durable REST service look like? I think like this:

1.  Sending system records the intent to send a message by saving it to
    a local durable store, potentially in the scope of a local
    transaction. As part of saving the message, a unique message id is
    generated (I’d use a [GUID](http://en.wikipedia.org/wiki/Guid), but
    as long as it’s unique it doesn’t matter.)
2.  A background thread in the sending system monitors the durable
    message store. When a new to-be-sent message arrives, the thread
    POSTs it to the destination, setting the Message-Id HTTP header to
    the unique identifier generated in step 1.
3.  The receiving system stores the Message-Id header value in a log
    table and processes the received message, potentially in the scope
    of a local transaction. Optionally, it can store the return message
    (if there is one) in the durable store as well.
4.  If the sending system doesn’t receive a 2xx status code, it rePOSTs
    the message to the receiving system until it does.
5.  If the receiving system receives a message that’s already listed in
    the log table, it ignores it and returns a success status code.
    Optionally, if the return message has been saved, the receiving
    system can resend the return message as long as it doesn’t redo the
    work.

This seems like a better approach than my original direction of doing
REST over a durable protocol like MSMQ or SSB. What do you think?

UPDATE – [Erik Johnson](http://appside.blogspot.com/) [points
out](http://devhawk.net/CommentView,guid,becd3f0f-5484-4a9e-ae6a-4a61cebc2a4a.aspx#commentstart)
that an HTTP POST’s idempotency is “left unsaid”. So my statement that
“POST isn’t idempotent” isn’t quite correct. POST isn’t *naturally*
idempotent. I’ve updated the post accordingly.

------------------------------------------------------------------------

[1] Technically, the MSMQ message ID isn’t universally unique as it is a
16 byte GUID representing the source system + a 4 byte sequence number.
The sequence number can rollover, after sending 2\^32 messages. In
practice, rolling over the message ID after 4 billion messages is rarely
an issue.
