[Nick Malik](http://blogs.msdn.com/nickmalik/) is an architect in MSIT’s
Enterprise Architecture group. He’s been blogging a while, though I only
discovered his blog a couple of weeks ago. Yesterday [he
posted](http://blogs.msdn.com/nickmalik/archive/2006/08/27/726970.aspx)
about OMG’s SOA SIG’s Draft RFI on EDA and it’s relationship to SOA and
BPM. That’s a veritable alphabet soup of acronyms! To translate, the
[Object Management Group’s](http://www.omg.org/)[Special Interest Group
on Service Oriented Architecture](http://soa.omg.org/) has posted a
draft [Request for
Information](http://www.omg.org/cgi-bin/apps/doc?soa/06-08-01.pdf) on
[Event Driven
Architecture](http://en.wikipedia.org/wiki/Event_Driven_Architecture)
and it’s relationship to [Service Oriented
Architecture](http://en.wikipedia.org/wiki/Service-oriented_architecture)
and [Business Process
Management](http://en.wikipedia.org/wiki/Business_Process_Management).
Here’s the summary from the actual document:

> The EDA Sub-group of the OMG SOA SIG seeks information from members of
> the EDA, BPM and SOA community as well as anyone interested in
> promoting standards in this area. Requested information will be
> evaluated by the EDA Sub-group, resulting in the development of
> Requests for Proposal(s) (RFP) for standardization of Event
> definition, relationship between EDA, BPM and SOA that will ultimately
> allow development of standards for Complete Life Cycle of
> Events -Ontology of Events, Sense and Respond Services, Events Metrics
> and processing of complex events. Please note that it is our intent to
> develop modeling standards for the EDA/SOA and EDA-Business Process
> interaction and provide standards for the implementation of that
> interaction as well.

First off, I’m a bit wary about this part: “it is our intent to develop
modeling standards”. Of course, OMG is responsible for
[UML](http://www.uml.org/) and long time readers should be well aware of
[my opinion of
UML](http://devhawk.net/2004/02/03/Being+A+Model+Citizen.aspx). I don’t
want to [set the bozo bit](http://c2.com/cgi/wiki?SetTheBozoBit) on an
entire organization, but I am skeptical that any new modeling
“standards” from OMG will be any more effective than the [Unwanted
Modeling
Language](http://www.martinfowler.com/bliki/UnwantedModelingLanguage.html).

Secondly, EDA seems to be vaguely defined, if at all. Wikipedia has this
to say about EDA:

> An event-driven architecture (EDA) defines a methodology for designing
> and implementing applications and systems in which events transmit
> between loosely coupled software components and services. An
> event-driven system is typically comprised of **event consumers** and
> **event producers**. Event consumers subscribe to an intermediary
> event manager, and event producers publish to this manager. When the
> event manager receives an event from a producer, the manager forwards
> the event to the consumer. If the consumer is unavailable, the manager
> can store the event and try to forward it later. This method of event
> transmission is referred to in message-based systems as **store and
> forward**.\
> [emphasis in original]

Assuming events are encoded as messages, then you can rewrite “event
consumers / event producers” as “message receivers / message senders”
and you really blur the line with SOA? 

The big difference in EDA seems to be the use of an “intermediary event
manager”. The problem I have with this approach is that the
“intermediary event manager” works fine if you have a small number of
endpoints, but how will it scale to handle hundreds of systems?
Thousands? Tens of thousands? I don’t see how the centralized event
manager approach can possibly scale to handle tens of millions of events
delivered between tens of thousands of systems. The management of such a
system would be a nightmare? If a business process went south, you would
obviously look in the central event manager as the source of the
problem, but I would think that would be like finding a needle in a
haystack. You could federate the event managers, instead of attempting
to scale out the center. But a federated event manager approach would
seem to defeat much of the purpose of an EDA in the first place. If
you’re going to federate your event managers, why not cut out the middle
man and make each event producer it’s own event manager as well? What is
the benefit of separating these capabilities?

I guess fleshing out EDA isn’t a bad idea, but it seems more like a
solution looking for a problem to me.
