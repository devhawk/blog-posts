[IronPython
2.0](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=8365)
shipped [about a month
ago](http://devhawk.net/2008/12/10/ipy-rtw-ftw/), but we’re still
chugging along with our post 2.0 work. We’ve shipped seven [source code
releases](http://www.codeplex.com/IronPython/SourceControl/ListDownloadableCommits.aspx)
since we shipped 2.0 and we should be back to our normal schedule of
updating the source 2-3 times a week schedule by next week. Given how
often we ship source, we’re thinking of extending the the time between
binary drops. Binary releases have to be signed and there’s a fairly
arduous process we have to go thru in order to get each binary release
out the door.

However, there’s something nice and convenient about downloading a
pre-compiled binary release. So I spent my Christmas vacation building a
script to download and build IronPython nightly builds. Once built, I
compress the binaries and upload them to [Azure blob
storage](http://msdn.microsoft.com/en-us/library/dd135733.aspx).
Finally, I built a [*very* simple cloud
app](http://nightlybuilds.cloudapp.net/) for users to view and download
available nightly builds. As an extra benefit, I’m also providing
nightly builds of the [DLR](http://codeplex.com/dlr).

Please note, these are \*NOT\* official Microsoft releases of IronPython
and/or DLR. They aren’t signed and they haven’t gone through the
aforementioned release process. I’m just downloading the public source,
building it with the publicly available tools, then making them
available on a a publicly accessible website.

The website for the IronPython (and DLR) nightly builds is
<http://nightlybuilds.cloudapp.net>.

As usual, I welcome any feedback. Is having prebuilt unsigned binaries
of IPy releases useful? Do you want IronRuby binaries as well? What
about social features (rating releases, comments, etc)? Please let me
know what you think.
