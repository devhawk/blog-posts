A while back, I blogged that [Services Aren’t
Stateless](http://devhawk.net/2006/07/27/services-arent-stateless/),
in response to some stuff in Thomas Erl’s [latest
book](http://www.soabooks.com/chapters2.asp). At the time, I mentioned
that I was looking forward to discussing my opinions with
[Erl](http://www.thomaserl.com/) when I attended his
[workshop](http://www.soasystems.com/events151.asp). I’ve spent the last
two days at said workshop. I’ll have a full write-up on the workshop
later this week, but I wanted to blog the resolution to this stateless
issue right away.

At the time, I wrote “I assume Erl means that service should be
stateless in the same way HTTP is stateless.” Turns out, my assumption
was way way wrong. When he addressed this topic in his workshop, he
started by talking about dealing with concurrency and scalability, which
got me confused at first. Apparently, when Erl says stateless, he’s
referring to minimizing memory usage. That is, don’t keep service state
in memory longer than you need to. So [all the stuff about activity
data](http://devhawk.net/2006/08/16/business-processes-are-services-too/),
that’s all fine as per Erl’s principles, as long as you write it out to
database instead of keeping it in memory. In his book, he talks about
the service being “temporarily stateful” while processing a message.
When I read that, I didn’t get it – because I was thinking of the HTTP
definition of stateless & stateful. But if we’re just talking about raw
memory usage, it suddenly makes sense.

On the one hand, I’m happy to agree 100% with Erl on another of his
principles. Frankly, much of what he talked about in his workshop seems
predicated on unrealistic organizational behavior and offer at best
unproven promises of cost and time savings in the long run via black box
reuse. So to be in complete agreement with him on something was a nice
change of pace. Thomas is much more interested in long-running and async
services than I originally expected when I first flipped thru his book.

On the other hand, calling this out as a “principle of service
orientation” hardly seems warranted. I mean, large scale web sites have
been doing this for a long time and [SQL Session
State](http://msdn2.microsoft.com/en-us/library/ms178586.aspx) support
has been a part of ASP.NET since v1. Furthermore, using the term
“stateless” in this way is fundamentally different from the way HTTP and
the industry at large uses it, which was the source of my confusion. So
while I agree with the concept, I really wish Erl hadn’t chosen an
overloaded term to refer to it.
