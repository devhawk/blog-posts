After reading [Sam’s](http://www.intertwingly.net/blog)[slides on
Atom](http://www.intertwingly.net/blog/1674.html), Scoble
[posted](http://radio.weblogs.com/0001011/2003/12/15.html#a5763)[three](http://radio.weblogs.com/0001011/2003/12/15.html#a5764)[times](http://radio.weblogs.com/0001011/2003/12/15.html#a5767)
about how syndication could evolve. Of course,
[Scoble](http://radio.weblogs.com/0001011) has his
[Longhorn](http://msdn.microsoft.com/longhorn)-colored glasses on.
[Dare](http://www.25hoursaday.com/weblog/)[pointed
out](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=75f21b33-fae8-4817-8710-085b3eaec9b9)
that “The major problems with syndication today have little to do
with the syndication format and more to do with it’s associated
technologies.” I agree with Dare. IMO, the only thing that the ATOM
syndication format has over RSS is a namespace declaration. I care about
that because one of the “associated technologies” I care about is SOAP
and the lack of an RSS namespace makes it hard to embed an RSS item
inside a SOAP message.

I think Scoble should be asking how syndication will evolve in the face
of Service Oriented Architecture in general, not Longhorn specifically.
Granted, Indigo is going to make Longhorn a great platform for SOA. (If
you check out the [Longhorn Interoperability and Migration
Guide](http://msdn.microsoft.com/longhorn/understanding/books/migrationguide/),
[Chapter
2](http://msdn.microsoft.com/library/en-us/dnlongmig/html/intmiglongch02.asp)
is mostly dedicated to describing SOA.) But I think the real change to
syndication is going to come from
[WS-ReliableMessaging](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx?pull=/library/en-us/dnglobspec/html/wsrmspecindex.asp).
In order to truly evolve syndication, I think we need to break free of
the synchronous polling model we have today. Polling only works in
scenarios with a central syndication source (like a weblog). However, as
the sources of syndicated content get to be more distributed (phones,
P2P networks, etc) that polling model breaks down. I need to be able to
send messages when things change without regard to network availability.
With WS-RM, I can send messages and the infrastructure (i.e. Indigo) can
take care of the ugly details of making sure the messages get delivered
to their final destination.
