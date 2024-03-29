> When you create a system with web services, are your web services
> components or are they standalone applications? While this might seem
> like a semantic question, it is actually a very big deal, with a lot
> of implications in terms of your overall application design, as well
> as the design of the web services themselves. [[Rockford
> Lhotka](http://www.lhotka.net/WeBlog/PermaLink.aspx?guid=251785fe-4ee9-4028-8925-4afee73de668)]

What’s funny is that it IS a semantic question, and that’s what makes it
such a big deal.
:smile:

Seriously, Rocky argues that web services should be thought of as
applications, not components. I completely agree that a web service is
“not a tier in an application” and that both services and applications
have clearly defined boundaries. I also think he’s on the right track
when he writes that many application design principles apply to
services. For example, both applications and services have data and
business logic layers. But I would call the top layer of a web service
the messaging layer, which has only superficial similarities to the
presentation layer of an application (i.e. that’s where input and output
with the outside world is handled).

However, services also share similarities with components. Services,
like components, don’t stand alone. They may not trust each other, but
they need to work together to some extent in order to accomplish work.
This leads to design questions for services that are similar to
component design questions. How do I determine which pieces of required
functionality go in which services? How much process code is included in
the data management services? What’s the best way to design a service to
optimize reuse?

In the end, services are fundamentally different animals than
applications or components and I don’t think we as an industry have
enough experience building systems with them yet.

