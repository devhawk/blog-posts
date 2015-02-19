Following up on my [XML is not a Deserialized Object
Graph](PermaLink.aspx?guid=5643b052-f1f2-4c53-ac33-e33d0910f917) post, I
was thinking about entity classes from
[RUP](http://www.rational.com/products/rup/index.jsp). The official
definition (from the [RUP
manual](http://www.amazon.com/exec/obidos/ASIN/0201571692/qid=1006990173/sr=1-1/ref=sr_1_10_1/104-0359585-4441512))
for entity classes is: “An entity class is used to model information
that is long-lived and often persistent” – i.e. stuff we’re going to
stick in the database, XML files, etc. In weblog terms, entities are
posts, comments, trackbacks, etc. In my experience, these entity classes
have little business logic – mostly validation code. The code that will
act on this entity are encapsulated within control classes. Control
classes are tightly related to use cases. Typically, a one-to-one
relationship between use case and control class is a good first order
approximation. Again, in weblog terms, the “create post” use case would
be implemented as a control class that takes an entity class instance
and writes it to the persistent store (database, XML file, etc)

If the vast majority of business logic goes into control classes while
the entity classes are primarily data containers, why can’t we just go
all the way and make our entity classes conform to the [XML
Infoset](http://www.w3.org/TR/xml-infoset/)? Expose them via
XmlReader/Writer or XPathNavigator (and some as yet undefined interface
XPathUpdatable). This way we’ll have parity between the entity classes
local to our application and the XML messages we send and receive as we
interact with other web services. XML serialization attempts to do this
by unifying everything as strongly typed objects. But I’d rather unify
around infoset, since that’s what’s going to be consistent across
platforms, vendors and technologies, rather than typing systems.
