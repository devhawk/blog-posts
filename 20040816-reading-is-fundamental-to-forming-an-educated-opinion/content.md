So while I was on vacation, my trusty teammates plus our cohorts @ MSDN
published [JOURNAL
3](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj3intro.asp)
on [Architecture Center](http://msdn.microsoft.com/architecture). The
[first
article](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj3softfac.asp)
from JOURNAL 3 is called The Case for Software Factories by Jack
Greenfield, co-author of the [Software Factories
book](http://www.softwarefactories.com/TheBook.html). Jack noticed that
the article, an introduction to the concept of [Software
Factories](http://msdn.microsoft.com/architecture/overview/softwarefactories/),
was being rated inordinately low. Currently, it’s been rated 4 out of 9.
To compare, [Pat’s](http://blogs.msdn.com/pathelland) introduction to
the concept of
[Metropolis](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj2metrop.asp)
from [JOURNAL
2](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj2intro.asp)
rated a 7 out of 9. So a 4 is a pretty low score. Granted, I’m not going
to lose any sleep over it, but it was curious. Then Jack discovered
[this thread](http://it.slashdot.org/article.pl?sid=04/08/08/1724209) on
Slashdot, where most of the posts were from people who don’t appear to
have read the article at all. Here’s an example comment:

> The “software factory” analogy has been around before. It’s nonsense,
> of course. The software analogy of a “factory” is the plant that
> presses CD-ROMs. Pressing the 10,000th CD-ROM of a software product is
> the software equivalent of building the 10,000th Nissan Maxima on a
> production line. But **writing** the software which will go on that
> CD-ROM is the software analogy of **designing** the 2005 model of the
> Nissan Maxima. Now, some software development is not very creative.
> Just as tweaking the design of a car model that’s been around for 10
> years, to get something a little bit new for a new model year, is not
> very creative mech engineering. But it’s still design, not
> assembly-line production. A competent software engineer will be able
> to do it better and faster than a bad one. And a factory worker will
> not be able to do it at all.\
> [[Comment](http://it.slashdot.org/comments.pl?sid=117225&cid=9914555)
> by [njdj](http://slashdot.org/~njdj) from Slashdot thread [Hackers As
> Factory
> Workers?](http://it.slashdot.org/article.pl?sid=04/08/08/1724209)]

What’s hilarious about this post is that point of the article is that
the software industrialization will *not* look like a factory stamping
out of exact duplicates that njdj describes! The key to understanding
software industrialization is understanding the difference between
economies of scale and economies of scope. What njdj describes is
economies of scale – where you stamp out a boatload of multiple
identical instances. Economies of scope is when you create similar, yet
distinct, instances. For example, in my housing development, the houses
are all similar, but not exactly the same. There are three or four basic
designs used for around a hundred different houses, but the different
instances of each design vary slightly. Since you can’t stamp out
identical copies of the house, economy of scale doesn’t apply. However,
economy of scope does apply – these houses use the same basic building
materials, similar patterns of construction, the windows and doors are
the same size, the plumbing and electrical wiring are the same, etc.
Even though the houses aren’t identical, the construction company can
build a bunch of similar, yet distinct, houses much cheaper than if they
built each one “from scratch”.

I know njdj (and most of the other posters on the Slashdot thread)
didn’t read the article, because the article comes right out and states:

> We can now see where apples have been compared with oranges.
> Production in physical industries has been naively compared with
> development in software. It makes no sense to look for economies of
> scale in development of any kind, whether of software or of physical
> goods. We can, however, expect the industrialization of software
> development to exploit economies of scope.\
> [[The Case for Software
> Factories](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj3softfac.asp)
> by [Jack Greenfield](http://www.softwarefactories.com/AboutUs.html)
> from [JOURNAL
> 3](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/aj3intro.asp)]

I don’t know how much clearer Jack could have made his point, so I’m
surprised that so many people missed it (or bothered to post their
opinions of an article they clearly didn’t read). However, I’m not going
to lose any sleep over it. I [blogged a while
ago](http://devhawk.net/2004/05/10/unlikely-source-on-architecture/)
about the the Oakland A’s exploiting the inefficiencies of baseball.
Jack’s talking about exploiting the inefficiencies of software
development. At some point, someone will be successful adopting a
factory approach and everyone else will have to adapt. Software
development has to change – you can’t expect to stay in the major
leagues with a .160 batting average.
