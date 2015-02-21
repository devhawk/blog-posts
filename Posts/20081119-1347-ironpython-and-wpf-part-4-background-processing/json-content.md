Like many apps today, my [WL Spaces photo
viewer](http://devhawk.net/2008/11/13/IronPython+And+WPF+Part+1+Introduction.aspx)
is a connected app. The various WL Spaces RSS feeds that drive the app
can take a several seconds to download. Unless you like annoying your
users, it’s a bad idea to lock up your user interface while you make you
make synchronous network calls on your UI thread. Typically, this long
running processing gets farmed out to a background thread which keeps
the UI thread free to service the user events.

.NET provides a variety of mechanisms for doing long running processing
on a background thread. For example you can create a [new
thread](http://msdn.microsoft.com/en-us/library/system.threading.thread.aspx),
you can [queue a work
item](http://msdn.microsoft.com/en-us/library/system.threading.threadpool.queueuserworkitem.aspx)
to the ThreadPoool or use the [BackgroundWorker
component](http://msdn.microsoft.com/en-us/library/system.componentmodel.backgroundworker.aspx).
However, none of these are particularly pythonic, so I set out to see if
I could leverage any of Python’s unique capabilities to make background
processing as easy as possible. This is what I ended up with:

``` python
def OnClick(self, sender, args):  
    self.DLButton.IsEnabled = False  
    self.BackgroundTask(self._url.Text)  

@BGThread
def BackgroundTask(self, url):  
    wc = WebClient()
    data = wc.DownloadString(Uri(url))
    self.Completed(data)  

@UIThread  
def Completed(self, data):  
    self.DLButton.IsEnabled = True
    self._text.Text = data
```

By using the cool [decorators
feature](http://www.python.org/dev/peps/pep-0318/) of Python, I’m able
to declaratively indicate whether I want a given method to be executed
on the UI thread or on a background thread. Doesn’t get much easier than
that. Even better, the implementations of BGThread and UIThread are only
about twenty lines of Python code combined!

Decorators kinda look like custom .NET attributes. However, where .NET
attributes are passive (you have to [ask for them
explicitly](http://msdn.microsoft.com/en-us/library/system.reflection.memberinfo.getcustomattributes.aspx)),
decorators act as an active modifier to the functions they are attached
to. In that respect, they’re kind of like
[aspects](http://en.wikipedia.org/wiki/Aspect-oriented_programming).
Certainly, I would consider which thread a given method executes on to
be a cross-cutting concern.

The Completed function above is exactly the same as if I had written the
following:

``` python
def Completed(self, data):  
    self.DLButton.IsEnabled = True  
    self._text.Text = data  
Completed = UIThread(Completed)
```

In C\#, you can’t pass a function as a parameter to another function –
you have to first wrap that function in a delegate. Python, like F\#,
directly supports [higher-order
functions](http://en.wikipedia.org/wiki/First_order_functions). This
lets you easily factor common aspectual code out into reusable functions
then compose them with your business logic. The decorators have no
knowledge of the functions they are attached to and the code that calls
those functions are written in complete ignorance of the decorators.
Python goes the extra mile beyond even F\# by providing the ‘@’ syntax.

Here are the implementations of my the UIThread and BGThread decorators:

``` python
def BGThread(fun):  
  def argUnpacker(args):  
    fun(*args)

  def wrapper(*args):  
    ThreadPool.QueueUserWorkItem(WaitCallback(argUnpacker), args)

  return wrapper

def UIThread(fun):
  def wrapper(self, *args):
    if len(args) == 0:
      actiontype = Action1[object]
    else:
      actiontype = Action[tuple(object for x in range(len(args)+1))]

    action = actiontype(fun)
    self.dispatcher.Invoke(action, self, *args)

  return wrapper
```

BGThread defines a wrapper function that queues a call to the decorated
function to the .NET thread pool.  UIThread defines a wrapper that
marshals the call to the UI thread by using a [WPF
Dispatcher](http://msdn.microsoft.com/en-us/library/system.windows.threading.dispatcher.aspx).
I’m thinking there might be a way to use
[SynchronizationContext](http://msdn.microsoft.com/en-us/library/system.threading.synchronizationcontext.aspx)
to marshal it automatically, but I haven’t tried to figure that out yet.
The above approach does require a dispatcher property hanging off the
class, but that’s fairly trivial to implement and seems like a small
price to pay to get declarative background thread processing.

A couple of quick implementation notes:

-   The ‘\*args’ syntax used in those methods above means “given me the
    rest of the positional arguments in a tuple”. Kinda like the [C\#
    params
    keyword](http://msdn.microsoft.com/en-us/library/w5zay9db.aspx). But
    that syntax also lets you pass a tuple of parameters to a function,
    and have them broken out into individual parameters.
    QueueUserWorkItem only supports passing a single object into the
    queued function, so I pass the tupled arguments to the argUnpacker
    method, which in turn untuples the arguments and calls the decorated
    function.
-   The System assembly includes the [single parameter Action\<T\>
    delegate](http://msdn.microsoft.com/en-us/library/018hxwa8.aspx).
    The current DLR [provides Action
    delegates](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=649845&changeSetId=43712)
    with zero, two and up to sixteen parameters. However, those are in a
    separate namespace
    ([remember?](http://devhawk.net/2008/09/17/DLR+Namespace+Change+Fire+Drill.aspx))
    and IPy seems to have an issue with importing overloaded type names
    into the current scope. I could have used their namespace scoped
    name, but instead I redefined the version from System to be called
    Action1.
-   To interop with .NET generic types, IPy uses the legal but rarely
    used Python syntax type[typeparam]. For example, to create a List of
    strings, you would say “List[str]\(\)”. The type parameter is a tuple,
    so in UIThread I build a tuple of objects based on the number of
    arguments passed into wrapper (with the special case of a single
    type parameter using Action1 instead of Action).

I haven’t uploaded my WL Spaces Photo Viewer app because I keep making
changes to it as I write this blog post series. However, for this post I
built a simple demo app so I could focus on just the threading scenario.
I’ve stuck the code for that demo [up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/WpfThreadDemo.zip),
so feel free to leverage it as you need.
