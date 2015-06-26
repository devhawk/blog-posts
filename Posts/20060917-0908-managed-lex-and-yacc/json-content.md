Buried deep in the docs for v3 of the [Visual Studio
SDK](http://msdn2.microsoft.com/en-us/library/aa411710.aspx) is
something called the [Managed Babel
System](http://msdn2.microsoft.com/en-us/library/aa405796.aspx). Babel –
in the context of Visual Studio – is the framework for creating language
services for stuff like syntax highlighting, brace matching, and
IntelliSense completion. As part of the Managed version of Babel, the VS
SDK includes the Managed Package Lex Scanner Generator (MPLEX) and the
Managed Package Parser Generator (MPPG). Online docs are pretty thin,
but there are a few white papers in the additional documentation of the
VS SDK install.

Interestingly enough, the white papers were written by John Gough of
QUT’s [Programming Languages and Systems](http://plas.fit.qut.edu.au/)
group. John wrote [Compiling for the .NET Common Language
Runtime](http://www.amazon.com/dp/0130622966) and PLAS has several
interesting language projects including
[Metaphor](http://plas.fit.qut.edu.au/metaphor/) and
[Ruby.NET](http://plas.fit.qut.edu.au/Ruby.NET/). As you might expect
for a group that focuses on languages on .NET, they have a [managed
version of YACC called GPPG](http://plas.fit.qut.edu.au/gppg/) available
and John said at [Lang.NET](http://www.langnetsymposium.com/) that they
would be releasing a managed version of LEX “soon”. I’m thinking that
QUT’s GPPG/GPLEX combo has been absorbed into the VS SDK and renamed
MPPG/MPLEX. Unfortunately, my laptop power connector is broken, so I
can’t verify this until Monday.

It’s not a [Rosetta
stone](http://www.knowing.net/PermaLink,guid,c201c6a5-3deb-433f-b38a-6541498159ab.aspx)
and the lex/yacc model is [getting pretty long in the
tooth](http://www.knowing.net/PermaLink,guid,0d0f3a62-45ae-4c8e-9438-6c082ef83039.aspx),
but I’m thinking at least [Larry O’Brien](http://www.knowing.net/) will
be interested in these tools.

**Update**: Apparently, this is somewhat old news, as per [Aaron
Marten](https://blogs.msdn.com/aaronmar):

> The tools we’re including are called MPPG & MPLex (which stand for
> Managed Package Parser Generator and Managed Package Lexer). They are
> derivative works from the open-source [GPPG/GPLex tools developed at
> the Queensland University of
> Technology](http://plas.fit.qut.edu.au/gppg/).\
> [[Managed Language Tools in Visual Studio 2005
> SDK](https://blogs.msdn.com/aaronmar/archive/2006/08/15/701300.aspx)]
