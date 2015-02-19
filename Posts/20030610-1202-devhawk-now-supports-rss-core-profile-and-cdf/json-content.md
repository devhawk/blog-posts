I upgraded my weblog slightly today. Primarily, I updated my [RSS
feed](rss.aspx) to support [Timothy
Appnel’s](http://www.mplode.com/tima/)[RSS Core Profile Draft
2](http://www.mplode.com/tima/archives/000291.html). In addition to
mundane changes (pubDate becomes dc:date), I’m finally supporting
xhtml:body for my content. Also, a la Timothy’s [sample
feed](http://www.mplode.com/tima/xml/xss-extensible.xml), I’m using a
default namespace to finally move all of the RSS elements into a
namespace. According to the profile draft, using a default namespace
should be considered “optionally permissible”. [RSS
Bandit](http://www.gotdotnet.com/Community/Workspaces/Workspace.aspx?id=cb8d3173-9f65-46fe-bf17-122e3703bb00)
handled the updates. Since I’m curious, [email
me](mailto:harry@devhawk.net?subject=My%20News%20Reader%20doesn't%20handle%20the%20DevHawk%20RSS%20Feed)
if your reader doesn’t.

I also added support for
[CDF](http://msdn.microsoft.com/library/default.asp?url=/workshop/delivery/channel/channel_node_entry.asp)
as per [Don’s suggestion last
month](http://www.gotdotnet.com/team/dbox/default.aspx?key=2003-05-13T07:47:38Z).
It was simple, so I figured what the heck. I did have to search a little
to discover that for CDF, the contentType has to be set to
“application/x-cdf” in order to get IE to recognize that it’s not just
vanilla XML. I had to use
[Google](http://www.google.com/search?hl=en&lr=&ie=UTF-8&oe=UTF-8&q=cdf+contenttype&btnG=Google+Search)
to find this info, since [searching MSDN for “cdf
contenttype”](http://search.microsoft.com/default.asp?so=RECCNT&siteid=us/dev&p=1&nq=NEW&qu=cdf+contenttype&IntlSearch=&boolean=ALL&ig=01&i=00&i=01&i=02&i=03&i=04&i=05&i=06&i=07&i=08&i=09&i=10&i=11&i=12&i=13&i=14&i=15&i=16&i=17&i=18&i=19&i=20&i=21&i=22&i=23&i=24&i=25&)
came up blank.
