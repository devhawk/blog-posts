[Arnon Rotem-Gal-Oz](http://www.rgoarchitects.com/blog) left a
[comment](http://devhawk.net/CommentView,guid,1629f5d2-1504-436c-aa43-91419955fb5d.aspx)
yesterday disagreeing with my characterization of engineering vs.
architecture problems:

> I can’t say I totally agree that it is the software architect’s role
> to come up with the list of functional requirements. That’s what
> business analysts or requirement engineers do. The role of the
> architect is to identify which requirements are important and to
> surface the significant quality attributes (non-functional
> requirements) of the system (again, the architect is not the source of
> the quality attributes but his role is to determine which the most
> important ones are).

I’m glad Arnon responded. His blog looks pretty interesting and he’s
working with Architect MVP [Udi Dahan](http://udidahan.weblogs.us/).
Subscribed.

However, I wasn’t talking about architects, I was talking about
architecture. That may seem like a subtle difference, but between the
wide variance in the definition of architecture and the wide variance in
types of companies, trying to figure out a general description of
architect across all that variance seems like chasing your tail.

So with that in mind, here’s an interesting distinction between building
architects and engineers. I think Pat Helland told me this, but I
forget. If you know the origin of this comment, please [drop me a
line](mailto:hpierson@microsoft.com).

> Engineering is about walls. Architecture is about the space between
> the walls.

I love that distinction. That leads to my personal definition about
architecture in the enterprise and/or software realm:

> Architecture is the intersection between business and IT.

*Most* of what I see passed off as architecture lives purely in the
realm of IT. For example, as much as I like
[Fowler’s](http://www.martinfowler.com/)[PoEAA](http://www.martinfowler.com/books.html#eaa),
I would argue that those are engineering patterns as they have little to
do with business. If you’re building a system for an enterprise, there’s
a business driver funding that system construction. The business folks
don’t really care which domain logic or data access patterns you use.
[Domain Model](http://www.martinfowler.com/eaaCatalog/domainModel.html)
vs. [Table
Module](http://www.martinfowler.com/eaaCatalog/tableModule.html)? [Table
Data
Gateway](http://www.martinfowler.com/eaaCatalog/tableDataGateway.html)
vs. [Row Data
Gateway](http://www.martinfowler.com/eaaCatalog/rowDataGateway.html)?
Come on, you think business people care about that?

If a decision doesn’t effect a business person, it’s not an architecture
decision. I’m not saying it’s not important – I think the role of the
software engineer is critical in large-scale enterprise system design
and construction. And I will readily admit that often a single person is
responsible for both architecture and engineering. But that doesn’t make
them the same activity. As long as we continue to confuse the two
disciplines, we hold them both back.

Tomorrow, who’s doing all this architecting?
