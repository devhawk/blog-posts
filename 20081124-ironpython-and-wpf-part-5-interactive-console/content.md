One of the hallmarks of dynamic language programming is the use of the
interactive prompt, otherwise known as the
[Read-Eval-Print-Loop](http://en.wikipedia.org/wiki/REPL) or REPL. Even
though I’m building a WPF client application, I’d still like to have the
ability to poke around and even modify the app as it’s running from the
command prompt, REPL style.

If you work thru the IronPython
[Tutorial](http://www.codeplex.com/IronPython/SourceControl/changeset/file/view/43829/649827),
there are exercises for interactively building both a WinForms and a WPF
application. In both scenarios, you create a dedicated thread to service
the UI so it can run while the interactive prompt thread is blocked
waiting for user input. However, as we saw in the [last part of this
series](http://devhawk.net/2008/11/19/ironpython-and-wpf-part-4-background-processing/),
UI elements in both WinForms and WPF can only be accessed from the
thread they are created on. We already know how to marshal calls to the
correct UI thread –
[Dispatcher.Invoke](http://msdn.microsoft.com/en-us/library/system.windows.threading.dispatcher.invoke.aspx).
However, what we need is a way to intercept commands entered on the
interactive prompt so we can marshal them to the correct thread before
they execute.

Luckily, IronPython provides just such a mechanism: [clr
module’s](http://www.codeplex.com/IronPython/SourceControl/changeset/file/view/43829/649872)
SetCommandDispatcher. A command dispatcher is a function hook that gets
called for every command the user enters. It receives a single
parameter, a delegate representing the command the user entered. In the
WPF and WinForms tutorials, you use this function hook to marshal the
commands to the right thread to be executed. Here’s the command
dispatcher from the WPF tutorial:

``` python
def DispatchConsoleCommand(consoleCommand):
    if consoleCommand:
        dispatcher.Invoke(DispatcherPriority.Normal, consoleCommand)
```

The dispatcher.Invoke call looks kinda like the UIThread decorator from
the [Background
Processing](http://devhawk.net/2008/11/19/ironpython-and-wpf-part-4-background-processing/)
part of this series, doesn’t it?

Quick aside: I looked at using SyncContext here instead of Dispatcher,
since I don’t care about propagating a return value back to the
interactive console thread. However, SyncContext expects a
[SendOrPostDelegate](http://msdn.microsoft.com/en-us/library/system.threading.sendorpostcallback.aspx),
which expects a single object parameter. The delegate passed to the
console hook function is an
[Action](http://msdn.microsoft.com/en-us/library/system.action.aspx)
with no parameters. I could have built a wrapper function that took a
single parameter which it would ignore, but I decided it wasn’t worth
it. The more I look at it, the more I believe SyncContext is a good idea
with a bad design.

I wrapped all the thread creation and command dispatching into a
reusable helper class called InteractiveApp.

```python
class InteractiveApp(object):
  def __init__(self):
    self.evt = AutoResetEvent(False)

    thrd = Thread(ThreadStart(self.thread_start))
    thrd.ApartmentState = ApartmentState.STA
    thrd.IsBackground = True
    thrd.Start()

    self.evt.WaitOne()
    clr.SetCommandDispatcher(self.DispatchConsoleCommand)

  def thread_start(self):
    try:
      self.app = Application()
      self.app.Startup += self.on_startup
      self.app.Run()
    finally:
      clr.SetCommandDispatcher(None)

  def on_startup(self, *args):
    self.dispatcher = Threading.Dispatcher.FromThread(Thread.CurrentThread)
    self.evt.Set()

  def DispatchConsoleCommand(self, consoleCommand):
    if consoleCommand:
        self.dispatcher.Invoke(consoleCommand)

  def __getattr__(self, name):
    return getattr(self.app, name)
```

The code is pretty self explanatory. The constructor (\_\_init\_\_)
creates the UI thread, starts it, waits for it to signal that it’s ready
via an AutoResetEvent and then finally sets the command dispatcher. The
UI thread creates and runs the WPF application, saves the dispatcher
object as a field on the object, then signals that it’s ready.
DispatchConsoleCommand is nearly identical to the earlier version, I’ve
just made it an instance method instead of a stand-alone function.
Finally, I define \_\_getattr\_\_ so that any operations invoked on
InteractiveApp are passed thru to the contained WPF Application
instance.

In my app.py file, I look to see if the module has been started directly
or if it’s been imported into another module. If the module is run
directly (aka ‘ipy app.py’) then the global \_\_name\_\_ variable will
be ‘\_\_main\_\_’. In that case, we start the application up normally
(i.e. without the interactive prompt) by just creating an Application
then running it with a Window instance. Otherwise, we are importing this
app into another module (typically, the interactive console), so we
create an InteractiveApp instance and we create an easy to use run
method that can create the instance of the main window.

``` python
if __name__ == '__main__':
  app = wpf.Application()
  window1 = MainWin.MainWindow()
  app.Run(window1.root)

else:  
  app = wpf.InteractiveApp()

  def run():
    global mainwin
    mainwin = MainWin.MainWindow()
    mainwin.root.Show()
```

If you want to run the app interactively, you simply import the app
module and call run. Here’s a sample session where I iterate thru the
items bound to the first list box. Of course, I can do a variety of
other operations I can do such as manipulate the data or create new UI
elements.

``` 
IronPython 2.0 (2.0.0.0) on .NET 2.0.50727.3053
>>> import app
>>> app.run()
#at this point the app window launches
>>> for i in app.mainwin.allAlbumsListBox.Items:
...     print i.title
...
Harvest Festivals
Mrs. Gardner's Art
Riley's Playdate
August 13
Camp Days
July 14
May Photo Shoot
Summer Play 2006
Lake Washington With The Gellers
Camp Pierson '06
January 28
```

One small thing to keep in mind: if you exit the command prompt, the UI
thread will also exit since it’s marked as a background thread. Also, it
looks like you could shut the client down then call run again to restart
it, but you can’t. If you shut the client down, the Run method in
InteractiveApp.thread\_start exits, resets the Command Dispatcher to
nothing and the thread terminates. I could fix it so that you could run
the app multiple times, but I find I typically only run the app once for
a given session anyway.
