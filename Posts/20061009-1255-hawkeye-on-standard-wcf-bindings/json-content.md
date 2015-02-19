I’m in [WF/WCF training](http://www.quicklearn.com/wf_wcf.htm) this
week, so any daytime blogging will be on breaks and at lunch. So far,
the instructor is pretty good, though we’ve only covered “intro to WCF”
so far. Given the amount of content he’s laid out, I wonder how were
going to get through it all.

The instructor said something interesting as he was going over the
bindings that come “out of the box” with WCF. He commented that these
bindings were the ones the WCF developers thought would be used most
often. Of course, he doesn’t speak for the WCF team, but it does make
some kind of sense. You can extend WCF to support any potential binding,
but it makes sense the WCF team would want to enable the common cases
without having to write much code.

So take a look at the list of [nine standard
bindings](http://msdn.microsoft.com/library/en-us/dnlong/html/wcfarch.asp).
Given that WCF is about unifying the windows stack for distributed
computing, most of the bindings are at least conceptually similar or in
some cases leverage previous distributed paradigms and technologies. You
have two HTTP based bindings
([with](http://blogs.msdn.com/drnick/archive/2006/06/09/623578.aspx) and
[without](http://blogs.msdn.com/drnick/archive/2006/06/01/612672.aspx)
WS-\* extensions) which are analogous to ASMX and WSE. There’s a [TCP
binding](http://blogs.msdn.com/drnick/archive/2006/06/05/617703.aspx)
which is comparable to .NET remoting. And there are [two MSMQ
bindings](http://blogs.msdn.com/drnick/archive/2006/07/17/667988.aspx)
(with and without SOAP support) for those needing to interop with
existing MSMQ systems or who need [durable
messaging](http://friends.newtelligence.net/clemensv/PermaLink,guid,e75402c6-bdd6-438c-9bf2-31f64b8e0557.aspx).

That leaves four “new” standard bindings. These are interesting as they
don’t herald back to previous technologies and paradigms of distributed
computing (at least on the Windows platform) but still the WCF team
thought enough of the scenarios they enable to include them in the box
with WCF. For example, I the
[wsFederationHttpBinding](http://blogs.msdn.com/drnick/archive/2006/06/23/643814.aspx)
is designed to take advantage of the significant investment they’ve made
in [federated identity](http://msdn.microsoft.com/ws-federation/).
Several years ago, Don Box [talked
about](http://www.theserverside.net/tt/talks/videos/DonBox/interview.tss?bandwidth=dsl)
shrinking the service metaphor rather than stretching the object
metaphor across the network.
[NetNamedPipesBinding](http://blogs.msdn.com/drnick/archive/2006/06/06/618445.aspx)
is an obvious implementation of that vision. And
[wsDualHttpBinding](http://blogs.msdn.com/drnick/archive/2006/06/22/642481.aspx)
is a way to take advantage of the WCF’s [duplex channel
shape](http://blogs.msdn.com/drnick/archive/2006/03/07/544724.aspx) while
still using HTTP as your transport.

Finally, there’s
[netPeerTCPBinding](http://blogs.msdn.com/drnick/archive/2006/07/18/669486.aspx).
From where I sit, this is a radical addition to an otherwise standard
set of bindings. Now don’t get me wrong, I’m glad it’s there. But I’m
guessing developers who look at it are more likely to think along the
lines of “Wow, what can I do with this?” rather than “Yes, I expected
that to be there.” Certainly, that was my thought process.

Anyone got any cool uses for netPeerTCPBinding?
