I went to a talk on BizTalk and ESB at lunch today that was sponsored by
the [local connected systems user
group](http://www.nwconnectedsystems.org/). Like many terms in this
space (SOA and governance to name two others), ESB doesn’t seem to have
a consistent definition. The industry seems to be inventing terms at a
fair clip as vendors attempt to differentiate themselves on what to me
seem like fairly minor solution aspects.

Today’s speaker talked at length about a “large health care company in
California” that he had personally worked with, building an ESB for them
with BizTalk. He spoke in glowing terms of the size of the BizTalk
environment and the number of messages passing through the bus every
day. Then someone asked how many systems this unnamed company had hooked
up to the bus. He paused, then admitted: “Six”.

Six? Not six *whole* systems! That’s gotta be a record!

Of course, I realize that there are deployed ESB’s out there that are
integrating more than six systems. My group – the Integration Center of
Excellence (ICoE for short) – runs a comparably sized BizTalk
environment and we’re connecting around 50 internal systems and hundreds
of external partners. But 50 is still a fairly small number. I can’t
help but wonder how well will this ESB approach is going scale as the
number of systems goes up a couple orders of magnitude. Frankly, I think
the answer is “not well”.

The problem I have with ESB is that it’s a centralized approach. Given
that one of the overriding trends of society in general and IT in
particular is decentralization, the ESB approach feels like it’s
swimming against the current instead of with it.

As an analogy, consider how well would the Internet work if every
connection went thru a central hub? See what I mean? Centralized systems
don’t scale like decentralized ones do.

I admit that there are scenarios where ESB-esque technology solves a
practical problem. Transport adaptation and content based routing leap
to mind. Services that need those capabilities should leverage ESB-esque
technology. But whenever I listen to ESB proponents, I feel that the
need for these capabilities is exaggerated to the point that every
message exchanged between every service inside your enterprise travels
on a central bus, which doesn’t seem realistic to me.

Am I wrong about this characterization? Do ESB proponents think that all
messages must travel on the bus? How about *you*? What do you think?
Inquiring minds (aka me) want to know…
