Last week, I asked [a REST
Question](http://devhawk.net/2007/06/05/A+REST+Question.aspx): is it
still REST if you don’t use HTTP? My interest in durable messaging is
[well
documented](http://devhawk.net/2007/05/30/The+Case+For+Durable+Messaging+In+Service+Orientation.aspx),
so I want is to see a RESTful approach combined with a durable
messaging. We all know my [durable messaging tool of
choice](http://devhawk.net/2006/10/23/The+Other+Foundation+Technology.aspx),
though I’d trade SSB in a second for something that provided durable
duplex messaging in a standard way.

Anyway, there were some fairly interesting responses that I wanted to
highlight.

Probably most interesting to the discussion at hand was [John
Heintz](http://johnheintz.blogspot.com)‘
[comment](http://devhawk.net/CommentView,guid,87AE6135-942F-4476-9DD7-9992CF073A7A.aspx#f43c3ac6-f719-428d-b5f7-ce84ef8a707f) pointing
out the existence of
“[Waka](http://en.wikipedia.org/wiki/Waka_%28protocol%29)“,  a new
transfer protocol to replace HTTP from Roy Fielding. The fact that Dr.
REST is working on a new protocol that’s designed to be more RESTful
than HTTP should put to bed any REST “is and only is” HTTP arguments.

Erik Johnson agrees that you can separate REST and HTTP, but he
[thinks](http://devhawk.net/CommentView,guid,87AE6135-942F-4476-9DD7-9992CF073A7A.aspx#e80b80a3-bfdb-4615-8516-57193dfed280)
I ought to call it something else. He
[suggests](http://appside.blogspot.com/2007/06/rest-over-http.html)
“resource-oriented” – have we created a new TLA here? Are you down with
ROA, ROAD, ROD, ROP and all the other acronyms we could spawn?

Nick Malik [breaks
out](http://blogs.msdn.com/nickmalik/archive/2007/06/06/what-is-the-rest-high-order-bit.aspx)
the IFaP acronym – Identifier, Format, Protocol – and points out “Each
of the successful Internet standards, from HTTP to SMTP, has an IFaP at
the heart of it.” But does anyone think SMTP is RESTful? I don’t. I
think standardization of IFaP’s is on par in importance with
RESTfulness, but they’re orthogonal. That is to say I think Nick’s wrong
– I’m guessing we’ll go a few rounds on this when he gets back from
[Nashville](http://blogs.msdn.com/nickmalik/archive/2007/06/12/showing-up-can-be-the-hardest-part.aspx)
– or should I say, *if* he gets back?
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)

Arnon Rotem-Gal-Oz [has been
wondering](http://www.ddj.com/blog/architectblog/archives/2007/06/devhawk_harry_p.html)
about REST without HTTP the same way I have, but he doesn’t really go
into detail as to why. I want durable messaging, Arnon mentions
something about topic hierarchies. Couldn’t you do that with HTTP,
Arnon? He also points out a [new DDJ article on
REST](http://www.ddj.com/dept/webservices/199902676). It’s good, if
high-level overview-y.

Pat Helland
[writes](http://blogs.msdn.com/pathelland/archive/2007/06/12/every-noun-can-be-verbed.aspx)
that Every Noun Can be Verbed. It’s more related to [CRUD is
CRAP](http://devhawk.net/2007/05/24/REST+Is+Neither+CRUD+Nor+CRAP.aspx)
than REST == HTTP, but it’s well worth the read. His point about using
filling out a form being CRUD, but then handing the form over to someone
else being an invocation of behavior is fairly eye-opening. As long as
you “interpret the durn’ things with the correct semantics”, it doesn’t
really matter if they’re nouns or verbs.

Last but not least, [Ted Neward](http://blogs.tedneward.com/) and Adrian
Trenaman [discuss SOAP vs.
POX](http://tssblog.techtarget.com/index.php/xmlweb-services/neward-and-trenaman-consider-rest-or-the-great-and-complete-soap-vs-pox-debate/)
over on The Server Side. They focus too much on SOAP encoding (isn’t
that dead yet?), but near the end Ted points out: “Problem is, REST
assumes that you want to carry all of the state in the payload itself,
and for a modern enterprise system, or, hell, even for a game, that’s
not always a safe assumption.” Doesn’t address my questions about using
REST without HTTP, but a very good point nonetheless.
