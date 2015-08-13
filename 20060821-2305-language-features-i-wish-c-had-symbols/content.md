Ruby’s symbols are [often talked
about](http://wiki.rubygarden.org/Ruby/page/show/UnderstandingSymbols)
in terms of efficiency – taking up less memory and executing faster.
While these are both laudable goals, symbols are more than just
performance improvers. The ability to name things is valuable
semantically. Take a look thru p&p’s [Composite UI
AppBlock](http://msdn.microsoft.com/library/en-us/dnpag2/html/CAB.asp)
and you’ll see strings used as names for things all over the place. It’s
great for loose coupling, you see. But how do you tell the difference
between a string used as a name and a string used for some other reason
like user input? You can’t.

[Rails](http://www.rubyonrails.com/) makes extensive use of symbols –
anyone who has [Rolled on
Rails](http://www.onlamp.com/pub/a/onlamp/2005/01/20/rails.html) has
seen “scaffold :recipe”. That’s just the tip of the iceberg. Rails uses
symbols extensively across both ActionPack and ActiveRecord (and
probably others I’m not familiar with). It’s a great approach, but one
that’s unique to Ruby as far as I’m aware.
