> Fans of Python use the phrase “batteries included” to describe the
> [standard library](http://docs.python.org/lib/lib.html), which covers
> everything from asynchronous processing to zip files.\
> [About Python](http://www.python.org/about/)

I’m very happy to announce that as of [IronPython Beta
4](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=14353),
we are including the Python standard library in an IronPython release.
In addition to the usual binary and source zip archives, we’re shipping
an MSI installer that gives you the option to include the library files.
I
[mentioned](http://devhawk.net/2008/07/16/ironpython-post-2-0-roadmap/)
a couple of weeks ago that I’ve been spending a lot of time with
lawyers, and this is the first step towards making the IronPython
project as open as possible. Note the use of the word “first” in that
previous statement. In other words, I’ve got more lawyers to talk to.

We’ve added a new standard library component category to the [IronPython
Issue
Tracker](http://www.codeplex.com/IronPython/WorkItem/AdvancedList.aspx).
So if you find any issues or incompatibilities with using the standard
library with IronPython, please files bugs on them. We haven’t figured
out what set of libraries we’re going to ship, but we don’t want to
include ones that we know wont work. For example, Kevin Chu [reported on
the mailing
list](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-August/007908.html)
that importing the sqlite3 module fails. This is because we don’t have a
managed version of the \_sqlite3 C-based module. So that’s one we’ll
probably remove outright.

Also, this is the first release we’ve distributed as an MSI file, and it
looks some folks on the mailing list have had some troubles with it. If
you have issues, please file setup bugs as well.
