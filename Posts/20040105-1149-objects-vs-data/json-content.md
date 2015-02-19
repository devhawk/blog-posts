Christmas was crazy (my wife’s blog has the
[details](http://techiewife.com/PermaLink.aspx?guid=530a1a12-1c0f-4824-aff9-09b74ccf222d)),
so I didn’t get a chance to blog about Sean & Scott’s desire for
[unification of objects and
data](http://radio.weblogs.com/0117167/2003/12/31.html#a538), [Erik
Meijer’s](http://www.research.microsoft.com/~emeijer/)[two](http://www.cl.cam.ac.uk/~gmb/Papers/vanilla-xml2003.html#S1)[papers](http://www.research.microsoft.com/~emeijer/Papers/XS.pdf)
on the topic, or Dare’s
[responses](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=6523c363-1572-46bd-8ded-abf206c06569)
to
[both](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=755443c2-19a6-4b45-8e18-879565e74759).
Programming language evolution is something I’ve keenly interested in.
When I first started this blog almost a year ago, [one of my early
posts](http://devhawk.net/PermaLink.aspx?guid=896fcfbd-dede-4c62-8f59-24aece862218)
was about a disruptive programming language technologies presentation
from MS Research. Among the areas mentioned for improvement: were
database integration and XML manipulation. Sounds like the Xen language
[demoed @ XML
2003](http://www.xmlconference.org/xmlusa/2003/friday.asp#7) is a step
in that direction.

When you read Erik’s papers, you’ll notice that one of the goals is to
natively integrate XML into the language. He writes: “In our approach
XML documents or document fragments become first class citizens.” What’s
interesting about that is that if you take XML to mean pure-infoset-data
(as opposed to angle-bracket-serialization-format) then you can argue
that Data (with a capital D) is not a first class citizen of today’s
Object-Oriented languages. Given that a lot of OO code has been written
to manipulate data, having a language that explicitly distinguished
between the two could be valuable (assuming it made the programming
easier and the programmer more productive).

Note, this is the opposite approach from tools like O/R mappers and
XSD.exe which attempt to hide the differences from the programmer. We’ve
seen a similar evolution in the way we think about invoking objects
across the network. Tools like DCOM and .NET Remoting attempt to hide
the RPC and make it appear as a local call. But as the thinking evolves,
tools like
[Indigo](http://msdn.microsoft.com/msdnmag/issues/04/01/Indigo/default.aspx)
is designed to make the boundaries across apps and machines explicit.
Initial thoughts on data access were to make it all look like objects
(i.e. O/R mapping). But as the thinking evolves, maybe we need to make
the boundaries between objects and data explicit (and easy) as well.
