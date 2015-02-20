So far, I’ve written seven posts about my IronPython debugger, but
frankly it isn’t very functional yet. It
[runs](http://devhawk.net/2009/02/28/Writing+An+IronPython+Debugger+Hello+Debugger.aspx),
[breaks on the first
line](http://devhawk.net/2009/03/02/Writing+An+IronPython+Debugger+Setting+A+Breakpoint.aspx)
and can [show a stack
trace](http://devhawk.net/2009/03/09/Writing+An+IronPython+Debugger+Dynamic+Stack+Trace.aspx).
Not exactly [Jolt award](http://www.joltawards.com/) material. In this
post, I’m going to add one of the core functions of any debugger:
stepping. Where previously I’ve written a bunch of code but had little
to show in terms of features, now I’m getting three new features (basic
step, step in and step out) at once!

``` python
def _input(self):
  #remaining _input code omitted for clarity
  elif k.Key == ConsoleKey.S:
      print "nStepping"
      self._do_step(False)
      return
  elif k.Key == ConsoleKey.I:
      print "nStepping In"
      self._do_step(True)
      return
  elif k.Key == ConsoleKey.O:
      print "nStepping Out"
      stepper = create_stepper(self.active_thread)
      stepper.StepOut()

def _do_step(self, step_in):
  stepper = create_stepper(self.active_thread)
  mod = self.active_thread.ActiveFrame.Function.Module
  if mod not in self.symbol_readers:
      stepper.Step(step_in)
  else:
    range = get_step_ranges(self.active_thread, self.symbol_readers[mod])
    stepper.StepRange(step_in, range)
```

Here you can see the \_input clauses for step, step in and step out. Of
the three, step out is the simplest to implement: create the stepper
object and call StepOut. For step and step in, I could simply call Step
(the boolean argument indicates if you want to step into or over
functions) but that only steps a single IL statement. The vast majority
of the time there are multiple IL instructions for every line of source
code, so IL statement stepping is very tedious. As we learned when
[setting a
breakpoint](http://devhawk.net/2009/03/02/Writing+An+IronPython+Debugger+Setting+A+Breakpoint.aspx),
debug symbols contain sequence points that map between source and IL
locations. If they’re available, I use the sequence points to determine
the range of IL statements to step over so that I can step single source
statements instead.

The stepping code above depends on three helper functions defined at
global scope.

``` python
def create_stepper(thread):
  stepper = thread.ActiveFrame.CreateStepper()
  stepper.SetUnmappedStopMask(CorDebugUnmappedStop.STOP_NONE)
  return stepper  

def create_step_range(start, end):
  range = Array.CreateInstance(COR_DEBUG_STEP_RANGE, 1)
  range[0] = COR_DEBUG_STEP_RANGE(startOffset = UInt32(start),
                                  endOffset = UInt32(end))
  return range

def get_step_ranges(thread, reader):
    frame = thread.ActiveFrame
    offset, mapResult = frame.GetIP()
    method = reader.GetMethod(SymbolToken(frame.FunctionToken))
    for sp in get_sequence_points(method):
        if sp.offset > offset:
            return create_step_range(offset, sp.offset)
    return create_step_range(offset, frame.Function.ILCode.Size)
```

The first function, create\_stepper, simply constructs and configures
the stepper object. The call to SetUnmappedStopMask tells the debugger
not to stop if it encounters code that can’t be mapped to IL. If you
need to debug at that level, ipydbg is \*not\* for you.

Next is create\_step\_range, which exists purely for .NET interop
purposes. There are three interop warts hidden in this function. First
is creating a .NET array of COR\_DEBUG\_STEP\_RANGE structs. Every time
I write Array code like this, I wish for a CreateFromCollection static
method on Array. However, in this case it isn’t that big a deal since
it’s a one element array. Second wart is having to set the values of
COR\_DEBUG\_STEP\_RANGE via constructor keyword arguments. It turns out
that IronPython disallows direct updates to value type fields ([read
this for the reason
why](http://ironpython.codeplex.com/Wiki/View.aspx?title=Value%20Types)).
Instead, I pass in the field values into the constructor as keyword
arguments. Finally, you have to explicitly convert the start and end
offsets to a unsigned int in order to set the offset fields in the
COR\_DEBUG\_STEP\_RANGE struct constructor.

Finally is get\_step\_ranges, which iterates thru the list of sequence
points in the current method looking for the one with the smallest
offset that is larger than the current offset position. If it can’t find
a matching sequence point, it sets the range to the end of the current
function. The start range offset is always the current offset. I did
make a significant change to get\_sequence\_points – it no longer yields
sequence points that have a start line of 0xfeefee. [By
convention](http://blogs.msdn.com/jmstall/archive/2005/06/19/FeeFee_SequencePoints.aspx),
that indicates a sequence point to be skipped. Originally, the logic to
ignore 0xfeefee sequence points was in get\_location. But when I
originally wrote get\_step\_ranges, it had essentially the same sequence
point skipping logic, so I moved it to get\_location instead.

Technically, I’ve built three new features but the reality is that if
you end up in IronPython infrastructure code it’s really hard to find
your way back to python code. Step in is particularly useless right now.
Luckily, the .NET debugger API supports a feature called “[Just My
Code](http://blogs.msdn.com/jmstall/archive/2004/12/31/344832.aspx)”
that will make stepping much more useful. In the meantime, the [latest
version of
ipydbg](http://github.com/devhawk/ipydbg/tree/0840b8cf3918feb70311bc0d0a8e0cb0f06fc37c)
is up on GitHub as usual.
