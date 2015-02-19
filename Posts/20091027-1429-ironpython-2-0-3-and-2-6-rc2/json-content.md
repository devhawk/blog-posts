It has been a very busy week for the IronPython team. Just under a week
ago, we shipped a [CTP for .NET Framework
4.0](http://devhawk.net/2009/10/21/IronPython+And+IronRuby+CTPs+For+NET+40+Beta+2.aspx).
Since then, we’ve shipped two – yes, two! – more versions of IronPython.
Three releases in one week! If we could keep up that pace, we’d be
shipping like 27 more releases of IronPython by the end of the year!

FYI, we’re not going to keep up the pace of shipping three releases a
week for the next two months. We may be a little crazy on the IronPython
team, but we’re not THAT crazy!

Actually, all three of these releases represent fairly small changes in
the IronPython source tree. The .NET 4.0 beta was a CTP, so it’s
basically whatever we had in our main trunk when they forked .NET
Framework for the beta.

[IronPython
2.0.3](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=30416)
is a minor point release in the 2.0 branch (duh). In addition to
backporting some fixes from 2.6, we had to fix an CLR breaking change in
partial trust on Windows 7. If you’re using IronPython 2.0.x in partial
trust on Windows 7 you \*MUST\* upgrade to 2.0.3 (or 2.6 when it’s
released). Sorry about that – but it was out of our hands.

[IronPython 2.6
RC2](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=34451)
is – as you would expect – a minor update over the first release
candidate. There was a memory leak discovered in the hosting APIs which
forced us to do a second release candidate. Since we had to fix that, we
took in a few of other fixes including some standard library changes (we
left out json by accident in RC1 and Michael Foord got logging updated
to work better with IronPython so we took the latest version of it). As
per the release notes, we expect this to be the final RC and will
re-ship it as RTM in about a month. Please start using this latest
release and let us know if you find anything.
