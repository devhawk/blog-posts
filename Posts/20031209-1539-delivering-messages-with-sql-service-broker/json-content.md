[SQL Service
Broker](http://www.microsoft.com/sql/yukon/productinfo/top30features.asp#B)
is probably the least known new feature of [SQL Server
“Yukon”](http://www.microsoft.com/sql/yukon/productinfo), but I can’t
wait for it. It makes messages a first class object in the database. If
you’ve ever had multiple processes banging on your database or you’ve
ever used a flag on a row to indicate if it’s been processed or not, you
want SQL Service Broker too.

While there is huge disagreement as to exactly what “Service-Oriented
Architecture” is, I think there is some general consensus around the
fact that it is an asynchronous message driven model rather than a
synchronous RPC model. This means that the thread you receive a message
on will *never* be the same thread that you process the message on. In
fact, typically you will write the message to a persistent data store
(hello, Yukon native XML support) in order to be handled by a thread in
a different process and probably on a different machine. Today, kicking
off the thread to handle the message is a pain in the ass. You probably
want lots of threads across lots of machines to handle the incoming
messages (assuming you’re getting lots of incoming messages). In order
to synchronize message processing across machines, you need a mechanism
to make sure each incoming message is handled once and only once. Today,
the closest solution is message queue technology like
[MSMQ](http://www.microsoft.com/msmq) (or
[MQSeries](http://www.ibm.com/software/integration/mqfamily/)). However,
since that’s a different data store from where the data lives (i.e. the
database), now you need two phase distributed transactions to get that
done. However, since messaging is going to be such a huge piece of
architecture going forward, it makes sense to have the concept of
messages baked right into the database.

With Service Broker, when the message is received, it is placed into a
service broker queue. (It’ll probably get stored for archival and retry
avoidance reasons, but that’s a different blog entry.) Now I can have
processes that, within the scope of a local transaction, receive the
incoming message, make whatever data changes that message implies and
send off any new messages. This is both more productive (manually
handling local transactions for async processing is this kind of a
scenario much easier than using serviced components) as well as more
performant.
