In the wake of [my praise for CRUD is
CRAP](http://devhawk.net/2007/05/16/morning-coffee-78/), [David
Ing](http://www.from9till2.com/)[asked](http://devhawk.net/CommentView,guid,81028fac-5cb1-4ce3-8e71-9d29ec3ce882.aspx#commentstart)
“how do you reconcile something like REST (astoria etc) with being
CRUD-adverse? Is there a happy place where the two can go for coffee?”
Sure there is: I hear [Tim Ewald’s XML
Nation](http://pluralsight.com/blogs/tewald/) serves great coffee and
the scones are pretty good. ^[Actually, I have no idea if Tim even likes coffee or scones. FYI,
DevHawk Nation would not feature great coffee or pretty good scones. We
would, however, have [Arrogant Bastard
Ale](http://www.arrogantbastard.com/index2.html) on tap.]

Seriously, the key observation that Tim [recently
made](http://pluralsight.com/blogs/tewald/archive/2007/04/26/46984.aspx)
is that REST != CRUD. Sure, it can be [used that
way](http://en.wikipedia.org/wiki/Atom_Publishing_Protocol) and for
simple scenarios it works fine. (I’ll define “simple scenarios” in a
second.) But I don’t believe CRUD style REST works in the large. Tim
said you can’t build with just CRUD because it’s “to simplistic to be
useful”. I’ll go even more fundamental, using REST for CRUD means having
giving up transactions entirely. I’ve already accepted that building
loosely coupled services means giving up *distributed* transactions. But
the idea of giving up transactions entirely is just crazy talk.

So when I said “simple scenarios” above, I meant “scenarios that don’t
need transactions”. (I take it as a given that RESTifarians aren’t hot
for WS-AtomicTransaction.) ATOM Publishing is a simple scenario because
the web resource authoring scenario doesn’t need transactions to protect
updates to multiple resources at a time. If it did, I don’t believe the
REST as CRUD approach they use would work.

As you might guess then, I’m not a fan of
[Astoria](http://astoria.mslivelabs.com/). I believe the sweet spot for
so called “data services” will be read only (because they don’t need
transactions, natch). I’m sure there are some read/write scenarios
Astoria will be useful for, but I think they will be limited – at least
within the enterprise.

If REST != CRUD, then what is it? Let’s go back to [Tim’s
post](http://pluralsight.com/blogs/tewald/archive/2007/04/26/46984.aspx):

> Every communication protocol has a state machine. For some protocols
> they are very simple, for others they are more complex. When you
> implement a protocol via RPC, you build methods that modify the state
> of the communication. That state is maintained as a black box at the
> endpoint. Because the protocol state is hidden, it is easy to get
> things wrong. For instance, you might call Process before calling
> Init. People have been looking for ways to avoid these problems by
> annotating interface type information for a long time, but I’m not
> aware of any mainstream solutions. The fact that the state of the
> protocol is encapsulated behind method invocations that modify that
> state in non-obvious ways also makes versioning interesting.
>
> The essence of REST is to make the states of the protocol explicit and
> addressable by URIs. The current state of the protocol state machine
> is represented by the URI you just operated on and the state
> representation you retrieved. You change state by operating on the URI
> of the state you’re moving to, making that your new state. A state’s
> representation includes the links (arcs in the graph) to the other
> states that you can move to from the current state. This is exactly
> how browser based apps work, and there is no reason that your app’s
> protocol can’t work that way too. (The [ATOM Publishing
> protocol](http://www.ietf.org/internet-drafts/draft-ietf-atompub-protocol-14.txt)
> is the canonical example, though its easy to think that its about
> entities, not a state machine.)

While I disagree with Tim’s disagreement of ATOM (i.e. I believe APP
*is* about entities, but it works because it doesn’t need transactions),
I agree 100% that REST is about protocol state. Tim lays this very clear
in his [airline reservation
sample](http://pluralsight.com/blogs/tewald/archive/2007/04/27/47031.aspx).
Thus, I can spurn CRUD and still embrace REST if I want to.

Further, Tim’s points on the opaque nature of RPC style interactions
(which web services appear to have fallen into despite the best of
intentions) are spot on. If you’re doing simple request/response
services, the protocol state is trivial, so that works fine. However, in
the scenarios I face, long running services are the norm and managing
the protocol state is critical. I’ve got some ideas on how to do that,
but that’s a future blog post.
