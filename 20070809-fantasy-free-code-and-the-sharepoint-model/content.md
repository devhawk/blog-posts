It might sounds like a fantasy, but Nick Malik really wants free code.
He started [talking about
it](http://blogs.msdn.com/nickmalik/archive/2007/06/19/not-crazy-just-lateral-thinking.aspx)
a few months ago when he was ~~getting raked over the coals by~~
debating Mort with the agile .NET community:

> Rather than look at “making code maintainable,” what if we look at
> making code free.  Why do we need to maintain code?  Because code is
> expensive to write.  Therefore, it is currently cheaper to fix it than
> rewrite it.  On the other hand, what if code were cheap, or free? 
> What if it were cheaper to write it than maintain it?  Then we would
> never maintain it.  We’d write it from scratch every time. 

Then about a week ago, [he laid out the
reasons](http://blogs.msdn.com/nickmalik/archive/2007/07/30/free-code-getting-it-out-of-the-applications-business.aspx)
why free code would be a good thing. At a high level (Nick’s blog has
the details), those reasons are:

1.  Lower the cost of IT through reduced skill requirements. 
2.  The speed of development goes up. 
3.  Projects become more agile. 
4.  Solution quality goes up. 

Talking about the benefits of free code is sorta like talking about
talking about the benefits of dating a movie star. The benefits are
actually pretty obvious, but talking about them doesn’t really help you
get there from here.

Actually, Nick isn’t suggesting that all code can be free. He’s focused
on separating out business process modeling/development from the rest of
software development. In essence, he’s describing a new class of
developer (should we call the persona Nick as an homage?) who needs
their own class of tools and for the IT department to “formally” allow
them to “easily develop, test, and deploy [aka host] their processes.”
For the most part, these BP developers wouldn’t be traditional
developers. They’d be more like software analysts who do the work
directly instead of writing specs for developers.

I call this separation of business and IT concerns the SharePoint Model.
[SharePoint](http://www.microsoft.com/sharepoint/default.mspx), IMO,
does an amazing job of separating the concerns and needs of business and
IT users when it comes to running intranet web sites. Only the truly
geeky stuff that requires specialized access, knowledge or equipment –
installing the SharePoint farm in the first place, keeping it backed up,
installing service packs, etc. – is done by IT. Everything else is done
by the business folks. Need a new site? Provision it yourself. Need to
give your v-team members access to it? Do it yourself. I see
similarities in the free BP code approach Nick’s suggesting. I’d even
argue that SharePoint is the natural “host” for such business processes.
It already [supports
WF](http://msdn2.microsoft.com/en-us/library/ms414613.aspx) and can
provide access to back-end enterprise data via the [Business Data
Catalog](http://msdn2.microsoft.com/en-us/library/ms563661.aspx).

On the other hand, some of what Nick suggests seems fairly impractical.
For example, he thinks IT should “formally and officially take control
of managing the common enterprise information model and the business
event ontology.” First off, who officially manages this today? Does such
an official information model or event ontology even exist? I’m guessing
not. That means you’ve got to start by getting the business people to
agree on one. That’s usually a sucker’s bet. Nick also suggests we
“reduce the [leaky
abstractions](http://www.joelonsoftware.com/articles/LeakyAbstractions.html)”
in our services. To suggest this is even possible seems incredibly
naive.

The good news is the things that will work (evolving BP into its own
development discipline, building custom tools for BP development,
getting IT into the BP hosting business) don’t depend in any way on the
things that wont work (getting lots of folks to agree on anything,
~~breaking the laws of physics~~, overcoming the law of leaky
abstractions). I’m not sure it will result it truly free code, but it
sure would bring the costs down dramatically. Thus, I think most of
Nick’s free code vision is quite practical and not a fantasy at all.

As for dating a movie star, you’re on your own.
