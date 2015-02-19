Now that ipydbg can [set a
breakpoint](http://devhawk.net/2009/03/02/Writing+An+IronPython+Debugger+Setting+A+Breakpoint.aspx),
it’s time to add some interactivity to the app. MDbg supports [dozens of
commands](http://msdn.microsoft.com/en-us/library/ms229861.aspx) and
currently ipydbg supports none. I’d love for ipydbg to support a wide
range of commands like MDbg does, but for now let’s keep it simple and
start with two: Continue and Quit. These aren’t very interesting as
commands go, but that lets me focus this blog post on adding basic
interactivity and future posts on specific commands.

First off, we have to understand how the CorDebug managed API supports
interactivity. [As we’ve
seen](http://devhawk.net/2009/02/28/Writing+An+IronPython+Debugger+Hello+Debugger.aspx),
callbacks into the debugger are surfaced as managed events. If we look
at the [base
class](http://github.com/devhawk/ipydbg/blob/5858695ff85ed4740ad06466d4f54394e7f00f9b/CorDebug/CorDebug/Debugger.cs#L524)
for all the debugger event arguments, we see that it exposes a [Continue
property](http://github.com/devhawk/ipydbg/blob/5858695ff85ed4740ad06466d4f54394e7f00f9b/CorDebug/CorDebug/Debugger.cs#L561).
If you want the debugger to automatically continue after the event
handler finishes running, you set the Continue property to true (which
is the default). If you want the debugger to stay paused while you
provide the developer a chance to poke around, you set Continue to
false. In that case, the debugger stays paused until call
process.Continue explicitly.

Once we set the Continue property to false, we need a mechanism to
signal the main thread of execution that it’s time to wake up and ask
the user what they want to do next. Of course, that’s what
[WaitHandle](http://msdn.microsoft.com/en-us/library/system.threading.waithandle.aspx)
and it’s descendents are for. In fact, [we’re already
using](http://devhawk.net/2009/02/28/Writing+An+IronPython+Debugger+Hello+Debugger.aspx)
an AutoResetEvent in OnProcessExit to signal that the debugged app has
exited so we should exit the debugger. However, now we have two
different signals that we want to send: exit the debugger or enter the
input loop. I decided to differentiate by using two separate
AutoResetEvents:

``` {.brush: .python}
terminate_event = AutoResetEvent(False)  
break_event = AutoResetEvent(False)  

def OnProcessExit(s,e):  
  print "OnProcessExit"  
  terminate_event.Set()  

def OnBreakpoint(s,e):  
  print "OnBreakpoint", get_location(  
    symbol_readers[e.Thread.ActiveFrame.Function.Module], e.Thread)  
  e.Continue = False  
  break_event.Set()  

#code to create debugger and process omitted for clarity

handles = Array.CreateInstance(WaitHandle, 2)  
handles[0] = terminate_event  
handles[1] = break_event  

while True:  
  process.Continue(False)  

  i = WaitHandle.WaitAny(handles)  
  if i == 0:  
    break  

  input()
```

Instead of a single call to process.Continue I had before, I’ve created
an infinite “while True” loop that calls Continue, waits for one of the
events to signal, then either exits the loop of enters the input loop
(via the input function). Since there are two AutoResetEvents, I need to
use the [WaitAny
method](http://msdn.microsoft.com/en-us/library/tdykks7z.aspx) to wait
for one of them to signal. WaitAny takes an array, which is kind of
clunky to use from IronPython since the array has to be strongly typed.
It would be much more pythonic if I could call
WaitHandle.WaitAny([terminate\_event, break\_event]). WaitAny then
returns an index into the array indicating which one received the
signal. If it was the terminate\_event that signaled, I exit the loop
(and the application). Otherwise, I enter the input loop. Notice, by the
way, in OnBreakpoint that I’m both setting Continue to false and
signaling the break\_event.

The “input loop” needs to be a loop because the user may want to type in
multiple commands before letting the debugged app continue to execute.
This means that the input function is implemented as another “while
True” loop. When the user does chooses a command that implies the
process should continue, I simply exit out of the input function and the
outer “while True” loop above executes the continue and waits for a
signal.

Here’s what the input function looks like right now with our two basic
commands:

``` {.brush: .python}
def input():     
  while True:     
    Console.Write("» ")     
    k = Console.ReadKey()     
     
    if k.Key == ConsoleKey.Spacebar:     
      Console.WriteLine("nContinuing")     
      return  
    elif k.Key == ConsoleKey.Q:     
      Console.WriteLine("nQuitting")     
      process.Stop(0)     
      process.Terminate(255)     
      return
    else:     
      Console.WriteLine("n Please enter a valid command")
```

I’ve mapped “q” to quit the debugger and spacebar to continue. Since I’m
using Console ReadKey, you only have to type the key in question – no
return needed. For continue, we don’t do anything but exit the input
loop by returning. Continue gets called as part of the other loop and
since we haven’t/can’t add additional breakpoints the debugged app will
run until it ends. For quit, I call the [Terminate
method](http://msdn.microsoft.com/en-us/library/ms230796.aspx) on
process, hard coding the return value to 255. However, Terminate
implicitly continues the debugged process. Since you can’t continue a
running process, the call to Continue in the outer loop throws an
exception. I avoid this exception by adding the call to Stop before
Terminate. As per the [Stop
docs](http://msdn.microsoft.com/en-us/library/ms232533.aspx), the
debugger maintains a “stop counter” and only resumes the debugged
process when the counter reaches zero.  Calling Stop increases the stop
counter by one, calling Terminate decreases it by one, then the outer
loop Continue  call decreases it to zero and the process continues,
terminates and fires the OnProcessExit event handler as usual.

Now that we have a basic interactive loop, I’ll be able to add more
interesting commands. I’m guessing at some point, I’ll need to refactor
input a bit – I’m guessing a huge if/elif/else statement is going to get
ugly fast, but I’ll worry about that when it gets out of hand. As usual,
the [latest ipydbg
source](http://github.com/devhawk/ipydbg/tree/112c3acdcf726c3ad89ce2def8258ecc2fb55513)
is up on GitHub.
