It’s been almost a week since my [last ipydbg
post](http://devhawk.net/2009/03/13/Writing+An+IronPython+Debugger+Debugging+Just+My+Code.aspx).
I’m not done, I just needed to catch my breath for a few days and get
some other work done. Contrary to popular believe, my day job revolves
around more than just ipydbg!
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)

Actually, I’ve made ten commit since my last post, but it’s been a
mostly minor changes. For example, I was hacking around with breakpoints
and restored a bunch of [commented out code in
BreakpointEnumerator](http://github.com/devhawk/ipydbg/commit/4ca5f2af90b73950f85cadfed7f3ca07cb783bba).
Since I was changing the original C\# CorDebug wrapper source, I decided
to add a [few helper
functions](http://github.com/devhawk/ipydbg/commit/0b50760d522c71be78839d3c38bc9f3e2ee2a168)
to return metadata for functions and classes as well as cleaning up some
C\# filenames. On the Python side, I [added an active\_appdomain
field](http://github.com/devhawk/ipydbg/commit/0cc6f38db56f4b6cc35acc75f8a28aae070c615a)
to IPyDebugProcess to go along with active\_thread.

Today, I added what started as a fairly minor feature – showing the
current line of source code at the start of the input loop. The [initial
code](http://github.com/devhawk/ipydbg/commit/2e7681966be3aebbcfb7cefd6488d34fc62427cd)
for this was cake, simply getting the sequence point for the current
location and mapping that to a source file. In order to avoid hitting
the file system over and over, I cache source files the first time they
are accessed.

``` {.brush: .python}
def _get_file(self,filename):     
    filename = Path.GetFileName(filename)     
    if not filename in self.source_files:     
      self.source_files[filename] = File.ReadAllLines(filename)     
    return self.source_files[filename]  

def _input(self):     
    offset, sp = self._get_location(self.active_thread.ActiveFrame)     
    lines = self._get_file(sp.doc.URL)     
    print "%d:" % sp.start_line, lines[sp.start_line-1]     
    #input loop ommited for clarity
```

However, when I did this, I discovered a slight issue. When you step
into a Python function, the CLR debugger breaks at the very beginning of
the function being stepped into. In C\#, the function start is mapped to
the opening curly brace of the function. IronPython, on the other hand,
doesn’t map the start of the function to anything since there’s a bunch
of infrastructure code at the start of every function that has no
correlation to the python source. This means \_get\_location return a
null sequence point when I first step into a function and thus I
wouldn’t be able to show any source code.

I could make the argument that start of the function should be mapped to
the colon that starts the function block. However, I’m not in a position
to make changes to how the shipping version of IronPython emits debug
symbols. So instead, I decided to insert an automatic step whenever I
step into a function by modifying OnStepComplete:

``` {.brush: .python}
def OnStepComplete(self, sender,e):     
    offset, sp = self._get_location(e.Thread.ActiveFrame)     
    print "OnStepComplete Reason:", e.StepReason,      
           "Location:", sp if sp != None else "offset %d" % offset     
    if e.StepReason == CorDebugStepReason.STEP_CALL:     
      self._do_step(e.Thread, False)     
    else:     
      self._do_break_event(e)
```

I have this nagging feeling that a simple step won’t suffice and I’ll
need to add logic to ensure that I’m only auto-stepping when the start
of the function doesn’t have a matching sequence point. But I have
tested this with a few different python scripts and it appears to work
fine. If I need something more sophisticated, I can always add it later.
BTW, notice I modified the signature of \_do\_step so that it takes the
thread as an argument rather than picking it up as an IPyDebugProcess
field.

As usual, [latest
ipydbg](http://github.com/devhawk/ipydbg/tree/2e7681966be3aebbcfb7cefd6488d34fc62427cd)
(including new compiled version of CorDebug.dll) is available at GitHub.
