My dad (who needs his own blog) pointed me to a presentation from the
[2nd Microsoft Research Rotor Workshop](http://www.di.unipi.it/rotor)
that was held in April in Pisa, Italy. The [presentation in
question](http://www.di.unipi.it/rotor/slides/cardelli.pdf) is by Luca
Cardelli on the subject of programming language innovation, a topic I’ve
[blogged on
before](PermaLink.aspx?guid=896fcfbd-dede-4c62-8f59-24aece862218). I
want to take a look at the other speaker’s content, but a couple of
things stand out from Luca’s talk.

-   Programming Language data has traditionally been triangular, i.e.
    object graphs, while persistent data has traditionally been
    rectangular, i.e. database tables. This leads to an integration
    issue between the programming language and the database. However,
    data is evolving. XML makes persistent data triangular as well.
-   In addition to data evolution, we’re also seeing an evolution of
    program flow. It’s moving away from threads and RPC and towards
    schedules and messages. IMO, that’s what Service Oriented
    Architecture is all about, but Luca’s point is there’s no support in
    the programming language for this model.
-   There’s great coverage of the concept of “semi-structured” data.
    It’s not an array. It’s not records. It’s “unusual data” in Luca’s
    terms, which needs unusual programming languages.
-   I get the feeling Luca is recommending new languages, not
    retrofitting existing languages with support for XML data and
    schedule based program flow.
-   Luca points out that type systems for programming languages and for
    XML are still “deeply incompatible”. This jibes with my last [XML
    entities](PermaLink.aspx?guid=7d4b2a20-5cf8-423a-b71e-3f2a305f4ba8)
    post. I don’t want different programming styles for internal and
    external entities. If I can get a programming language that makes it
    easier to code against XML, that makes exposing internal entities as
    XML that much more reasonable.

