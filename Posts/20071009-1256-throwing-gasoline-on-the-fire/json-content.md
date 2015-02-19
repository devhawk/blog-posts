Steve Vinoski has raised a bit of a [flame
war](http://www.technorati.com/search/http%3A%2F%2Fsteve.vinoski.net%2Fblog%2F2007%2F10%2F04%2Fthe-esb-question%2F)
by admitting he has [lost the ESB
religion](http://steve.vinoski.net/blog/2007/10/04/the-esb-question/).
Given that I’ve [never been a fan of
ESB’s](http://devhawk.net/2007/04/25/Enterprise+Service+Bus+Give+Me+An+Extra+Special+Bitter+Instead.aspx)
anyway, there’s a lot there that I agree with. In particular I liked the
description of “magical framework” middleware, blaming enterprise
architects for driving ESB’s as the “single integration architecture”
even though a single \*anything\* in the enterprise is untenable and his
point that flexibility means you don’t do any one thing particularly
well.

However, Steve goes on to bash compiled languages and WS-\* while
suggesting the One True Integration Strategy™ is REST + \<insert your
favorite dynamic language here\>, then [acts
surprised](http://steve.vinoski.net/blog/2007/10/06/the-degenerating-esb-discussion/)
that the conversation denigrates into “us vs. them”. When you start by
saying that compiled language proponents “natter on pointlessly”, I
think you lose your right to later lament the depreciating level of
conversation .

All programming languages provide their own unique model of the
execution environment.  Dynamic languages have a very different model
than compiled languages. Arguing that this or that model is better for
everyone, everywhere, in all circumstances seems unbelievably naive and
arrogant at the same time.

On the other hand, I do agree with Steve’s point that most developers
only know a single programming language, to their detriment. One
language developers often miss a better solution because their language
of choice doesn’t provide the right semantics to solve the problem at
hand. Developers could do a lot worse than learn a new language. And I
don’t mean a C\# developer should learn VB.

The most pressing example of picking the right language for the right
problem today is multi-threading. Most languages – including dynamic
languages – have shitty concurrency semantics. If you’re building an app
to take advantage of many-core processing, “mainstream” apps like C\#,
Java and Ruby won’t help you much. But we’re starting to see languages
with native concurrency semantics like Erlang. Erlang is dynamically
typed, but that’s not what makes it interesting. It’s interesting
because of it’s native primitives for spawning tasks. I don’t see why
you couldn’t add similar primitives for task spawning to a compiled
functional language like
[F\#](http://research.microsoft.com/fsharp/fsharp.aspx).

As for REST vs. SOAP/WS-\*, I thought it was interesting that Steve
provided no rationale whatsoever for why you should avoid them. The more
I listen to this ~~pissing match~~ debate, the more I think the various
proponents are arguing over unimportant syntactical details when the
semantics are basically the same. SOAP is just a way to add metadata to
an XML message, much as HTTP headers are. WS-\* provides a set of
*optional* message-level capabilities for handling cross-cutting
concerns like security. Past that, are the models really that different?
Nope.

For system integration scenarios like Steve is talking about, I’m not
sure how important any of the WS-\* capabilities are. Security? I can
get that at the transport layer (aka HTTPS). Reliable Messaging? If I do
request/response (which REST excels at), I don’t need RM. Transactions?
Are you kidding me? Frankly, the only capability you *really* need in
this scenario is idempotence, and neither REST or SOAP provides any
standard mechanism to achieve that. (more on that in a later post)

I understand that some vendors are taking the WS-\* specs and building
out huge centralized infrastructure products and calling them ESBs. I
think Steve is primarily raging against that, and on that point I agree
100%. But Steve sounds like he’s traded one religion for another – “Born
Again REST”. For me, picking the right tool for the job implies much
less fanaticism than Steve displays in his recent posts.
