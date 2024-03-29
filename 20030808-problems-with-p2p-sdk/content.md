Has *anybody* gotten the P2P SDK to work? I’ve been playing with it,
working on ideas for wrapping it in managed code. I’ve actually got
classes wrapping the [Identity
Manager](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/identity_manager_api.asp)
and [PNRP
Namespace](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/pnrp_namespace_provider_api.asp)
APIs as well as a start on the [Graphing
API](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/graphing_api.asp).
Due to the nature of the SDK, I’ve been writing in Managed C++. While
tricky and not as much fun as writing C\#, MC++ is pretty cool. Wrapping
the P2P SDK with MC++ has been much easier than I expected. Except for
one problem – I can’t seem to get PNRP to work. Even the GraphChat demo
doesn’t work for me.

PNRP stands for the Peer Name Resolution Protocol. It is supposed to be
a serverless DNS system. It allows me to register a peer name for later
look up and resolution. I can register and unregister a peer name and
endpoint. It even throws and exception if I attempt unregister without
registering first, so something must be happening. But I can’t resolve
the peer name to an address. And it’s not just my code (which is copied
near verbatim from the help files), the sample GraphChat app doesn’t
seem to work either. I’m attempting to register in the default “global”
cloud as is the GraphChat sample, but no luck.

Just chatted Scoble on this – since he was [so
excited](http://radio.weblogs.com/0001011/2003/07/23.html#a3893) when we
released it. As a fellow evangelist, he is willing to put me in touch
with the powers-that-P2P. However, I’d appreciate hearing any other “war
stories” out there.
