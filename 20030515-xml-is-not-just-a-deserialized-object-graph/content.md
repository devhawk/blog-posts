One of the things I did in my latest version of [WSS
RSS](prj_sharepointsynd.aspx) was add a configuration file. I didn’t
just use web.config since WSS has a tendency to overwrite it when you
upgrade a new virtual server to support WSS. However, I didn’t go the
usual route of parsing the XML configuration information into objects
via serialization or some other mechanism. Instead, I just loaded up an
XmlDocument and queried it with XPath whenever I need to read
configuration information. I do this multiple times per web request
(once per web and list in the feed).

This leads me to my point – I’m beginning to think the whole idea of XML
serialization is off base. Given an object graph, I can serialize it
into XML and then deserialize it into an identical object graph.
However, I don’t think I can take an arbitrary XML document and always
be able to deserialize it into an object graph. XML concepts like
derivation by restriction are difficult to model in a strongly typed
object model like CLR’s. And since I have XPath, I don’t think I want to
always deserialize my XML into objects – it was much simpler to execute
XPath queries than it would have been to manually traverse the object
graph or build my own query mechanism.
