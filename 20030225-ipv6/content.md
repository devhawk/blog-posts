Both [threedeegrees](http://www.threedegrees.com/) and the [Windows XP
Peer-to-Peer
SDK](http://www.microsoft.com/downloads/details.aspx?familyid=c3056f5a-f6ee-4147-b7c1-146064710f22&displaylang=en)
are now available. Haven’t tried them out yet (new baby) but I have been
working through [Understanding
IPv6](http://www.microsoft.com/mspress/books/4883.asp) during off
moments. I’m very impressed with IPv6. It really rectifies the issues
around internet addressing beyond just providing a huge number of
addresses (2^125^ to be exact). In IPv6, interfaces typically have
multiple addresses – an auto-configured link-local address, and a
dynamically configured site-local and global address. IPv6 also provides
a mechanism for neighbor discovery, which allows a node to determine
what other devices (esp. routers) are on the local link. Many of these
features are supported as [add-ons to
IPv4](http://www.upnp.org/resources/specifications.asp), but they aren’t
very cleanly designed since they weren’t included in the original
design.

One funny thing about IPv6 – the first 13 bits of an IPv6 address is
called the Top Level Aggregator Identifier, or the TLA ID. I thought TLA
stood for Three Letter Acronym!
:smile:

I did install the WinXP P2P SDK and poke around enough to notice it is
C++ based. I wonder if the next version of the .NET Framework, with it’s
built in IPv6 support, will get it’s own P2P SDK soon?

