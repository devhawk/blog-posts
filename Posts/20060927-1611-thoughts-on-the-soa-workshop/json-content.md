Last week, I attended an [SOA
workshop](http://www.soasystems.com/events151.asp) presented by [SOA
Systems](http://www.soasystems.com/) and delivered by “top-selling SOA
author” [Thomas Erl](http://www.thomaserl.com/). It was two SOA-jammed
days + the drive to Vancouver and back primarily discussing SOA with
[Dale](http://halfmybrain.spaces.live.com/blog/). In other words, it was
a lot of SOA. I went up expecting to take Erl to task for his “Services
are Stateless” principle. However, that turned out to be a
[misunderstanding](http://devhawk.net/2006/09/20/Stateless+Stateless.aspx)
on my part about how Erl uses the term stateless. However, while Erl and
I agreed on optimizing memory utilization (which is what he means by
stateless), that wasn’t much else when it came to common ground. As I
wrote last week, Erl’s vision of service-orientation is predicated on
unrealistic organizational behavior and offer at best unproven promises
of cost and time savings in the long run via black box reuse.

Erl spends a lot of time talking about service reuse. I think it’s safe
to say, in Erl’s mind, reuse is the primary value of service
orientation. However, he didn’t offer any reason to believe we can reuse
services any more successfully than we were able to reuse objects.
Furthermore, his predictions about the amount of reuse you can achieve
are completely made up. At one point, he was giving actual reuse numbers
(i.e. 35% new code, 65% existing code). When I asked him where those
numbers came from, Erl admitted that they were “estimates” because
“there hasn’t been enough activity in serious SOA projects to provide
accurate metrics” and that there is “no short term way of proving”
the amount of service reuse. In other words, Erl made those numbers up
out of thin air.

This whole “serious” or “real” SOA is a major theme with Erl. One the
one hand, I agree that SOA is a horribly overused term. Many projects
labeled SOA have little or nothing to do with SO. On the other hand, it
seems pretty convenient to chalk up failed projects as not being “real”
SOA so you can continue to spout attractive yet completely fictional
reuse numbers. I asked about the Gartner’s 20% service reuse prediction
and Erl responded that low reuse number was because the [WS-\*
specs](http://msdn.microsoft.com/webservices/webservices/understanding/specs/default.aspx)
are still in process. While I agree that the WS-\* specs are critical to
the advancement of SO, I fail to see how lack of security, reliable
messaging and transactions are holding back reuse. If anything, I would
expect those specs to *impede* reuse, as it adds further contextual
requirements to the service.

While I think Erl is mistaken when it comes to the potential for service
reuse, he’s absolutely dreaming when it comes to the organizational
structure and behavior that has to be in place for this potential
service reuse to happen in the first place. I’m not sure what Erl was
doing before he became a “top-selling SOA author,” but I find it hard to
believe it included any time in any significantly sized IT shop.

Erl expects services – “real” services, anyway – to take around 30% more
time and money than he traditional siloed approach. The upside for
spending this extra time and money is the potential service reuse. The
obvious problem with this is that we don’t know how much reuse we’re
going to see for this extra time and money. If you spend 30% more but
can only reuse 20% of your services (as Gartner predicts), is it worth
it? If you end up spending 50% more but are only able to reuse 10% of
your services, is it worth it? Where’s the line where it’s no longer
worth it to do SOA? Given that there’s no real way to know how much
reuse you’re going to see, Erl’s vision of SOA requires a huge leap of
faith on the part of the implementer. “Huge leap of faith” doesn’t go so
well with “corporate IT department”.

Furthermore, the next IT project I encounter that is willing to invest
any additional time and money – much less 30% – in order to achieve some
theoretical organizational benefit down the road will be the first. Most
projects I’ve encountered (including inside MSIT) sacrifice long term
time and money in return for short term gain. When asked how to make
this 30% investment happen, Erl suggested that the CIO has to have a
“dictatorial” relationship with the projects in the IT shop. I’m
thinking that CIO’s that adopt a dictatorial stance won’t get much
cooperation from the IT department and will soon be ex-CIO’s.

In the end, I got a lot less out of this workshop than I was hoping to.
As long as SO takes 30% more time and money and the primary benefit is
the same retread promises of reuse that OO failed to deliver on, I have
a hard time imagining SO making much headway.

PS – I have a barely used copy of “[Service-Oriented Architecture:
Concepts, Technology, and Design](http://www.soabooks.com)” if anyone
wants to trade for it. It’s not a [red
paperclip](http://oneredpaperclip.blogspot.com/), but it’s like new –
only flipped through once.
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)
