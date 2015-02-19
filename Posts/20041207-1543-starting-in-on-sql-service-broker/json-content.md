Since [Norman](http://atlasbrandview.blogspot.com/) joined the team a
few months ago, I’m no longer in firefighter mode. For about six months
my team was short a marketing manager and I ended up picking up a bunch
of extra duties. For example, I took over as TechEd architect track
owner when out previous marketing manager left. I don’t know much about
marketing, but I guess I did OK – I received a Marketing Impact Award
for my work on TechEd. However, I’m very happy to have handed those
marketing responsibilities back to their rightful owner. Even still,
Norman is trying to educate me about marketing. He made me read the
first two chapters of [Building Strong
Brands](http://www.amazon.com/o/ASIN/002900151X) by David Aaker. I
actually got thru the first three chapters before borrowing [Birth of
the Chaordic Age](http://www.amazon.com/o/ASIN/1576750744) by Dee Hock
from my father at Thanksgiving.

You would think that I would now have more time for blogging, but alas
that has not been the case. When I was firefighting, I had no time for
planning. Now, of course, I do. So between planning and thanksgiving
vacation I’ve just been too busy to blog much.

One thing I’m getting into recently is SQL Service Broker. I’m working
on an interesting community project that is building on top of SSB.
Luckily, one of the [primary
architects](http://blogs.msdn.com/pathelland) of SSB sits down the hall
from me. Of course, not everyone is so lucky, so watch this space as I
dig deeper on SSB. A good place to start is the [SSB First
Look](http://msdn.com/library/en-us/dnsql90/html/sqlsvcbroker.asp)
article. In order to start getting a handle on SSB, I ported the Hello
World example from that article from T-SQL to C\#. It’s a bit tricky, as
there is no SSB-specific framework – you just use SqlCommand to execute
SSB commands like BEGIN DIALOG and RECEIVE – but otherwise it’s pretty
straightforward. My sample also demonstrates using the new SQL
Management Objects to create databases and SSB related objects (message
types, contracts, queues and services). [Here’s the
code](http://cid-0d9bc809858885a4.office.live.com/self.aspx/DevHawk%20Content/BlogFiles/HelloSSB.zip)
– enjoy.
