-   Sorry for the posting lag. Had a few technical difficulties around
    here. In the process of moving hosts, so expect more glitches.
-   My talk at the p&p Summit on Monday went really well. At least, it
    felt good and the applause at the end felt genuine. I recorded the
    audio on my laptop, so I’ll be posting a Silverlight version as soon
    as I figure out how to adjust the levels so their somewhat
    consistent.
    [Paraesthesia](http://paraesthesia.com/archive/2007/11/06/microsoft-patterns--practices-summit-2007---day-1.aspx)
    and
    [\#2872](http://www.ademiller.com/blogs/tech/2007/11/software-factories-a-poor-choice-of-name/)
    have reactions.
-   Speaking of the p&p Summit, Scott Hanselman posted his ASP.NET MVC
    demo from his talk. Said ASP.NET MVC bits aren’t available yet, so
    you can’t, you know, run the demo for yourself. But at least you can
    review what the ASP.NET MVC code will look like.
-   I stopped by the SOA/BPM conference last week and saw
    [Jon](http://www.masteringbiztalk.com/blogs/jon/),
    [Sam](http://samgentile.com/blogs/samgentile/) and
    [Jesus](http://weblogs.asp.net/gsusx) among others. Spent quite a
    bit of time talking to Sam and his Neudesic colleagues about this
    “physically distributed/logically centralized” approach that [I
    think is
    hogwash](http://devhawk.net/2007/10/25/The+Worst+Of+Both+Worlds.aspx).
    It sounds to me like Neudesic approach is really federated not
    centralized, though I’m not sure [David
    Pallmann](http://davidpallmann.spaces.live.com/default.aspx) would
    agree. Federated makes much more sense to me than centralized.
-   Nick Malik [continues his
    series](http://blogs.msdn.com/nickmalik/archive/2007/11/05/soa-in-the-replication-model.aspx)
    on SOA Business Operations Model. I especially like his point that
    this isn’t a series of choices, you need to “look at your
    company****and try to understand which model the business has
    selected. ”
-   The [first CTP of PowerShell
    2.0](http://blogs.msdn.com/powershell/archive/2007/11/06/the-community-technology-preview-ctp-of-windows-powershell-2-0.aspx)
    is out! Check out [what’s
    new](http://blogs.msdn.com/powershell/archive/2007/11/06/what-s-new-in-ctp-of-powershell-2-0.aspx)
    on the PowerShell team blog and Jeffrey Snover’s [TechEd
    Presentation](http://blogs.msdn.com/powershell/archive/2007/11/08/teched-what-s-new-for-developers-in-powershell-v2.aspx).
    (via [Sam
    Gentile](http://samgentile.com/blogs/samgentile/archive/2007/11/06/new-and-notable-201.aspx))
-   Soma announced [updates to VC++ coming next
    year](http://blogs.msdn.com/somasegar/archive/2007/11/09/visual-c-libraries-update.aspx),
    including [TR1
    support](http://en.wikipedia.org/wiki/Technical_Report_1) and a
    [“major” MFC
    upgrade](http://blogs.msdn.com/vcblog/archive/2007/11/09/announcing-a-major-mfc-update-plus-tr1-support.aspx)
    to support creating native apps that look like Office, IE or VS. I
    get supporting TR1, but the idea that [people are
    clamoring](http://blogs.msdn.com/vcblog/archive/2007/11/09/hola-from-barcelona-and-welcome-to-a-major-mfc-update.aspx)
    for MFC updates is kinda surprising. Many years ago when I first
    came to MSFT, a friend asked “But don’t you hate Microsoft?” to
    which I responded “No, I just hate MFC”. Obviously, not everyone
    agrees with that sentiment.
-   Steve Vinoski thinks [there’s no hope for
    IT](http://steve.vinoski.net/blog/2007/10/29/theres-no-hope-for-it/).
    Funny, I keep agreeing with Steve’s overall point but disagreeing
    with his reasoning. I still don’t buy the [serendipity
    argument](http://devhawk.net/2007/07/31/Is+Serendipity+The+Heart+Of+The+WSREST+Debate.aspx).
    I like compiled languages. And I think he’s overstating the amount
    of “real, useful guidance” for REST floating around. Basically,
    there’s “[the book](http://www.oreilly.com/catalog/9780596529260/)“.
-   In widely reported news, Windows Live launched their next generation
    services. Don’t bother with the [press
    release](http://www.microsoft.com/Presspass/press/2007/nov07/WindowsLiveLaunchPR.mspx),
    just go to the new [WL home page](http://www.windowslive.com/).
-   Speaking of WL, Dare Obasanjo [points
    to](http://www.25hoursaday.com/weblog/2007/10/24/LiveContactsInteractiveSDKTryOutTheWindowsLiveContactsAPI.aspx)
    the [Live Data Interactive SDK
    page](https://dev.live.com/livedata/sdk/) where you can experiment
    with the WL Contacts REST API. It gives you a good sense of how the
    [Web3S protocol](http://dev.live.com/livedata/web3s.htm) works.
    Pretty well, IMO. However, how come [WL Contacts
    Schema](http://msdn2.microsoft.com/en-us/library/bb463953.aspx)
    doesn’t include some type of update timestamp for sync purposes? If
    you wanted to build say a Outlook \<–\> WL Contacts sync engine,
    you’d have to download the entire address book and grovel thru it
    for changes every sync.
-   Speaking of Web3S, I’d love to see some info on how one might
    implement a service using Web3S. Yaron Goland
    [positions](http://www.goland.org/appanddare/) Web3S as an
    alternative to
    [APP](http://bitworking.org/projects/atom/draft-ietf-atompub-protocol-15.html)
    that WL developed because they “couldn’t make APP work in any sane
    way for our scenarios”. I’m sure other folks have similar scenarios.

