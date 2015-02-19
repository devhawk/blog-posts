Last week, I had a great discussion with the Product Unit Manager (or
PUM) of
[VSTA](http://lab.msdn.microsoft.com/teamsystem/teamcenters/architect/default.aspx).
She wanted my perspective on a few things related to Software Factories
and I figured I’d share some of them here.

First off, while I appreciate the vision of factories, I’m also focused
on the short term gains of automating software construction. Today, most
of that automation is in terms of code generation. For example,
[John](http://blogs.msdn.com/jdevados/) asked the other day if I thought
[Yacc](http://www.mkssoftware.com/products/ly/) is a software factory.
It certainly is a domain specific language! However, I’m not sure I’d go
so far as to say it’s a factory. But on the other hand, I’m not sure it
matters that much if it’s a factory or not. When the other
[John](http://blogs.msdn.com/jevdemon) on my team blogged his [thoughts
on SOA](http://blogs.msdn.com/jevdemon/archive/2004/12/17/323889.aspx),
he included one I wrote: “Eventually we’ll stop talking about SOA and go
back to talking about Architecture”. I feel sort of the same way about
factories. As long as we’re talking about it as if it is something
different from what we’re already doing, we’re not there yet. But if we
keep taking steps in the right direction, eventually we’ll get to the
point where the process of building software doesn’t look the way it
does today. Sorta the same way that building software today doesn’t look
like it did pre-.NET, pre-VB, pre-Windows or pre-C++ (I could keep
going, but I think you get the point). That’s the thing about visions,
you never really get there, it just provides a way to keep you going in
the right direction.

Secondly, I think that one aspect of Software Factories that at least I
haven’t focused on is reusable frameworks. The
[book](http://www.amazon.com/o/ASIN/0471202843) is called “Software
Factories: Assembling Applications with Patterns, Models, Frameworks,
and Tools” but I think the focus has been mostly on models and tools.
This is partially because of the whole DSL vs. UML flack (quick side
note – how about we have both?) and partially because the [DSL
toolkit](http://lab.msdn.microsoft.com/teamsystem/Workshop/DSLTools/default.aspx)
is the first factory-esque thing that we’re shipping. However, DSLs big
value, IMO, is to automate the construction of applications built on top
of well designed reusable frameworks. For example, the [OOPSLA keynote
demo](http://devhawk.net/OOPSLA+Day+1.aspx) was a DSL that would sit on
top of a UI process framework such as the [p&p UIP
block](http://msdn.com/library/en-us/dnpag/html/uipab.asp). But if there
is not a good framework, there’s little point in having a language. I’ve
pointed out in the past that the big gap to cross for organizations to
start using DSLs is the leap from building abstractions to building
languages that automate that abstractions. However, that’s not really
true. The really big gap is the leap from building one-off abstractions
to building reusable frameworks of abstractions. Once you have the
reusable framework, building the DSL is an easier step IMO.

Even though I didn’t figure out the framework / factory connection until
last week, it must have been there in the back of my mind when I was
working on the ARC track for TechEd. We’re having a
[session](http://www.msteched.com/content/sessions.aspx) on “Design
Considerations for Enterprise Application Frameworks” with [Steve
Maine](http://hyperthink.net/blog/) as the speaker.
