I’m setting up a new [SQL 2005](http://www.microsoft.com/sql/2005/) /
[VS 2005](http://lab.msdn.microsoft.com/vs2005/) VPC. While I’m pretty
excited about [SQL
Express](http://lab.msdn.microsoft.com/express/sql/default.aspx), I want
to experiment with some of the features in the full product so I’m
installing Express’s big brother. However, there must be some weird
issue w/ VPC’s shared folders feature – the setup support files fail to
install. If I connect to my host across the virtual network to the
loopback adapter then the install works fine. As I said, weird.

On a related note, anyone know a good, simple, free/cheap DHCP server
for XP? The one issue w/ using the loopback adapter is that you either
hardcode network addresses or use the “Automatic Private Address” (i.e.
the 169.254.\*.\* address). The auto private address works fine, except
that it takes a while for the DHCP to time out before assigning the
private address. Plus, in XP SP2, there’s an annoying tray icon that
pops up to tell you that the loopback adapter failed to get a DHCP
address. If I had a DHCP server for the virtual network hanging off the
loopback adapter, then I could avoid all that timeout and annoying pop
up tray icon stuff.
