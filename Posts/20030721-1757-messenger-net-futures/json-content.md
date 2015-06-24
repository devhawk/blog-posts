Two things have revived my interest in
[Messenger.NET](prj_messenger.aspx) (though it needs a new name – [any
suggestions](mailto:harry@devhawk.net)?).
[Jamie’s](http://weblogs.asp.net/NUnitAddin/) [addin](http://www.managedaddins.net/gallery/)
and the upcoming release of [RTC Client API
v1.2](http://msdn.microsoft.com/library/en-us/rtcclnt/rtc/real_time_communications_rtc_client_start_page.asp).
The new client API is designed lockstep with [Microsoft Office Real-Time
Communication Server
2003](http://www.microsoft.com/office/preview/rtcserver/default.asp)
(otherwise known as just RTC Server).

The current version of Messenger.NET is built on
[imcli](http://www.sellsbrothers.com/tools/#imcli), an implementation of
MSNP7 – the IM protocol used by MSN Messenger prior to v5. While [MSN
Messenger](http://messenger.msn.com/) still uses later versions of that
protocol, [Windows
Messenger](http://www.microsoft.com/windowsxp/windowsmessenger/default.asp)
can support other protocols as well, such as [Exchange 2000′s IM
Service](http://www.microsoft.com/exchange/evaluation/features/instantmessage.asp).
The new RTC Server and Client API are using the
[IETF’s](http://www.ietf.org/home.html) [Session Initiation
Protocol](http://www.ietf.org/html.charters/sip-charter.html) (SIP) and
the [SIP Instant Messaging and Presence Language
Extensions](http://www.ietf.org/html.charters/simple-charter.html)
(SIMPLE). That seems like a much more interesting foundation to build an
app / addin around.

One quick downside of the new RTC Client API – it’s still COM based. The
v1 shipped with Windows XP way way back before CLR and the new v1.2 is a
refinement to that model. Of course, part of a “next-gen” Messenger.NET
implementation could include a managed wrapper around that COM API. I’ve
been diving into Code Access Security (CAS) recently, so building such a
library would be a good opportunity to practice [building secure
assemblies](http://msdn.microsoft.com/security/default.aspx?pull=/library/en-us/dnnetsec/html/THCMCh07.asp).
