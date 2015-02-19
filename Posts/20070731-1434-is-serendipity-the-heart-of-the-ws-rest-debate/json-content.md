Thanks to Technorati, I found [this
post](http://johnheintz.blogspot.com/2007/07/integration-forethought-over.html)
by John Heintz. He’s checking out [John
Evdemon’s](http://blogs.msdn.com/jevdemon/archive/2007/07/20/soa-in-the-real-world-now-available.aspx)[e-book
on
SOA](http://www.microsoft.com/downloads/details.aspx?FamilyID=cb2a8e49-bb3b-49b6-b296-a2dfbbe042d8&displaylang=en)
and has a problem with this overview:

> SOA is an architectural approach to creating systems built from
> autonomous services. With SOA, integration becomes forethought rather
> than afterthought. This book introduces a set of architectural
> capabilities, and explores them in subsequent chapters.

To which John H. responds:

> I, for one, would rather build on an architecture that promotes
> integration as an afterthought, so I don’t have to think about it
> before hand!!!

Yeah, I’d rather not have to think about integration before hand either.
On the other hand, I want integration that actually works. It sounds
like John H. is suggesting here that REST somehow eliminates the need to
consider integration up front. It doesn’t. Consider this: if you’re
building a Web 2.0 site then you are *expected* to expose everything in
your site via
[APP](http://en.wikipedia.org/wiki/Atom_Publishing_Protocol), RSS and/or
RESTful POX services. In other words, the Web 2.0 community expects you
to have the forethought to enable integration. If you don’t, Marc Canter
[will call you
out](http://blog.broadbandmechanics.com/2006/03/bill-and-tim-rap-it-out-i-ask-the-1st-question)
in front of Bill Gates and Tim O’Reilly. 

This integration by afterthought approach seems to be big among
RESTifarians. John H. links to a [REST discussion
post](http://tech.groups.yahoo.com/group/rest-discuss/message/8873) by
Nick Gall advocating the principle of generality, “unexpected reuse” and
“design for serendipity”. Money quote:

> The Internet and the Web are paradigms of Serendipity-Oriented
> Architectures. Why? Largely because of their simple generality. It is
> my belief that generality is one of the major enablers of serendipity.
> So here I immodestly offer Gall’s General Principle of Serendipity:
> “Just as generality of knowledge is the key to serendipitous
> discovery, generality of purpose is the key to serendipitous (re)use.”

Serendipity means “[the accidental discovery of something pleasant,
valuable, or
useful](http://encarta.msn.com/dictionary_/serendipity.html)“.
“Serendipitous reuse” sounds an awful lot like [accidental
reuse](http://devhawk.net/2007/07/25/Now+How+Much+Would+You+Pay+For+This+Code.aspx).
Most enterprises have been there, done that and have nothing to show for
their efforts or \$\$\$ except the team t-shirt. Yet [Tim
Berners-Lee](http://en.wikipedia.org/wiki/Tim_Berners-Lee)[believes](http://www.w3.org/2005/Talks/0511-keynote-tbl)
“Unexpected reuse is the value of the web” and [Roy
Fielding](http://en.wikipedia.org/wiki/Roy_Fielding)[tells us
to](http://tech.groups.yahoo.com/group/rest-discuss/message/8343) “Engineer
for serendipity”. What gives?

First off, enterprises aren’t interested in unexpected or serendipitous
reuse. They want their reuse to be systematic and predictable. The
likelihood of serendipitous reuse is directly related to the number of
potential reusers. But the number of potential reusers inside the
enterprise is dramatically smaller than out on the public Internet. That
brings the chance for serendipitous reuse inside the enterprise to
nearly zero.

Second, enterprise systems aren’t exactly known for their “simple
generality”. If Nick’s right that “generality of purpose is the key to
serendipitous (re)use”, then enterprises might as well give up on
serendipitous reuse right now. As I said last year, it’s a [question of
context](http://devhawk.net/2006/09/19/A+Question+Of+Context.aspx).
Context is specifics, the opposite of generality. Different business
units have different business practices, different geographies have
different laws, different markets have different competitors, etc. If an
enterprise operates in multiple contexts – and most do - enterprise
solutions have to take them into account. Those different contexts
prevent you from building usable – much less reusable – general
solutions.

Finally, I think the amount of serendipitous reuse in REST is
overstated. If you build an app on the [Facebook
Platform](http://developers.facebook.com/), can you use it on MySpace?
Nope. If you build an app that uses the [Flickr
services](http://www.flickr.com/services/api/), will it work with
[Picasa Web
Albums](http://code.google.com/apis/picasaweb/overview.html)? Nope. Of
course, there are exceptions – pretty much everyone supports the
MetaWeblog API – but those exceptions seem few and far between to me.
Furthermore, the bits that are getting reused – such as identifier,
format and protocol – are infrastructure capabilities more suitable to
reuse anyway. Serendipitously reusing infrastructure capabilities is
much easier than serendipitously reusing business capabilities, REST or
not.

The problems that stand in the way of reuse aren’t technology ones.
Furthermore, the reuse problems face by enterprises are very different
than ones faced by Web 2.0 companies. REST is a great approach, but it
isn’t a one-size-fits-all technology solution that magically relegates
integration and reuse to “afterthought” status. Serendipity is nice,
when it happens. However, *by definition* it’s not something you can
depend on.
