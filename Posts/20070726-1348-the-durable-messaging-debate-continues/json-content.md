Last week, Nick Malik
[responded](http://blogs.msdn.com/nickmalik/archive/2007/07/19/is-durability-in-messaging-bad-libor-thinks-so.aspx)
to Libor Soucek’s
[advice](http://lsblog.wordpress.com/2007/07/05/avoid-durable-messages-in-enterprise-services/)
to avoid durable messaging. Nick points out that while both durable and
non-durable messaging requires some type of compensation logic (nothing
is 100% foolproof because fools are so ingenious), the durable messaging
compensation logic is significantly simpler.

This led to a [very long
conversation](http://lsblog.wordpress.com/2007/07/21/durable-messages-still-losing-over-redundancy-and-eda/)
over on Libor’s blog. Libor started by clarifying his original point,
and then the two of them went back and forth chatting in the comments.
It’s been very respectful, Libor calls both Nick and I “clever and
influential” though he also thinks we’re wrong on this durable messaging
thing. In my private emails with Libor, he’s been equally respectful and
his opinion is very well thought out, though obviously I think *he’s*
the one who’s wrong.
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)

I’m not sure how much is clear from Libor’s public posts, but it looks
like most of his recent experience comes from building trading
exchanges. According to his [about
page](http://lsblog.wordpress.com/about/), he’s been building electronic
trading systems since 2002. While I have very little experience in that
domain, I can see very clearly how the highly redundant, reliable
multicast approach that he describes would be a very good if not the
best solution.

But there is no system inside Microsoft IT that looks even remotely like
a trading exchange. Furthermore, I don’t think approaches for building a
trading exchange generalize well. So that means Nick and I have very
different priorities than Libor, something that seems to materialize as
a significant amount of talking past each other. As much as I respect
Libor, I can’t shake the feeling that he doesn’t “get” my priorities and
I wouldn’t be at all surprised if he felt the same way about me.

The biggest problem with his highly redundant approach is the sheer cost
when you consider the large number of systems involved. [According to
Nick](http://lsblog.wordpress.com/2007/07/21/durable-messages-still-losing-over-redundancy-and-eda/#comment-830),
MSIT has “over 2700 applications in 82 solution domains”. When you
consider the cost for taking a highly redundant approach across that
many applications, the cost gets out of control very quickly. Nick
estimates that the support staff cost alone for tripling our hardware
infrastructure to make it highly redundant would be around half a
billion dollars a year. And that doesn’t include hardware acquisition
costs, electricity costs, real-estate costs (gotta put all those servers
somewhere) or any other costs. The impact to Microsoft’s bottom line
would be enormous, for what Nick calls “negligible or invisible”
benefit.

There’s no question that high availability costs big money. I just asked
[Dale](http://halfmybrain.spaces.live.com/) about it, and he said that
in his opinion going above 99.9% availability increases costs “nearly
exponentially”. He estimates just going from 99% to 99.9% doubles the
cost. 99% availability is almost 15 minutes of downtime per day (on
average). 99.9% is about 90 seconds downtime per day (again, on
average). 

How much is that 13 extra minutes of uptime per day worth? I would say
“depends on the application”. How many of the 2700 applications Nick
mentions need even 99% availability? Certainly some do, but I would
guess that less than 10% of those systems need better than 99%
*availability*. What pretty much all of them actually need is high
*reliability*, which is to say they need to work even in the face of
“[hostile or unexpected
circumstances](http://en.wikipedia.org/wiki/Reliability)” (like system
failures and downtime).

High availability implies high reliability. However, the reverse is not
true. You can build systems to gracefully handle failures without the
cost overhead of highly redundant infrastructure intended to avoid
failures. Personally, I think the best way to build such highly reliable
yet not highly available systems is to use durable messaging, though I’m
sure there are other ways.

This is probably the biggest difference between Libor and me. I am
actively looking to trade away availability (not reliability) in return
for lowering the cost of building and running a system. To someone who
builds electronic trading systems like Libor, that probably sounds
completely wrongheaded. But an electronic trading system would fall into
the minority of systems that need high availability (ultra high five
nines of availability in this case). For the systems that actually do
need high availability, you have to invest in redundancy to get it. But
for the rest of the systems, there’s a less costly way to get the
reliability you need: Durable Messaging.
