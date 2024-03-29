I think it made the rounds in the blogsphere, but I’ll post it just the
same: [Pat
Helland’s TechTalk](http://www.theserverside.net/discussions/thread.aspx/thread.jsp?thread_id=23801)
on TheServerSide.NET was published late last week. You know it’s not
your run-of-the mill interview when one of the questions is: “Why is
Hooking Shit Together a more appropriate term?” and answers like ”
Sometimes I want to talk about cleavage a lot”.

Seriously, one of the things I think was most important was Pat’s answer
to the question on integration challenges:

> When you’ve had a couple apps that have been independently designed,
> they have different assumptions about the world. Different assumptions
> about inventory, different assumptions about customers; they probably
> don’t even have the same snail mail address format. It’s true that we
> can connect the bytes back and forth with IP and TCP today, but that
> doesn’t do me anymore good than if I can pick up the telephone and
> talk to China, and if I’m speaking only English, and they’re speaking
> only Mandarin, we still can’t communicate very effectively. I can hear
> some cool sounds, but it doesn’t help get work done.
>
> The same thing’s occurring when you bring applications together. The
> semantics of the interaction is a challenge. It’s very, very difficult
> across an enterprise to get a common understanding of what a customer
> is, is a great example. Because, this half has got these fields, and
> that half has got those fields, and maybe you can get some common
> fields of understanding, but there’s still all these differences that
> are in there.
>
> A huge advantage that we have is XML. XML and XML Schema have allowed
> for at least the expression of what the data formats look like, even
> though that hasn’t helped with all the semantics. But it’s a good
> start. We don’t have to worry about parsing, we don’t have to worry
> about a lot of those details. But we still have a huge road ahead of
> us in terms of rationalizing how we understand the data across
> differently and independently designed applications.

This leads back to the [SOA vs. SOP
question](http://devhawk.net/2004/02/09/soa-vs-sop/).
Being able to send a message is one challenge. It’s an entirely
different challege to get a consistent idea of “customer” or “order”
across your enterprise systems. Both challenges are important but
distinct and are important to different levels of architect.

I also thought his best practice comments were facinating:

> I would argue that the biggest best practice is pragmatism. Don’t do
> anything unless it makes financial sense.
>
> Service-oriented architectures allow you to make whatever business
> choice fits. Because it talks about these being independent things,
> that can then hook together with others, using messaging, and using
> the sequences of messages that flow. That then takes the decisions of
> about what you bulldoze and you don’t bulldoze and puts it back where
> it should be: in the pragmatic business guy’s hands.

This leans heavy to [towards
Realist](http://devhawk.net/2004/02/09/architect-behavior-patterns/),
but that doesn’t make it any less true.
