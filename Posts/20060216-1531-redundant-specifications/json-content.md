So after my
[two](http://devhawk.net/2006/02/14/Reinventing+The+List.aspx)[posts](http://devhawk.net/2006/02/15/More+On+XSFP.aspx)
on XSPF and some public discussion in the comments, I took the
conversation with Lucas offline in hopes of getting a better
understanding about the thought process that went into the spec.
Unfortunately, Lucas has reacted as if I called his baby ugly and we got
nowhere. Needless to say, I still believe that XSPF is completely
redundant because it is nearly semantically identical to RSS.

To demonstrate, here’s a list of every [playlist
element](http://www.xspf.org/xspf-v1.html#rfc.section.4.1.1.2) from the
[XSPF version 1 spec](http://www.xspf.org/xspf-v1.html) and how it maps
to [channel
elements](http://www.rssboard.org/rss-2-0#requiredChannelElements) from
[RSS version 2](http://www.rssboard.org/rss-2-0).

-   /playlist/title -\> /rss/channel/title
-   /playlist/creator -\> /rss/channel/managingEditor
-   /playlist/annotation -\> /rss/channel/description
-   /playlist/info -\> /rss/channel/link
-   /playlist/image -\> /rss/channel/image
-   /playlist/date -\> /rss/channel/pubDate
-   /playlist/license -\> /rss/channel/copyright
-   /playlist/location -\> create custom element
-   /playlist/identifier -\> create custom element
-   /playlist/attribution -\> create custom element
-   /playlist/link -\> No need in RSS
-   /playlist/meta -\> No need in RSS
-   /playlist/extension -\> No need in RSS

That’s a pretty close match. There are a few things we need extensions
for to represent in RSS, but nothing major. BTW, from what I can tell,
the reason XSPF has link, meta and extension elements is for
extensibility purposes. RSS supports an extremely [flexible
extensibility model](http://www.rssboard.org/rss-2-0#extendingRss)
already, so there’s no need for the XSPF specific extensibility
elements.

Here’s the mapping of [track
elements](http://www.xspf.org/xspf-v1.html#rfc.section.4.1.1.2.14.1.1.1)
in XSPF to [item
elements](http://www.rssboard.org/rss-2-0#hrelementsOfLtitemgt) in RSS.

-   /playlist/trackList/track/location -\> /rss/channel/item/enclosure
-   /playlist/trackList/track/identifier -\> /rss/channel/item/guid
-   /playlist/trackList/track/title -\> /rss/channel/item/title
-   /playlist/trackList/track/creator -\> /rss/channel/item/author
-   /playlist/trackList/track/annotation -\>
    /rss/channel/item/description
-   /playlist/trackList/track/info -\> /rss/channel/item/link
-   /playlist/trackList/track/image -\> create custom element
-   /playlist/trackList/track/album -\> create custom element
-   /playlist/trackList/track/trackNum -\> create custom element
-   /playlist/trackList/track/duration -\> create custom element
-   /playlist/trackList/track/link -\> No need in RSS
-   /playlist/trackList/track/meta -\> No need in RSS
-   /playlist/trackList/track/extension -\> No need in RSS

Again, pretty close match. As you can see, the majority of the
XSPF elements have a direct equivalent on the RSS side. Certainly, the
most important elements (playlist title, list of tracks, track location)
have a direct equivalent. For the remaining XSPF elements that have no
RSS equivalent, you could easily extend RSS to support those elements.
In fact, you can easily encode the [sample
playlists](http://www.xspf.org/xspf-v1.html#rfc.section.1.1) from the
XSPF spec in RSS without any extensions whatsoever:

``` xml
<rss version="2.0">
  <channel>
    <title>My Playlist</title>
    <link>http://devhawk.net/playlists/myplaylist</link>
    <description>Here's my playlist</description>
    <item>
        <enclosure length="..." type="audio/mpeg" url="http://example.com/song_1.mp3"/>
    </item>
    <item>
        <enclosure length="..." type="audio/mpeg" url="http://example.com/song_2.mp3"/>
    </item>
    <item>
        <enclosure length="..." type="audio/mpeg" url=http://example.com/song_3.mp3/>
    </item>
  </channel>
</rss>
```

So you may be wondering why I’m taken so much time on this topic.
Frankly, I don’t really care one way or the other about XPSF. As I wrote
in my last post, I’m just trying to understand this space better. The
reason this specific example interests me is because it is so obviously
a duplication of effort with little discernable upside. And furthermore
it’s [being touted by Marc
Canter](http://blog.broadbandmechanics.com/2006/02/rob-lord-replies-correctly-songbird-will-support-xspf)
who I know is [all about open
standards](http://www.broadbandmechanics.com/openstandards.htm). Why is
the XSPF open standard better than the RSS open standard? Or Atom for
that matter? Atom’s creators [explicitly
describe](http://www.atomenabled.org/developers/syndication/) Atom’s
syndication format as “an XML-based Web content and metadata syndication
format”. How is XSPF different from that, other than narrowing the scope
down to multimedia content and metadata? What’s the value of the narrow
scope specification when the wider scope specification is so widely
adopted?

As you might guess, my opinion is that the narrow scope specification
has no value. I assume that’s why Lucas responded so negatively. But the
root issue doesn’t go away. XSPF and RSS both describe lists of stuff.
XSPF is specific to lists of media while RSS is typically used for lists
of weblog entries but can be used for lists of anything – including
media. What’s a podcast feed but an RSS encoded playlist?

The problem is that by introduced yet another syntax for basically the
same semantics, XSPF can’t take advantage of the existing tools and
platforms around RSS. And I’m not just talking about the [Windows Feed
API](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/feedsapi/rss/overviews/msfeeds_ovw.asp),
I’m talking about every implementation of RSS on every website and in
every news reader or podcatcher around. Why wouldn’t you want to ride
that wave?
