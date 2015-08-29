I’ll be honest, with a quick glance at
[WS-Enumeration](http://msdn.microsoft.com/library/en-us/dnglobspec/html/ws-enumeration.pdf)
and
[WS-Transfer](http://msdn.microsoft.com/library/en-us/dnglobspec/html/ws-transfer.pdf)
I’m at what [Don refers
to](http://www.gotdotnet.com/team/dbox/default.aspx?key=2004-09-17T07:22:15Z)
as Stage 1. Especially WS-Transfer which appears at first glance to be
CRUD for web services.
[Maarten](http://blogs.msdn.com/maarten_mullender) talks about using
[CRUD only when you can afford
it](http://blogs.msdn.com/maarten_mullender/archive/2004/07/23/193524.aspx).
My biggest issue with CRUD is that it assumes a trust relationship –
that some other service is responsible for deciding when and how to CUD
entities that I manage. I can’t imagine exposing an interface like that
on any service I build.

But it is nice to see we’ve started publishing specs in easy to download
PDF format.
