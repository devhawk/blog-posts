I mentioned on the [first day of the Compiler Dev
Lab](http://devhawk.net/2006/03/14/compiler-dev-lab-linq/) that
[Brian Beckman](http://weblogs.asp.net/brianbec) is a hoot. He’s also
wicked smart. He
[posted](http://weblogs.asp.net/brianbec/archive/2006/03/15/440293.aspx)
about his demo from Monday where he demonstrates building indexes for
use in LINQ queries. In his words:

> In the terminology of relational databases, a “join” is, semantically,
> like a nested loop over a pair of lists (or tables) of records, saving
> only those where some certain fields match. Unless we do something
> smart, this could be very expensive. Imagine searching a database of a
> million DNA profiles for the closest match to a sample that has 10,000
> DNA features (I have no idea whether those are real numbers: I just
> made them up, but they sound ballpark to me). A dumb join would search
> all 1 million profiles for each of the 10,000 features, resulting in
> 10 billion match tests, almost all of which will fail – by design, of
> course. That’s going to hurt.
>
> The “something smart” is to build an index and search through that.
> Your database doesn’t have to be large at all for this to pay off. In
> fact, even with just a few records, it’s cheaper to build an index,
> use it, and throw it away than it is to do a nested loop.

He goes on to prove out his point about building an index. For his full
dataset (joining 3053 cities with 195 countries) it is literally 65x
slower not to build a one-off index. Even for smaller datasets, the time
difference is less dramatic but still significant. For example, with 89
cities instead of 3053, it’s 3x slower not to build the index.

The reason I’m so interested in Brian’s post is because of my
[experiments with
Ning](http://devhawk.net/2006/02/27/experimenting-with-ning/). As
you might recall, in trying to build a .NET version of [Partisan
Hacks](http://partisanhacks.ning.com/), I found ASP.NET 2.0 to be
significantly simpler than PHP (which Ning uses). However, building even
the trivial SQL Express database for Partisan Hacks was a non-trivial
exercise. Sure, I’ve done it many times before, but it seems strange
that ASP.NET makes it so easy to build a site while SQL Server makes it
so complex to build a database. If I was a novice user, I would never be
able to build a database for my web site.

Why is this? I think that the simple app or amateur developer is simply
not the target audience for SQL Server (even SQL Express). If you don’t
know the difference between nvarchar(100) and varchar(max) you’re pretty
much out in the cold when it comes to SQL Server. Their target audience
appears to be enterprise databases that are cared for by enterprise
database administrators. Databases with scores of tables and millions of
rows. Great for them, bad for novice users who just want to persist
their data somewhere quickly and easily.

Why can’t building my database be as simple as building my site?

Ning makes it easy to use their [Content
Store](http://documentation.ning.com/post.php?Post:slug=XN-XN_Content).
You create an instance of a content object, you set properties (dynamic
ones), you hit save. No fuss, no muss, no db schema. Sure is an easier
model to understand and program to. In that regard, it blows away
everything, even [Ruby on Rails](http://www.rubyonrails.com/). RoR is
pretty sweet, but it needs a real database schema on the back end in
order to drive RoR’s guiding principle of “convention over
configuration*“*. If there’s no DB schema to discover, I think much of
the RoR model would break down. (but that may just be my lack of RoR
experience talking)

I not sure what a simpler database system would look like, but one idea
of mine is to use a schemaless database. Much of the complexity comes
from having to define both an in memory as well as perseistant schema,
as well as the translation between them. If you just stored managed .NET
objects, you would eliminate the redundant schema specification. It’s
not a fully fleshed out concept, but it is a start of an idea.

What other ideas would make persistant data significantly easier to work
with?
