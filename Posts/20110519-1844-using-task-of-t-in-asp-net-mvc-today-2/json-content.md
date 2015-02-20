I’ve been experimenting with the [new async
support](http://msdn.microsoft.com/en-us/vstudio/async.aspx) coming in
the next version of C\# (and VB). I must say, I’m very impressed. Async
is one of those things you know you’re supposed to be doing. However,
traditionally it has taken a lot of code and been hard to get right. The
new await keyword changes all that.

For example, here’s an async function to download the [Twitter public
timeline](http://dev.twitter.com/doc/get/statuses/public_timeline):

``` csharp
public async Task PublicTimelineAsync()
{
  var url = "http://api.twitter.com/1/statuses/public_timeline.xml";
  var xml = await new WebClient().DownloadStringTaskAsync(url);
  return XDocument.Parse(xml);
}
```

That’s not much more difficult that writing the synchronous version. By
using the new async and await keywords, all the ugly async
[CPS](http://en.wikipedia.org/wiki/Continuation-passing_style) code
you’re supposed to write is generated for you automatically by the
compiler. That’s a huge win.

The only downside to async is that support for it is spotty in the .NET
Framework today. Each major release of .NET to date has introduced a new
async API pattern. .NET 1.0 had the [Async Programming Model
(APM)](http://msdn.microsoft.com/en-us/library/ms228963.aspx). .NET 2.0
introduced the [Event-based Async Pattern
(EAP)](http://msdn.microsoft.com/en-us/library/wewwczdw.aspx). Finally
.NET 4.0 gave us the [Task Parallel Library
(TPL)](http://msdn.microsoft.com/en-us/library/dd537609.aspx). The await
keyword only works with APIs writen using the TPL pattern. APIs using
older async patterns have to be wrapped as TPL APIs to work with await.
The [Async
CTP](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=4738205d-5682-47bf-b62e-641f6441735b&displaylang=en)
includes a bunch of extension methods that wrap common async APIs, such
as DownloadStringTaskAsync from the code above.

The async wrappers are nice, but there are a few places where we really
need the TPL pattern plumbed deeper. For example, ASP.NET
MVC supports [AsyncControllers](http://msdn.microsoft.com/en-us/library/ee728598.aspx).
AsyncControllers are used to avoid blocking IIS threads waiting on long
running I/O operations – such as getting the public timeline from
Twitter. Now that I’ve been bitten by the [async zombie
virus](http://blogs.msdn.com/b/lucian/archive/2011/04/15/async-ctp-refresh-design-changes.aspx),
I want to write my async controller methods using await:

``` csharp
public async Task<ActionResult> Index()
{
    var t = new Twitter();
    var timeline = await t.PublicTimelineAsync();
    var data = timeline.Root.Elements("status")
        .Elements("text").Select(e => e.Value);
    return View(data);
}
```

Unfortunately, neither the main trunk of MVC nor the MVC futures project
has support for the TPL model [1]. Instead, I have to manually write
some semblance of the async code that await would have emitted on my
behalf. In particular, I have to manage the outstanding operations,
implement a continuation method and map the parameters in my controller
manually.

``` csharp
public void IndexAsync()
{
    var twitter = new Twitter();

    AsyncManager.OutstandingOperations.Increment();
    twitter
        .PublicTimelineAsync()
        .ContinueWith(task =>
        {
            AsyncManager.Parameters["timeline"] = task.Result;
            AsyncManager.OutstandingOperations.Decrement();
        });
}

public ActionResult IndexCompleted(XDocument timeline)
{
    var data = timeline.Root.Elements("status")
        .Elements("text").Select(e => e.Value);
    return View(data);
}
```

I promise you, writing that boilerplate code over and over gets old
pretty darn quick. So I wrote the following helper function to eliminate
as much boilerplate code as I could.

``` csharp
public static void RegisterTask<T>(
    this AsyncManager asyncManager,
    Task<T> task,
    Func<T, object> func)
{
    asyncManager.OutstandingOperations.Increment();
    task.ContinueWith(task2 =>
    {
        //invoke the provided function with the
        //result of running the task
        var o = func(task2.Result);

        //use reflection to set asyncManager.Parameters
        //for the returned object's fields and properties
        var ty = o.GetType();
        foreach (var f in ty.GetFields())
        {
            asyncManager.Parameters[f.Name] = f.GetValue(o);
        }
        foreach (var p in ty.GetProperties())
        {
            var v = p.GetGetMethod().Invoke(o, null);
            asyncManager.Parameters[p.Name] = v;
        }

        asyncManager.OutstandingOperations.Decrement();
    });
}
```

With this helper function, you pass in the Task\<T\> that you are
waiting on as well as a delegate to invoke when the task completes.
RegisterTask takes care of incrementing and decrementing the outstanding
operations count as appropriate. It also registers a continuation that
reflects over the object returned from the invoked delegate to
populate the Parameters collection.

With this helper function, you can write the async controller method
like this:

```csharp
public void IndexAsync()
{
    var twitter = new Twitter();

    AsyncManager.RegisterTask(
        twitter.PublicTimelineAsync(),
        data => new { timeline = data });
}

//IndexCompleted hasn't changed
public ActionResult IndexCompleted(XDocument timeline)
{
    var data = timeline.Root.Elements("status")
        .Elements("text").Select(e => e.Value);
    return View(data);
}
```

It’s not as clean as the purely TPL based version. In particular, you
still need to write separate Async and Completed methods for each
controller method. You also need to build an object to map values from
the completed tasks into parameters in the completed method. Mapping
parameters is a pain, but the anonymous object syntax is terser than
setting values in the AsyncManager Parameter collection.

It’s not full TPL support, but it’ll do for now. Here’s hoping that the
MVC team has async controller methods with TPL on their backlog.

------------------------------------------------------------------------

[1] I’m familiar with Craig Cavalier’s [Async MVC with
TPL](http://craigcav.wordpress.com/2010/12/23/asynchronous-mvc-using-the-task-parallel-library/)
post, but a fork of the MVC Futures project is a bit too bleeding edge
for my needs at this point.
