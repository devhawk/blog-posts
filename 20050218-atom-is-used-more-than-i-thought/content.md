When I [upgraded](http://devhawk.net/2005/02/10/new-dasblog-version/) to
DasBlog 1.7.2, I had to create an empty rss.aspx file on disk to fool
the Title Mapper (that’s the part the handles the new title based URLs)
into not looking for a post with the title “rss”. I knew that a large
number of people read my post via the RSS feed, so I didn’t want to
break what has been the feed address since DevHawk started. However, I
didn’t think the atom feed would matter as much, so I didn’t bother to
do the workaround for atom.aspx. Turns out I was wrong. Atom.aspx was
requested nearly once a minute between 11pm and 12am yesterday. I got
tired of counting, but I’m guessing that number is even higher during
the middle of the day since just over half of my traffic comes from the
US + Canada. So I created an empty atom.aspx page to fool the Title
Mapper even further.

Now, will I have to do the same for my
[CDF](http://devhawk.net/cdf.ashx) feed?
