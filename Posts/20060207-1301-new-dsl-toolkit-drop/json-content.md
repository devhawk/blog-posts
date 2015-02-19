I have been so focused on Web 2.0 stuff that I’ve been reading a bunch
of new blogs and disregarding the old ones I used to read. So I didn’t
realize until today that the [DSL
Tools](http://msdn.microsoft.com/vstudio/DSLTools/) team released a [new
drop](http://affiliate.vsipmembers.com/affiliate/downloadfiles.aspx)
last week. According to [Gareth](http://blogs.msdn.com/garethj/), the
highlights include:

-   Integration into the [Visual Studio
    SDK](http://msdn.microsoft.com/vstudio/extend/). According to the
    site, they are shooting for an April release for v2 of the VS2005
    SDK, so does that mean the DSL Tools will be done in April?
-   Single file format and complete visual designer for all aspects of a
    DSL. I’m guessing this mean we no longer have to edit the designer
    definition by hand. That’s a good thing. But I liked the seperation
    of domain model and designer, so I’ll be interested to see how I
    like what they’ve built.
-   Domain-specifiic model serialization. This is huge – previously, the
    domain model dictated the XML serialization format. Now, if you can
    customize this, you can provide a clean model syntax and even
    possibly read in other syntaxes as well
-   Port Shapes and a revised modeling API

Update: Apparently, [I can’t
read](http://devhawk.net/CommentView,guid,927e400c-d23b-41b5-848d-101feb4e6371.aspx).
Only the VS SDK integration is done in this build. improvements to the
file format and model serialization will be in the next drop.
