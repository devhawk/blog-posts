Dare is [thinking
about](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=11c471d6-ea65-4ed2-b387-c9ec966d8418)
what comes after AJAX, building on Ted Leung’s post “[Adobe wants to be
Microsoft of the
Web](http://www.sauria.com/blog/2007/03/01/adobe-wants-to-be-the-microsoft-of-the-web/)“.
He mentions three things that any Rich Internet Application (aka RIA)
platform needs to have: ubiquity, a consistent debugging experience and
a continuum of dev tools. I agree 100% with the need for a good
debugging experience and dev tools. But RIA platforms like Flash and
WPF/E aren’t traditional platforms, they’re virtual platforms. (or
should I say Platforms 2.0?) It turns out ubiquity and market
penetration of virtual platforms is a lot less important than you might
think.

At first glance, Flash Player’s [98% market
penetration](http://www.adobe.com/products/player_census/flashplayer/)
appears to be demonstrating the typical virtuous circle of platforms.
The more people that have the platform, the more software written for
it; the more software written for a platform, the more people get it.
But the traditional view of virtuous circles assumes that switching
platforms requires significant investment of time and money. The vast
majority of non-geek users commit to a platform at the time of purchase.

However, Virtual platforms such as CLR, JVM, Flash not to mention the
browser itself (aka AJAX) don’t conform to the traditional virtuous
circle of platforms. Installing a virtual platform isn’t a “buy a new
machine” proposition or even a “pave and rebuild”. At worst, in the case
of CLR, it’s fifteen minutes to download and install followed by a
reboot. At best, in the case of Flash, it’s two minutes to download
and install with no reboot. That means the end user has made little to
no commitment to virtual platform itself, either in terms of time or
money. Furthermore, the user isn’t forced to choose between different
virtual platforms. You can install CLR, JVM, Flash as well as multiple
browsers on your machine side by side without conflict.

Think about the install process for a new version of Flash, especially
from the perspective of a non-geek. They visit a site, it pops up a
dialog saying “you need the latest version of Flash, go here to get it”.
Even if the average user doesn’t understand what Flash is or does, they
can click on the link. They are redirected to the Adobe site, Flash
installs very quickly, and the user goes back to what they were doing
and most likely forgets the entire install experience. Because no money
changes hands and it takes almost no time, installing the Flash virtual
platform requires zero commitment from the user.

Existing user install base is much less important when adding new users
requires zero commitment. You can see this is happening with Flash by
looking at its [version specific market
penetration](http://www.adobe.com/products/player_census/flashplayer/version_penetration.html).
Flash Player 9 has reached around 55% market penetration in just over
six months since it was released. Flash is not seeing the “compete with
the previous version” effect that is prevalent with traditional
platforms like Windows. I believe this is because users don’t need to
make any real commitment to Flash. When a new version of Flash is
released, the user is presented with the same install process which they
just go thru again without even realizing they’ve done it before.

If the end user isn’t committed to a virtual platform like Flash, then
who is? The developers who build software for that virtual platform.
This is Virtuous Cycle of Virtual Platforms between the platform and
developers instead of the platform and users. In the old model,
developers go where the users are. In the new model, users go to where
developers are. And developers go where they can be most effective.
