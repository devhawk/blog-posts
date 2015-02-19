[Michael Foord](http://www.voidspace.org.uk/python/weblog/index.shtml)
(aka voidspace)
[twittered](http://twitter.com/voidspace/statuses/855791807) that “None
of the IronPython team can get it together to blog regularly, except
@[jschementi](http://twitter.com/jschementi) of course.” While I’m not
sure [Jimmy](http://blog.jimmy.schementi.com/) is all that prolific
either, Michael’s certainly right about me. I started this job at the
beginning of April, and I’ve only blogged twenty one times in the three
and a half months since. Worse, I’ve only blogged *six* times in the
past month and a half – and half of those have been since Michael called
out my lack o’ posting. My wife has blogged like *twenty five* times in
that same time period. I can only plead pressures of a new job plus a
two week vacation. I have been [twittering a
lot](http://twitter.com/devhawk).

Michael was twittering in response to Todd Ogasawara’s
[post](http://www.oreillynet.com/onlamp/blog/2008/07/ironpython_20_beta_3_and_pytho.html)
wondering about our Python 3.0 plans. Since we haven’t been particularly
transparent (my fault) I thought I’d lay out our near and middle term
plans.

First off, we’re on the verge of releasing 1.1.2 (the [release
candidate](http://www.codeplex.com/Release/ProjectReleases.aspx?ProjectName=IronPython&ReleaseId=15198)
is available now), a service release in our 1.x branch which contains a
bunch of bug fixes we’ve back ported from our 2.0 work. This is our last
planned release in the 1.x branch. For those who don’t know, our 1.x
branch tracks [CPython’s 2.4
branch](http://www.python.org/download/releases/2.4/).

Most of our team’s focus has been on 2.0 which we’re on track to
shipping later this year. Our 2.0 corresponds to [CPython’s 2.5
branch](http://www.python.org/download/releases/2.5). It’s a major
release for us because of the addition of the [Dynamic Language
Runtime](http://blogs.msdn.com/hugunin/archive/2007/04/30/a-dynamic-language-runtime-dlr.aspx).
Currently, you can get [2.0 Beta
3](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=12988),
with Beta 4 scheduled for early August (we go about 6 weeks between beta
releases). If you want even fresher code than our latest release, you
can pull and build [the
source](http://www.codeplex.com/IronPython/SourceControl/ListDownloadableCommits.aspx)
yourself. We went about two months without pushing source due to some
broken scripts, but they’re fixed now so we’re going to try and push out
code much more often than we have in the past.

For the non-Python geeks in the audience, Python is undergoing a major
change. [Python 3.0](http://www.python.org/dev/peps/pep-3000/) is going
to break backwards compatibility with Python 2.x in [number of
ways](http://www.python.org/dev/peps/pep-3100/). Breaking backwards
compatibility always has to be handled carefully, so the Python
community is investing quite a bit of effort to make the transition as
smooth as possible.The Python Software Foundation is currently working
on both [2.6](http://www.python.org/download/releases/2.6/) and
[3.0](http://www.python.org/download/releases/3.0/) simultaneously. The
idea is to have as much feature parity between the two releases (except
for the stuff being removed from 3.0) and to provide an [automatic
tool](http://svn.python.org/view/sandbox/trunk/2to3/) to translating to
the new version.

Let me be very clear (since as Todd discovered, we haven’t been to date)
that once we get IronPython 2.0 out the door, we will start working
towards IronPython 3.0, which will be our version of Python 3.0. We want
to take the same stepping-stone approach that CPython is taking. So that
means *at a minimum* we’ll do an IPy 2.1 with CPython 2.6′s [new
language and library
features](http://docs.python.org/dev/whatsnew/2.6.html), (along with the
usual bug fixing and other quality improvements we do every cycle)
before then proceeding to work on IPy 3.0.

Until we get IPy 2.0 out the door, I’m not willing to talk about
specific timelines. We’re an agile project and we’re going to be feature
and quality driven, full stop. There were about seven months between the
release of IPy 1.0 and 1.1, however that didn’t include much new Python
feature work so it’s not a good comparison IMO. My gut tells me the IPy
2.1 release will take longer than a typical minor release while the IPy
3.0 release won’t take as long as a typical major release. Note, those
are *guesses*, not *commitments*.

Besides IPy 2.1 and 3.0, the other major thing we’re working on is
Visual Studio integration for IronPython. Yes, there is
[IronPythonStudio](http://codeplex.com/IronPythonStudio), but that’s a
VS SDK sample not a production-quality VS integration the IPy team
maintains or supports. The IntelliSense implementation is pretty flaky,
the compile-oriented project system feels pretty un-pythonic and of
course we need to upgrade it to support IPy 2.0 and the DLR (it would be
nice if IronRuby could leverage our efforts down the road). Like
everything else we do in this group, we’ll be publishing the VS
Integration source code up on CodePlex as early and often as we can.

So to recap our current thinking:

-   IPy 1.1.2 in RC now, shipping in several weeks assuming we don’t
    find any major regressions
-   IPy 2.0 in beta now, shipping later this year
-   IPy 2.1 supporting new CPy 2.6 features at some point after IPy 2.1,
    probably longer than a typical minor release
-   First release of IPy integration with VS in the same timeframe as
    IPy 2.1 but with alpha drops as soon as we can 
-   IPy 3.0 supporting new CPy 3.0 after IPy 2.1, probably shorter than
    a typical major release

One last thing, as many of you know the IronRuby project supports
[community
contributions](http://www.ironruby.com/Frequently_Asked_Questions/How_do_I_contribute_modifications_I've_made_to_the_code%3f)
to the standard libraries. I wanted the IPy community to know I’m 100%
committed for establishing a similar arrangement for IronPython. I’ve
got nothing to announce yet, but rest assured I’ve been spending a lot
of time talking to lawyers.

As always, if you’ve got opinions to share please feel free to leave me
comments below, [shoot me an email](mailto:harry.pierson@microsoft.com),
or join the [IPy mailing
list](http://lists.ironpython.com/listinfo.cgi/users-ironpython.com).
