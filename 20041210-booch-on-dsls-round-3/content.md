Steve Cook
[responded](http://blogs.msdn.com/stevecook/archive/2004/12/08/278507.aspx)
to Grady Booch’s latest
[comments](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=67637)
on software factories and DSLs, which was in turn a response to an
[entry](http://weblogs.asp.net/alan_cameron_wills/archive/2004/11/11/255831.aspx)
by Alan Wills. It’s obvious that Booch is never going to agree with the
DSL approach, but there are a couple of fascinating elements of the
exchange.

First off is Microsoft’s “rejection” of UML, which is just plain FUD.
I’m behind on news reading (as usual) but I was clued into this
conversation by a
[post](http://www.theserverside.com/news/thread.tss?thread_id=30488) on
TSS.com that linked to Booch’s blog and read “Grady Booch explains why
he disagrees with Microsoft’s rejection of the UML in favor of
proprietary domain-specific languages.” Not exactly priming the pump for
intelligent discourse on the subject. As Alan and Steve both point out,
we’re not rejecting UML. UML is a tool, and like all tools it has things
it’s good at and things it’s not good at. We’re talking about using DSLs
for things UML is not good at.

The next is Common Semantics. Every time he posts on DSLs, Booch
mentions something about “covering the same semantic ground as the UML”.
I promised Dan in my
[comments](http://blogs.msdn.com/devhawk/archive/2004/10/25/247644.aspx#248548)
that I would summarize this argument “in simple English” and I never got
around to it. The term semantics simply means “meaning”. For example, in
C\#, the keyword “class” always means the same thing – it has what Steve
[pointed
out](http://blogs.msdn.com/stevecook/archive/2004/12/08/278507.aspx) is
“objective semantics”. Obviously, the word “class” has widely varying
semantics in common use – when a high school senior cuts class he’s not
copying an object definition to the clipboard. But within the realm of
C\#, the word “class” has a well understood and precise meaning – it’s
so precise that the C\# compiler can tell you if you use it incorrectly.

So when Booch writes about a “common semantic model”, I take that to
mean that he thinks there’s a core set of well-defined concepts that all
languages build on. And if that’s what he means, I imagine he assumes
all the interesting concepts are already defined by UML. I think that’s
where the primary disagreement lies – we don’t think any one language
can provide all the possible concepts needed for all programming
domains. A language for developing a web app page flow will be built on
very different semantic concepts that a language for developing
telephone billing systems. Trying to build both of them on top of the
same set of concepts is like putting a square peg in a round hole.

Furthermore, even if you wanted to build on a common set of concepts,
it’s not clear if UML provides a precisely defined set of concepts to
build on. Obviously, Booch thinks it does, but there certainly isn’t
agreement in the industry. Steve refers to UML as having “cognitive
semantics”, which means there is no one objective definition for a
specific element of UML. For example, in covering [Aggregation and
Composition](http://www.martinfowler.com/bliki/AggregationAndComposition.html),
Fowler refers to UML’s white diamond aggregation as a “modeling placebo”
and having “no standard meanings”. When there’s no standard objective
meaning, then each person brings their own experience and reason in
order to formulate their understanding – hence the term “cognitive”. Of
course, the chance that any two people will reach the same understanding
via cognitive reasoning is slim to none – there’s just too much room for
personal interpretation. Because of this lack of objective precision,
Steve describes the resulting discussion of UML and its semantics as
“political, rather than objective” which IMO is not a good foundation to
build your own language on.

In the end, the proof is in the pudding. Personally, I think Booch looks
at UML with rose-colored glasses and that his beliefs don’t mesh with
reality. (Of course, our DSL modeling tools and software factories
approach isn’t far enough along yet to test against reality.) How about
your experience? What success or failure have you had with UML?
