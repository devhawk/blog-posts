My teammate [Dale](http://halfmybrain.spaces.msn.com/) and I are going
to an [SOA Workshop](http://www.soasystems.com/events151.asp) in
Vancouver in mid September. The workshop is put on by [SOA
Systems](http://www.soasystems.com/), which was founded by “top-selling
SOA author” [Thomas Erl](http://www.thomaserl.com/). I have a copy of
his [first book](http://www.soabooks.com/chapters1.asp), but I’ve never
really opened it. Dale let me borrow [Erl’s second
book](http://www.soabooks.com/chapters2.asp). I figured since I was
going to see him speak, I should at least flip through his books.

I was looking thru the chapter 9 “Principles of Service-Orientation”.
Most of them are spot on, if not exactly news. Services are loosely
coupled, autonomous and share a formal contract. Yep, with you so far.
But then I got to this one:

> **Services are Stateless**\
> Services should not be required to manage state information, as that
> can impede their ability to remain loosely coupled. Services should be
> designed to maximize statelessness even if that means deferring state
> management elsewhere.

This seems way wrong to me on several levels. Now I’m really looking
forward to going to Erl’s workshop, so I can discuss this with him
face-to-face.

First off, his terminology is confusing. I have a hard time believing he
really think services in general should have no state at all. I’m sure
there are some examples of completely state-free services, but I believe
they are both very rare and fundamentally uninteresting. A simple
calculator service has no state, but why would you actually build or use
one (except as a demo)? I assume Erl means that service should be
stateless in the same way HTTP is stateless. IMO, stateless is poor
description of HTTP. Connectionless or sessionless would be more
accurate.

Regardless of my opinions on poor terminology, the problem with
stateless services is that many – perhaps most – business operations
aren’t stateless. And while HTTP is stateless, as soon as you use
cookies, it becomes a stateful protocol. If you don’t believe business
operations are stateful, try buying something on your favorite ecommerce
site with your cookies disabled. Most sites will give you a “Your
computer must have cookies enabled” error message. Sites that still work
are embedding a session ID in the URL instead of in a cookie (ASP.NET
has built in support for this type of [Cookieless Session
State](http://msdn2.microsoft.com/en-us/library/system.web.configuration.sessionstatesection.cookieless.aspx)).
Either way, state is required for even the simple task of ordering
something from a web site.

If most business operations aren’t stateless, why should services that
implement business operations be stateless? This seems like a violation
of the “but no simpler” part of [Einstein’s famous paraphrased
quote](http://devhawk.net/2006/07/06/Paraphasing+Simplicity.aspx).
