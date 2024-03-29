I [added
traceback](http://devhawk.net/2009/10/07/hybrid-app-debugging-tracebackdelegate-and-settrace/)
to my GetThings app in just two lines of code, but so far it doesn’t
actually do anything that you would expect a debugger to do. But before
we get to that, we need understand a little about how threading works
for traceback debugging.

As I mentioned last time, the traceback debugger works by calling into
the registered traceback handler at various times (entering/exiting a
function, before executing a line of code and on exceptions). Execution
of the Python code continues when the traceback function exits. That
means that you have to block the execution thread while you let the user
poke around with the debugger UI. For a console based app, that’s easy.
For a GUI app, not so much.

At a minimum, you need to run your debugger UI on a separate thread from
your main app window. If you want your main app window to be responsive
while you debug, you’ll need to pump messages at a minimum
([DoEvents](http://msdn.microsoft.com/en-us/library/system.windows.forms.application.doevents.aspx)
in Windows Forms, [similar approaches are
available](http://social.msdn.microsoft.com/forums/en-US/wpf/thread/a2988ae8-e7b8-4a62-a34f-b851aaf13886)
for WPF) or preferably run your python scripts on a background thread
separate from either the main window UI thread or the debugger UI
thread. To keep things simple, I’m going to simply block the main window
thread while the debugger is active.

Since I’m going to have to setup a new thread for the debugger window, I
decided to use a static constructor to centralize creating the thread,
creating the window and registering the traceback handler all in one
place.

``` csharp
static Thread _debugThread;
static DebugWindow _debugWindow;
static ManualResetEvent _debugWindowReady = new ManualResetEvent(false);

public static void InitDebugWindow(ScriptEngine engine)
{
    _debugThread = new Thread(() =>
    {
        _debugWindow = new DebugWindow(engine);
        _debugWindow.Show();
        Dispatcher.Run();
    });
    _debugThread.SetApartmentState(ApartmentState.STA);
    _debugThread.Start();

    _debugWindowReady.WaitOne();
    engine.SetTrace(_debugWindow.OnTracebackReceived);
}
```

As you can see, InitDebugWindow spins up a new thread and creates the
debug window on that thread. Since it’s not the main WPF application
thread, you have to explicitly call
[Dispatcher.Run](http://msdn.microsoft.com/en-us/library/system.windows.threading.dispatcher.run.aspx)
to get the event queue pumping. You also have to explicitly [set the
apartment
state](http://msdn.microsoft.com/en-us/library/system.threading.thread.setapartmentstate.aspx)
to be single threaded for any threads creating WPF objects. Finally, I
wait for the window to signal that it’s ready (it set’s the
\_debugWindowReady AutoResetEvent in the Window Loaded event) and then
call SetTrace, passing in the debug window’s OnTracebackReceived event,
on the thread that called InitDebugWindow.

It’s critical that you call SetTrace – and thus InitDebugWindow – on the
thread that’s going to execute the Python code. Debugging in Python is
*per thread*. Even if you execute the same code in the same ScriptScope
with the same ScriptEngine but on a different thread, the traceback
handler calls won’t fire. The way DebugWindow is written, it will only
support debugging a single thread, but it would be pretty
straightforward to support multiple threads by changing the way
OnTracebackReceived gets signaled to continue.

Speaking of OnTracebackReceived, this was my initial basic
implementation of it:

``` csharp
private TracebackDelegate OnTracebackReceived
    (TraceBackFrame frame, string result, object payload)
{
    Action<TraceBackFrame, string, object> tbAction = this.OnTraceback;
    this.Dispatcher.BeginInvoke(tbAction, frame, result, payload);
    _dbgContinue.WaitOne();
    return this.OnTracebackReceived;
}
```

As we saw, the DebugWindow is running on a different thread than the
traceback handler call will come in on. So OnTracebackReceived needs to
invoke a new call on the correct thread by using
[Dispatcher.BeginInvoke](http://msdn.microsoft.com/en-us/library/system.windows.threading.dispatcher.begininvoke.aspx).
Even though OnTracebackReceived is always called on the main window
thread, it still has access to the properties of the debug window thread
like its Dispatcher. I used BeginInvoke to invoke OnTraceback
asynchronously – OnTraceback isn’t going to return anything interesting
and we’re going to wait on an AutoResetEvent before continuing anyway so
I didn’t see any reason to use a synchronous call.

We’ll discuss OnTraceback more next post, but basically it will
configure the UI for the traceback event that happened. Then DebugWindow
will wait for user input. When the user indicates they want to resume
execution, the command handler in question will set \_dbgContinue and
the original traceback will return so execution can continue.
