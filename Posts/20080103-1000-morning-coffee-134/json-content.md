-   Bill de Hora
    [responds](http://www.dehora.net/journal/2007/12/21/durable-and-restful/)
    to a few of my [Durable and
    RESTful](http://devhawk.net/2007/12/05/durable-and-restful/)
    ideas. He points out that relying on a client-generated ID can be
    troublesome, and recommends using multiple identifiers – one created
    by the sender, one by the receiver and one representing the message
    exchange itself. However, the sender ID is vulnerable to client bugs
    & tampering as Bill points out, and neither the receiver ID nor the
    exchange ID can be used to determine if a given message is a
    duplicate. If you don’t trust the sender, is it even possible to
    determine if a given message is a duplicate?
-   Pablo Castro
    [confirms](http://blogs.msdn.com/pablo/archive/2007/12/22/idempotence-on-http-operations.aspx)
    that there are “practical limits” to what ADO.NET Data Services can
    do with respect to
    [idempotence](http://devhawk.net/2007/12/10/ado-net-data-services-and-idempotence/).
    Nothing in his post was surprising, though I hope it will be more
    explicitly called out in the final docs. Developers used to the
    comforting protection of a transaction may be in for a rude
    awakening.
-   Dare Obasanjo has a [great post
    comparing](http://www.25hoursaday.com/weblog/2008/01/02/DoesC30BeatDynamicLanguagesAtTheirOwnGame.aspx)
    the new features in C\# 3.0 to dynamic languages like IronPython. I
    believe many of the productivity aspects of dynamic languages have
    little to do with being dynamic.
-   Pat Helland
    [noodles](http://blogs.msdn.com/pathelland/archive/2007/12/27/durability-is-in-the-eye-of-the-beholder.aspx)
    on durability and messaging, two topics near and dear to my heart
    (probably from working with him for a couple of years). I’m not sure
    where he’s going with this – his conclusion that “Basically, big,
    complex, and distributed system are big, complex, and distributed”
    isn’t exactly ground-breaking. But his point that “durable” isn’t a
    binary concept is worth more consideration. Also, his description of
    IMS only looking at the effects of a committed transaction is very
    similar to how web sites work, though obviously HTTP isn’t durable
    so you can’t make event horizon optimizations like IMS did.
-   Tangentially related, Werner Vogels discusses the idea of
    [eventually
    consistent](http://www.allthingsdistributed.com/2007/12/eventually_consistent.html)
    distributed databases. Today, that’s a problem mostly only
    Internet-scale sites like Amazon deal with. In the near future of
    continued data explosion + manycore, we’ll all have to deal with it.
-   Nick Malik
    [argues](http://blogs.msdn.com/nickmalik/archive/2007/12/26/measuring-risk-in-application-portfolio-management.aspx)
    that categorizing enterprise applications by lifecycle is much less
    useful than categorization based on organizational impact. He might
    also need a new chair.
-   Jesus Rodriguez [digs
    into](http://weblogs.asp.net/gsusx/archive/2007/12/21/sql-server-service-broker-2008-conversation-priorities.aspx)
    one of SSB’s new features in SQL 2008: conversation priorities.
-   Arnon Rotem-Gal-Oz and Sam Gentile are mixing it up over the
    definition of SOA. Sam
    [thinks](http://samgentile.com/blogs/samgentile/archive/2008/01/01/soa-it-s-an-and-not-an-or.aspx)
    SOA has to include business drivers and Arnon
    [doesn’t](http://www.rgoarchitects.com/nblog/2007/12/29/SOAIsNotAboutBusiness.aspx).
    I’m with Sam on this, defining “SOA” independently from “Applying
    SOA” seems pointless. Then again, rigorously defining SOA – much
    less arguing about said definition – seems like a waste of time in
    the first place IMHO.
-   Wow, this guy Zed is [mad at the Ruby
    community](http://www.zedshaw.com/rants/rails_is_a_ghetto.html).
-   Andrew Baron has [8 Reasons Why The TV Studios Will
    Die](http://dembot.com/post/22117963). Personally, I think reason
    \#2 – Expendable Middle-Person – is the most important. If content
    producers can reach consumers directly, what value-add will the
    networks provide? (via [United
    Hollywood](http://unitedhollywood.blogspot.com/2007/12/links-viacom-on-already.html))

