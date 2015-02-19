Last week at Mashup Camp, [Yoz](http://cheerleader.yoz.com) showed me
[Ning](http://www.ning.com/). I had heard about Ning, Ning is a social
software enabler…I guess enabler is the best word…with a fascinating
approach to building software. Well, getting started building software
at any rate. While they provide other more basic functions like hosting,
Ning provides the ability to clone almost [all of the
apps](http://browse.ning.com/application/any) running on their site
(over 6500 as I write this). When you clone an app, Ning makes a copy of
all the files from that app on your own domain (typically
appname.ning.com, though you can pay to have your own domain name). They
also provide a set of [basic starter
apps](http://www.ning.com/?view=xapps) that you can clone to get
started.

I decided to try it myself. Behold [Partisan
Hacks](http://partisanhacks.ning.com/).

Partisan Hacks is a clone of Ning’s [Do I
Rock?](http://doirock.ning.com/) starter app, which is itself basically
a copy of [Hot or Not](http://www.hotornot.com/). The difference is that
you rate how big a partisan hack the individuals are. As I wrote for the
About page, I was basically inspired by [Jon
Stewart’s](http://en.wikipedia.org/wiki/Jon_Stewart) now [famous
appearance](http://www.ifilm.com/ifilmdetail/2652831) on the now
cancelled [CNN
Crossfire](http://en.wikipedia.org/wiki/Crossfire_(TV_series)). Of
course, I’ve been [throwing the term
around](http://devhawk.net/2006/02/12/Dennis+Miller+Has+Jumped+The+Shark.aspx)
myself a bit lately, hence the reason why the topic was top of mind for
me.

From a technical perspective, I added two features to the basic Do I
Rock template code. First, I modified the detail page to include a link
to Wikipedia as well as to pull in search results from MSN. Second, I
added an RSS feed to the [most
partisan](http://partisanhacks.ning.com/list.php?sort=winner), [least
partisan](http://partisanhacks.ning.com/list.php?sort=loser) and [newest
additions](http://partisanhacks.ning.com/list.php?sort=new) to the site.
I’d never used PHP before, so it took me a bit longer that I would have
expected to make the changes, but still it only took me a couple hours
to make those as well as other minor cosmetic changes to the site.

While hacking PHP was somewhat tedious (back to my ASP days of the mid
90′s), one area that is both compelling and productive is the [Ning
Content
Store](http://documentation.ning.com/sections/basics.php#contentstore).
It’s the shared database on the back end of any Ning application. I
didn’t really make any changes to my content, but it appears to dead
simple to add new info to content objects. I was thinking about how I
would build this app w/ ASP.NET, and realized that having to build a
custom database would offset most of the productivity I would gain from
using ASP.NET instead of PHP. According to [Ning’s
Roadmap](http://documentation.ning.com/sections/roadmap.php), they’ll be
bringing [Ruby](http://www.ruby-lang.org/en/) and
[Rails](http://www.rubyonrails.com/) support online soon. I’ll have to
see how much better an experience that is than their current PHP based
approach.
