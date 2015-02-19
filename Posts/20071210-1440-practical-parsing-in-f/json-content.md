I’m interested in parsing because I’m interested in Domain Specific
Languages. F\# is [pretty good for internal
DSLs](http://tomasp.net/blog/fsharp-iv-lang.aspx), but internal DSLs are
obviously limited by the syntax of the host language. If you want
complete control over the language, you’ve got to build your own parser.

The defacto standard for parser development is [Yet Another Compiler
Compiler](http://en.wikipedia.org/wiki/Yacc), or yacc. There’s a version
of [yacc for
.NET](http://devhawk.net/2006/09/17/Managed+Lex+And+Yacc.aspx) as well
as one [specifically for
F\#](http://research.microsoft.com/fsharp/manual/parsing.aspx). However,
I’m not a fan of yacc. Yacc parsers are specified using [context-free
grammar](http://en.wikipedia.org/wiki/Context-free_grammar) (aka CFG).
But CFG’s can be ambiguous – actually, it’s [nearly
impossible](http://en.wikipedia.org/wiki/Dangling_else) to build an
unambiguous CFG. Personally, I’m a big fan of [Parsing Expression
Grammars](http://pdos.csail.mit.edu/~baford/packrat/) (or PEGs) which
among other advantages makes it impossible to develop ambiguous
grammars. Furthermore, PEGs don’t require a separate lexical analyzer
like [lex](http://en.wikipedia.org/wiki/Lex_programming_tool), so I
think they’re more suitable for building [modular
compilers](http://devhawk.net/2006/08/15/Modular+Compilers.aspx).

Since I like PEGs and F\# so much, I developed a parser for the PEG
grammar from the [original PEG
whitepaper](http://pdos.csail.mit.edu/~baford/packrat/popl04/) using
F\#. The grammar is much simpler than a language like C\#, but with
twenty nine grammar productions it’s certainly not trivial. The F\#
implementation is fairly straightforward backtracking recursive decent
parser, which makes it easy to understand even if you’re not a parser
guru. It’s also small – around 400 lines of code including comments. But
I think the code illustrates both the general value of Functional
Programming as well as the specific value of F\#. Here’s how the series
is shaping up (though this is subject to change):

-   [The Parse
    Buffer](http://devhawk.net/2007/12/11/Practical+F+Parsing+The+Parse+Buffer.aspx)
-   [Unit
    Testing](http://devhawk.net/2007/12/12/Practical+F+Parsing+Unit+Testing.aspx)
-   [Syntactical Productions
    (1)](http://devhawk.net/2007/12/13/Practical+F+Parsing+Syntactical+Productions+1.aspx)
-   [Active
    Patterns](http://devhawk.net/2007/12/14/Practical+F+Parsing+Active+Patterns.aspx)
-   [Syntactical Productions
    (2)](http://devhawk.net/2007/12/17/Practical+F+Parsing+Syntactical+Productions+2.aspx)
-   [Semantic Productions
    (1)](http://devhawk.net/2007/12/18/Practical+F+Parsing+Semantic+Productions+1.aspx)
-   [](http://devhawk.net/2007/12/18/Practical+F+Parsing+Semantic+Productions+1.aspx)[The
    Abstract Syntax
    Tree](http://devhawk.net/2007/12/19/Practical+F+Parsing+The+Abstract+Syntax+Tree.aspx)
-   [Semantic Productions
    (2)](http://devhawk.net/2007/12/20/Practical+F+Parsing+Semantic+Productions+2.aspx)
-   [<span style="color: #017cbc;">Recursion and Predicate
    Functions</span>](http://devhawk.net/2008/01/29/Practical+F+Parsing+Recursion+And+Predicate+Functions.aspx)
-   Caching and Tracing
-   C\# Interop

I was originally planning to post the code for the parser itself with
this post. However, i find that I’m revising the code as I write the
articles in this series, so I’m going to hold off for now. If you’re
really desperate, [drop me a line](mailto:harry@devhawk.net) and I’ll
see what I can do.

Update – Almost forgot, if you’re going to follow along at home, I’m
using the [latest version of F\#,
v1.9.3.7](http://research.microsoft.com/research/downloads/Details/e8478d6b-49c0-4750-80eb-0e424d1631a3/Details.aspx).
Note, the [F\# Downloads
page](http://research.microsoft.com/fsharp/release.aspx) on the MS
Research is woefully out of date, so go to the [MS Research Downloads
page](http://research.microsoft.com/research/downloads/Browse.aspx?categoryID=0&sortCriteria=releaseDate&sortOrder=descending).
Currently, it’s the most recent release. It snaps into VS 2005 and 2008
plus has command line tools. If you’re an VS Express user, Douglas
Stockwell [explained](http://11011.net/archives/000721.html) how to roll
your own F\# Express.

Much Later Update – The code is now available [on my
Skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/Projects/Practical%20Parsing%20in%20F%7C3).
