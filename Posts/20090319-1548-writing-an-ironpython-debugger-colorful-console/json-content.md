Now that I’ve added the [current source code
line](http://devhawk.net/2009/03/19/writing-an-ironpython-debugger-showing-source-code/)
to the console output, I wanted to start using color in order to make it
clearer to understand the various pieces of data that gets output. Now,
the various event handler messages get output in dark grey while the
current line of source is in yellow. Here’s what it looks like on my
machine (note, the top line with the green [11] is PowerShell and ipy2
is a PowerShell alias to ipy.exe v2.0.1)

[![ipydbg on the
console](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_1_thumb.png "ipydbg on the console")](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_1.png)

Writing color to the windows console is a hassle because of the
[stateful
API](http://msdn.microsoft.com/en-us/library/system.console.foregroundcolor.aspx)
it uses. The problem is that I always want to return to the default
color after I’ve written out a line of colored text. I wish there was an
overload of Console.Write and WriteLine that took the foreground and
background colors as arguments.

Of course, I could easily implement my own write and writeline methods
that took color parameters. However, I was loath to do that as Python’s
print statement is so convenient. So instead, I build a console color
[context
manager](http://docs.python.org/reference/datamodel.html#context-managers).
I got the idea from Luis Fallas’ [XmlWriter context
manager](http://langexplr.blogspot.com/2009/02/writing-xml-with-ironpython-xmlwriter.html).

``` python
class ConsoleColorMgr(object):  
  def __init__(self, color):  
    self.color = color  

  def __enter__(self):  
    self.temp = Console.ForegroundColor  
    Console.ForegroundColor = self.color  

  def __exit__(self, t, v, tr):  
    Console.ForegroundColor = self.temp  

CCDarkGray = ConsoleColorMgr(ConsoleColor.DarkGray)
CCGray     = ConsoleColorMgr(ConsoleColor.Gray)
CCYellow   = ConsoleColorMgr(ConsoleColor.Yellow)

def OnCreateAppDomain(self, sender,e):  
    with CCDarkGray:  
      print "OnCreateAppDomain", e.AppDomain.Name  
    e.AppDomain.Attach()
```

Python’s [with
statement](http://docs.python.org/reference/compound_stmts.html#the-with-statement)
is similar to C\#’s [using
statement](http://msdn.microsoft.com/en-us/library/yh598w02.aspx).
However, unlike IDisposable object, Python context managers support both
an enter and exit method. This means I don’t have to construct an object
in order to get a context (in this case, the console colors) managed. So
far, I’ve got three console color context managers defined – Grey,
DarkGrey and Yellow. I’m thinking that ConsoleColorMgr is a candidate
for my [assorted module
collection](http://github.com/devhawk/devhawk_ipy/tree/master) at some
point.

Now that I can print in color, I wanted to modify my [line
printer](http://devhawk.net/2009/03/19/writing-an-ironpython-debugger-showing-source-code/)
to use color. Usually, the current sequence point corresponds to an
entire line of python source. But as we see below, sometimes only part
of a given line of source text is associated with a given sequence
point.

[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_2_thumb.png)](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_2.png)

The other issue I ran into is that there’s a always a sequence point at
the very end of a function. Unlike the break at the start of the
function I wrote about in my last post, this one I didn’t want to
automatically step over. This is the last breakpoint for a given scope,
so I should give the user one last chance to inspect the scope (once I
add the ability to do that, at any rate) before we step out of it.
However, I wanted a way of showing that we’re about to step out in the
source code line view. I decided on writing a series of carets \^\^\^ to
indicate that we’re at the end of a function.

[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_2_thumb.png)](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/ipydbg-colorcon-image_3.png)

As you can see in the dark grey line in the screenshot above, the
current sequence point starts and ends at line 4 column 23. Column 23 is
beyond the end of line 4, so that’s what I look for in order to draw the
three carets. Here’s the final version of \_print\_source\_line:

``` python
def _print_source_line(self, sp, lines):
  line = lines[sp.start_line-1]
  with CCGray:
    Console.Write("%d: " % sp.start_line)
    Console.Write(line.Substring(0, sp.start_col-1))
    with CCYellow:
      if sp.start_col > len(line):
        Console.Write(" ^^^")
      else:
        Console.Write(line.Substring(sp.start_col-1,
                                     sp.end_col - sp.start_col))
    Console.WriteLine(line.Substring(sp.end_col-1))
```

So colorizing the current line of source code turned out to be a little
harder than I had expected. But hey, I got a start of a reusable module
out of it. That’s pretty cool. Anyway, the [latest
bits](http://github.com/devhawk/ipydbg/tree/ec6520e32cf3214ade646696a0d52448754daf07)
are, as always, up on GitHub.
