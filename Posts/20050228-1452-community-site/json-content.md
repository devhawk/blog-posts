I’m trying to set up a community site for some old friends from high
school. Got the domain name, got the hosting space, just need to figure
out what to run on the site.

I started by looking the old IBuySpy portal. It’s been a while – it’s
now called the [ASP.NET Portal Starter
Kit](http://www.ibuyspy.com/PortalStarterKit/DesktopDefault.aspx). Looks
as good as it did when it first came out. However, there’s a slight
security issue. My hoster doesn’t allow unauthenticated write access to
the file system. Most of the ASP.NET Portal data is stored in the
database, however the actual site layout is stored in an [on-disk XML
file](http://www.ibuyspy.com/PortalStarterKit/sourceviewer/srcview.aspx?path=webconfig.src&file=PortalCfg.xml&rows=2).
I could work around this by setting up a portal on my local machine,
building out the site, and then uploading the relevant xml file, but I
want to have my good friend back east help manage the site, so that
workaround does’t work too well.

Next choice was [DotNetNuke](http://www.dotnetnuke.com/). They’re about
to release their 3.0 version (3.0.11 is supposed to be the final beta).
Looks really nice and installed very easily on my local testbed.
However, my hoster also doesn’t give my DB account owner rights – I get
reader, writer, DDL and security admin but not owner. DNN installs a
series of stored procedures (which works on my machine due to having DDL
permissions) but doesn’t give EXEC permissions to those procs to anyone
except DBO. Woops. I wrote a small utility app that extracts a list of
all user stored procs and calls ``“GRANT EXEC ON \<\<SPNAME\>\> TO PUBLIC”``
on each one. Seems to work fine, but given the size of the DNN codebase,
I’m not sure I’m comfortable that there isn’t something else out there
that’s expecting DBO permissions.

Assuming I don’t go with ASP.NET Portal or DNN, what other choices do I
have? I’ve got pretty stringint security requirements, plus it has to
use ASP.NET (go figure). I’m still looking at:

-   [Rainbow Portal](http://www.rainbowportal.net) – similar to DNN in
    that it started from the original ASP.NET Portal source code
-   [ASP.NET Community Starter
    Kit](http://asp.net/StarterKits/StarterKitRedirect.aspx?Item=CommunityLive) (CSK)
    – A baseline starter kit for building a community oriented site.
    Sounds promising.
-   [GotCommunityNet](http://gotcommunitynet.com/) – derivative of the
    community starter kit. They bill themselves as CSK 1.1. Sounds even
    more promising.

Any other suggestions?
