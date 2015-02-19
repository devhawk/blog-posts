I’m kicking around [SharePoint
Syndication](unsaved:///prj_SharePointSynd.aspx) again. There are a
variety of reasons. I got email from someone @ the [SP Web Component
Directory](http://www.microsoft.com/sharepoint/downloads/components/default.asp) about
it. According to Scoble, the Front Page team is [interested in
RSS](http://radio.weblogs.com/0001011/2004/01/15.html#a6193). And the
primary kicker, there’s a project going on in my group internally that
is using WSS and wants to expose RSS feeds.

Glad to know it’s popular. Too bad it’s not done and I’m not sure how to
finish it.

Generic feed generation works just fine. The problem is customization. I
need a user-friendly way (i.e. not hacking XML in the config file) to
configure the feeds. Currently, the config file specifies which lists
and webs expose feeds as well as the format of the feed for different
list templates. I want to move that config so that it can be managed by
the administrator using a simple UI, not the XML file. But that leads to
questions: Do I try and stash my config data into the existing web and
list configuration via the standard object model or do I bite the bullet
and store it somewhere else (i.e. another DB)? What’s the best way to
add admin of the feed to the existing admin pages? Frankly, I don’t know
the answer to these questions.

One way to solve this problem would be to completely refactor the
solution. Instead of relying on the [WSS object
model](http://msdn.microsoft.com/library/en-us/spptsdk/html/SPPTWSSClassLibrary.asp),
I would leverage the [WSS web
services](http://msdn.microsoft.com/library/en-us/spptsdk/html/soapnsMicrosoftSharePointSoapServer2.asp).
This would let me run the feed generator outside of the confines of WSS.
Basically, I’d just be translating formats – the output of the web
services into RSS and OPML. This would be really great for [hosted
WSS](http://www.microsoft.com/windowsserver2003/techinfo/sharepoint/trial.mspx)
since it wouldn’t require any change to the WSS site itself. However,
doing the security right for this scenario would be a pain in the ass.
WSS web services use transport level authentication which means it’s
difficult to “hop” credentials across servers.

I don’t know if the answers to these dilemmas are out there in the
blogosphere, but I figured I might as well put the questions out there.
