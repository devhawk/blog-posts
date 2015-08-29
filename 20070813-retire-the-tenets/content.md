John Heintz and I [continue to
be](http://johnheintz.blogspot.com/2007/08/soa-integration-rpc-and-constraints.html)
in mostly violent agreement. It’s kinda like me saying “You da
architect! Look at my massive scale EAI Mashup!” and having him respond
“No, you da architect! The SOA tenets drive me bonkers!” Makes you
wonder what would happen after a few beers. What’s the architect version
of [Tastes Great, Less Filling](http://en.wikipedia.org/wiki/Miller_Lite#Advertising)? 
^[Not that you would catch me drinking Miller Lite. Ever.]

Speaking of [the
tenets](http://msdn.microsoft.com/msdnmag/issues/04/01/Indigo/default.aspx#S1),
John gives them a good shredding:

> **Tenet 1: Boundaries are Explicit**\
> (Sure, but isn’t everything? Ok, so SQL based integration strategies
> don’t fall into this category. How do I build a good boundary? What
> will version better? What has a lower barrier to mashup/integration?)
>
> **Tenet 2: Services are Autonomous**\
> (Right. This is a great goal, but provides no guidance or boundaries
> to achieve it.)
>
> **Tenet 3: Services share schema and contract, not class**\
> (So do all of my OO programs with interface and classes. What is
> different from OO design that makes SOA something else?)
>
> **Tenet 4: Service compatibility is based upon policy**\
> (This is a good start: the types and scope of policy can shape an
> architecture. The policies are the constraints in a system. There not
> really defined though, just a statement that they should be there.)
>
> Ah, I feel better getting that out.

As John points out, the four tenets aren’t particularly useful as
guidance. They’re too high level (like [Mt.
Rainier](http://www.nps.gov/mora/) high) to be really actionable.
They’re like knowing a pattern’s name but not understanding how and when
to use the actual pattern. However, I don’t think the tenets were ever
intended to be guidance. Instead, they were used to shift the
conversation on how to build distributed applications just as Microsoft
was introducing the new distributed application stack @ PDC03.

John’s response to the first tenet makes it sound like having explicit
boundaries is obvious. And today, maybe it is. But back in 2003,
mainstream platforms typically used a [distributed
object](http://en.wikipedia.org/wiki/Distributed_objects) approach to
building distributed apps. Distributed objects were widely implemented
and fairly well understood. You created an object like normal, but the
underlying platform would create the actual object on a remote machine.
You’d call functions on your local proxy and the platform would marshal
the call across the network to the real object. The network hop would
still be there, but the platform abstracted away the mechanics of making
it. Examples of distributed object platforms include CORBA via
[IOR](http://en.wikipedia.org/wiki/Interoperable_Object_Reference), Java
[RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation), COM
via
[DCOM](http://en.wikipedia.org/wiki/Distributed_Component_Object_Model)
and .NET [Remoting](http://en.wikipedia.org/wiki/.Net_Remoting).

The (now well documented and understood) problem with this approach is
that distributed objects can’t be designed like other objects. For
performance reasons, distributed objects have to have what Martin Fowler
[called](http://www.ddj.com/architect/184414966) a “coarse-grained
interface”, a design which sacrifices flexibility and extensibility in
return for minimizing the number of cross-network calls. Because the
network overhead can’t be abstracted away, distributed objects are a
very [leaky
abstraction](http://www.joelonsoftware.com/articles/LeakyAbstractions.html).

So in 2003, Indigo folks came along and basically said “You know the
distributed object paradigm? The one we’ve been shipping in our platform
since [1996](http://en.wikipedia.org/wiki/NT4)? Yeah, turns out we think
that’s the wrong approach.” Go back and check out [this
interview](http://www.theserverside.net/tt/talks/videos/DonBox/interview.tss?bandwidth=56k)
with Don Box from early 2004. The interviewer asks Don if WCF will
“declare the death of distributed objects”. Don hems and haws at first,
saying “that’s probably too strong of a statement” but then later says
that the “contract, protocol, messaging oriented style will win out”
over distributed objects because of natural selection.

The tenets, IMHO, were really designed to help the Windows developer
community wrap their heads around some of the implications of messaging
and service orientation. These ideas weren’t really new – the four
tenets apply to
[EDI](http://en.wikipedia.org/wiki/Electronic_Data_Interchange), which
has been around for decades. But for a generation of Windows developers
who had cut their teeth on DCOM, MTS and VB, it was a significant
paradigm shift.

These days, with the tenets going on four years old, the conversation
has shifted. Platform vendors are falling over themselves to ship
service/messaging stacks like WCF and most developers are looking to
these stacks for the next systems they build. Did the tenets do that? In
part, I think. Mainstream adoption of RSS was probably the single
biggest driver of this paradigm shift, but the tenets certainly helped.
Either way, now that service orientation is mainstream, I would say that
the tenets’ job is done and it’s time to retire them. Once you accept
the service-oriented paradigm, what further guidance do the tenets
provide? Not much, if any.

