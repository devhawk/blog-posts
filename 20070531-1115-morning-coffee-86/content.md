-   Google announces [Gears](http://gears.google.com/), a browser plugin
    for taking your web application offline. Developer docs are [also
    available](http://code.google.com/apis/gears/).
    [TechMeme](http://www.techmeme.com/070531/p8) has lots more, but
    obviously this is yet another significant bow shot in the
    ~~upcoming~~ [unified client platform
    war](http://devhawk.net/2007/05/23/morning-coffee-82/). By my
    count, there are four horses in this race: Microsoft with
    [.NET](http://msdn2.microsoft.com/netframework) and
    [Silverlight](http://www.microsoft.com/silverlight/), Adobe with
    [Flash](http://www.adobe.com/products/flash/) and
    [Apollo](http://labs.adobe.com/technologies/apollo), Google with
    [AJAX](http://code.google.com/webtoolkit/) and
    [Gears](http://code.google.com/apis/gears/) and Sun with
    [Java](http://java.sun.com/) and
    [JavaFX](http://www.sun.com/software/javafx/). Did I miss
    anyone? (via [Dare
    Obasanjo](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=f61d1dd0-e0f6-48d1-9009-77a5d8a423f0)
    and [Scott
    Hanselman](http://www.hanselman.com/blog/GoogleGearsMaybeAllRichInternetApplicationsNeededWasLocalStorageAndAnOfflineMode.aspx))
-   Alex James [writes](http://www.base4.net/blog.aspx?ID=436) that REST
    is about intent and shows a pseudo-code sample posting multiple
    changes to a single endpoint as a way of demonstrating your intent
    that they be applied atomically. [Andres
    Aguiar](http://weblogs.asp.net/aaguiar/) left a
    [comment](http://devhawk.net/CommentView,guid,8DB9FDF7-636D-4BF0-BAC0-C47CBE10664C.aspx#705d9249-216c-43e1-8538-bb23088dc222) saying
    that Astoria does something similar. Personally, I like that model
    for transactions better than the transaction factory approach Jon
    Udell
    [describes](http://blog.jonudell.net/2007/05/24/restful-web-services/).
    But either way, you’ve moved beyond simple CRUD style services and
    into the world of protocol. Surfacing intent via protocol aligns
    with what Tim
    [described](http://pluralsight.com/blogs/tewald/archive/2007/04/26/46984.aspx)
    as making the protocol explicit
-   Windows Live posted [new beta
    versions](http://get.live.com/betas/home) of
    [Writer](http://windowslivewriter.spaces.live.com/blog/cns!D85741BB5E0BE8AA!1272.entry),
    [Mail](http://morethanmail.spaces.live.com/blog/cns!B7DD1FF3F141F9A1!3459.entry)
    and
    [Messenger](http://messengersays.spaces.live.com/blog/cns!5B410F7FD930829E!27545.entry).
    I’ve been on an internal build of the new Writer for a while and
    I’ve really been impressed. There’s also a new [Provider
    Customization
    API](http://msdn2.microsoft.com/en-us/library/bb463266.aspx), so I
    can’t wait to see what the DasBlog folks do with that.
-   Scott Guthrie’s LINQ series
    [continues](http://weblogs.asp.net/scottgu/archive/2007/05/29/linq-to-sql-part-2-defining-our-data-model-classes.aspx),
    this time covering how to build the LINQ to SQL data model. Looks
    like they used the [DSL
    toolkit](http://msdn2.microsoft.com/en-us/vstudio/aa718368.aspx) to
    build the LINQ to SQL data model designer, cool! 
-   Martin Fowler [digs
    into](http://martinfowler.com/bliki/HelloRacc.html)[racc](http://i.loveruby.net/en/projects/racc/),
    a yacc-esque compiler compiler for Ruby. Looks interesting as a
    internal DSL example (better than the now-canonical rake example).
    But why is the sexy new language on the block using old school
    [CFG’s](http://en.wikipedia.org/wiki/Context-free_grammar) instead
    of new hotness [PEG’s](http://pdos.csail.mit.edu/~baford/packrat/)?
-   Speaking of Martin, he
    [writes](http://martinfowler.com/bliki/RubyMicrosoft.html) about the
    opportunity Ruby presents to Microsoft, building on Scott
    Hanselman’s
    [concerns](http://www.hanselman.com/blog/IsMicrosoftLosingTheAlphaGeeks.aspx)
    that Microsoft is losing the Alpha Geeks. Sam Gentile also [weighs
    in](http://codebetter.com/blogs/sam.gentile/archive/2007/05/31/microsoft-at-the-crossroads.aspx),
    suggesting that Microsoft is at the crossroads. Frankly, I don’t
    work in evangelism anymore so I’m going pass these links along
    without comment except to say that Scott, Martin and Sam are all
    folks I have much *much* respect for.

