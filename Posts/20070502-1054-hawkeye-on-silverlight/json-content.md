While I was crusing the zoo with the family on Monday, everyone else was
focused on the big announcement coming out of
[MIX](http://www.visitmix.com/). Short version of the [press
release](http://www.microsoft.com/presspass/press/2007/apr07/04-30MIX07PR.mspx):
the next version of
[Silverlight](http://www.microsoft.com/silverlight/default01.aspx)
contains a small, cross platform CLR. As you might imagine, this is
somewhat significant. Check out reaction from
[TechCrunch](http://www.techcrunch.com/2007/04/30/silverlight-the-web-just-got-richer/),
[Sam
Gentile](http://codebetter.com/blogs/sam.gentile/archive/2007/04/30/cross-platform-clr.aspx)
and [Scott
Hanselman](http://www.hanselman.com/blog/PuttingMixSilverlightTheCoreCLRAndTheDLRIntoContext.aspx).

A year ago, I [wrote](http://devhawk.net/2006/03/22/CLR+Everywhere.aspx)
“Where else should the CLR live?” At the time, I was talking about
[XNA](http://www.xna.com/) (which had just been announced) though I was
aware of the plans around what I think is now officially called CoreCLR
(got the name from Scott’s post). The first time I heard about this, it
literally floored me. Part of me is surprised that in the year since
then the news didn’t leak and no one figured it out. I mean, doesn’t it
seem sorta obvious, in retrospect, that a Silverlight should run on CLR?
I mean, if we can [shrink the CLR
down](http://msdn2.microsoft.com/en-us/embedded/bb267253.aspx) to fit on
a [watch](http://direct.msn.com/), getting it into the browser seems
like a no-brainer. On the other hand, it’s such a huge departure from
“[Windows, Windows, Windows](http://news.com.com/1200-1070-959413.html)”
that I wonder if most people had (have?) a hard time wrapping their mind
around it.

(Actually, in [searching for
CoreCLR](http://search.live.com/results.aspx?q=coreclr), I discovered
[this
post](http://technosloth.blogspot.com/2006/07/coreclr-at-wwdc.html) from
last summer basically confirming “the CoreCLR team working on the
Macintosh version of the MiniCLR that’s going into WPF/E”. So it did
leak, but it seems to have been met with [significant
skepticism](http://blogs.zdnet.com/Stewart/?p=67) and didn’t make much
news. )

Now that you know all about Silverlight and CoreCLR, go back and re-read
my [Virtuous Cycle of Virtual
Platforms](http://devhawk.net/2007/03/06/The+Virtuous+Cycle+Of+Virtual+Platforms.aspx) post.
Especially the last paragraph (complete with the bad grammar):

> If the end user isn’t committed to a virtual platform like Flash, then
> who is? The developers who build software for that virtual platform.
> This is Virtuous Cycle of Virtual Platforms between the platform and
> developers instead of the platform and users. In the old model,
> developers go where the users are. In the new model, users go to where
> developers are. And developers go where they can be most effective.

Silverlight vs Flash looks to me like the next big platform ~~war~~
competition. It’s just getting started, so you can’t say with any
certainty which platform will be “most effective”. But early Silverlight
reviews are pretty impressive. TechCrunch’s Michael Arrington
[wrote](http://www.techcrunch.com/2007/05/01/take-time-to-understand-silverlight-its-important/) that
Silverlight “makes Flash/Flex look like an absolute toy”. That doesn’t
erase Flash Player’s head start in the [RIA
space](http://en.wikipedia.org/wiki/Rich_Internet_application), but it
certainly makes catching and surpassing Flash sound feasible. I suspect
most people didn’t think that sounded at all feasible last week.

Of course, while catching Flash may sound feasible, Microsoft is a long
way from achieving that goal. While the point of my earlier post is that
that market penetration doesn’t provide much advantage in the virtual
platform market, Adobe does derive significant advantage from shipping
*nine* versions of Flash while we haven’t quite shipped the first
version of Silverlight yet. Also, while I’m fairly sure the number of
.NET developers far exceeds the number of Flash developers (anyone have
hard numbers?), I would also expect that the number designers using
Flash far exceeds the number of designers using
[Expression](http://www.microsoft.com/expression/) (given that MSFT only
[just shipped Expression on this
week](http://www.microsoft.com/presspass/press/2007/apr07/04-30MIX07PR.mspx)).
I believe an important facet to the Silverlight / Flash platform
competition will be a race to woo the competitor’s core constituency.
Can Microsoft woo more designers with
[Expression](http://www.microsoft.com/expression/) than Adobe can woo
developers with Flex? We’ll see.

I’m also curious to see how people’s perspective of [Adobe’s Apollo
project](http://labs.adobe.com/technologies/apollo/) changes in the wake
of the Silverlight/CoreCLR announcement. From my perspective, both
Microsoft and Adobe are trying to unify web and desktop development. Not
surprisingly, each is trying to unify around the model where they’re
stronger: Apollo takes the web development paradigm (Flash, HTML, AJAX
and JavaScript) to the desktop while Silverlight takes desktop
development paradigm (WPF, CLR) to the web. I’m sure you can guess which
paradigm I think will be more successful, but how will the market react?
Again, we’ll see.
