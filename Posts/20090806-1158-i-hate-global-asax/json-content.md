One of the things I’ve always loved about ASP.NET is how easily
extensible it is. Back in 2000, I had a customer that wanted to “skin”
their website using XML and XSLT – an approach Martin Fowler later
called [Transform
View](http://martinfowler.com/eaaCatalog/transformView.html). We were
working with classic ASP at the time, so the solution we ended up with
was kind of ugly. But I was able to implement this approach in ASP.NET
in a few hundred lines of code, which I wrote up in [an MSDN
article](http://msdn.microsoft.com/en-us/magazine/dvdarchive/cc164164.aspx)
published back in 2003. In the conclusion of that article, I wrote the
following:

> Using ASP.NET is kind of like having your mind read. If you ever look
> at a site and think “I need something different,” you’ll most likely
> find that the ASP.NET architects have considered that need and
> provided a mechanism for you to hook in your custom functionality. In
> this case, I’ve bypassed the built-in Web Forms and Web Services
> support to build an entire engine that services Web requests in a
> unique way.

Nearly ten years later, I finally ran into a situation where ASP.NET
failed to read my mind and doesn’t provide a mechanism to hook in custom
functionality: Global.asax.

I always thought of global.asax as an obsolete construct primarily
intended to ease migration from classic ASP. After all, ASP.NET has
first class support for customizing request handling at various points
throughout the execution pipeline via
[IHttpModule](http://msdn.microsoft.com/en-us/library/system.web.ihttpmodule.aspx).
Handling those events in global.asax always felt vaguely hacky to me.

However, what I didn’t realize is that there are some events that can
only be handled via global.asax (or its code behind). In particular,
Application\_Start/End and Session\_Start/End can only be handled in
global.asax. Worse, these aren’t true events. For reasons I’m sure made
sense at the time but that I don’t understand, the
HttpApplicationFactory discovers these methods via reflection rather
than by an interface or other more typical mechanism. You can check it
out for yourself with [Reflector](http://reflector.red-gate.com) or the
[Reference Source](http://referencesource.microsoft.com/) – look for the
method with the wonderful name
ReflectOnMethodInfoIfItLooksLikeEventHandler. No, I’m not making that
up.

The reason I suddenly care about global.asax is because
Application\_Start is where ASP.NET MVC apps configure their route
table. But if you want to access the Application\_Start method in a
dynamic language like IronPython, you’re pretty much out of luck. The
only way to receive the Application\_Start pseudo-event is via a custom
HttpApplication class. But you can’t implement your custom
HttpApplication in a dynamically typed language like IronPython since it
finds the Application\_Start method via Reflection. Ugh.

If someone can explain to me why ASP.NET uses reflection to fire the
Application\_Start event, I’d love to understand why it works this way.
Even better – I’d love to see this fixed in some future version of
ASP.NET. You come the only way to configure a custom HttpApplication
class is to specify it via global.asax? Wouldn’t it make sense to
specify it in web.config instead?

In order to support Application\_Start for dynamic languages you
basically have two choices:

1.  Build a custom HttpApplication class in C\# and reference it in
    global.asax. This is kind of the approach used by Jimmy’s
    ironrubymvc project. He’s got a
    [RubyMvcApplication](http://github.com/jschementi/ironrubymvc/blob/939319febe205a43d6837e50fe3fe4740708fd58/IronRubyMvc/Core/RubyMvcApplication.cs)
    which he inherits his
    [GlobalApplication](http://github.com/jschementi/ironrubymvc/blob/939319febe205a43d6837e50fe3fe4740708fd58/IronRubyMvcWeb/Global.asax.cs)
    from. Given that GlobalApplication is empty, I think he could remove
    his global.asax.cs file and just reference RubyMvcApplication from
    global.asax directly.
2.  Build custom Application\_Start/End-like events out of IHttpModule
    Init and Dispose. You can have multiple IHttpModule instances in a
    given web app, so you’d need to make sure you ran fired Start and
    End only once. This is the approach taken by the [ASP.NET Dynamic
    Language
    Support](http://aspnet.codeplex.com/Wiki/View.aspx?title=Dynamic%20Language%20Support).
    [1]

So here’s the question Iron Language Fans: Which of these approaches is
better? I lean towards Option \#1, since it traps exactly the correct
event though it does require a global.asax file to be hanging around
(kind of like how the ASP.NET MVC template has a blank default.aspx file
“to ensure that ASP.NET MVC is activated by IIS when a user makes a “/”
request”). But I’m curious what the Iron Language Community at large
thinks. Feel free to leave me a comment or [drop me an
email](mailto:harry.pierson@microsoft.com) with your thoughts.

------------------------------------------------------------------------

[1] FYI, I’m working on getting the code for ASP.NET Dynamic Language
Support released. In the meantime, you can verify what I’m saying via
Reflector.
