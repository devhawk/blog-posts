The cross platform CLR isn’t the only big news out of MIX this week.
Other big news includes:

-   The [Dynamic Language
    Runtime](http://blogs.msdn.com/hugunin/archive/2007/04/30/a-dynamic-language-runtime-dlr.aspx),
    an extension to the CLR that implements typical dynamic language
    features. According to Jim Hugunin, this will make it “dramatically
    easier to build high-quality dynamic language implementations on
    .NET.” Also, it works with Silverlight’s CLR. And we’ll be releasing
    the source, like we do with IronPython.
-   We’re building four dynamic languages on top of the DLR: IronPython
    v2, JavaScript, Visual Basic “10″ (aka
    [VBx](http://www.panopticoncentral.net/archive/2007/05/01/20383.aspx))
    and IronRuby. [He-man
    Programmer](http://www.knowing.net/PermaLink,guid,a3baaf7a-1af3-460a-8486-6b459dab51ed.aspx)[John
    Lam](http://www.iunknown.com/) has a
    [screencast](http://silverlight.net/Learn/learnvideo.aspx?video=74)
    demonstrating these the languages interoping on Silverlight. You can
    get an [alpha of the new
    IPy](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=438) which
    includes the DLR bits.
-   [Expression Studio](http://www.microsoft.com/expression) is
    available, as is the first preview of [Blend
    v2](http://www.microsoft.com/Expression/products/download.aspx?key=blend2maypreview),
    which allows you to target Silverlight. There’s also a Silverlight
    targeting [Media Encoder
    preview](http://www.microsoft.com/Expression/products/download.aspx?key=encoder)
    available.
-   Projects
    [Astoria](http://blogs.msdn.com/adonet/archive/2007/04/30/project-codename-astoria-announced-at-mix-07.aspx)
    and
    [Jasper](http://blogs.msdn.com/adonet/archive/2007/04/30/project-codename-jasper-announced-at-mix-07.aspx)
    are two new [data access incubation
    projects](http://msdn2.microsoft.com/en-us/data/bb419139.aspx).
    Astoria is for exposing your data as data services for consumption
    by other clients (think mashups) while Jasper is for quickly writing
    code that access databases. Both appear to build on the new [ADO.NET
    Entity
    Framework](http://msdn2.microsoft.com/en-us/data/bb419139.aspx)
    that’s shipping ~~in VS Orcas~~[sometime after VS
    Orcas](http://blogs.msdn.com/adonet/archive/2007/04/28/ado-net-entity-framework-update.aspx).
-   Windows Live has a new [Contacts
    API](http://msdn2.microsoft.com/en-us/library/bb463989.aspx),
    [Spaces API and
    Feeds](http://msdn2.microsoft.com/en-us/library/bb447732.aspx), a
    [media hosting/streaming service for
    Silverlight](http://silverlight.live.com/) and [simpler terms of use
    and pricing
    model](http://dev.live.com/blogs/devlive/archive/2007/04/30/108.aspx)
    based on the number unique users. “Sites or Web applications with
    fewer than one million UUs pay no fees.”
-   All the MIX sessions are [getting
    posted](http://sessions.visitmix.com/) in very quickly – about a day
    after the session. The sessions are available for download a WMV or
    to view using a Silverlight based viewer. Nice.

A few quick thoughts on these announcements:

-   On the subject of dynamic languages, IronRuby is probably the
    biggest news since we already have various implementations of the
    other languages. I wonder how well it will support
    [Rails](http://www.rubyonrails.com/)? ASP.NET already has a [model
    for dynamic language
    support](http://quickstarts.asp.net/Futures/dlr/doc/intro.aspx) that
    I would assume IronRuby will plug into eventually. Between that,
    rumblings of [MVC support for
    ASP.NET](http://codebetter.com/blogs/jeffrey.palermo/archive/2007/03/16/Big-News-_2D00_-MVC-framework-for-ASP.NET-in-the-works-_2D00_-level-300.aspx)
    and Project Jasper, you’ve covered most of the surface area Rails
    covers. But I would assume many folks would like to see RoR proper
    running under IronRuby on ASP.NET.
-   I wonder what the hosting model for the [Silverlight
    CLR](http://blogs.msdn.com/jasonz/archive/2007/05/01/origin-of-the-silverlight-clr-and-net-framework.aspx)
    looks like? According to the “[essential
    architecture](http://msdn2.microsoft.com/en-us/library/bb404713.aspx)“,
    Silverlight includes the .NET Framework, the Core Presentation
    Framework and the Browser Host. But can you host somewhere *other*
    than the browser?
-   Astoria sounds like web service based ODBC. While there are
    scenarios where that makes sense, I’m not sure I like the idea of
    delegating control of my data outside the service like that. Udi
    Dahan is [also
    skeptical](http://udidahan.weblogs.us/2007/05/01/astoria-sdo-and-irrelevance/)
    of this approach.

**Update**: The ADO.NET team [recently
announced](http://blogs.msdn.com/adonet/archive/2007/04/28/ado-net-entity-framework-update.aspx)
that Entity Framework will ship “during the first half of 2008 as an
update to the Orcas release of the .NET Framework and Visual Studio”.
([h/t Tomas
Restrpro](http://devhawk.net/CommentView,guid,1EE971D4-CCE6-403C-BF3E-8BFD28E82BBE.aspx#3fc5b2c6-9353-444e-a4d4-1da98a8e0bbd))
