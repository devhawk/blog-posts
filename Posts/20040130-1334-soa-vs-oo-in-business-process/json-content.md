Ram [blogs on
abstraction](http://weblogs.asp.net/ramkoth/archive/2004/01/30/64753.aspx)
and Simon [blogs on
intimacy](http://weblogs.asp.net/smguest/archive/2004/01/29/64871.aspx)
of SOA vs. OO. Here are my two cents on control and process of SOA vs.
OO.

I came across this blog entry by [Michael
Santos](http://today.java.net/pub/au/80) who wants to [stop the hype
about web services](http://weblogs.java.net/pub/wlg/891). I forwarded
his post to my entire team. I feel that it represents the typical
old-school, 20th-century, industrial-revolution, application-centric
mindset that we encounter regularly when discussing XML Web Services. He
talks a lot about using binary protocols instead of XML because of
performance. What’s interesting is that his over-focus on performance
leads down a path to tight coupling (or intimacy as Simon called it).

> So, maybe you intend to keep your systems loosely coupled. I
> understand that. But let me ask you…Should they be loosely coupled in
> first place? Sometimes two systems are so tightly coupled that they
> should be just one system, to begin with. This usually happens in big
> companies, where political reasons force two groups to buy two
> solutions from two different vendors to solve two parts of the same
> indivisible problem that cannot be addressed separately. [[Michael
> Santos](http://today.java.net/pub/au/80) : [Stop the hype about
> webservices!](http://weblogs.java.net/pub/wlg/891)]

The thing is, there is no such thing as the “indivisible problem” in the
enterprise. Enterprises don’t solve problems per se, they execute
business processes. Developers tend to think in terms of nouns, which
map nicely to objects, while business people tend to think in terms of
verbs. For example, taking the canonical order processing scenario, the
developer sees a single object – the order. Business people see the
processes that surround that order – placing it, fulfilling it, paying
for it. Typically, the developer sees these processes as methods:
Order.Place(), Order.Fulfill(), Order.ProcessPayment(). However, these
business processes don’t represent things the business object is doing,
rather things being done to the business object. It’s a subtle
difference, but it’s very important.

In Ivar Jacobson’s [Object-Oriented Software
Engineering](http://search.barnesandnoble.com/textbooks/booksearch/isbnInquiry.asp?userid=2VDXOKG2RS&isbn=0201544350&TXT=Y&itm=11),
he talks about how over time objects tend to evolve to have methods that
are only used in a single use case. He separated the concepts of the
“entity” object – which represents a business object that has persistent
state – and the “control” object  – which represents a process that
modifies the state of one or more entities. (Note, control objects in
this context are different from the controller object in the [MVC
pattern](http://msdn.microsoft.com/architecture/patterns/DesMVC/)). In
my experience, mapping use cases to control objects is a good first
order approximation of your final system design.

However, implementing controls and entities with objects implies an
intimate relationship as part of a single autonomous system. In
practice, this is very difficult to maintain over time. First off, it’s
a bad model of reality. Going back to the order processing scenario,
different departments and people are responsible for executing the
“fulfill order” and “process order payment” business processes. The
departments don’t have an intimate relationship for good reasons, like
trust and security. Those reasons should be reflected in the code.
Secondly, business process changes much more often than business
entities. You never know when you’ll want to change a step, modify the
order of steps or completely rethink the process in the face of market
and / or technology changes. In other words, you want the connections
between the processes and the entities to be loosely coupled. If you
tightly couple everything together, then you’ll need to change
everything every time something changes. This leads to a stagnation that
a customer of mine once compared this to carrying a big pile of cow
manure – once you put it down, you don’t want to pick it back up!

If you step back from the OO mindset, you can model controls and
entities in terms services pretty effectively. At PDC, [we
discussed](http://microsoft.sitestream.com/PDC2003/ARC/ARCSYM2_files/Botto_files/ARCSYM2_Campbell.ppt)
the idea of resource vs. activity oriented data and the idea of
service-masters vs. service-agents. These ideas are very similar
conceptually to the control / entity separation. Control objects become
business process services (also known as service agents or sometimes
emissaries). However, when using services instead of objects, you gain
power and flexibility that you just don’t get from the OO model.   
