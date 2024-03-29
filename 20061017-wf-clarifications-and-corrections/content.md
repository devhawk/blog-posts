Last week, after I [posting my WF
learnings](http://devhawk.net/2006/10/11/more-stuff-i-didnt-know-about-wf/),
I got a call from [Paul
Andrew](http://blogs.msdn.com/pandrew/archive/2006/10/16/Ten-Reasons-why-WF-is-not-a-Toy.aspx),
Technical Product Manager for WF. Seems calling the built-in persistence
service and the built-in web service support “toys” created some extra
work for Paul. He [blogged a
response](http://blogs.msdn.com/pandrew/archive/2006/10/16/Ten-Reasons-why-WF-is-not-a-Toy.aspx)
and I wanted to follow up on a few things here.

1. The “toy” SQL Persistence Service – My understanding about how the
built-in persistence service works was incorrect. As per Paul’s blog,
“The WF runtime doesn’t load all idle instances on startup, that would
be crazy.” Of course, we’re talking about the SQL Persistence Service,
not the WF runtime, but it’s still crazy. It’s so crazy that when I
thought that’s what the SQL Persistence Service did, I called it a toy!
So I’m flat out wrong on this one. Sorry about that Paul (and the rest
of the WF team).

2. The “toy” Web Service Integration – Apparently, I was also mistaken
about the use of ASP.NET sessions. But I was right about WF’s use of
ASMX, the use of the tempuri.org namespace, and that web service support
is limited to WS-I basic profile request/response style services. So
while “toy” is a bit harsh, the web service integration is still pretty
light weight. Where’s the WCF integration? I understand the need to
support ASMX, but no WCF means no support for duplex conversations,
either as service provider or consumer, and no support for reliable
sessions. That makes WF’s web service integration a non-starter in my
project. Of course, the good news is that you can build your own WF
activities, so I can toss the built-in web  service activites and still
get to keep the rest of WF.

3. Is WF itself a “toy”? Paul has a list of reasons why WF isn’t a toy,
including some silly ones (it wasn’t in [Toy
Story](http://www.imdb.com/title/tt0114709/)). In case there’s any
confusion about my opinon of WF, let me be clear: I think WF rocks, full
stop. My negative comments about WF were isolated to the two areas
listed above and not intended to apply to WF as a whole. The other seven
points were all about cool things that I didn’t realize WF does.

I’m not just trying to kiss up to Paul here – WF is one of two
foundation technologies that my project absolutely depends on. (Any
guesses on the other?) With the class out of the way and a better
understaning as to what’s possible with WF, I will be diving much deeper
on WF in the future. Watch this space for more WF related posts.
