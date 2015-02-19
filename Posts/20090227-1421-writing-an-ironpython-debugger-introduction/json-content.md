A while back I [showed
how](http://devhawk.net/2008/05/08/Debugging+IronPython+Code+In+Visual+Studio.aspx)
you can use Visual Studio to debug IronPython scripts. While that works
great, it’s lots of steps and lots of mouse work. I yearned for
something lighter weight and that I could drive from the command line.

The .NET framework includes a command line debugger called
[MDbg](http://msdn.microsoft.com/en-us/library/ms229861.aspx), but after
using it for a bit, I found it didn’t like it very much for IronPython
debugging. Mdbg automatically sets a breakpoint on the main entrypoint
function, but only if it can find the debugging symbols. So when you use
Mdbg with the released version of IPy, the breakpoint never gets set.
Instead, you have to trap the module load event, set a breakpoint in the
python file you’re debugging, then stop trapping the module load event.
Every Time. That gets tedious.

Another problem with MDbg is that it’s not
[Just-My-Code](http://blogs.msdn.com/jmstall/archive/2004/12/31/344832.aspx)
(aka JMC) aware. JMC is this awesome debugging feature that was
introduced in .NET 2.0 that lets the debugger “paint” the parts of the
code that you want to step thru (aka “My Code”). By default, Visual
Studio marks code with symbols as “my code” and code without symbols as
“not my code”. [1] We don’t ship symbols with IronPython releases, so
Visual Studio does only steps thru the python code. MDbg doesn’t support
JMC, so I often found myself stepping into random parts of the
IronPython implementation. That’s even more tedious.

Luckily, the [source
code](http://www.microsoft.com/downloads/details.aspx?familyid=38449a42-6b7a-4e28-80ce-c55645ab1310&displaylang=en)
to MDbg is available. So I got the wacky idea to build a debugger
specifically for IronPython. CPython includes
[pdb](http://docs.python.org/library/pdb.html) (aka Python Debugger, not
[Program
Database](http://msdn.microsoft.com/en-us/library/yd4f8bd1.aspx)) but we
don’t support it because we [haven’t
implemented](http://ironpython.codeplex.com/WorkItem/View.aspx?WorkItemId=1042)[settrace](http://docs.python.org/library/sys.html#sys.settrace).
Thus, ipydbg was born.

Over the course of this series of blog posts, I’m going to build out
ipydbg. I have built out a series of prototypes so I fairly confident
that I know *how* to build it. However, I’m not sure what it will look
like at the end. If you’ve got any strong opinions on it one way or the
other, be sure to email me or leave me comments.

BTW, major thanks to my VSL teammate [Mike
Stall](http://blogs.msdn.com/jmstall) (of Mike Stall’s .NET Debugging
Blog). Without his help, I would probably still be trying to make heads
or tails of the MDbg source.

------------------------------------------------------------------------

[1] VS uses the
[DebuggerNonUserCode](http://msdn.microsoft.com/en-us/library/system.diagnostics.debuggernonusercodeattribute.aspx)
attribute to provide fine grained control of what is considered “my
code” and should be stepped thru.
