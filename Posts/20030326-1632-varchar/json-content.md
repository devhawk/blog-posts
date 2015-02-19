I’m thinking about redoing the backend of this website. I started to do
pingback/trackback support and got discouraged by the fact that I would
again have to pick an arbitrary length for the database columns. Of all
the annoyances with databases, that’s my biggest pet peeve. Maybe [SQL
“Yukon”](http://www.microsoft.com/sql/evaluation/yukon.asp) with it’s
ability to [natively store
XML](http://www.microsoft.com/technet/treeview/default.asp?url=/technet/itcommunity/chats/trans/sql/sql0517.asp)
will solve this problem.

However, until then, I need to use something to store my entries in.
[BlogX](http://www.simplegeek.com/) uses XML files, which seems like
trading one evil for another. Picking a max length for a column is
annoying, but I don’t relish rolling my own database.
[Bamboo.Prevalence](http://bbooprevalence.sourceforge.net) is
interesting, but I don’t like the fact that everything is kept in memory
all the time. I’ve read the [Prevalence Skeptical
FAQ](http://www.prevayler.org/wiki.jsp?topic=PrevalenceSkepticalFAQ)
with their entries on [Breakthroughs in Memory
Technology](http://www.prevayler.org/wiki.jsp?topic=BreakthroughsInMemoryTechnology)
(which haven’t happened yet) and their [Scalability Test
Results](http://www.prevayler.org/wiki.jsp?topic=IsItTrueThatPrevaylerIsThreeThousandTimesFasterThanMYSQL)
(testing a paltry 1 million rows in a single table – though obviously
DevHawk has much less data than that) and I’m still skeptical.

I am impressed with the implementation of Prevalance – especially the
[transparent
engine](http://bbooprevalence.sourceforge.net/MyFirstPrevalentSystem.htm)
feature of Bamboo. From what I can tell from the outside, it serializes
the methods calls against the Prevalyent (?) object so on app restart,
the engine can return to when it left off. It also can serialize the
Prevalyent object itself for snapshot purposes. Simple, but elegant –
except for the memory usage. I tested a simple Bamboo.Prevalence app
with a snapshot of DevHawk’s database. The entry list wasn’t too bad but
the referrals list was huge – an order of magnitude bigger in memory
than the entry list! Given that I do nothing with the referrals list but
archive it keeping it in memory seems like a waste. What I want is
something like Prevalence but with more flexibility with regard to
memory usage. I only want to keep the past month’s worth of entries and
the past day’s worth of referrals in memory all the time.

I’m thinking that you could build something similar to Prevalance that
used [Weak
References](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemweakreferenceclasstopic.asp)
to enable the GC to clean up memory of infrequently used objects but
then use
[Proxies](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfSystemRuntimeRemotingProxiesRealProxyClassTopic.asp)
to reload them transparently from disk on command.
[Resurrection](http://msdn.microsoft.com/msdnmag/issues/1100/GCI/default.aspx)
could be used to avoid collecting objects that are likely to be used in
the near future (i.e. recent entries).
