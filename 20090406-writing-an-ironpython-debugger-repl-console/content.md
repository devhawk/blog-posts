While I was ~~banging my head against a wall~~ experimenting with
understanding how [CorValue extraction
worked](http://devhawk.net/2009/03/31/writing-an-ironpython-debugger-displaying-values/),
I found myself wanting to dink around with the debugger objects in a
REPL console. One of IronPython’s core strengths is support for
“exploratory programming” via the REPL. It turned out bringing a REPL to
ipydbg was quite simple.

Python includes two built-in features that making DIY REPL quite easy:
compile and exec (though technically, exec is a statement, not a
function). As you might assume from their names, compile converts a
string into what Python calls a code object while exec executes a code
object in a given scope. Technically, exec can accept a string so I
could get by without using compile. However, if you’re compiling a
single interactive statement compile can automatically insert a print
statement if you’ve passed in a an expression. In other words, if you
type in “2+2” on the console it will print “4”, which is the behavior I
wanted.

Here’s what my REPL console code look like. I love that it’s only 20
lines of code.

``` python
@inputcmd(_inputcmds, ConsoleKey.R)
def _input_repl_cmd(self, keyinfo):
  with CC.Gray:
    print "nREPL ConsolenPress Ctl-Z to Exit"
    cmd = ""
    _locals = {'self': self}

    while True:
      Console.Write(">>>" if not cmd else "...")

      line = Console.ReadLine()
      if line == None:
        break

      if line:
        cmd = cmd + line + "n"
      else:
        try:
          if len(cmd) > 0:
            exec compile(cmd, "<input>", "single") in globals(),_locals
        except Exception, ex:
          with CC.Red: print type(ex), ex
        cmd = ""
```

It’s pretty straightforward. I set up a dictionary to act as the local
variable scope for the code that gets executed. I’m just reusing the
current global scope, but I want the local scope to start with only the
reference to the current IPyDebugProcess instance which is passed into
\_input\_repl\_cmd as “self”. All the other local variables like cmd and
line won’t be available to the REPL code. Then I drop into a loop where
I read lines from the console and execute them.

In order to support multi-line statements, I build up the cmd variable
over multiple line inputs and I don’t execute it until the user inputs
an empty line. In the standard Python console, it can recognize single
line statements and execute them immediately. Dino showed me how to use
the IronPython parser to do the same thing, but I haven’t implemented
that in ipydbg yet. To exit the REPL loop, you type Ctl-Z, which returns
None (aka null) from ReadLine instead of the empty string.

Since I never execute the code more than once, I have my exec and
compile statements together on a single line. Compile takes the string
to be compiled, the name of the file it came from (I’m using \<input\>
for this) and the kind of code. Passing in “single” for the kind of code
adds the auto-expression-print functionality I mentioned above. Then I
exec the code object that’s returned in specified scope I’m managing for
this instance of the REPL loop. If you exit out of the REPL and re-enter
it, you get a fresh new copy of the local scope so any functions or
variables you define in the last REPL are gone.

Runtime execution of code into a given scope is a hallmark of dynamic
languages, but I’m still fairly green when it comes to Python so it took
me a while to figure this out. Python code executes in a given scope, a
combination of global and local variables. When you’re in the ipy.exe
REPL, you’re at top level scope anyway, so global and local scope are
the same – if you add something to global scope, it shows up in local
scope and vis-versa. Inside a function, you’ll have the same global
scope, but the local scope will be different and changes to one won’t be
reflected in the other. The ipydbg REPL isn’t a function per-se, but it
does provide an explicit local scope that gets disposed when you exit
the REPL.

While having a debugger REPL is really convenient for prototyping new
ipydbg commands, it’ll really shine once I get function evaluation
working. Then I’ll be able to open a REPL console where the commands are
executed in the *target* process instead of the *debugger* process as
they are now. That will be very cool. Until then, the [latest
code](http://github.com/devhawk/ipydbg/commit/1993f263d31af5442f84d2139d3002a001a64fd8)
is – as always – up on GitHub.
