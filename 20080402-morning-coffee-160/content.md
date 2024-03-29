I took most of last week between jobs and have spent much of this week
getting machines setup, access to builds, etc. Furthermore, RSS Bandit
ate my feedlist and I am still soldiering on sans mobile phone so I was
pretty much unconnected for about a week and a half.

#### IPy Stuff

-   Laurence Moroney
    [demonstrates](http://blogs.msdn.com/webnext/archive/2008/03/30/silverlight-dynamic-languages-in-visual-studio.aspx)
    how to configure a web site project in VS08 to use [Dynamic
    Silverlight’s](http://dynamicsilverlight.net/) development web
    server Chiron. I looked at turned it into an exported template, but
    I think the Start Options are stored in the suo file and I’m not
    sure how to include that in the template. Maybe it could be set w/ a
    macro or at worst a GAX recipe?
-   If you’re a regular reader, you might as well get used to the name
    “Michael Foord”. He’s a developer @ [Resolver
    Systems](http://www.resolversystems.com/), makers of the IPy based
    [Resolver
    One](http://www.resolversystems.com/products/resolver-one.php)
    app/spreadsheet hybrid I’ve [written about
    before](http://devhawk.net/2008/01/31/morning-coffee-141-lang-net-08-edition/).
    He’s also the author of the upcoming [IronPython in
    Action](http://www.ironpythoninaction.com/) book and the maintainer
    of [Planet
    IronPython](http://www.voidspace.org.uk/ironpython/planet/) and the
    [IronPython Cookbook](http://www.ironpython.info/). I’m going to try
    very hard to only link to Michael at most once per day. Frankly,
    that’ll be tough.
-   Today’s Michael Foord Link: Michael turned his PyCon talk on IPy +
    SL2 into a series of articles entitled [IronPython & Silverlight 2
    Tutorial with Demos and
    Downloads](http://www.voidspace.org.uk/python/weblog/arch_d7_2008_03_22.shtml#e949).
-   Ken Levy (who now sits just down the hall from me) [clued
    me](http://blogs.msdn.com/vsxteam/archive/2008/03/31/ironpython-studio-1-0-for-isolated-and-integrated-vs-shell.aspx)
    into the 1.0 release of [IronPython
    Studio](http://www.codeplex.com/IronPythonStudio), which is a free
    IDE based on the VS08 Shell for IronPython (based on code from the
    [VS SDK](http://msdn2.microsoft.com/vsx/)). Big new feature in this
    release is support for the integrated VS08 Shell, which means it’ll
    snap into your existing VS08 installation (well, not express) rather
    than forcing you to install the [300 MB isolated
    shell](http://www.microsoft.com/downloads/details.aspx?FamilyId=ACA38719-F449-4937-9BAC-45A9F8A73822&displaylang=en).

Other Stuff

-   Caps had a [BIG win last
    night](http://www2.nhl.com/nhl/app?service=page&page=Recap&gameNumber=1189&season=20072008&gameType=2)
    when they needed it most. Now they’re tied with Carolina for the SE
    division lead, but they lose the tiebreaker so unfortunately, they
    can’t make the playoffs without help. ‘Canes have to head back home
    last night to play Tampa Bay, they have to win tonight and Friday to
    clinch. Loss in either gives the Caps control of their own destiny.
    Caps are only one game back of Ottawa, Boston and Philly, none of
    whom have played well down the stretch. It does mean I have to root
    for the frakking Penguins to beat Philly, twice.
-   Now that I’m in a job where I’ll be traveling occasionally, I really
    appreciated Scott Hanselman’s [travel
    tips](http://www.hanselman.com/blog/10GuerillaAirlineTravelTipsForTheGeekMindedPerson.aspx),
    though I’m not sure “Don’t look like a schlub” is in the cards for
    me.
-   Unless you’ve been living under a rock, you’re probably aware that
    Scott Guthrie
    [blogged](http://weblogs.asp.net/scottgu/archive/2008/03/21/asp-net-mvc-source-code-now-available.aspx)
    that the ASP.NET MVC Source Code is [available on
    CodePlex](http://www.codeplex.com/aspnet). The project name is
    “aspnet” not “aspnetmvc” which makes me wonder if they might release
    the source to more ASP.NET stuff over time.
-   Speaking of Scott Guthrie, today he blogged about [unit testing in
    Silverlight](http://weblogs.asp.net/scottgu/archive/2008/04/02/unit-testing-with-silverlight.aspx).
    Jeff Wilcox appears to have the [definitive
    post](http://www.jeff.wilcox.name/2008/03/31/silverlight2-unit-testing/)
    on the subject, including links to the SilverLight testing framework
    (it’s included in the [SL Controls source code
    release](http://www.microsoft.com/downloads/details.aspx?FamilyId=EA93DD89-3AF2-4ACB-9CF4-BFE01B3F02D4&displaylang=en)).
    He also provides a prebuilt “Silverlight Test” project template for
    easy download. Personally, I really like the in-browser test runner.
    I wonder how hard it would be to hook that up to
    [DySL](http://dynamicsilverlight.net/) so you could write your tests
    in IPy? (given that IPy doesn’t have attributes, I’m guessing
    there’d be at least a bit of work involved in making this happen)
-   Speaking of Silverlight,
    [apparently](http://www.microsoft.com/presspass/press/2008/apr08/04-01WM61PR.mspx?rss_fdn=Press%20Releases)
    the [next version of Windows
    Mobile](http://www.microsoft.com/windowsmobile/6-1/default.mspx)
    (i.e. 6.1) will support it. Since I’m in the market for a new phone
    anyway, I’m thinking of getting one of these. Also, it’s nice to see
    a [marketing site for WM
    6.1](http://www.microsoft.com/windowsmobile/6-1/default.mspx) using
    Silverlight instead of Flash like [WM 6.0 marketing
    site](http://www.microsoft.com/windowsmobile/6/default.mspx?WT.mc_ID=wmhome_WM6)
    does.(via
    [LiveSide](http://www.liveside.net/blogs/main/archive/2008/04/01/at-ctia-wireless-microsoft-unveils-windows-mobile-6-1-new-version-of-internet-explorer-mobile.aspx))
-   Ted Neward turns the news that MSFT is [releasing XAML under the
    OSP](http://www.microsoft.com/downloads/details.aspx?FamilyId=3356AF19-A36E-4D6D-9D13-C37DB81EE607&displaylang=en)
    into a [long and fascinating history
    lesson](http://blogs.tedneward.com/2008/04/02/Is+Microsoft+Serious.aspx)
    that is well worth the read. I’m going to skip commenting on it,
    beyond advising you dear reader to read this if you haven’t already,
    except to wonder: how many sides does a “Redmondagon” have?

