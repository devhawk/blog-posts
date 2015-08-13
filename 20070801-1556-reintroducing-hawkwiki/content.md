In case you didn’t know, [GotDotNet](http://www.gotdotnet.com/) is
shutting down. I recently got an email asking about my very old [DevHawk
Wiki project](http://devhawk.net/prj_wiki.aspx), which had been hosted
on GDN. I didn’t realize anyone was still interested in this project, so
I set up a [new project](http://www.codeplex.com/HawkWiki) for it on
CodePlex. As part of the move, I decided to rebrand it “HawkWiki” and
change its license to
[Ms-PL](http://www.microsoft.com/resources/sharedsource/licensingbasics/sharedsourcelicenses.mspx#EDC). (CodePlex
doesn’t support the [zlib
license](http://opensource.org/licenses/zlib-license.php) DevHawk Wiki
was originally released under.)

I uploaded two versions to the HawkWiki [source
repository](http://www.codeplex.com/HawkWiki/SourceControl/ListDownloadableCommits.aspx).
The version that until recently was hosted on GDN is [version
0.2](http://www.codeplex.com/HawkWiki/SourceControl/DownloadSourceCode.aspx?changeSetId=2039).
There’s also [later
version](http://www.codeplex.com/HawkWiki/SourceControl/DownloadSourceCode.aspx?changeSetId=2084)
that I never publicly released before. This later version compiles the
wiki markup text into an IHttpHander class, similar to how ASP.NET
compiles web pages. I’m not sure if you’d ever really want a wiki built
this way, but it does provide a good example for building your own
compiled web page infrastructure. If you ever read my old [MSDN magazine
article](http://devhawk.net/prj_webskin.aspx), you’d know this is an
approach I’ve been interested in for a long time.

I also used this project as an excuse to get to know CodePlex. Though
CodePlex can integrate directly into VS via [Team
Explorer](http://www.codeplex.com/CodePlex/Wiki/View.aspx?title=Obtaining%20the%20Team%20Explorer%20Client),
I chose instead to use the [CodePlex
client](http://www.codeplex.com/CodePlexClient). CPC provides an
edit-merge-commit command-line experience like Subversion. I found it
much easier than using Team Explorer, though adding new files was
troublesome since they had to be added to the project and source control
separately. If you like this approach, there’s also a version that works
with vanilla TFS instances (CPC is hardwired to CodePlex).

So feel free to take the wiki code and mangle it to your heart’s
content. If there’s interest, I’d be willing to grant some other folks
checkin permission. However, it’s more a curiosity than a real project,
so if you’re really interested in a .NET based wiki, there are
[better](http://www.screwturn.eu/) [choices](http://www.flexwiki.com/)
out there.
