::: image-right
[![agdlr-400](http://hawkblogstorage.blob.core.windows.net/blog-content/20090324-2325-agdlr-0-5/agdlr-400_3.png "agdlr-400")](http://github.com/jschementi/agdlr)
:::

I [mentioned yesterday](http://devhawk.net/2009/03/23/ironruby-0-3/)
that it looked like a new release of
[AgDLR](http://github.com/jschementi/agdlr) was eminent and sure enough
[here it
is](http://sdlsdk.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=25120).
There are some really cool new features including Silverlight 3
Transparent Platform Extension support, In-Browser REPL and In-Browser
testing of Silverlight apps. As with IronRuby 0.3, Jimmy [has the a
summary](http://feedproxy.google.com/~r/jimmy-thinking/~3/MB3l79dtHsM/silverlight-dynamic-languages-sdk-05.html)
of the new AgDLR release.

One feature of the new release I did want to highlight was
[XapHttpHandler](http://github.com/jschementi/agdlr/blob/8a5693bb19d08f09b509d61d14733e0a7411b593/src/Chiron/XapHttpHandler.cs)
because I’m the one who wrote it!
:smile:

The Silverlight versions of IronPython and IronRuby ship with a tool
called
[Chiron](http://www.codeplex.com/sdlsdk/Wiki/View.aspx?title=Chiron&referringTitle=Getting%20Started)
that provides a REPL-esque experience for building dynamic language
Silverlight apps. John Lam had [a good write-up on
Chiron](http://www.iunknown.com/2008/03/dynamic-silverl.html) when we
first released it last year, but basically the idea is that Chiron is a
local web server that will auto-generate a [Silverlight
XAP](http://blogs.msdn.com/katriend/archive/2008/03/16/silverlight-2-structure-of-the-new-xap-file-silverlight-packaged-application.aspx)
from a directory of Python and/or Ruby files on demand. For example, if
your HTML page requests a Silverlight app named app.xap, Chiron
automatically creates the app.xap file from the files in the app
directory. This lets you simply edit your Python and/or Ruby files
directly then refresh your browser to get the new version without
needing an explicit build step.

The problem is that, unlike IIS and the ASP.NET Development Server,
Chiron doesn’t integrate with ASP.NET. So it’s fine for building
Silverlight apps that stand alone or talk to 3rd party services. But if
you want to build a Silverlight app that talks back to it’s ASP.NET
host, you’re out of luck. That’s where XapHttpHandler comes in.
XapHttpHandler does the same exact on-demand XAP packaging for dynamic
language Silverlight applications that Chiron does, but it’s implemented
as an
[IHttpHandler](http://msdn.microsoft.com/en-us/library/system.web.ihttphandler.aspx)
so it plugs into the standard ASP.NET pipeline. All you have to do is
put the Chiron.exe in your web application’s bin directory and [add
XapHttpHandler to your
web.config](http://github.com/jschementi/agdlr/blob/63a5ea3cf94068b87273531b5c96d84d8de983d2/utilities/chiron-http-handler/ChironHttpHandler.SampleSite/web.config#L86)
like so:

``` xml
<configuration>
  <!--remaining web.config content ommitted for clarity-->
  <system.web>
    <httpHandlers>
      <add verb="*" path="*.xap" validate="false"
           type="Chiron.XapHttpHandler,Chiron"/>
    </httpHandlers>
  <system.web>
</configuration>
```

The new AgDLR drop includes [a sample
website](http://github.com/jschementi/agdlr/tree/63a5ea3cf94068b87273531b5c96d84d8de983d2/utilities/chiron-http-handler/ChironHttpHandler.SampleSite)
that shows XapHttpHandler in action.

Quick note of caution: by design, XapHttpHandler does not cache the XAP
file – it’s generated anew on every request. So I would highly recommend
*against* using
XapHttpHandler on a production web server. You’re much better off using
Chiron to build a physical XAP file that you then deploy to your
production web server.
