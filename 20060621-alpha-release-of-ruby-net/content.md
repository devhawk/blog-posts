I’m not sure what a “Preliminary Beta” is but
[QIT](http://www.qut.edu.au/) has released a one for their [Ruby.NET
compiler](http://plas.fit.qut.edu.au/Ruby.NET/). They expect to achieve
“full semantic compatibility” (can you tell this is an acidemic
project?) by the end of the year. Thanks to [David
Ing](http://www.from9till2.com/PermaLink.aspx?guid=fae70ab9-29c8-44f1-b076-46eee9f839d1)
for the link.

They claim to “pass all 871 tests in the samples/test.rb installation
test suite of [Ruby](http://www.ruby-lang.org/) 1.8.2.” which seems odd
since later they say “We have a plan for how to deal with continuations
but we have not yet implemented them.” Doesn’t the Ruby test suite test
continuations? I wish they would provide more details on this plan,
continuations might not be the most interesting thing in Ruby, but it’s
up there and it’s probably the hardest thing to implement on top of the
CLR.

BTW, there are two other projects @ QIT that Ruby.NET leverages that
look interesting. The [Gardens Point Parser
Generator](http://plas.fit.qut.edu.au/gppg/) is essentially a
[YACC](http://en.wikipedia.org/wiki/Yacc) clone written in C\# and
making extensive use of generics. Personally, I’m more interested in
[Parsing Expression
Grammars](http://pdos.csail.mit.edu/~baford/packrat/), but there’s no
C\# implementation as of yet. QIT also has a library for *[reading and
writing program executable files](http://plas.fit.qut.edu.au/perwapi/)*
(i.e. EXEs and DLLs).

As a quick aside, I’m getting pretty tired of all the different
euphemisms for “alpha”. In the age of perpetual beta, isn’t alpha the
new beta? But everyone seems worried about calling their releases alpha
as if it means “it might not cause your machine to explode, if you could
actually get it to compile”. So we end up with things like “Preliminary
Beta” and “Community Tech Preview”. We all KNOW what these terms mean,
so lets just call an alpha and alpha, shall we?
