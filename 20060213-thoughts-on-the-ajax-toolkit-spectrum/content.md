Last week, [Dion](http://web2.wsj2.com/) wrote about the [spectrum of
AJAX tookits](http://web2.wsj2.com/web_20_design_the_ajax_spectrum.htm).
He ended with a question, wondering which end of the spectrum will
dominate? Will it be lightweight composable toolkits like
[prototype](http://prototype.conio.net/),
[script.aculo.us](http://script.aculo.us/) or
[Dojo](http://dojotoolkit.org/)? Or a more comprehensive toolkit like
[Atlas](http://atlas.asp.net/)?

This came up in a chat I had w/ [Jimmy
Nilsson](http://www.jnsk.se/weblog/) today. Well, not specifically about
AJAX toolkits. Rather, we were talking about [what he
called](http://www.jnsk.se/weblog/posts/SemanticsLater.htm)
technicalities vs. semantics:

> I have noticed that there seems to be a focus first on the
> technicalities and then on the semantics. Take Indigo (or WCF) for
> example. There has been sooo much talk about its technical aspects,
> but very little talk about how to design for it. I’m pretty sure that
> when the technicalities have been sorted, it’s time for the semantic
> side. I’m not thinking about technical semantics, but rather business
> semantics.

On more than one occasion, I’ve had a head-beating-wall conversations
with WCF folks who are completely obsessed with the secure, reliable and
transactional delivery of messages, but have given exactly zero thought
to the actual contents of said message. So I know where Jimmy is coming
from.

With respect to AJAX toolkits, the question becomes just how easy will
these lightweight toolkits compose? Because while Dion describes Google
Maps as “a simple JavaScript include”, that’s just the technicalities,
it doesn’t begin to deal with the semantics. For example, Dojo has
[Dictionary
object](http://manual.dojotoolkit.org/collections/Dictionary.html),
prototype has a [Hash
object](http://www.sergiopereira.com/articles/prototype.js.html#Reference.Hash).
Dojo [extends the Javascript
Array](http://manual.dojotoolkit.org/collections/ArrayList.html), so
[does
prototype](http://www.sergiopereira.com/articles/prototype.js.html#Reference.Array).
Both libraries wrap the XmlHttpRequest object. In each of these cases,
it appears to me that the library authors have focused on the
technicalities, but not thought about the semantics. These
implementations are all semantically similar, but incompatible. So I
don’t buy that these lightweight toolkits will compose well. What do I
do if I’m using prototype but want the rich text editor in Dojo?

The network effect that Dion doesn’t consider is the component ecosystem
phenomenon that Microsoft has a ton of experience with. Old school VB,
COM/ActiveX and .NET have all had large ecosystems of components and
controls evolve that extend the functionality of the baseline
development platform. There’s no reason to believe that won’t happen
with Atlas. I think it’s wrong to describe Atlas as a monolith or
self-contained or enclosing. It’s an extensible baseline platform – i.e.
the baseline functionality is set down once at the development platform
and the ecosystem can extend it from there. Sure, overlapping extensions
happen (how many rich text editor components are there for ASP.NET?) but
at least they all have basic compatibility.

**Update**: Fixed link to Dojo Toolkit in the first paragraph.
