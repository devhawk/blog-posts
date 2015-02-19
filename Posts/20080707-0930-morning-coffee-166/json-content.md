Yes, I realize it’s been a while. I tried in vain to catch up with my
blog reading after my Hawaii vacation and finally just gave up and hit
“mark all as read”.

**Dynamic Languages**

-   There’s a new version of the DLR hosting spec available
    ([doc](http://compilerlab.members.winisp.net/dlr-spec-hosting.doc),
    [pdf](http://compilerlab.members.winisp.net/dlr-spec-hosting.pdf)).
    The DLR implementation is still in motion, so there are some
    inconsistencies between the spec and the code, but the spec should
    give you the high level overview you need if you want to host DLR
    languages inside your app.
-   [Oleg Tkachenko](http://www.tkachenko.com/blog/index.html) recently
    joined the dynamic languages team. He’s the creator of the
    [Interactive IronRuby Web Shell](http://www.ironruby.info/ir/), an
    IronRuby version of [Try Ruby](http://tryruby.hobix.com/). Of
    course, it’s not as cool as using SL2to execute the code directly in
    the browser. Michael Foord has his [Python in the
    Browser](http://www.voidspace.org.uk/ironpython/silverlight-console/console.html)
    and my teammates John and Jimmy demoed a Silverlight version of Try
    Ruby @
    [TechEd](http://www.iunknown.com/2008/06/ironruby-at-tech-ed-2008.html).
-   Jim Deville, also of the dynamic languages team, recently started
    [blogging](http://blog.jredville.com/).
-   I have a new boss, Dave Remy. He doesn’t have a blog – yet – but you
    can follow him on Twitter as daveremy. When Twitter is actually
    working that is.
-   There’s a new [homepage/wiki for IronRuby](http://ironruby.com/)
    though I’m not sure why there’s a picture of Matz wearing a Python
    shirt on the home page.
-   My teammate Jimmy Schementi [provides some “continued
    hope”](http://blog.jimmy.schementi.com/2008/07/aspnet-and-dynamic-languages.html)
    for a better (heck, I’ll take current) ASP.NET and ASP.NET MVC story
    for DLR languages.
-   Via Michael Foord, sounds like
    [IronClad](http://www.resolversystems.com/documentation/index.php/Ironclad)
    is making good progress. V0.4 can run the bz2 module “in its
    entirity” (maybe run a spellcheck on your site, guys?) and now
    [apparently](http://twitter.com/voidspace/statuses/838177435), it’s
    now able to load numpy.core. Very exciting!

**Other Stuff**

-   Pat Helland, who has blogged even less than me for the past few
    months, has a post up about [controller and
    doers](http://blogs.msdn.com/pathelland/archive/2008/07/06/controllers-and-doers.aspx)
    in the IT department. After 18 months in MSIT, put me in the doer
    camp, please.
-   The F\# team has pushed out a [spec for v1.9.4 of the
    language](http://research.microsoft.com/fsharp/manual/spec2.aspx).
    Don Syme says [it’s not
    official](http://blogs.msdn.com/dsyme/archive/2008/06/28/updated-specification-for-the-1-9-4-spring-refresh-release.aspx),
    but it’s a huge improvement over the [old informal
    spec](http://research.microsoft.com/fsharp/manual/lexyacc.aspx)
-   Speaking of F\#, my friend Matthew Podwysocki [recently
    published](http://weblogs.asp.net/podwysocki/archive/2008/06/19/announcing-fstest-a-testing-dsl-for-f.aspx)
    FsTest, a testing DSL for F\#. I [wrote about F\# unit
    testing](http://devhawk.net/2007/12/12/Practical+F+Parsing+Unit+Testing.aspx)
    as part of my [PEG parsing
    series](http://devhawk.net/2007/12/10/Practical+Parsing+In+F.aspx),
    and I really like the direction Matthew has taken this project. You
    can pull it down from [CodePlex](http://www.codeplex.com/FsTest).
-   When I did my [PEG
    talk](http://www.langnetsymposium.com/talks/3-03%20-%20Parsing%20Expression%20Grammars%20in%20FSharp%20-%20Harry%20Pierson.html)
    @ Lang.NET, [Gilad Bracha](http://gbracha.blogspot.com/) mentioned I
    should check out [oMeta](http://www.cs.ucla.edu/~awarth/ometa/). It
    looks really cool, though with the job change I haven’t had the time
    to play with it. Now I discover that [Jeff
    Moser](http://www.moserware.com) is working on a version for CLR
    called
    [oMeta\#](http://www.moserware.com/2008/06/ometa-who-what-when-where-why.html)
    that I’ve got to spend some time with. And in the comments to that
    post, I discovered
    [pyMeta](http://washort.twistedmatrix.com/2008/04/pymeta-is-more-than-just-parsing.html)
    from [Allen Short](http://washort.twistedmatrix.com), though it
    [apparently doesn’t
    work](http://www.moserware.com/2008/06/ometa-who-what-when-where-why.html?showComment=1214526120000#c1681985703114584575)
    on IronPython (must investigate why).
-   James Kovacs [introduces
    psake](http://codebetter.com/blogs/james.kovacs/archive/2008/06/27/introducing-psake.aspx),
    a PowerShell based build automation tool which uses a rake-inspired
    internal DSL syntax similar to one [I blogged last
    year](http://devhawk.net/2007/02/21/Internal+DSLs+In+PowerShell.aspx).
    I’d love to see this take off, but given MSBuild’s tool integration,
    I wonder if that’s feasible.
-   I [upgraded my home wireless
    network](http://devhawk.net/2007/07/09/Upgrading+My+Home+Wireless+Network.aspx)
    almost exactly a year ago. I’ve been happy with the range and
    coverage, but not so happy with the Buffalo Tech firmware. The
    built-in DHCP server is pretty flaky. So I upgraded to the
    open-source [Tomato firmware](http://www.polarcloud.com/tomato).
    Upgrade was smooth, though I did need to reset my cable modem. But
    even that was smooth – Comcast has an automated service for that
    now,

