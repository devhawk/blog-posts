My contact on the P2P team just gave me two more important links for the
construction of IPv6 based P2P apps. The first is [IP
Helper](http://msdn.microsoft.com/library/en-us/iphlp/iphlp/ip_helper_start_page.asp),
a library included with XP that “enables the retrieval and modification
of network configuration settings for the local computer”. I had never
seen that library before, but it’s full of useful methods like
[GetAdaptersInfo](http://msdn.microsoft.com/library/en-us/iphlp/iphlp/getadaptersinfo.asp)
and
[GetAdaptersAddresses](http://msdn.microsoft.com/library/en-us/iphlp/iphlp/getadaptersaddresses.asp).
I want to be able to retrieve the IPv6 address of my NICs directly, so
this is the library I need. Anyone out there wrapped it in managed code
yet? I was hoping to do this part with WMI, but the IPv6 info doesn’t
seem to be exposed via WMI.

The other relevant link is the [IPv6 Internet Connection Firewall
SDK](http://www.microsoft.com/downloads/details.aspx?familyid=A949A3DE-990C-468C-86F6-4ABFEC4FFAC6&displaylang=en),
which “contains all the software required to configure the IPv6 Internet
Connection Firewall”. I assume that means that I can open relevant ports
to enable P2P communication. As I [wrote
yesterday](PermaLink.aspx?guid=9583d859-dee0-408c-b889-124d97a8ffb9),
the issue I’m having with GraphChat is likely related to the IPv6
Firewall configuration. I’d like to include in my P2P managed library
the ability to manage the IPv6 Firewall.
