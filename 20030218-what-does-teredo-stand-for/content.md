> But what makes [[threedegrees](http://www.threedegrees.com/)]
> interesting from a tech standpoint is the technology bets that are
> involved. The groups are built on the Microsoft peer to peer platform,
> which is [ipv6
> only](http://news.zdnet.co.uk/story/0,,t269-s2108681,00.html). The
> IPv6 part means that NATs are a deployment blocker, so
> [enter](http://www.huitema.net/talks/NAT-firewalls-IPv6.ppt)[teredo](http://www.ietf.org/internet-drafts/draft-ietf-ngtrans-shipworm-08.txt).
> [[Doubt’s
> log](http://radio.weblogs.com/0100529/2003/02/17.html#a1476)]

I just noticed this yesterday as well. Very cool stuff. I didn’t realize
that [XP
SP1](http://www.microsoft.com/windowsxp/pro/techinfo/administration/ipv6/default.asp)
includes a production quality IPv6 stack (though it’s still appears as
“developer preview” in the UI) and [Windows Server
2003](http://www.microsoft.com/windowsserver2003/technologies/ipv6/ipv6faq.mspx)
takes that support to the next level. Plus [.NET Framework
1.1](http://msdn.microsoft.com/netframework/productinfo/next/overview.asp)
includes support for IPv6. Terendo seems pretty cool (traffic IPv6 over
IPv4 and bypass NAT issues). However, how much does Teredo (sometimes
called Shipworm) rely on UPnP support? The
[slides](http://www.huitema.net/talks/NAT-firewalls-IPv6.ppt) Doubt
linked to claims that it works for “all NAT”, but it also discusses UPnP
in depth. I’ve [turned off UPnP support](http://grc.com/unpnp/unpnp.htm)
on all my machines inside my Linksys NAT, not because of the [security
issue](http://www.microsoft.com/technet/security/bulletin/MS01-059.asp)
but because my NAT doesn’t behave when it’s turned on. I have to
routinely reset the NAT when UPnP support is turned on. I’ve updated to
the latest firmware, but I’m still having the problem.
