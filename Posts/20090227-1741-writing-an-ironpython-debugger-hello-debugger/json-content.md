Since I’m guessing most of my readers have never build a debugger before
(I certainly hadn’t), let’s start with the debugger equivalent of Hello,
World!

``` python
import clr
clr.AddReference('CorDebug')

import sys
from System.Reflection import Assembly
from System.Threading import AutoResetEvent
from Microsoft.Samples.Debugging.CorDebug import CorDebugger

ipy = Assembly.GetEntryAssembly().Location
py_file = sys.argv[1]
cmd_line = ""%s" -D "%s"" % (ipy, py_file)

evt = AutoResetEvent(False)

def OnCreateAppDomain(s,e):
  print "OnCreateAppDomain", e.AppDomain.Name
  e.AppDomain.Attach()

def OnProcessExit(s,e):
  print "OnProcessExit"
  evt.Set()

debugger = CorDebugger(CorDebugger.GetDefaultDebuggerVersion())
process = debugger.CreateProcess(ipy, cmd_line)

process.OnCreateAppDomain += OnCreateAppDomain
process.OnProcessExit += OnProcessExit

process.Continue(False)

evt.WaitOne()
```

I start by adding a reference to the CorDebug library I discussed at the
end of [my last
post](http://devhawk.net/2009/02/27/Writing+An+IronPython+Debugger+MDbg+101.aspx)
(that’s the low level managed debugger API plus the C\# definitions of
the various COM APIs). Then I need both the path to the IPy executable
as well as the script to be run, which is passed in on the command line
(sys.argv). For now, I just use Reflection to find the path to the
current ipy.exe and use that. I use those to build a command line –
you’ll notice I’m adding the –D on the command line to generate debugger
symbols.

Next, I define two event handlers: OnCreateAppDomain and OnProcessExit.
When the AppDomain is created, the debugger needs to explicitly attach
to it. When the process exits, we signal an AutoResetEvent to indicate
our program can exit.

Then it’s a simple process of creating the CorDebugger object, creating
a process, setting up the process event handlers and then running the
process via the call to Continue. We then wait on the AutoResetEvent for
the debugged process to exit. And voila, you have the worlds simplest
debugger in about 30 lines of code.

To run it, you run the ipy.exe interpreter and pass in the ipydbg script
above and the python script to be debugged. You also have to pass –X:MTA
on the command line, as the ICorDebug objects only work from a
multi-threaded apartment. When you run it, you get something that looks
like this:

```
» ipy -X:MTA ipydbg.py simpletest.py
OnCreateAppDomain DefaultDomain
35
OnProcessExit
```

Simpletest.py is a very simple script that prints the results of adding
two numbers together. Here, you see the event handlers fire by writing
text out to the console.

For those of you who’d like to see this code actually run on your
machine, I’ve created an ipydbg project [up on
GitHub](http://github.com/devhawk/ipydbg/tree/master). The tree version
that goes with this blog post [is
here](http://github.com/devhawk/ipydbg/tree/5858695ff85ed4740ad06466d4f54394e7f00f9b).
If you’re not running [Git](http://git-scm.com/), you can download a tar
or zip of the project via the “download” button at the top of the page.
It includes both the CorDebug source as well as the ipydbg.py file
(shown above) and the simpletest.py file. It also has a compiled version
of CorDebug.dll, so you don’t have to compile it yourself (for those IPy
only coders who don’t have VS on their machine).
