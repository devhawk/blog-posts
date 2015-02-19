I’m not back on blog sabbatical, but between finishing my presentation
and attending [ITARC SoCal](http://www.iasahome.org/web/itarc/socal)
earlier this week – not to mention being sick – I didn’t have time to
write anything. Normal Morning Coffee resumes tomorrow, here’s a summary
of my notes from on my two days at ITARC.

[Scott Ambler](http://www.ambysoft.com/) did the opening keynote on
agile enterprise architecture strategy.

-   He claims that success is more prevalent in the industry that people
    think, because the industry has a narrow definition of success. If
    you change (aka widen) the definition, the success rate goes way up!
    That’s not exactly useful, but he referred to an as-yet-unpublished
    survey on project success rate that should be up on DDJ “soon”. I’d
    like to see that raw data.
-   While I agree with most of his points, Scott’s presentation style is
    very abrasive. For example, he makes the point that there is no
    one-size-fits-all process, which I couldn’t agree with more. But
    does he say it like that? No, he says “Repeatable processes? What an
    incredibly stupid idea!” even though the room is full of folks who
    probably think repeatable process is actually a good idea.
-   Scott suggested that unit tests are the best way to specify
    requirements. I’ve heard this before from agile practitioners, but
    something nags at me about it. Certainly, having executable
    requirements is a huge plus. But how can you be sure they’re the
    right requirements if the stakeholders can’t read them?
-   This keynote setup what turned out to be a major theme for the
    conference – traditional vs. non-traditional enterprise
    architecture. Or as I would characterize it: Industrial vs. Post
    Industrial architecture.

[Simon Guest](http://simonguest.com/blogs/smguest/default.aspx)
presented on user experience in architecture, which is his specialty
these days. He lays out a UX model that was very compelling. I’m not
sure if there’s a whitepaper version of this model (there should be) but
you can see the model as he [lays it out in
powerpoint](http://simonguest.com/blogs/smguest/archive/2007/06/21/Slides-from-San-Diego-UX-Summit.aspx).
I’ve seen Simon’s UX decks, but never actually seen him present it, so
that was a treat.

I skipped Ted Neward’s session in order to take in something new. So I
went to see [Daniel Brookshier](http://weblogs.java.net/blog/turbogeek/)
of [No Magic](http://www.nomagic.com/) talk about DoDAF – the [Dept. of
Defense Architecture Framework](http://en.wikipedia.org/wiki/DODAF). I
had met Daniel the night before at dinner and while No Magic primarily
sells [UML modeling
tools](http://www.nomagic.com/text.php?lang=2&item=232&arg=206), we
seemed to agree that UML is most useful (in my opinion “at all useful”)
when you imbue the vanilla models with custom semantics – aka you turn
them into a DSL. So while I liked hanging out with Daniel, his DoDAF
session did nothing except ensure I never work for the DoD. There’s no
amount of money that’s worth dealing with the two dozen or so
bureaucratic models that are all wholly isolated from anything that
actually executes. Daniel kept saying how easy these models are to
build. I’m sure they are, but that’s not the problem. Since they’re not
an intrinsic part of a construction process, they won’t stay up to date.
This was a very industrial approach – Daniel even stated at one point
that he was “anti-Ambler”.

[David Chappell](http://blogs.oracle.com/davidchappell/) did the second
keynote on grid-enabled SOA.

-   When did David join Oracle? I guess I haven’t been paying much
    attention to competitors since I moved to MSIT.
-   There’s an [article version](http://www.soamag.com/I10/0907-1.asp)
    of this presentation available, but I haven’t read it yet.
-   For me, the best part of this presentation was him acknowledging
    that there’s a need for non-stateless services, something he has
    [blogged about
    recently](http://blogs.oracle.com/davidchappell/2007/09/27#a22). I’m
    not sure I agree with his framework for stateful interaction, but at
    least he’s admitting that it’s needed. Now if I could only convince
    the Connected Systems Division…
-   The rest of his talk was basically a sales pitch for the Coherence
    product Oracle recently bought. Basically, it’s a huge, multi-node,
    redundant, in-memory database. While I’m sure there are a few
    high-end problems out there – my immediate thought was travel and
    David mentioned [SABRE](http://www.sabretravelnetwork.com/) is one
    of their customers – this is not a good general purpose solution,
    though David was positioning it as such.

My talk on “Moving Beyond Industrial Software” was after the second
keynote. It was good, if sparsely attended. I’m doing it again @ the
[p&p Summit](http://www.pnpsummit.com/west2007.aspx) so I’ll post the
slides and hopefully a recording after that.

I skipped the last session of the day to decompress, so the next session
I went to was the day two opening keynote by [Fred
Waskiewicz](http://www.omg.org/news/about/contacts.htm#tek), OMG’s
Director of Standards. His talk, unsurprisingly, was on the value of
standards – in particular, OMG’s standards. This was about as
anti-Ambler, anti-agile, pro-industrial a presentation as you could
make. I’d heard this spiel before, so I mostly tuned out. I did
challenge Fred on his point that the UML models are at a higher level of
abstraction than code. They’re not – they’re a visualization and they’re
very useful, but they’re at the exact same level of abstraction as code.
That’s why you can automatically generate the visualization in tools
like Visual Studio’s [class
designer](http://msdn.microsoft.com/vstudio/tour/vs2005_guided_tour/VS2005pro/Smart_Client/ClassDesign.htm).
Fred didn’t have much of a response to my question, though he did point
out that some models like Business Process Models are, in fact, higher
levels of abstraction.

Next was what I thought was the best presentation of the entire show,
IASA Founder [Paul
Preiss](http://www.iasahome.org/web/home/about/leadership) on what
architects need to know. Note, I’m not brown-nosing Paul here – I’m the
guy that first decided to commit Microsoft as an [IASA
sponsor](http://www.iasahome.org/c/portal/layout?p_l_id=PUB.1.159), so
he has to like me even if I thought his session was crap. Paul talked
about architect as a career, comparing it to doctors. He worries that
he’s over-using that analogy, but software architect has much more in
common career wise than it does with building architects IMO. I wonder
where one might do their architecture residency? He also thinks of
architects as “living governance”, saying that project managers answer
to the stakeholders while architects are beholden to the stockholders. I
like that approach to governance.

Finally, I attended Vince Casarez’s session on Web 2.0 in the
enterprise. Vince is an Oracle VP and this turned into a sales pitch
like David Chappell’s keynote did. I’m not sure what product it was, but
it reminded me of QEDWiki from IBM that I [saw at ETech last
year](http://devhawk.net/2006/03/08/Rod+Smith+On+Do+It+Yourself+IT.aspx),
which isn’t a complement. If you’re going to build an enterprise mashup
designer, is it just me or is “lots of code spew” a poor model. Why not
go for something like [Popfly](http://www.popfly.ms/) or
[Pipes](http://pipes.yahoo.com/pipes/)?

I left early the second day in order to get home before my kids went to
sleep (which I failed at due to lack of naptime). Overall, the
conference was pretty good, though a bit sparsely attended in part I
think because they held it in San Diego. The Orange Country IASA user
group is very popular, so I don’t understand why they didn’t just hold
it around there somewhere. Live and learn, I guess. They did have to
postpone the DC event until next year sometime. Here’s hoping I get
invited to that as well as well as ITARC SoCal ’08 (note, that \*is\*
brown-nosing a bit)
