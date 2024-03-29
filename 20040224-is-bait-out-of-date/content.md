I was re-reading the [Microsoft Architecture
Overview](http://msdn.microsoft.com/architecture/overview/default.aspx?pull=/library/en-us/dnea/html/eaarchover.asp)
by [Michael Platt](http://blogs.msdn.com/michael_Platt/) that’s up on
[Architecture Center](http://msdn.microsoft.com/architecture/). It’s a
little old, but still very valuable. In the overview, Michael discusses
four perspectives on the enterprise architecture: business, application,
information, and technology which are commonly collectively referred to
as BAIT. (Note, I think it was Meta Group coined the term BAIT, but I’m
not sure. Whoever did come up with the term, I’m pretty sure that it
wasn’t MSFT). However, as we march forward building services, I wonder
if we need to regularly consider a couple of more perspectives.

I don’t think service-orientation dramatically affect business or
technology architecture. One of the big advantages of using web services
to implement your services is that you can reuse a lot of the web-based
technology infrastructure that companies spent the later part of the
nineties building out. Likewise, while services will enable
organizations to be agile and better achieve their business goals, I
don’t think it changes the actual goals significantly. However,
application and technology architecture change radically when moving
from an application-centric to a service-oriented approach.

When considering services, the application perspective is broadened to
include both applications and services. According to our [conceptual
architecture](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnea/html/eaappconland.asp),
an
[application](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnea/html/eaappconapplications.asp)
implements a user interface while a
[service](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnea/html/eaappconservices.asp)
is a discrete unit of logic exposing a message-based interface. Even
though they are both typically written in code, I’m not sure lumping
them together is the right architectural approach. Building a single
service has many architectural similarities to building an application,
but an SO design also has to tackle the architecture as a
system-of-systems which the application-centric approach never had to
worry about.

Likewise, the information perspective currently covers data both inside
services (or apps – here the distinction is less important) and inside
messages. Obviously, the approach to data private to a service will
differ greatly from the approach to data inside messages. Things like
transactional integrity, immutability, extensibility and encapsulation
apply very differently to data and message architecture.

Each of the perspectives covers many different subtopics, so maybe
there’s no need to break services out from applications or messages out
from information. However, I’m [on
record](http://msdn.microsoft.com/architecture/community/newsletter/102003newsletter.aspx)
stating that I think using services “represents a fundamental change to
the architecture model that the vast majority of systems running today
were built on”. Thus, I think that fundamental change should be surfaced
in language we use to describe the architecture, since language
influences thought. Granted, BSMAIT isn’t as cool an acronym as BAIT,
but it’s far more representative of the way the next generation of
systems are going to be architected.
