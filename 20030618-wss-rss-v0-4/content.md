It’s taken long enough, but I’m finally getting [WSS RSS
v0.4](prj_sharepointsynd.aspx) out the door. Primary new feature is
support for customizing the RSS feed on a list type basis. I had made a
[slight unreleased
change](http://devhawk.net/2003/05/19/small-wss-rss-update/) to
expose pubDate as well as dc:date. Now, that stuff is all in the
wssrss.config file so it’s easy to add support for whatever item
elements you want. There is also support for expiring items in the feed
based on age or on value match (for example, exclude tasks that are
marked completed), again configured via the wssrss.config file. In even
bigger news, I didn’t change the installer process this time.

It’s going to be a while before I do a v0.5 release. I want to enable
configuration of the RSS feed on a per-list basis, instead of just on a
per-list-template basis. Plus I’ve got a few bugs and I want to figure
out how to expose a UI link to the OPML and RSS feeds on a WSS website.
But I think I want to wait until a later build of WSS is available. I’ve
gotten email from a WSS early adopter program members who is having
issues with WSSRSS and a later build of WSS (sorry, v0.4 will have the
same issue). I’m hoping to get access to a later build, but obviously,
I’m not going to publicly post a new version of WSSRSS if the
corresponding build of WSS isn’t generally available. Also, while there
has been some strong interest in WSSRSS, it started life as a demo to
help me learn how to program WSS. I’ve got other things I want to try
with WSS that have sat on the back burner while I worked on WSSRSS. I
promise to post code when I get something working.
