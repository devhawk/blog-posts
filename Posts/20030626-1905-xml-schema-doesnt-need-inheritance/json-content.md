Got a chance to talk to
[Dare](http://www.kuro5hin.org/user/Carnage4Life/diary) today about the
XML vs. Objects stuff we’ve been blogging on. We started by talking
about the convergence of objects, databases and XML. He mentioned a
chapter of [Tim Neward’s](http://www.neward.net/ted/weblog)[Effective
Enterprise
Java](http://www.neward.net/ted/weblog/index.jsp?date=20030217#1045470771101)
book where Ted recommends designing the data first. Ted started
Effective Enterprise Java 2 days before
[Patrick](http://winisp.net/harrypierson) was born so I haven’t been
reading it. The issue with designing the data first is that typically, a
developer is predisposed towards one of the three poles of data design
(XML, objects or relational DB) that will color that design
unintentionally.

I realized I still lean towards OO when Dare pointed out the fact that
XML (actually, I should say XSD) doesn’t really need derivation. Because
of my OO background, it took me a while to digest that concept. But
since XML is just data without behavior, it doesn’t need polymorphism
the way that objects do. Consider the following schema:

` <xs:complexType name="ctAddress"> <xs:sequence> <xs:element name="Street" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="City" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="State" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="ZipCode" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:any namespace="##targetNamespace" /> </xs:sequence> </xs:complexType>`

This is version one of the address complex type schema for some
arbitrary web service. Over time, we realize that we want to be more
global in our addressing schema, so we want to add a country element.
Since not all of the other services we interact with will be updating to
the new schema, we need to make country an option element (i.e.
minOccurs=”0″). While we could use schema inheritance to do this, we
could also just duplicate the existing elements and add a country
element:

` <xs:complexType name="ctAddress"> <xs:sequence> <xs:element name="Street" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="City" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="State" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="ZipCode" type="xs:string" maxOccurs="1" minOccurs="1" /> <xs:element name="Country" type="xs:string" maxOccurs="1" minOccurs="0" /> <xs:any namespace="##targetNamespace" /> </xs:sequence> </xs:complexType>`

What’s interesting is that even though these two schema types are not
related by inheritance, I can still validate XML addresses against
either schemas. In fact, XML addresses with and without addresses
validate against **both** schemas! That’s difficult to model in a typing
system where objects have a bound to a single specific type. Other types
of changes can be introduced so that break validation to one of the
schema but not the other. For example, if we changed the minOccurs of
ZipCode to zero, all messages that validate to the first schema would
also validate to the second, but the reverse would not always be true.
This is like a IsA relationship in OO, but in the wrong direction (a
base message “is a” derived message, but a derived message is not always
a base message).

The upshot of all this is that I think my argument against XML
Serialization as a general concept is strengthened. While it does work
in many scenarios, I can easily build XML messages and XSD schemas that
don’t cleanly conform to an OO typing system. Since the flexibility in
XML is critical (that’s what I’m using for loosely coupled public
interop interfaces), I know I don’t want my schema design to be
constrained to the limited set of scenarios that are supported by XML
Serialization.
