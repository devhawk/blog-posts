Nick Malik asked “what is the Rails “answer” on the Microsoft platform?
If we don’t install Ruby, do we use Rails on JS or is there a Rails
version we may want to put up ourselves?” I guess it depends, what is
the Rails “question”?

On the one hand, the question could be “What’s the best way to run Rails
on Windows?” I think the short answer to that is
[IronRuby](http://www.iunknown.com/2007/04/introducing_iro.html). In the
wake of the IronRuby announcement, John Lam
[wrote](http://channel9.msdn.com/ShowPost.aspx?PostID=305092#305092)
that “Nobody would take our implementation seriously if it doesn’t run
Rails.”
[Some](http://ola-bini.blogspot.com/2007/06/there-can-be-only-one-tale-about-ruby.html)[people](http://martinfowler.com/bliki/RubyMicrosoft.html)
question the DLR’s teams ability to ship a compatible version of Ruby
without looking at the source, but my money is on the DLR team. (Of
course it is, I’m a kool-aid drinker!)

BTW, I don’t think having a JavaScript port of Rails (JailS?) is much of
a help for the Microsoft platform. I’m not sure if Steve Yegge’s
JavaScript Rails port would run on
[JScript.NET](http://en.wikipedia.org/wiki/JScript_.NET), but I wouldn’t
bet on it. I would expect you need either the old [Active Scripting
JScript](http://en.wikipedia.org/wiki/JScript) or the new [Managed
JScript](http://blogs.msdn.com/jscript/archive/2007/05/07/introducing-managed-jscript.aspx)
(aka the
[DLR](http://blogs.msdn.com/hugunin/archive/2007/04/30/a-dynamic-language-runtime-dlr.aspx)
based version of JavaScript). Of course, IronRuby runs on DLR as well so
why wouldn’t you just run Rails on IronRuby instead of the JavaScript
port of Rails on Managed JScript?

(Side note – why isn’t the new JScript engine called IronJavaScript?
Wouldn’t that be cooler than Managed JScript? Don’t they know “Iron” is
the new “\#”?)

On the other hand, maybe the question is “can ASP.NET evolve to be more
Rails-esque?” I think it’s starting to, slowly. Rails at it’s core is a
[Model View
Controller](http://www.martinfowler.com/eaaCatalog/modelViewController.html)
web app pattern (aka [Action
Pack](http://api.rubyonrails.org/files/vendor/rails/actionpack/README.html))
combined with an [Active
Record](http://www.martinfowler.com/eaaCatalog/activeRecord.html) data
access pattern (aka [Rails’ Active
Record](http://api.rubyonrails.org/files/vendor/rails/activerecord/README.html)).
Certainly, nothing stops you from using a similar approach with ASP.NET.
The Castle Project has an ASP.NET implementation of MVC (aka
[MonoRail](http://www.castleproject.org/monorail/index.html)) and Active
Record (also called [Active
Record](http://www.castleproject.org/activerecord/index.html)). But I
assume Nick’s more interested in what ships natively in the platform to
compare to Rails.

On the data access side, I think LINQ to SQL is a a compelling
alternative to the various Active Record implementations. It’s not an
implementation of the Active Record pattern, it looks more like a [Table
Data
Gateway](http://www.martinfowler.com/eaaCatalog/tableDataGateway.html)
patten. Also, it’s not [DRY](http://en.wikipedia.org/wiki/DRY) like
Rails Active Record, but I think that’s more of a function of dynamic
vs. static languages. Castle Active Record [isn’t
DRY](http://www.castleproject.org/activerecord/index.html) either. But
once you get the hang of the slightly funky syntax (the from clause is
first so you can get intellisense) I find LINQ very easy to use.
Certainly, building [Query
Objects](http://www.martinfowler.com/eaaCatalog/queryObject.html) is a
snap.

On the web app framework side, the story isn’t so pretty. The agile
folks like MVC because it’s [easier to
test](http://codebetter.com/blogs/jeremy.miller/archive/2007/03/07/Jay_2700_s-TDD-QuickStart_2C00_-and-the-underlying-problems-he-stumbled-into.aspx)
(among other reasons – see update below). Apparently, there’s an ASP.NET
MVC framework that’s “[in the
works](http://codebetter.com/blogs/jeffrey.palermo/archive/2007/03/16/Big-News-_2D00_-MVC-framework-for-ASP.NET-in-the-works-_2D00_-level-300.aspx)“,
but AFAIK no one has seen or heard anything about it since the MVP
summit. [Jeffrey
Palermo](http://codebetter.com/blogs/jeffrey.palermo/default.aspx) was
impressed with what he saw, but I guess everyone else has to reserve
judgement until it gets a little more public.

Actually, I don’t think it’s an either-or question, it’s both. In order
to be the *Common* Language Runtime, I think it needs to support common
dynamic languages like Ruby, Python and JavaScript natively. And, in
order to be the best platform, I think the .NET Framework in general and
ASP.NET in particular need to support multiple approaches to meet the
needs of different developers.

UPDATE – in the
[comments](http://devhawk.net/CommentView,guid,c444e0c2-f9e8-4625-b12a-7a4c00f859e8.aspx#commentstart),
[Jeffrey Palermo](http://www.jeffreypalermo.com/) points out that he
likes MVC “mostly because it separates concerns of controlling screen
and rendering the screen. It makes the application more maintainable and
keeps the code easily changeable.” Point taken. I didn’t mean to imply
that testability was the only virtue of MVC.
