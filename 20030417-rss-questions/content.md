I’m working on adding individual list support to my SharePoint RSS Feed
Generator. This allows me to pass the name or ID for a specific list on
the query string and return that list as a channel. However, it is
possible to pass invalid data on the query string. For example, I could
subscribe to the RSS feed for a list only to have that list be deleted.
The next time my news aggregator updates, the requested list will be
invalid. I’ve decided to return HTTP 404 if this happen. Is this the
right behavior?

Second question: can an RSS feed have multiple channels? In SharePoint,
a web is a collection of lists and a list is a collection of list items.
If the user requests the RSS feed for a web, they get back a channel
with the title/link/description of the web and an item element for each
list item in every list in the web. That means that when the user
requests a web’s RSS feed, the list grouping is being flattened out
(though I do put the list’s name as the category of any list item).
Wouldn’t it make more sense to return multiple channels? According to
the [spec](http://backend.userland.com/rss), there can only be a single
channel element under the rss element. If that’s the case, why even have
a channel element? Why not just put all of channel’s children directly
under the rss element?

I’d like to see a revision to the RSS spec to add optional support for
multiple channels and for optional title/link/description elements as
direct children of the rss element. Of course, if we
[can’t](http://www.intertwingly.net/blog/1283.html#c1048031206) [agree](http://objective.mine.nu/archive/2003/3/22.aspx#when:12:06:06.3531952)
on a [namespace](http://www.snellspace.com/blog/archives/000340.html), I
assume we’ll never get my suggestions added.
