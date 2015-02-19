Here is a roundup of some responses to my
[REST](http://devhawk.net/2007/05/24/REST+Is+Neither+CRUD+Nor+CRAP.aspx)[discussion](http://devhawk.net/2007/05/25/This+Isnt+The+Droid+Im+Looking+For.aspx)
with [David Ing](http://www.from9till2.com). Mostly, I’m passing them
along with minimal comment so I figured I’d group them into one post.

David started by [leaving me a
comment](http://devhawk.net/CommentView,guid,077A65C2-6DBC-42E5-B927-4BE2D6E1FF98.aspx#acca030a-8507-4c74-af68-a14b430b79b4),
but decided instead to [post the
comments](http://www.from9till2.com/PermaLink.aspx?guid=5f9ac25b-6e8d-412f-9a16-f9f0c0dbf9be)
on his blog. His big worry seems to be how well REST as CRUD will
interop with REST as protocol. but in general I’m not sure that’s a big
worry. Bill de Hora’s example below about WebDAV ~~transactions~~
activities seems to demonstrate at least some RESTifarians are cool with
a protocol view of the world.

Erik Johnson (who’s [blog](http://appside.blogspot.com/) I mistakenly
purged from my reader at some point, so needless to say I’ve
resubscribed)
[writes](http://appside.blogspot.com/2007/05/harry-david.html) that
“real-world experience shows you rarely POST exactly what you GET” and
that “even with the flawed cast of characters you see a lot of whining
about…the pieces are there to build good systems that also make great
constituents in anyone’s SOA.” I agree 100%. He goes on to agree with me
agreeing with
[Tim](http://www.pluralsight.com/blogs/tewald/default.aspx) for people
“not to limit their comprehension of REST around entities accessed via
GET and PUT”. Generally speaking, I agree with people when they agree
with me, and this is no exception. Erik also has [a REST
post](http://appside.blogspot.com/2007/05/rest-protocols-are-service-layer.html)
that predated my dustup with David(\*) where he reaches some interesting
conclusions about designing REST style systems.

Bill de Hora [weighs
in](http://www.dehora.net/journal/2007/05/wouldnt_start_from_there.html),
pointing out that “value exchange != transaction”. Given that I never
suggested they were equal, I’m not sure what his point is (other than to
be snarky). He also points to [Subversion’s use of
WebDAV](http://subversion.tigris.org/webdav-usage.html) as an example
of…well, I’m not sure since it seems to prove my point that a simple
CRUD style approach doesn’t cut it for many scenarios. According to the
page Bill linked to:

> “Subversion commits are modeled using the “activity” concept from
> DeltaV. An activity can be viewed as a **transaction for a set of
> resources**.” [emphasis mine]

While I’m sure this sounds snarky as well, I really don’t get what Bill
is getting at here. It *sounds* like he took my disparaging of CRUD as a
disparagement of REST, which is NOT how it was intended. This kind of
layering of higher-level protocol concepts (like WebDAV’s activity) is
exactly what I was thinking of when I wrote “I can spurn CRUD and still
embrace REST”.

And though not a direct comment on my post, Omri Gazitt [writes
about](https://www.gazitt.com/blog/PermaLink,guid,ccf9f2f2-a11f-4b70-bb9f-0141dd1041b6.aspx)
REST vs. SOAP and the support for both in the next version of WCF. His
main point is that “It seems like we’ll continue to live in a world
where multiple integration paradigms and protocol choices exist for
applications”. Of course, since he’s with the WCF product group,
regardless of your integration paradigm or protocol choice, WCF is the
way to build it (at least on Windows). We’ll have to wait a while to see
if WCF is really “future-proof”, but the ability to add [significant
changes](https://www.gazitt.com/blog/PermaLink,guid,a8383226-a0dd-48c5-9fea-33d5da159d17.aspx)
in a .5 release is a fairly good sign.

------------------------------------------------------------------------

(\*) It’s a very polite dustup, characterized mostly by agreement rather
than disagreement. Which makes it, as dustups go, very boring.
