I’ve spent the last three days heads down in WCF security and color me
massively impressed. I just checked in a prototype that provides
customized authentication for a business service. The idea that you
could bang up a custom authentication service fairly easily blows my
mind.

The cornerstone to this support in WCF is the standard
[WSFederationHttpBinding](http://windowssdk.msdn.microsoft.com/en-us/library/system.servicemodel.wsfederationhttpbinding.aspx).
While the binding name implies support for
[WS-Federation](http://msdn.microsoft.com/library/en-us/dnglobspec/html/ws-federation.asp) which
in turn implies the use of infrastructure like [Active Directory
Federation
Services](http://www.microsoft.com/WindowsServer2003/R2/Identity_Management/ADFSwhitepaper.mspx),
the binding also scales down to support simple federation scenarios with
a single Security Token Service (aka STS) as defined by
[WS-Trust](http://msdn.microsoft.com/library/en-us/dnglobspec/html/WS-trust.pdf).
WS-Trust appears similar to [Kerberos](http://web.mit.edu/kerberos/). If
you want to access a service using the federation binding, you first
obtain a security token from the associated STS. Tokens contain
[SAML](http://en.wikipedia.org/wiki/SAML) assertions, which can be
standard – such as Name and Windows SID – or entirely custom, which
opens up very interesting and flexible security scenarios.

If you want to support multiple authentication systems (windows,
certificates, [CardSpace](http://cardspace.netfx3.com/),
~~Passport~~[Windows Live ID](http://dev.live.com/liveid/), etc), STS is
perfect because you can centralize the multiple authentication schemes
at the STS, which then hands out a standard token the business service
understands. Adding a new auth scheme can happen centrally at the STS
rather than in each and every service. Support for multiple
authentication schemes was the focus of our current prototype and it
worked extremely well.

WCF includes a [federation
sample](http://windowssdk.msdn.microsoft.com/en-us/library/aa355045.aspx)
which is where you should start if you’re interested in this stuff. That
scenario includes a chain of two STS’s. Accessing the secure bookstore
service requires authenticating against the bookstore STS which in turn
requires authenticating against a generic “HomeRealm” STS. Since there
are two STS’s, they factored the common STS code into a shared assembly.
You can use that common code to build an STS of your own.

For our prototype, we made only minor changes to the common STS code
from the sample. In fact, the only significant change we made was to
support programmatic selection of the proof key encryption token. In the
sample, both the issuer token and the proof key encryption token are
hard coded (passed into the base class constructor). The issuer token is
used to sign the custom security token so the target service knows it
came from the STS. The encryption token is used to – you guessed it –
encrypt the token so it can only be used by the target service.
Hard-coding the encryption token means you can only use your STS with a
single target service. We changed that so the encryption token can be
chosen based on the incoming service token request.

Of course, it wasn’t all puppy dogs and ice cream. While I like the
config system of WCF, anyone who calls it “easy” is full of it. I’ve
spend most of the last three days looking at config files. Funny thing
about config files is that they’re hard to debug. So most of my effort
over the last few days has been in a cycle of run app / app throws
exception / tweak config / repeat. Ugh.

Also, while the federation sample is comprehensive, I wonder why this
functionality isn’t in the based WCF platform. For example, the sample
includes implementations of RequestSecurityToken and
RequestSecurityTokenResponse, the input and output messages of the STS.
But I realized that WCF has to have its own implementations of RST and
RSTR as well, since it has to send the RST to the STS and process the
RSTR it gets in response. A little
[spelunking](http://www.aisto.com/roeder/dotnet/) revealed the presence
of an official WCF implementation of RST and RSTR, both marked internal.
I normally fall on the pragmatic side of the [internal/public
debate](http://www.hanselman.com/blog/IsThereAGoodReasonToMarkAClassPublic.aspx),
but this one makes little sense to me.

Otherwise, the prototype went smooth as silk and my project teammates
were very impressed at how quickly this came together. Several of the
project teams we’re working with have identified multiple authentication
as the “killer” capability they’re looking to us to provide, so it’s
good to know we’re making progress in the right direction.
