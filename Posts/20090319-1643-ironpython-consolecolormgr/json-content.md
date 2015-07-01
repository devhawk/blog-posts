I really liked the ConsoleColorMgr class from my [last ipydbg
post](http://devhawk.net/2009/03/19/writing-an-ironpython-debugger-colorful-console/)
so I took a few minutes to yank it out into its own seperate module. I
also took the opportunity to make a few improvements.

First off, I added support for background colors as well as foreground
colors. Furthermore, both colors default to “None” which ConsoleColorMgr
takes to mean leave that color unchanged.

``` python
from System import Console as _Console

class ConsoleColorMgr(object):
  def __init__(self, foreground = None, background = None):
    self.foreground = foreground
    self.background = background

  def __enter__(self):
    self._tempFG = _Console.ForegroundColor
    self._tempBG = _Console.BackgroundColor  
    if self.foreground: _Console.ForegroundColor = self.foreground
    if self.background: _Console.BackgroundColor = self.background

  def __exit__(self, t, v, tr):
    _Console.ForegroundColor = self._tempFG  
    _Console.BackgroundColor = self._tempBG
```

The other change I made was to build a set of default ConsoleColorMgr
instances in the consolecolor module, one for each of the values in
[ConsoleColor](http://msdn.microsoft.com/en-us/library/system.consolecolor.aspx).

``` python
import sys
from System import ConsoleColor, Enum

_curmodule = sys.modules[__name__]

for n in Enum.GetNames(ConsoleColor):
    setattr(_curmodule, n, ConsoleColorMgr(Enum.Parse(ConsoleColor, n)))
```

Note that for this set of default ConsoleColorMgr instances, I’m only
setting the foreground color. If you want to set the background color,
you have to create your own ConsoleColorMgr instances. This allows me to
write the following:

``` python
from __future__ import with_statement
import consolecolor

with consolecolor.Red:
    print "Open the pod bay doors, HAL"
with consolecolor.ConsoleColorMgr(ConsoleColor.Black, ConsoleColor.Red):  
    print "I'm sorry Dave, I'm afraid I can't do that."
```

If you want it, I’ve put consolecolor.py up [on my
skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/consolecolor.py)
or it’s available as part of my [devhawk\_ipy
project](http://github.com/devhawk/devhawk_ipy/tree/master) on GitHub.

**Update**: [Christopher Bermingham](http://bermingham.blogspot.com)
pointed out that my sample snippet at the end doesn’t work unless you
add ``from future import with_statement`` to the top of your python file. I updated my code
snippet to include this. Thanks Christopher!
