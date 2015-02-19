The .NET Framework 4.0 and Visual Studio 2010 Beta 1 is now [generally
available](http://go.microsoft.com/fwlink/?LinkID=151797) for download.
Jason Zander has a very thorough rundown on [some of the new
features](http://blogs.msdn.com/jasonz/archive/2009/05/18/announcing-vs2010-net-framework-4-0-beta-1.aspx)
in this release. Of course, my favorite new features in VS2010 is the
new dynamic language support in
[C\#](http://msdn.microsoft.com/en-us/library/dd264736(VS.100).aspx) and
[Visual
Basic](http://msdn.microsoft.com/en-us/library/dd537660(VS.100).aspx),
which let’s you easily call out to IronPython code from those languages.

For anyone who wants to experiment with interoperating C\# or VB with
IronPython, we released [IronPython 2.6 CTP for .NET 4.0 Beta
1](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=27320)
today. There’s also a
[walkthru](http://msdn.microsoft.com/en-us/library/dd867744.aspx)
showing how you can use the standard Python library module
[random](http://docs.python.org/library/random.html) from both C\# and
VB. ~~Note, there’s currently a URL bug in that walkthru – it links to
IronPython 2.6 Alpha 1 rather than the .NET 4.0 Beta 1 IronPython CTP.
Make sure you pick up the right version of IronPython if you want to try
out the walkthru.~~ Looks like they fixed the redirect in the walkthru.

FYI, this is a CTP quality release with about the same functionality as
IronPython 2.6 Alpha 1.  Essentially, this is the version of IronPython
that was in the source tree when the VS team branched for Beta 1.

If you’ve got any feedback, please drop us a line on the [mailing
list](http://lists.ironpython.com/listinfo.cgi/users-ironpython.com).
