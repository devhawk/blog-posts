So I want to start kicking the [P2P
SDK](http://msdn.microsoft.com/library/en-us/dnanchor/html/anch_p2p.asp)
around again. However, most of my work to date is on my [busted
laptop](http://devhawk.net/2003/11/12/busted-laptop-screen-busted-relationship/)
that I am *still* waiting to get fixed. Rather than reinvent the wheel,
I started looking at wrapping two other relevant SDKs: [IP
Helper](http://msdn.microsoft.com/library/en-us/iphlp/iphlp/ip_helper_start_page.asp)
and [Internet Connection Sharing &
Firewall](http://msdn.microsoft.com/library/en-us/dnanchor/html/intconnsharingfirewall.asp).
IP Helper allows access to the network configuration of the local
computer (including IPv6 settings). ICS/F allows you to programmatically
manage XP’s NAT and firewall functionallity (including the IPv6
firewall). Both are relevant to P2P due to the management of IPv6.

I’m not sure why these systems have a custom API instead of just using
[WMI](http://msdn.microsoft.com/library/en-us/dnanchor/html/anch_wmi.asp),
but they do. So I’m looking to wrap them either in managed code or WMI
(which is then available to managed code via
[System.Management](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemManagement.asp)).

**UPDATE**: MSFT just published a
[document](http://www.microsoft.com/downloads/details.aspx?FamilyID=4454e0e1-61fa-447a-bdcd-499f73a637d1&DisplayLang=en)
about the new Windows Firewall in XP SP2. One of the big new features is
the ability to configure the firewall at the global scope., though you
can still specify connection settings which override the global
settings. SP2 also includes the IPv6 firewall that is a part of the
[Advanced Networking
Pack](http://www.microsoft.com/downloads/details.aspx?FamilyId=E88CC382-8CE6-4739-97C0-1A52A6F005E4&displaylang=en) (which
may mean that the P2P infrastructure is baked into SP2). I’m sure this
will imply changes to the ICF API.

**UPDATE 2**: I finally got my laptop back today, and I found my
previous P2P work. I hope to kick some code around over the holidays.
