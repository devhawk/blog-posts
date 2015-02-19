-   Forgot to say this yesterday, but I’m happy the Colts are in the
    Super Bowl. Well, I guess I’m more happy that New England *isn’t* in
    it. They’ve won it enough lately. I wish the Saints has made it, but
    at least this way I have no question who to root for on Super Bowl
    Sunday.
-   My Gamerscore [cracked
    1000](http://gamerscorechart.com/theme/xbox/raytracer.png) over the
    weekend. I got [60 points in Dead
    Rising](http://live.xbox.com/en-US/profile/Achievements/ViewAchievementDetails.aspx?compareTo=RayTracer&tid=%09%5d%3abn%2bi6%05%03)
    and [100 points in NHL
    07](http://live.xbox.com/en-US/profile/Achievements/ViewAchievementDetails.aspx?compareTo=RayTracer&tid=%09%5d%3adh)k0%01%02).
    I have played ten games + three arcade games for a maximum possible
    Gamerscore of 10,600 and a Gamerscore “conversion rate” of 10.28%. I
    wonder how good that is? All the leader boards I’ve seen rate purely
    on Gamerscore.
-   Speaking of games, [Obsidian](http://www.obsidianent.com/) (of
    Neverwind Nights fame) is working on an [Aliens
    RPG](http://www.obsidianent.com/aliens_announced.html)! Check out
    [this
    post](http://www.edery.org/2007/01/game-design-research-ala-avellone/)
    by Chris Avellone of Obsidian on Game Design Research (via [Game
    Tycoon](http://www.edery.org/)).
-   [Richard Grimes’](http://www.richardgrimes.com/)[.NET
    Instrumentation
    Workshop](http://www.grimes.demon.co.uk/workshops/instrumentationWS.htm)
    rocks. Richard also has extensive workshops on [.NET
    Security](http://www.grimes.demon.co.uk/workshops/securityWS.htm)
    and [.NET
    Fusion](http://www.grimes.demon.co.uk/workshops/fusionWS.htm) (aka
    runtime binding). If they’re as good as the instrumentation
    workshop, they’re worth a read.
-   In my SSB/WF prototypes, I’ve simply been writing to the console.
    The lo-tech brute force works okay for a console app, but not at all
    when I move my code into a shared library. So I decided to bite the
    bullet now and translate the Console.WriteLine calls into
    TraceSource calls. My prototype isn’t that big (yet), but it went
    pretty smooth nonetheless. I currently have three TraceSources in my
    solution – one for the host, one for my SSB activities & workflow
    service and one for the persistence engine (I just inherited
    from SqlWorkflowPersistenceService and added the trace calls). I’m
    sure in time, I’ll wish I had set up my TraceSources differently,
    but for now it works.
-   The one feature I lost moving from Console.WriteLine to TraceSources
    was color support. Since I am creating voluminous tracing data, I
    used color coding to indicate which part of the application the
    trace information was coming from. Of course, the OOB
    ConsoleTraceListener doesn’t have any mechanism to color code the
    output. I hacked up a ColorConsoleTraceListener in a couple of
    minutes that worked great. I say “hacked” because my color choosing
    code is currently hard coded, rather than being stored the config
    file. If I get the time to change that, I’ll post the code here.
-   While researching ASP.NET’s Membership system, I found [this Scott
    Guthrie
    post](http://weblogs.asp.net/scottgu/archive/2006/02/24/ASP.NET-2.0-Membership_2C00_-Roles_2C00_-Forms-Authentication_2C00_-and-Security-Resources-.aspx)
    with links to ASP.NET providers for
    [MySql](http://www.codeproject.com/aspnet/MySQLMembershipProvider.asp),
    [Oracle](http://msdn2.microsoft.com/en-us/library/aa479070.aspx) and
    [SQLite](http://www.eggheadcafe.com/articles/20051119.asp). I’ve
    wondered about the lack of a simple file-based ASP.NET
    role/membership provider and even started hacking together an XML
    based one. But the availability of a [.NET SQLite data
    provider](http://sqlite.phxsoftware.com/) makes that an interesting
    option. XML would be human readable, but porting the [existing SQL
    providers](http://weblogs.asp.net/scottgu/archive/2006/04/13/442772.aspx)
    to SQLite would probably be easier.
-   Politics 2.0 in action: [Talking Points
    Memo](http://www.talkingpointsmemo.com/) is enouraging you (aka
    [Time Magazine’s Person of the
    Year](http://www.time.com/time/magazine/article/0,9171,1569514,00.html))
    to [record your own
    response](http://www.talkingpointsmemo.com/archives/012075.php) to
    tonight’s State of the Union. Basically record your response via
    camcorder, webcam or cellphone. Then upload it to YouTube and add it
    to the [TPM SOTU group](http://youtube.com/group/tpmsotu). With
    President Bush’s approval rating at [all time
    lows](http://www.cbsnews.com/stories/2007/01/22/opinion/polls/main2384943.shtml),
    I’m guessing these videos will be venting some of the pent up
    hostility towards this administration.

