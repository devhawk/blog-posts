I hadn’t realized this before, but you can still use
[Teredo](http://www.microsoft.com/technet/prodtechnol/winxppro/maintain/Teredo.asp)
without using the [P2P stack](http://www.microsoft.com/windowsxp/p2p/).
By default, IPv6 sockets block incoming Teredo traffic. But if you set
the socket’s [IPv6 protection
level](http://msdn.microsoft.com/library/en-us/winsock/winsock/using_ipv6_protection_level.asp)
to unrestricted, incoming Teredo traffic is allowed. Not sure how useful
this is, especially since I haven’t seen an easy way to set
the IPv6 protection level from managed code. You may be able to
[setsockopt](http://msdn.microsoft.com/library/en-us/winsock/winsock/setsockopt_2.asp)
using the
[Socket.Handle](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemNetSocketsSocketClassHandleTopic.asp)
property, but I haven’t tested it.
