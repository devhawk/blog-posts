[Dare](http://www.kuro5hin.org/user/Carnage4Life/diary) [commented](http://www.kuro5hin.org/story/2003/5/25/142610/725)
on my recent post about [XML not being an object
graph](http://devhawk.net/2003/05/15/xml-is-not-just-a-deserialized-object-graph/). He
rightly points out that objects can have associated business logic and
XML can’t. I addressed an aspect of this in my [follow up
post](http://devhawk.net/2003/05/21/xml-infoset-vs-object-graphs/). I don’t
want behavior in my entity objects – I want to put that into stateless
control objects. So the lack of business logic in XML is no big deal (to
me).

He further points that XML != XSD. I should be more precise in my use of
the two terms. But while derivation by restriction may be an XSD thing,
not an XML thing, the point is that there are things in XML (with or
with out XSD) that have no corollary in the strongly typed world of OOP.
XML (and all XML related specifications by association) have their
original design rooted in a wire format. Even
[Infoset](http://www.w3.org/TR/xml-infoset/) suffers, as it is designed
to provide an abstract data model that maps well to the original XML
angle-bracket based format. An example of XML’s wire format roots is the
text-oriented idea of equivalence. In OOP, data has explicit values. In
XML, the string representation of the data creates a need to ensure
canonical representation for determining equivalence. Class / Element
identity has the same issue. In OOP, an object is explicitly mapped to
one object. In XML, the equivalent mapping (to element type) is done by
a string matching – a mapping made more difficult by the tacked-on
concept of namespaces and namespace prefixes.

XML may have it’s roots in a wire format with the concept of namespaces
tacked on as an afterthought. XSD may have issues including the fact
that it was obviously designed by committee and seems to have at least
two ways of doing everything. But even with those shortcomings, XML has
one major thing going for it: it actually works. We’ve seen
strongly-typed object systems
[fail](http://www.microsoft.com/com/) [time](http://java.sun.com/) and
[time again](http://www.corba.org/) to deliver promised cross platform
integration. Since XML works, I know I’m going to want to use it in my
~~application~~ service. But I’d rather not have separate programming
models for internal and external entities. If XML is the best model for
accessing external entities, I want to use that same model to access
internal entities as well.
