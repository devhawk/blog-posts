In the comments from [yesterday’s
post](http://devhawk.net/CommentView,guid,cf59d65d-af8c-41c5-9562-a26969d76a5d.aspx#commentstart),
IronPython MVP and [author
extraordinaire](http://www.ironpythoninaction.com/) [Michael
Foord](http://www.voidspace.org.uk/) asked:

> Has your view on architecture as a discipline separate from coding
> changed since working with dynamic languages?

In a word:“No” (though as always, I reserve the right to be wrong and/or
convinced otherwise.)

When I was an architect, I tried very hard to treat it as a “discipline
separate from coding”. To use my last post as an example, building a
central repository of system audit information is an architectural
decision. A bad one IMHO – at least the way Dilbert’s
[PHB](http://en.wikipedia.org/wiki/Pointy-Haired_Boss) described it –
but an architectural decision all the same. It was a decision about what
kind of system to build, part of an overall application portfolio, as
opposed to a decision about how to build the system.

I’ve held this opinion of architecture for a long time. Four years (and
three jobs) ago, I wrote [the
following](http://devhawk.net/2005/08/29/what-is-architecture/):

> IMO, building a system that has a set of functional requirements
> (track customers, process orders, etc) and non-functional constraints
> (sub-second response time, support 10,000 concurrent users, use
> Microsoft Windows platform, etc) is an engineering problem. Coming up
> with the lists of functional requirements and non-functional
> constraints is the architecture problem.

Working with dynamic languages has dramatically changed my view of
engineering and design of individual systems. But from the pure
architecture perspective, I want to be able to treat individual systems
as black boxes as much as possible. That means the programming language
is an implementation detail that shouldn’t matter to the architect.

Note the significant bet-hedging language in the paragraph above. I’m
using phrases like “shouldn’t matter” and “as much as possible” because
we all know that there’s no such thing as a “pure architecture
perspective”. Unlike building architecture, software architecture is in
constant flux at every level. At the enterprise level, there are always
new regulatory obligations, new competitors and new partners to
consider. At the end-to-end process level, there are always new systems
or new version of existing systems coming on line. And at the individual
system level, there are always new – or at least new versions – of
tools, frameworks and languages being released.

Once you introduce time into your architecture perspective, individual
system engineering will affect the overall architecture, since system
engineering affects the rate of change. Language choice will certainly
have some engineering impact. However, in my experience language choice
is rarely high on the list of concerns relative to things like project
scope and team experience.

So my “No” answer to Michael’s question is predicated on the following:

-   As an architect, I want to consider individual systems as black
    boxes where implementation details like language choice are
    completely irrelevant.
-   As a practical architect, I realize that some system implementation
    details are relevant – especially over time – but in my experience
    language choice isn’t one of them.

On the other hand, most IT shops try to standardize on one programming
language – certainly MS IT did – so maybe language choice would be more
architecturally relevant in a mixed language shop. I’d love to hear from
folks who have multiple standard languages in their IT shop – especially
if you have both static and dynamic languages on your standards list.
