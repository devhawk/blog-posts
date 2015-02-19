-   I’m in Chicago today and tomorrow for a reunion of sorts. In my last
    job, I managed a group of external architects called the Microsoft
    Architecture Advisory Board (aka the MAAB). We discontinued the
    program a while back, but the core of the group found the program
    valuable enough they have continued to meet anyway. I found the MAAB
    meetings incredibly valuable and insightful, so I’m really excited
    to be invited to continue my involvement with the group.
-   I picked up Bioshock Tuesday (Circuit City [had it on
    sale](http://www.xbox360fanboy.com/2007/08/19/get-bioshock-and-all-pro-football-for-the-cheap/))
    on my way to my bi-weekly campus excursion. My meetings were over
    around 2pm so I headed home early, expecting to surprise the kids.
    But Jules had decided to skip naps and go shopping with them. Her
    cell phone was dead, so I ended up at home with a couple of hours to
    myself and a brand new copy of Bioshock. Wow, is that a good game.
    Certainly deserving of the [amazingly good
    reviews](http://www.metacritic.com/games/platforms/xbox360/bioshock)
    it’s garnered.
-   Speaking of reviews, [this transparently biased review of
    Bioshock](http://www.sonydefenseforce.com/?p=83) over at Sony
    Defense ~~Farce~~ Force is frakking hilarious. Somehow, I doubt
    their dubious review will stem the tidal wave of Bioshock’s
    well-deserved hype. Can’t wait to read their Halo 3 review.
-   Pat Helland [writes at
    length](http://blogs.msdn.com/pathelland/archive/2007/08/19/thoughts-about-multi-master-replication-of-tree-structured-data.aspx)
    on master-master replication. I [reformated it into
    PDF](http://blogs.msdn.com/pathelland/archive/2007/08/20/easier-to-read-version-of-my-last-post.aspx)
    so I could read it – the large images were messing up the text flow
    on my system. As usual for Pat, there’s gold in that thar post. His
    thoughts on DAGs of versions and vector clocks as identifiers are
    very exciting. However, I think he glosses over the importance of
    declarative merging. I would think programmatic merge would likely
    be non-deterministic across nodes. If so, wouldn’t you end up with
    two documents with the same vector-clock identifier by different
    data?
-   Joe McKendrick [points
    to](http://blogs.zdnet.com/service-oriented/?p=939) a few people who
    predict the term “service-oriented” will eventually be subsumed
    under the general heading of “architecture”. Not to brag, but I made
    that exact same prediction [almost three years
    ago](http://blogs.msdn.com/jevdemon/archive/2004/12/17/323889.aspx).
-   Erik Johnson
    [thinks](http://appside.blogspot.com/2005/08/patterns-for-soa-20.html)
    that SOA 2.0 centers on transformational patterns. The idea (I
    think) is that if systems “understand each other more deeply”, then
    we can build a “smarter stack” and design apps via new constructs to
    promote agility and simplicity. Personally, I’m skeptical that we
    can define unambiguously system semantics except in the simplest
    scenarios, but Erik talks about using “graph transformation
    mathematics” to encode semantics. I don’t know anything about graph
    transformation mathematics, but at least Erik has progressed beyond
    hand waving to describing the “what”. Here’s looking forward to the
    “how”.
-   [New
    dad](http://vasters.com/clemensv/PermaLink,guid,70d581f0-577d-4f80-aa11-248574b1e420.aspx)
    Clemens Vasters somehow [finds time to
    implement](http://vasters.com/clemensv/PermaLink,guid,9677a491-9037-4b79-baa3-bcf093737957.aspx)
    an XML-RPC binding for WCF 3.5. I was encouraged that it didn’t
    require any custom attributes or extensions at the programmer level.
    Of course, XML-RPC fits semantically into WCF’s interface based
    service model, so it shouldn’t be a huge surprise that it didn’t
    require any custom extensions. But did it need WCF 3.5? Would this
    work if recompiled against the 3.0 assemblies?
-   Phil Haack [writes a long
    post](http://haacked.com/archive/2007/08/19/why-duck-typing-matters-to-c-developers.aspx)
    on Duck Typing. VB9 [originally
    supported](http://download.microsoft.com/download/5/8/6/5868081c-68aa-40de-9a45-a3803d8134b8/Visual_Basic_9.0_Overview.doc)
    duck typing – the feature was called Dynamic Interfaces – when it
    was first announced, but it was [subsequently
    cut](http://blogs.msdn.com/vbteam/archive/2007/01/11/extension-methods-part-2.aspx#1458124).
    I was really looking forward to that feature. Between it and XML
    Literals, VB9 was really stepping out of C\#’s shadow. I guess [it
    still
    is](http://steve.emxsoftware.com/LINQ/XLinq+has+me+wanting+to+code+in+VBNET),
    even without dynamic interfaces.
-   Since I’ve been doing some LINQ to XML work lately, I decided to go
    back and re-write my code in VB9 using XML literals. While XML
    literals are nice, I don’t think they’re a must have. First, LINQ to
    XML has a nice fluent interface, so the literals don’t give you that
    much cleaner code (though you do avoid writing XElement and
    XAttribute over and over.) Second, I find VB9′s template syntax
    (like ASP \<%= expression %\>) clunky to work with, especially in
    nested templates. Finally, I like the namespace support of XNames
    better. As far as I can tell, VB9 defines namespaces with xmlns
    attributes just like XML does. So I’m not dying for literal XML
    support in a future version of C\#. How about you?

