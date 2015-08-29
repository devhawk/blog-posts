Took part of the morning off this morning to let the sun shine down on
the icy roads. No major incidents getting to work, though the office
parking lot is like an ice rink.

-   As mentioned yesterday, I finally got my STS implementation working
    with WCS. Turns out that using WCS with the wsFederatedHttp binding
    requires you to specify which claims you want to send to the
    service. In comparison, using WCS with wsHttpBinding automatically
    requests the PPID claim. It would be nice if this was documented
    somewhere. I only figured it out by finding [this
    demo](http://www.dasblonde.net/PermaLink,guid,0de3e38e-a516-4a33-a85d-3027a505f7b8.aspx)
    from [Michele](http://www.dasblonde.net/).
-   [Last week](http://devhawk.net/2007/01/05/morning-coffee-4/), I
    said that we need a better tool than
    [SvcConfigEditor](http://msdn2.microsoft.com/en-us/library/ms732009.aspx).
    This tool is only marginally better than hand-editing the config
    files with intellisense. A “real” tool would keep you from building
    invalid config files. While I appreciate the need for this level of
    flexibility at the transport layer, we really need a better web
    service hosting story than IIS + ASP.NET + web.config. WCF makes me
    long for the days of the MTS/COM+ GUI interface. I never wasted
    hours troubleshooting config issues with MTS/COM+.
-   Apparently, [Xbox 360 outsold Wii and PS3 combined in
    December](http://gamerscoreblog.com/team/archive/2007/01/11/540001.aspx).
    That’s probably more of a statement about PS3 and Wii shortages, but
    there’s no arguing with numbers like 10.4 million Xbox 360 consoles,
    5 millions Xbox Live users, and nearly 3 million copies of Gears of
    War. Congrats to the Xbox team!
-   [David](http://www.from9till2.com/) may be hiding from his blog of
    late, but he did venture out long enough to point me to [SOA
    Facts](http://soafacts.com/). My favorite: Dante has a special level
    in hell for consultants whose resumes do not say SOA.

