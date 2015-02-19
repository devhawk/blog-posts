Someone from the P2P team internally saw my blog and set me a list of
commands to execute and send back to him to help troubleshoot my
problem. One of those commands was “net start pnrpsvc”. Aha! I hadn’t
realized that the [WinXP Adv. Networking
Pack](http://msdn.microsoft.com/downloads/list/winxppeer.asp) installed
any services. Turns out it installs four, including the “Peer Name
Resolution Protocol” service (i.e. pnrpsvc). What’s odd is that now that
I’ve started it manually once, it seems to autostart on demand now. I
can resolve addresses, as well as [ping the seed
server](PermaLink.aspx?guid=5410b65a-7609-4e56-ac6f-c16ab6e19a24).
GraphChat doesn’t work yet, but I think that’s because the IPv6 firewall
only has two ports open by default – PNRP (UDP 3540) and Grouping (TCP
3587). The GraphChat sample uses a dynamically chosen port, which would
be blocked.

So now that I’m back on track, I’ve got the PNRP namespace provider API
wrapped in Managed C++. I can
[register](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/registering_a_peer_name.asp),
[unregister](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/unregistering_a_peer_name.asp),
[resolve](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/resolving_a_peer_name.asp)
and [enumerate PNRP
clouds](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/enumerating_clouds.asp)
from managed code. I’ve also got a first pass of the [Identity Manager
API](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/identity_manager_api.asp)
and a skeleton of the [Graphing
API](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/graphing_api.asp)
done. I’ll post code when I have a managed GraphChat sample working.
