Nick
[responds](http://blogs.msdn.com/nickmalik/archive/2007/08/24/business-case-for-integration-part-two.aspx)
to my [visceral
thoughts](http://devhawk.net/2007/08/23/the-one-business-case-for-integration/)
on the integration business case. There’s no point in excerpting it – go
read the whole thing. I’ll wait.

It looks like for case \#2, he added the ability to “change readily and
inexpensively”, which is to say he made it overlap even further with \#4
than it used to. He also changed \#3 to make it clear that he was
collecting metrics to give us “awareness of process efficiency”. That
makes \#3 overlap with \#4 on efficiency instead of \#1 on BI, but
either way it’s still redundant.

So we’re still left with the business cases of Business Intelligence,
Efficiency and Agility. Nick conflates Efficiency and Agility both in
his [original
post](http://blogs.msdn.com/nickmalik/archive/2007/08/22/the-business-case-for-integrated-systems.aspx)
and his
[follow-up](http://blogs.msdn.com/nickmalik/archive/2007/08/24/business-case-for-integration-part-two.aspx),
but I think it makes sense to separate them. I still stand by my
original point that the business is only interested in directly funding
Business Intelligence.

Nick is willing to bet a nice lunch that MSFT has invested more in
improving operational efficiency that we have on BI in the past four
years. He’s probably right, but he missed the point I was making. The
business will readily invest in improving a specific process they can
measure the ROI on improving. MSFT has lots of processes, I’m sure most
of them have significant room for improvement.

But Nick’s list isn’t about specific improvements. He’s explicitly wrote
that he’s describing a scenario where “our systems are all optimally
integrated”. Selling the business on generally improving efficiency is
very different that selling the business on improving the efficiency of
a specific process. I’d bet the same nice lunch that the vast majority –
if not all – of integration infrastructure running at MSFT was
originally deployed as part of a specific business scenario that needed
to be solved.

My point here is most businesses are better at funding projects to meet
specific business needs than it is at funding pure infrastructure
projects.

As for agility. Martin Fowler [pointed out
once](http://www.artima.com/intv/flexplex2.html) that adding flexibility
means adding complexity. But chances are, you’ll be wrong about the
flexibility you think you’ll need. So you actually end up with the
additional complexity but none of the flexibility benefit. Martin
recommends “since most of the time we get it wrong, just don’t put the
flexibility in there”. Instead, you should strive for simplicity, since
simpler systems are easier to understand and thus easier to change.

Does the same philosophy apply to process? I think so, though there is
one thing I’d be willing to risk being wrong on. We all expect the steps
in a process to change over time, so moving to a declarative model for
process definition sounds like a good idea. Luckily, there’s [existing
platform
infrastructure](http://msdn2.microsoft.com/en-us/netframework/aa663328.aspx)
that helps you out here. But beyond that, I can’t think of a flexibility
requirement that I’m so sure of that I’m willing to take on the
additional complexity.

Again, I’m not saying efficiency or agility (or integration for that
matter) are bad things. I’m saying they’re a tough sell to the business
in the absence of specific scenarios. Selling the business on automating
the ordering processing is feasible. Selling the business on building
out integration infrastructure because some future project will leverage
it is much tougher. If you can sell them on it, either because the
company is particularly forward thinking or because you can sell ice to
Eskimos, then more power to you. But for the rest of us, better to focus
on specific scenarios that the business will value and keep the
integration details under wraps.
