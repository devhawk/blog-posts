> Oh, the irony, the Microsoft folks are busy [singing
> the](http://www.gotdotnet.com/team/tewald/default.aspx#nn2003-03-21T03:23:54Z)[praises](http://www.keithba.net/blog/)
> of
> [WS-Addressing](http://msdn.microsoft.com/webservices/default.aspx?pull=/library/en-us/dnglobspec/html/ws-addressing.asp),
> for its transport independentness whilst their primary web services
> stack is for all practical purposes hopelessly tied to HTTP.\
>  [[Simon Fell \> Its just
> code](http://www.pocketsoap.com/weblog/2003/03/21.html#a1124)]

As of WS-I Basic Profile 1.0, Web Services are “hopelessly tied to
HTTP”. It isn’t until you add in all the [GXA
Specifications](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx)
that you start breaking up the marriage to HTTP (and the [RPC Processing
Model](http://www.gotdotnet.com/team/tewald/default.aspx?key=2003-03-21T03:23:54Z)).
Quoting from the WS-I spec:

> SOAP 1.1 defines a single protocol binding, for HTTP. The Profile
> mandates the use of that binding

> R2702 : A DESCRIPTION MUST use HTTP transport protocol with SOAP
> binding. Specifically, the transport attribute of soapbind:binding
> element MUST have the value “http://schemas.xmlsoap.org/soap/http”.
>
> For interoperability the transport protocol is limited to HTTP. To
> permit secure transfers at the HTTP level use of HTTP(S) is allowed.
>
> [[WS-I Basic Profile v1.0 Working Group Approval
> Draft](http://www.ws-i.org/Profiles/Basic/2003-01/BasicProfile-1.0-WGAD.html)]

Additionally, the [WSE
toolkit](http://microsoft.com/downloads/details.aspx?FamilyId=06255A94-2635-4D29-A90C-28B282993A41&displaylang=en)
is NOT tied to HTTP. One of the more interesting classes in the toolkit
is SoapEnvelope. It’s an extension to XmlDocument that adds all the SOAP
specific logic. So if you want to do web services w/o being tied to
HTTP, WSE provides all the plumbing you need – just add the transport.
