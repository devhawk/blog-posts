Nick Malik [lays
out](http://blogs.msdn.com/nickmalik/archive/2007/08/22/the-business-case-for-integrated-systems.aspx)
what he thinks are the four business cases for integration:

> Assume we succeeded, and our systems are all optimally integrated. 
> What has changed? 
>
> 1.  We have better business intelligence.  We have better
>     understanding of our customers, our partners, our products, and
>     our business.  And from that understanding, we make better
>     decisions.  Those decisions are made in a federated manner using
>     self-apparent information.
> 2.  We have end-to-end business processes that cross multiple systems,
>     multiple roles, multiple geographies, and multiple data stores,
>     all aware of and supporting the needs of the customer.
> 3.  We have end-to-end awareness of the metrics that drive both
>     dissatisfaction and cost, and we can take that knowledge and apply
>     it to making our business better.
> 4.  We have a more efficient enterprise, more able to grow to a larger
>     size, at an accelerated rate, and still respond with agility to
>     changing business opportunities.

I put to you that, in fact, we only have one business case for
integration: better business intelligence. The other reasons Nick lists
are either redundant or not as important to the business – at least in
the general case – as you might think.

First off, \#3 from Nick’s list sounds suspiciously like \#1. If there’s
a difference between “better understanding driving better decisions” and
“applying awareness of metrics to making our business better”, I don’t
know what it is. We’ll send one of them off to the Dept. of Redundancy
Dept. and be done with it.

Second, I don’t think the business cares that IT has multiple systems or
multiple data stores. If the business could run on one big centralized
system that could meet the needs of the customer (aka the ERP fantasy),
they’d be fine with that. The fact that realities of modern enterprise
IT require splitting up capabilities across many systems is an
implementation detail that frankly isn’t a concern of the business.

Besides, what’s the business benefit here? News flash: the enterprise
already has end-to-end business processes that cross multiple systems,
multiple roles, blah blah blah. They’re just not *automated* end-to-end.
Does the business care that their not automated? Not a bit. Sure, they
care about processes are slow, costly and error-prone, which manual
processes tend to be. But it’s those negative characteristics that the
business cares about, not integration. Besides, making processes quick,
cheap and error-free sounds a lot like making them efficient. In other
words, more work for the Dept. of Redundancy Dept.

Finally, I don’t think efficiency and agility is as important to the
enterprise as Nick makes it out to be. I mean, the enterprise will *say*
it cares about efficiency – especially in front of the stock holders.
But when it comes to putting it’s money where it’s mouth is, the
enterprise doesn’t, more often than not. Think about how success is
measured in the typical IT project. Is efficiency one of the criteria
for judging success? Not really. Will your project stakeholders let you
run over budget and ship a few months late, just to improve efficiency?
Probably not, unless that efficiency gain is both demonstrable and
dramatic.

Of course, there are certainly specific examples where a automation or
efficiency business case for integration can be made. For example, if
replacing a specific manual process with an automated one has a large
and measurable ROI, the business will likely be interested in making
that investment. If you have a certain process that you do over and over
that’s core to the business, the business will probably be interested in
optimizing the frak out of it. For example, I would guess a delivery
company like UPS or FedEx has spent a lot of time and money on
optimizing their delivery processes.

But what it sounds like Nick’s talking about here is making a general
case for making all our systems “optimally integrated”. Given that our
current systems aren’t, this would take significant time and money. Yet
the tangible benefit to the business is at best nebulous. Nick thinks
improved integration will allow the business to “respond with agility to
changing business opportunities.” He’s probably right. But how do you
quantify this agility? How much will we save in the future for what
we’re spending today? For the general case, the answer is “it depends”.
It’s really hard to fund a project when it’s projected ROI is “it
depends” .

However, business intelligence is a no brainer for the enterprise to
invest in. Giving decision makers better and more up-to-date
information, that’s a tangible benefit that the organization can
quantify *now*. If you can quantify the value of a project, you’ve got
the start of a budget. Of course, all that juicy data is smeared across
a variety of systems, which means integration. Again, the enterprise
doesn’t really care about said multiple systems or integration, but they
care about the outcome.

Nick
[recommends](http://blogs.msdn.com/nickmalik/archive/2007/08/21/soa-and-bi-support-the-same-goals.aspx)
to SOA folks that “if you aren’t already working with your BI team, pick
up the phone. Their mature processes and practices are able to address
many of your issues, and the natural synergy between BI and SOA can make
them a strong ally in the fight for a better, faster, cheaper, and more
intelligent enterprise.” Good advice. Otherwise, selling integration to
the business isn’t much different than [selling them
SOA](http://blogs.msdn.com/nickmalik/archive/2007/08/15/soa-is-not-a-disruptive-technology-selling-soa-part-three.aspx).
In other words, don’t sell it – just do it.
