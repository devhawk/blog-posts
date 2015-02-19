I’ve posted an update to my [SharePoint RSS Feed
Generator](prj_sharepointsynd.aspx) (which I now abbreviate WSS RSS).
New features of v0.3 are support for [OPML](http://www.opml.org) and
support for feed configuration. Now, the admin can specify which top
level sites, which subwebs and which lists are included in the RSS or
OPML feeds. I’ve also done a bunch of structural stuff – no more need to
edit web.config files. I’ve also produced separate binary and source
archives, which is much easier if you just want to install the bits
rather than play with the code.

I also modified the RSS feed to support
[Don’s](http://www.gotdotnet.com/team/dbox)[RSS 2.0
Profile](http://www.gotdotnet.com/team/dbox/default.aspx#nn2003-05-11T03:20:30Z)
(profile link might be wrong, GDN is down). Here is the OPML profile
that I am using in WSS RSS:

/outline/@type\
 mandatory – xsd:string\
 must equal “rss”

/outline/@title\
 mandatory if no description, optional otherwise – xsd:string (no
embedded markup)\
 title of the RSS feed (i.e. same as /item/title in RSS)

/outline/@description\
 mandatory if no title, optional otherwise – xsd:string (no embedded
markup)\
 description of the RSS feed (i.e. same as /item/description in RSS)

/outline/@xmlUrl\
 mandatory – xsd:anyURI (SHOULD be absolute)\
 url of RSS feed

/outline/@htmlUrl\
 mandatory – xsd:anyURI (SHOULD be absolute)\
 Url of HTML page
