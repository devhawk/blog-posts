[Setting a
breakpoint](http://devhawk.net/2009/03/02/writing-an-ironpython-debugger-setting-a-breakpoint/)
was the second feature I implemented in ipydbg. While setting a
breakpoint on the first line of the Python file being run is convenient,
it was obviously necessary to provide the user a mechanism to create
their own breakpoints, as well as enable and disable existing
breakpoints.

First thing I had to do was to refactor the create\_breakpoint method.
Originally, I was searching thru the symbol documents looking for the
one that matched the filename in OnUpdateModuleSymbols. However, since I
wanted to specify by new breakpoints via the same filename/line number
combination, it made more sense to move symbol document logic into
create\_breakpoint:

``` python
def create_breakpoint(module, filename, linenum):
    reader = module.SymbolReader
    if reader == None:
      return None

    # currently, I'm only comparing filenames. This algorithm may need
    # to get more sophisticated to support differntiating files with the
    # same name in different paths
    filename = Path.GetFileName(filename)
    for doc in reader.GetDocuments():
      if str.Compare(filename, Path.GetFileName(doc.URL), True) == 0:
        linenum = doc.FindClosestLine(linenum)
        method = reader.GetMethodFromDocumentPosition(doc, linenum, 0)
        function = module.GetFunctionFromToken(method.Token.GetToken())

        for sp in get_sequence_points(method):
          if sp.doc.URL == doc.URL and sp.start_line == linenum:
            return function.ILCode.CreateBreakpoint(sp.offset)

        return function.CreateBreakpoint()
```

The new version isn’t much different than the old. It loops thru the
symbol documents looking for one that matches the filename argument.
Then it creates the breakpoint the same way it did before. Eventually,
I’m going to need a better algorithm than “only compare filenames”, but
it works for now.

Once I made this change, it was trivial to implement a breakpoint add
command. What was harder was deciding on the right user experience for
this. I decided that breakpoint management was going to be the first
multi-key command in ipydbg. so all the debug commands are prefixed with
a “b”. I use the same [command routing
decorator](http://devhawk.net/2009/04/01/writing-an-ironpython-debugger-command-routing/)
I used for input commands. As you can see, my breakpoint command looks a
lot like my top level input method – read a key from the console then
dispatch it via a commands dictionary that gets populated by @inputcmd
decorators.

``` python
@inputcmd(_inputcmds, ConsoleKey.B)
def _input_breakpoint(self, keyinfo):
    keyinfo2 = Console.ReadKey()
    if keyinfo2.Key in IPyDebugProcess._breakpointcmds:
        return IPyDebugProcess._breakpointcmds[keyinfo2.Key](self, keyinfo2)
    else:
        print "nInvalid breakpoint command", str(keyinfo2.Key)
        return False
```

Currently, there are four breakpoint commands: “a” for add, “l” for
list, “e” for enable and “d” for disable. List is by far the simplest.

``` python
@inputcmd(_breakpointcmds, ConsoleKey.L)
def _bp_list(self, keyinfo):
  print "nList Breakpoints"
  for i, bp in enumerate(self.breakpoints):
    sp = get_location(bp.Function, bp.Offset)
    state = "Active" if bp.IsActive else "Inactive"
    print "  %d. %s:%d %s" % (i+1, sp.doc.URL, sp.start_line, state)
  return False
```

As you can see, I’m keeping a list of breakpoints in my IPyDebugProcess
class. Originally, I used
[AppDomain.Breakpoints](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/CorDebug/CorDebug/AppDomain.cs#L52)
list, but that only returns enabled breakpoints so I was forced to store
my own list. Note also that I’m using the [enumerate
function](http://docs.python.org/library/functions.html#enumerate),
which returns a tuple of the collection count and item. I do this so I
can refer to breakpoints by number when enabling or disabling them:

``` python
@inputcmd(_breakpointcmds, ConsoleKey.E)
def _bp_enable(self, keyinfo):
  self._set_bp_status(True)

@inputcmd(_breakpointcmds, ConsoleKey.D)
def _bp_disable(self, keyinfo):
  self._set_bp_status(False)

def _set_bp_status(self, activate):
  stat = "Enable" if activate else "Disable"
  try:
    bp_num = int(Console.ReadLine())
    for i, bp in enumerate(self.breakpoints):
      if i+1 == bp_num:
        bp.Activate(activate)
        print "nBreakpoint %d %sd" % (bp_num, stat)
        return False
    raise Exception, "Breakpoint %d not found" % bp_num

  except Exception, msg:
    with CC.Red: print "&s breakpoint Failed %s" % (stat, msg)
```

Since the code was identical, except for the value passed to
bp.Activate, I factored the code into a separate \_set\_bp\_status
method. After the user presses ‘b’ and then either ‘e’ or ‘d’, they then
type the number of the breakpoint provided by the breakpoint list
command. \_set\_bp\_status then simply iterates thru the list until it
finds the matching breakpoint and calls Activate. Note that since it’s
possible to have 10 or more breakpoints, I’m using ReadLine instead of
ReadKey, meaning you have to hit return after you type in the breakpoint
number.

Finally, I need a way to create new breakpoints. With the refactoring of
create\_breakpoint, this is pretty straightforward

``` python
@inputcmd(_breakpointcmds, ConsoleKey.A)
def _bp_add(self, keyinfo):
  try:
    args = Console.ReadLine().Trim().split(':')
    if len(args) != 2: raise Exception, "Only pass two arguments"  
    linenum = int(args[1])

    for assm in self.active_appdomain.Assemblies:
      for mod in assm.Modules:
          bp = create_breakpoint(mod, args[0], linenum)
          if bp != None:
            self.breakpoints.append(bp)
            bp.Activate(True)
            Console.WriteLine( "Breakpoint set")
            return False
    raise Exception, "Couldn't find %s:%d" % (args[0], linenum)

  except Exception, msg:
    with CC.Red:
      print "Add breakpoint failed", msg
```

Most of \_bp\_add is processing the input arguments, looping through the
modules and then storing the breakpoint that gets returned. When I set
the initial breakpoint inside OnUpdateModuleSymbols, I have the module
with updated symbols as an event argument. However, in the more general
case we’ve got no way of knowing which module of the current app domain
contains the filename in question. So we loop thru all the modules,
calling create\_breakpoint on each until one returns a non-null value.
Of course, “all the modules” will include the IronPython implementation,
but assuming you’re running against released bits the call to
create\_breakpoint will return right away if debug symbols aren’t
available.

As usual, the [latest
version](http://github.com/devhawk/ipydbg/tree/b0caaf24c515f6153063cefd2bec80481c7917d5)
is up on GitHub. This will be the latest update to ipydbg for a little
while. I worked on it quite a bit while I was at PyCon and have been
busy with other things since I got home. Don’t worry, I’ll come back to
it soon enough. As I [mentioned
Monday](http://devhawk.net/2009/04/06/writing-an-ironpython-debugger-repl-console/),
I want to get function evaluation working so I can have a REPL console
running in the target process instead of the one I’ve got currently
running in the debugger process.
