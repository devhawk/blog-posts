You know, this gets pretty long when I go a week between morning coffee
posts.

**Dynamic Language Stuff**

-   There’s a new version of the [DLR Hosting
    spec](http://compilerlab.members.winisp.net/dlr-spec-hosting.pdf).
    One of the biggest changes is the removal of DLR’s pre-canned
    knowledge of IPy and IRuby. Now, you use app.config to specify DLR
    languages and map them to extensions. Sesh has [the
    details](http://blogs.msdn.com/seshadripv/archive/2008/09/07/dlr-hosting-api-latest-version-of-the-spec-is-available-online-includes-changes-to-runtime-initialization.aspx)
    and [a
    sample](http://blogs.msdn.com/seshadripv/archive/2008/09/11/dlr-hosting-sample-simple-dlr-host-using-the-new-app-config-based-scriptruntime-creation.aspx).
    If you only care about hosting IPy, you can use our [language
    specific hosting
    API](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=490056&changeSetId=39648)
    which doesn’t require app.config.
-   Jimmy [pushed
    out](http://blog.jimmy.schementi.com/2008/08/silverlight-dynamic-languages-sdk-03.html)
    a new version of the [Silverlight Dynamic Languages
    SDK](http://www.codeplex.com/sdlsdk/Release/ProjectReleases.aspx?ReleaseId=16845).
    He’s on the lookout for a better name, one of his commenters
    suggested “SilverWhisper Kit”.
-   Srivatsn shows [how to pass Python keyword arguments to a C\#
    method](http://blogs.msdn.com/srivatsn/archive/2008/09/09/passing-keyword-args-to-c-methods-from-ironpython.aspx)
    using
    [ParamDictionaryAttribute](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=478028&changeSetId=39648),
    similar to how C\# supports the params keyword via the
    [ParamArrayAttribute](http://msdn.microsoft.com/en-us/library/system.paramarrayattribute.aspx).
    Unfortunately, there’s no syntactic sugar for calling param
    dictionary methods from C\#. I wonder, do most people like or
    dislike the idea of language level support for keyword arguments in
    C\#? I’m guessing most would be against, though I think it’s a cool
    idea.
-   Maybe it’s me, but I’ve noticed an uptick in [twitter posts
    containing “ironpython”](http://summize.com/search?q=ironpython) of
    late. For example, [via
    Summize](http://twitter.com/jjude/statuses/912592287) I discovered
    [Joseph Jude’s blog finally{}](http://www.jjude.com/) where he has
    posted a [time tracking
    tool](http://www.jjude.com/index.php/archives/2008/09/01/a-time-tracking-tool/)
    he built in IPy as well as his initial [IPy
    learnings](http://www.jjude.com/index.php/archives/2008/09/07/ironpython-learnings/).
-   Michael Foord, as usual, has been generating quite a bit of good IPy
    content. He did a [tutorial on IPy at PyCon
    UK](http://www.pyconuk.org/community/IronPythonTutorial),  [his
    book](http://www.ironpythoninaction.com/) is almost done, he has
    some interesting thoughts on [dynamic language
    performance](http://www.voidspace.org.uk/python/weblog/arch_d7_2008_09_06.shtml#e1010)
    and even admits that [he likes
    C\#](http://www.voidspace.org.uk/python/weblog/arch_d7_2008_08_30.shtml#e1008),
    though not as much as he likes Python.
-   Vernon Cole
    [announced](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-August/008261.html)
    that the [adodbapi project](http://adodbapi.sourceforge.net/) now
    supports IronPython 2.0 as well as CPython. This library is a
    [DB-API
    2.0](http://www.python.org/topics/database/DatabaseAPI-2.0.html)
    compliant interface for any database that support ADO (note, that’s
    native ADO not ADO.NET). I love to see Python projects with explicit
    support for IPy.
-   My boss – who apparently will be called “Rem” from now on in the
    office – saves you “gazillions” by [explaining non-positional
    negotiating strategy](http://blog.remlog.net/?p=15) and draws the
    comparison to agile software development. Not exactly related to
    dynamic languages, but I’d like to see him further explore the
    relationship super-optimal, non-positional, significantly-hyphenated
    negotiation and software design. (OK, I made up
    “significantly-hyphenated”)

**Other Stuff**

-   Don Syme blogs about an [update to the F\#
    CTP](http://blogs.msdn.com/dsyme/archive/2008/09/06/f-ctp-release-update.aspx),
    a mere week after the original release. One week? That’s more often
    than even IPy releases. I can’t wait to see what they ship in next
    week’s release!
    ![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)
    Seriously, I hope they can keep the release sprints short, but every
    week would be a bit crazy!
-   Speaking of F\#, Matt Podwysocki [updates
    FsTest](http://weblogs.asp.net/podwysocki/archive/2008/09/04/fstest-updated-with-f-ctp.aspx)
    for the F\# CTP and posts about [Extension
    Everything](http://weblogs.asp.net/podwysocki/archive/2008/09/09/object-oriented-f-extension-everything.aspx)
    in F\#. Unlike C\#, which only supports extension methods, F\# also
    supports extensions properties, static methods and events, though
    like Matt I can’t think of a good use for extension events.
-   Still speaking about F\#, Andrew Kennedy has a
    [three](http://blogs.msdn.com/andrewkennedy/archive/2008/08/29/units-of-measure-in-f-part-one-introducing-units.aspx)[part](http://blogs.msdn.com/andrewkennedy/archive/2008/09/02/units-of-measure-in-f-part-two-unit-conversions.aspx)[series](http://blogs.msdn.com/andrewkennedy/archive/2008/09/04/units-of-measure-in-f-part-three-generic-units.aspx)
    on the new units of measure feature of F\#. If you were going to use
    F\# to build the physics engine of a game, I would suspect UoM would
    be extremely useful. (via [Don
    Syme](http://blogs.msdn.com/dsyme/archive/2008/08/30/an-introduction-to-units-of-measure-by-andrew-kennedy.aspx))
-   Oh look, Chris Smith built an [F\# version of artillery
    game](http://feeds.feedburner.com/~r/ChrisSmithsCompletelyUniqueView/~3/383195149/simple-f-game-using-wpf.aspx)
    that uses Units of Measure for the physics code. I’ll bet UoM was
    extremely useful.
    ![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)
-   Talking about Live Mesh at TechEd Australia – where much to my
    surprise frankly they were [demoing Live Mesh
    Apps](http://www.liveside.net/main/archive/2008/09/07/live-mesh-buildup-begins-mesh-apps-shown-at-tech-ed-australia.aspx)
    – I pointed out to Scott Hanselman that Mesh is running an embedded
    CoreCLR (aka the same CLR from Silverlight 2). Scott went poking
    around and [posted what he
    discovered](http://www.hanselman.com/blog/WindowsLiveMeshSilverlightAndTheCoreCLR.aspx).
    Looking forward to finding out what he digs up on using CoreCLR
    outside the browser.
-   Speaking of Scott, I need to set up a [family video conference
    solution](http://www.hanselman.com/blog/SkypingTheWifeFoolproofVideoConferencingWithYourFamilyWhileOnTheRoad.aspx)
    like Scott’s before my next trip.
-   Congrats to Glenn Block and the MEF team for their [initial CodePlex
    source
    drop](http://blogs.msdn.com/gblock/archive/2008/09/06/mef-making-its-debut-on-codeplex.aspx)!
    I’ve been hearing about this possibility since Glenn joined the
    team, so I’m really excited to see it happen. I need to take a look
    at it in detail (in my copious spare time) because I want to find
    out how to make it work with IPy.
-   Bart de Smet has a whole series ([starting
    here](http://community.bartdesmet.net/blogs/bart/archive/2008/08/26/to-bind-or-not-to-bind-dynamic-expression-trees-part-0.aspx))
    on Dynamic Expression Trees. However, given that he specifically
    writes “This blog series is not about DLR itself” makes it seem
    pretty conceptual to me. Why not talk about DLR expression trees
    instead Bart?
-   I’m sure you noticed [ASP.NET MVC preview
    5](http://haacked.com/archive/2008/08/29/asp.net-mvc-codeplex-preview-5-released.aspx)
    dropped last week. I really liked Brad Wilson’s discussion of the
    [new view engine
    design](http://bradwilson.typepad.com/blog/2008/08/partial-renderi.html).
-   Tomas Restrepo has started [publishing his source code on
    GitHub](http://www.winterdom.com/weblog/2008/08/31/WhyGitHub.aspx).
    Personally, I haven’t published any source code lately but I am
    using Git for all of my non IPy core work (which is stored in TFS).
    Like Tomas, I’m still getting the hang of Git but I’m really digging
    it’s speed, it’s branching and the fact that there’s zero
    infrastructure requirements. SVN provides the lightweight
    [svnserve](http://svnbook.red-bean.com/en/1.4/svn.serverconfig.svnserve.html),
    but Git is even lighter weight than that.
-   I liked Steve Yegge’s [post on
    typing](http://steve-yegge.blogspot.com/2008/09/programmings-dirtiest-little-secret.html).
    I am a touch typer, but I doubt I type 70 words a minutes. I do know
    where the number keys are without looking though, so I guess that’s
    pretty good. I remember seeing [Chris
    Anderson](http://www.simplegeek.com/) demo ~~Avalon~~ WPF long
    before it was public and being impressed at how fast he could type.

