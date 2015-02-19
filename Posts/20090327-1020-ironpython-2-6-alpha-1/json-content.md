Just in type for [PyCon](http://us.pycon.org/2009/about/), we just
shipped the [first alpha of IronPython
2.6](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=22982).
As you can guess from the version number, the main feature of this
version of IronPython will be the [new features introduced in Python
2.6](http://docs.python.org/whatsnew/2.6.html). As you can see, we’ve
synced version numbers between IronPython and Python. No more explaining
which version of IPy goes with which version of Python.

In addition to the start of 2.6 support, the other big feature of
IronPython 2.6 is something called Adaptive Compilation. IronPython’s
performance [is pretty
good](http://ironpython.codeplex.com/Wiki/View.aspx?title=IP201VsCPy25Perf&referringTitle=IronPython%20Performance)
compared to CPython. We’re about 28% faster than CPython (IPy 2.0.1 vs.
CPy 2.5) on PyStone and about 10% faster on PyBench *if you exclude the
TryRaiseExcept test*. [1] However, our startup time is not very good.
These two facts are related: it takes a long time on startup to compile
to Python code to IL (and then JITted from IL to native code), but once
that’s done the code runs really fast. However, if you’re only going to
execute a function a few times, it typically isn’t worth the overhead to
compile the function to IL. The Adaptive Compilation feature is an
[interpreter](http://ironpython.codeplex.com/SourceControl/changeset/view/48484#706048)
for DLR trees. The first few times you run a given Python function, it
gets interpreted. At some point, after you’ve called the function enough
times, IronPython 2.6 decides to take the hit and compile the function.
If you want to go back to the old “always compile to IL” model, you can
pass –O on the command line.

This is our first alpha of 2.6, and some things are kinda broken. In
particular, there was a change to collections.py that breaks much of the
Python Standard Library under IronPython. Dave [has the
details](http://knowbody.livejournal.com/13271.html) and the workaround.
Rest assured, this will get fixed before we release. Dino is hard at
work making
[\_getframe](http://docs.python.org/library/sys.html#sys._getframe) work
for depths greater than zero. Because it will have some perf impact, it
won’t be enabled by default – you’ll have to pass a command-line
parameter to enable it. But if you have to opt-in to \_getframe support
for depth \> 0, it makes sense to opt-into \_getframe support entirely
and do away with the current \_getframe(0) only support. What’s nice
about this approach is that it will work with collections.py regardless
if you opt-in to \_getframe or not.

As stated in the release notes, the release cycle on 2.6 will be much
shorter than 2.0. There was only seven months between 1.0 and 1.1, and
we’re shooting for a slightly longer timeframe for 2.6. Certainly not
like the twenty months that passed between 1.1 and 2.0. So please start
trying it out as soon as you can and give us your feedback.

------------------------------------------------------------------------

[1] IPy is *over 4000% slower* than CPy on TryRaiseExcept, 58,234 ms vs.
1,286ms. This one test represents 44% of our overall test run time and
causes IPy to run PyBench 57% slower than CPy instead of 10% faster.
Python has a different philosophy on exceptions than CLR does. Several
Python exceptions like
[GeneratorExit](http://docs.python.org/library/exceptions.html#exceptions.GeneratorExit)
and
[StopIteration](http://docs.python.org/library/exceptions.html#exceptions.StopIteration)
are explicitly documented as “not considered an error”. This is a very
different approach to [CLR’s
approach](http://blogs.msdn.com/ricom/archive/2003/12/19/44697.aspx). At
some point, we’re going to have to look at improving exception
performance, but it’s not really a priority for the 2.6 release.
