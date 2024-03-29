Why does [WSDL](http://www.w3.org/TR/2001/NOTE-wsdl-20010315) expressly
forbid the use of the soapAction attribute with protocols other than
HTTP? How else are you supposed to map incoming messages across non-HTTP
protocols to SOAP endpoints?
[WS-Routing](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx?pull=/library/en-us/dnglobspec/html/ws-routing.asp)
provides a simple mechanism for including action information inside any
SOAP message – in the message rather than some out-of-band mechanism
like HTTP headers.

> The “action” element is used to indicate the intent of the WS-Routing
> message in a manner similar to the SOAPAction HTTP header field
> defined for SOAP (see [[15](http://www.w3.org/TR/SOAP/)], section
> 6.1.1). The value is a URI identifying the intent. Similar to the
> SOAPAction header field, WS-Routing places no restrictions on the
> format or specificity of the URI or requires that it can be
> dereferenced. There is no mechanism for computing the value based on
> the message and there is no default value. [[WS-Routing
> spec](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx?pull=/library/en-us/dnglobspec/html/ws-routing.asp),
> section 5.1.1]

WSDL provides a soap binding operation element that maps the HTTP
soapAction header to a specific operation, providing a simple way to
route an incoming method to a SOAP endpoint. However, WSDL expressly
forbids specifying the soapAction attribute when you’re not using HTTP!

> The **soapAction** attribute specifies the value of the SOAPAction
> header for this operation. This URI value should be used directly as
> the value for the SOAPAction header; no attempt should be made to make
> a relative URI value absolute when making the request. For the HTTP
> protocol binding of SOAP, this is value required (it has no default
> value). For other SOAP protocol bindings, it MUST NOT be specified,
> and the soap:operation element MAY be omitted. [[WSDL 1.1
> spec](http://www.w3.org/TR/2001/NOTE-wsdl-20010315), section 3.4]

Argh! I see three possible ways of resolving this:

-   Ignore WSDL spec and use soapAction anyway.
-   Use a body root element QName / WS-Routing action naming scheme to
    map message to SOAP endpoint based on message and operation names.
-   Include the equivalent of soapAction in a routing oriented WSDL
    extension as a child of wsdl:operation (i.e. duplicate
    soap:operation@soapAction w/o the only HTTP limitation)

Additionally, you might be able to use
[WS-Policy](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx?pull=/library/en-us/dnglobspec/html/wspolicyspecindex.asp)
to specify this. The question is: Which is the best? Go against the
spec, use an opaque name mapping scheme, or extend the spec? And if
you’re going to extend the spec, which is better to extend? WSDL or
WS-Policy?
