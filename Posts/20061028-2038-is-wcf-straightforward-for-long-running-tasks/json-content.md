My father sent me a link to [this article on SOA
scalability](http://ddj.com/dept/webservices/193104809). He thought it
was pretty good until he got to [this
paragraph](http://ddj.com/dept/webservices/193104809?pgno=6):

> Long-running tasks become more complex. You cannot assume that your
> client can maintain a consistent connection to your web service
> throughout the life of a task that takes 15 minutes, much less one
> hour or two days. In this case, you need to implement a solution that
> follows a full-duplex pattern (where your client is also a service and
> gets notified when the task is completed) or a polling scheme (where
> your client checks back later to get the results). Both of these
> solutions require stateful services. This full-duplex pattern becomes
> straightforward to implement using the Windows Communications
> Foundation (Indigo) included with .NET 3.0.

When I first saw duplex channels in WCF, I figured you can use them for
long running tasks also. Turns out that of the nine [standard WCF
bindings](http://windowssdk.msdn.microsoft.com/en-us/library/ms730879.aspx),
only four support duplex contracts. Of those four, one is designed for
[peer-to-peer
scenarios](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.netpeertcpbinding.aspx)
and one uses [named
pipes](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.netnamedpipebinding.aspx)
so it doesn’t work across the network, so they’re obviously not usable
in the article’s scenario.
[NetTcp](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.nettcpbinding.aspx)
can only provide duplex contracts within the scope of a consistent
connection, which the author has already ruled out as a solution. That
leaves
[wsDualHttp](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.wsdualhttpbinding.aspx),
which is implemented much as the author describes, where both client and
the service are listening on the network for messages. There’s even a
standard binding element – [Composite
Duplex](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.channels.compositeduplexbindingelement.aspx)
– which ties two one-way messaging channels into a duplex channel.

Alas, the wsDualHttp solution has a few flaws that render it – in my
opinion at least – unusable for exactly these sorts of long running
scenarios. On the client side, while you can specify the
[ClientBaseAddress](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.channels.compositeduplexbindingelement.clientbaseaddress.aspx),
you can’t specify the entire
[ListenUri](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.description.serviceendpoint.listenuri.aspx).
Instead, wsDualHttp generates a random guid and tacks it on the end of
your ClientBaseAddress, effectively creating a random url every time you
run the client app. So if you shut down and restart your client app,
you’re now listening on a different url than the one the service is
going to send messages to and the connection is broken. Oops.

The issues don’t end there. On the [service side of a duplex
contract](http://windowssdk.msdn.microsoft.com/en-us/library/ms731184.aspx),
you get an object you can use to call back to the client via
OperationContext.Current.GetCallbackChannel. This works fine, as long as
you don’t have to shut down your service. There’s no way to persist the
callback channel information to disk and later recreate it. So if you
shut down and restart your service, there’s no way to reconnect with the
client, even if they haven’t changed the url they’re listening on. Oops.

So in other words, WCF can do long running services using the wsDualHttp
binding, as long as you don’t restart the client or service during the
conversation. Because that would never ever happen, right?

This is part of the reason [why I’m sold on Service
Broker](http://devhawk.net/2006/10/23/the-other-foundation-technology/).
From where I sit, it looks like WCF can’t handle long running operations
*at all* – at least, not with any of the built in transports and
bindings. You may be able to build something custom that would work for
long running services, I’m not a deep enough expert on WCF to know. From
reading what Nicholas Allen [has to say about
CompositeDuplex](http://blogs.msdn.com/drnick/archive/2006/08/29/729208.aspx),
I’m fairly sure you could work around the client url issue if you built
a custom binding element to set the ListenUriBaseAddress. But I have no
idea how to deal with the service callback channel issue. It doesn’t
appear that the* *necessary plumbing is there at all to persist and
rehydrate the callback channel. If you can’t do that, I don’t see how
you can reliably support long running services.
