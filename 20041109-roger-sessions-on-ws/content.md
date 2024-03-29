[Roger Sessions](http://www.objectwatch.com/about_us.htm), noted
architectural guru, author and Microsoft Architect MVP, has posted his
[latest
newsletter](http://www.objectwatch.com/newsletters/ObjectWatchNewsletter048.pdf)
on the WS-\* family of specs. In typical Roger fashion, he decides to
give them his own name – WS-SCRAM with SCRAM standing for “Secure,
Coordinated, Reliable Async Messages”. (I forget where, but I once heard
Roger refer to “three-phase transactions” instead of the relatively
standard “two-phase commit transactions”.) Roger claims MS et. al. are
pushing WS-STAR where “STAR” is an acronym standing for “Secure,
Transacted, Async, Reliable”. Personally, I’ve never seen it written out
like a an acronym and I always thought the \* in WS-\* was used as a
wildcard, but it is true that we are focused more on transactions than
coordination. On the [Longhorn
DevCenter](http://msdn.microsoft.com/Longhorn), Indigo is
[described](http://msdn.microsoft.com/Longhorn/understanding/pillars/Indigo)
as providing “secure, reliable, and transacted messaging along with
interoperability.”

This is actually the second time Roger’s taken on transactions in a web
services architecture. His [last
newsletter](http://www.objectwatch.com/newsletters/issue_41.htm) on the
topic had a much more detailed but harder to follow example. He points
out that there are two related specs in this space –
[WS-AtomicTransaction](http://msdn.microsoft.com/ws/2004/10/ws-atomictransaction/)
and
[WS-BusinessActivity](http://msdn.microsoft.com/ws/2004/10/ws-businessactivity/)
but that he thinks only WS-BA is going to work in the long run. WS-AT
requires holding locks open in the DB, which is highly unlikely between
services in different trust boundaries communicating with async
messaging. Am I really going to lock the records in my database while I
wait for a service that I don’t trust to figure out if it is able to
commit or abort? I don’t think so. Pat’s [wrote a great
scenario](http://blogs.msdn.com/pathelland/archive/2004/08/12/213552.aspx)
showing how unrealistic the concept of long-running transactions really
are.

However, at the end of the newsletter, Roger takes Indigo to task for
implementing WS-AT and not WS-BA and I don’t agree with him. While I
think WS-AT shouldn’t be used in web services architectures, Indigo is
also responsible for moving existing technologies like COM+ forward.
Leaving out WS-AT isn’t really an option in those scenarios. As for not
implementing WS-BA, I’ve got to wonder just how valuable is WS-BA? While
WS-BA avoids the DB locking issue of WS-AT, it still doesn’t deal with
the delegation of control. WS-BA still leaves me beholden to the
decision of some outside coordinator. This seems to violate two of
[Don’s](http://www.pluralsight.com/blogs/dbox)[tenets of service
orientation](http://msdn.microsoft.com/longhorn/understanding/pillars/indigo/default.aspx?pull=/msdnmag/issues/04/01/Indigo/default.aspx):
“Boundaries are Explicit” and “Services are Autonomous”.
