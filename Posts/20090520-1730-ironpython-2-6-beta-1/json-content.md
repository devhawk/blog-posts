In addition to the [IronPython CTP for .NET Framework 4.0 Beta
1](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=27320)
I [blogged about
earlier](http://devhawk.net/2009/05/20/ironpython-2-6-ctp-for-net-4-0-beta-1/),
we also released the [first beta of IronPython
2.6](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=25126)
today. How about that – two IronPython releases in one day! This is our
second preview release as we work towards our 2.6 RTM in September. 2.6
Alpha 1 was
[released](http://devhawk.net/2009/03/27/ironpython-2-6-alpha-1/)
back in March.

There are two big new features in this release. The first is our
implementation of the [ctypes
module](http://docs.python.org/library/ctypes.html). The ctypes module
is like P/Invoke for Python. It allows Python code to call into
unmanaged DLL functions. Here, for example, I’m calling into the
standard [wprintf
function](http://msdn.microsoft.com/en-us/library/wc7014hz.aspx) from
msvcrt.dll

```
IronPython 2.6 Beta 1 (2.6.0.10) on .NET 2.0.50727.4918
>>> import ctypes
>>> libc = ctypes.cdll.msvcrt
>>> ret = libc.wprintf("%sn", "hello")
hello
```

Between ctypes and [Ironclad](http://code.google.com/p/ironclad/), I
think we’ll eventually be able to load most native Python extensions in
IronPython. Woot!

The other big new feature in this release is a real implementation of
[sys.\_getframe](http://docs.python.org/library/sys.html#sys._getframe).
\_getframe lets you write code that inspects the Python callstack.
Previously, we supported \_getframe only with a depth of zero which is
to say you could inspect the current frame, but no others. Now, by
default we don’t implement \_getframe at all unless you pass in
–X:Frames or –X:FullFrames on the command line. Removing the version of
\_getframe that only worked for depth zero fixes [an issue with
collections.py](http://knowbody.livejournal.com/13271.html) that broke
much of the 2.6 standard library in IronPython 2.6 Alpha 1.

The difference between Frames and FullFrames is in what is returned by
frame.f\_locals member. If you’re running with FullFrames, we hoist all
local variables into the heap so they can be accessed by our frame
walker. If you’re running with Frames, our ability to access locals up
the stack is limited. Sometimes they are available – If you called
[locals()](http://docs.python.org/library/functions.html#locals) in a
frame up the stack for example, then f\_locals will be available – but
usually not. There’s a performance difference between the default (i.e.
no Frames), –X:Frames and –X:FullFrames, hence why we provide the user
fine grained control over the Frame support.

Our
[performance](http://ironpython.codeplex.com/Wiki/View.aspx?title=IP26B1VsCPy26Perf&referringTitle=Home)
has gotten better
[relative](http://ironpython.codeplex.com/Wiki/View.aspx?title=IP26A1VsCPy26Perf&referringTitle=Home)
to 2.6 Alpha 1. Our PyStone numbers have improved 80% from Alpha 1,
similar to where we were in IronPython 2.0.1. We’ve also been able to
cut our startup time about 25% from 2.0.1. We’re still an order of
magnitude slower than CPython on startup, but we’re getting better.
We’re significantly worse on PyBench than we were in 2.6 Alpha 1, but
that’s primarily because there’s now a second exception test. As I
[described back in
March](http://devhawk.net/2009/03/27/ironpython-2-6-alpha-1/), we get
killed on the exceptions benchmarks – the two combine to consume nearly
62% of our total run time. Ouch!

Finally, there are bug fixes. Of particular relevance to readers of this
blog are a series of fixes that allow me to continue on with my
[\_\_clrtype\_\_
series](http://devhawk.net/CategoryView,category,__clrtype__.aspx).
Watch for that soon.

As I said back when we released Alpha 1, the [release cycle on
2.6](http://ironpython.codeplex.com/Wiki/View.aspx?title=2.6%20Release%20Plan)
will be much shorter than it was for 2.0. 2.0 had eight alphas, five
betas and two release candidates over the course of around twenty
months. We expect 2.6 to have one alpha, two betas and a release
candidate over eight months. So please start trying [using the
beta](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=25126)
as soon as you can so you can give us your feedback and we can fix your
bugs!
