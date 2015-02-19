OK, here’s the last word on this whole background processing /
concurrency decorators thing. I went back and re-wrote the [original
decorators](http://devhawk.net/2008/11/19/IronPython+And+WPF+Part+4+Background+Processing.aspx),
but using the approach I used with the [SyncContext
version](http://devhawk.net/2008/11/20/IronPython+And+WPF+Background+Processing+Revisited.aspx).
I don’t want to rehash it again, here are the main points:

-   Instead of using a property to retrieve the dispatcher, I get it via
    Application.Current.MainWindow.Dispatcher (checking to be sure
    Current and MainWindow aren’t null…err, None). This way, I pick up
    the dispatcher automatically rather than forcing a specific
    interface on the class with decorated methods. In fact, this
    approach should work with pure functions as well.
-   Since I don’t have a convenient function like
    SetSynchronizationContext, I store the dispatcher in thread local
    storage for later use in calling back to the UI thread.
-   Unlike the SyncContext version, this version propagates the return
    value of @UIThread decorated functions. I don’t propagate the return
    value of @BGThread functions – there’d be no point farming a task to
    a background thread then blocking the UI thread waiting for a
    response.

As usual, the code is [on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/WpfThreadDemo3.zip).
It includes both the SyncContext and Dispatcher version of the
decorators.
