[Lucas Gonze](http://gonze.com/weblog/) left me a
[comment](http://devhawk.net/CommentView,guid,32bca2ee-e564-4151-af30-e1d23e7f517e.aspx#85758f3a-8ba4-431e-8efe-77370dc7d4a9)
indicating they had in fact [investigated using
RSS](http://gonze.com/rss_plus_time.html) for XSFP instead of starting
from scratch. Good to know they considered the possibility.
Unfortunately, it looks like they were using RSS 1.0 so it has all the
extra RDF stuff which really hasn’t caught on. The document doesn’t
really go into the reasons they chose to go a different way, though
Lucas does say the following:

> RSS didn’t make sense for a lot of reasons. We were paving cowpaths,
> and RSS for playlists was very much not a cowpath. Playlists are about
> sequence, while RSS has no concept of sequence except reverse
> chronological order. We needed abstractions to deal with the fact that
> music and movies frequently don’t have URLs, and RSS didn’t have them.
> If not starting from scratch was critical, HTML preceded RSS and would
> be the default to work from.

I’m not sure I get Lucas’ point about sequence. Both RSS and XSFP have
sequence. Sure, RSS is typically describing web site content, thus it’s
a reverse chronological order. But the RSS spec doesn’t mandate and
specific meaning to the items in the feed. In fact, the items typically
have a pubDate element making the order in the feed somewhat irrelevant.
According to the [spec](http://www.xspf.org/xspf-v1.html), XSFP uses the
order of the tracks in the file as the implicit playback order. Why that
wouldn’t work with RSS is a mystery to me.

As for the “needed abstractions” missing from RSS, I’d be curious to
know what those are and why they couldn’t be added via [RSS
extensions](http://www.rssboard.org/rss-2-0#extendingRss).

Lucas, please don’t take these comments as criticisms. I’m new in this
space and I’m trying to get my head around stuff. Furthermore, if the
success of RSS proves anything, it’s that number of users matters a lot
more than the perceived technical merit of a given approach.
