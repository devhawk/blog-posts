Not much accomplished, but it was only my first day. I hear this rumble
of the coming avalanche of stuff to do but it’s not here yet. We had a
team meeting where we did introductions. The team is pretty much evenly
split between people who I knew before today and people who’s names I
haven’t learned yet. First meeting with the boss is tomorrow so I’m
guessing that’s when I’ll get buried in work.

One of my new teammates is [Simon Guest](http://simonguest.com/), who
gave me a shout on his blog today and added me to his very exclusive
blogroll. I’m making some big changes to my blog tool (more on that
later) but I’ll return the favor soon. In the meantime, check out
Simon’s new book: [.NET and J2EE Interop
Toolkit](http://www.microsoft.com/MSPress/books/6711.asp). Everyone on
this team seems to have a niche, Simon’s is .NET/J2EE interop. Not sure
what mine will be yet (other than community, natch).

Over the weekend, I had an email discussion with [Jimmy
Nilsson](http://www.jnsk.se/weblog/) that started when he asked if I’ll
be working more with application architecture or interop architecture.
As far as I understand, I’m responsible for fostering community for all
types of architects. This would include at least strategic, applicaiton,
interop, data, infrastructure and security architects with others added
as appropriate. (For example, do we need to call out a unique messaging
architect or is that just part of infrastructure?) However, we got a
little confused over the use of the term “application”.

I’m going to try and use the terms from our [Application Architecture
Conceptual
View](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnea/html/eaappconland.asp)
(written by two more of my new teammates Maarten Mullender and Mike
Burner). Part of the issue is the overloading of terms like “service”
and “process”. In particular, I’ll be using the following terms from the
[Application
section](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnea/html/eaappconapplications.asp)
of the conceptual view:

-   Business Service – A service exposing mission critical enterprise
    data. In crude terms, take a typical three tier
    [architecture](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnbda/html/AppArchCh2.asp),
    and replace the presentation layer with a service façade. I’ve been
    known to call this a “data-oriented” service.
-   Process Service – A service that ties together other services into a
    larger business process. These services could be business services
    or other process services. I’ve been known to call this a
    “task-oriented” service since business process is typically tied to
    business tasks.
-   User Interface – A system that is designed to interact with a user
    and leverages one or more services on the back end. I’d like to call
    this an application, but I’m worried people will think I’m talking
    about a tightly coupled system rather than a UI on top of a set of
    loosely coupled services.

Maybe, as a community, we can come up with standard definitions or even
better names for some of these elements.

BTW, just because I’m avoiding the use of the word “application” doesn’t
mean that application architecture goes away. If you look at books like
[P of EAA](http://www.martinfowler.com/books.html#eaa), there are
patterns for building user interfaces (such as web presentation and
session state) and patterns for building business services (such as
domain logic and data source). Even if the business services and user
interfaces are separate and loosely coupled, these patterns are still
entirely relevant.
