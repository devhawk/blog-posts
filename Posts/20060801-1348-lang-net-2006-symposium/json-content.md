Yesterday, I attended the [Lang .NET 2006
Symposium](http://www.langnetsymposium.com/) – basically a public
version of the CLR Compiler Lab I went to back in March. Unfortunately,
with my new job, I couldn’t attend all three days, but I did attend day
one. Here we’re my thoughts on the various sessions.

Anders Hejlsberg – LINQ and C\# 3.0

-   This was basically a rehash of his talk from the March Compiler lab.
    Makes sense as it was a new audience, but the “Query the Running
    Processes” demo is getting pretty old. Check out [my notes from
    March](http://devhawk.net/2006/03/14/compiler-dev-lab-linq/) for
    more details.

[John Gough](http://sky.fit.qut.edu.au/~gough/) – Dealing with Ruby on
the CLR

John is a professor from the [Programming Languages and
Systems](http://plas.fit.qut.edu.au/Default.aspx) group at [Queensland
University of Technology](http://www.qut.edu.au/). They’re the ones
building [Ruby.NET](http://plas.fit.qut.edu.au/Ruby.NET/). He’s also the
author of [Compiling for the .NET Common Language
Runtime](http://www.phptr.com/bookstore/product.asp?isbn=0130622966), a
great if somewhat dated (i.e. .NET 1.0) book.

Much of John’s talk covered the ground that [Jim
Hugunin](http://blogs.msdn.com/hugunin/default.aspx) covered [back in
March](http://devhawk.net/2006/03/15/compiler-dev-lab-scripting/)
around the difficulties of mapping dynamic languages to the static CLR.
For example, most Ruby.NET objects are instances of Ruby.Object, with
their link to a class – a Ruby.Class – managed by the Ruby.NET runtime
rather than leveraging the CLR’s built-in class structure.

He didn’t spend much time talking about the really hard problems like
continuations, which I was really hoping he would.

There are a series of “allied” tools coming out of this project which
look really interesting in their own right:

-   [PE File Reader/Writer](http://plas.fit.qut.edu.au/perwapi/) – a
    managed component for reading writing DLL and EXE files.
-   [Gardens Point Parser Generator](http://plas.fit.qut.edu.au/gppg/)
    (GPPG) – a Yacc/[Bison](http://www.gnu.org/software/bison/) style
    parser generator, written in and generating C\#
-   Gardens Point LEX (GPLEX) – companion to GPPG for generating C\#
    scanners, a la LEX or [Flex](http://flex.sourceforge.net/). Not
    released yet, but John indicated it would be available in the next
    couple of weeks.

[Christopher Diggins](http://www.cdiggins.com/) – [Cat Programming
Language](http://www.cdiggins.com/cat): A Functional Optimization
Framework for the CLI

-   I’m fairly sure Christopher doesn’t present often. Otherwise he
    would have know that there’s no way to present [107
    slides](http://www.cdiggins.com/cat/cat_lang_net.ppt) in 30 minutes.
-   Christopher had a hard time expressing why someone would use Cat,
    even when asked point blank by an audience member. Most of his 107
    slides were describing various features of the language. I don’t
    know about the rest of the audience, but I got lost pretty quickly.
-   It’s too bad Christopher was so obtuse as a speaker, as Cat seemed
    pretty interesting. If you skip the first 78 slides (!) of his deck,
    you get to a slide named “Transformation Engine” which seems to be
    the primary reason for Cat’s existence. The idea seems to be to
    build a large number (Chris said potentially thousands) of little
    optimization transformations which are used to “prune” the tree
    during the binary generation stage of a compiler.
-   The only problem with this (other than the difficulty of following
    the presentation) is that I don’t think compiler optimization is a
    particularly useful area of study. I subscribe to “[Proebsting’s
    Law](http://research.microsoft.com/~toddpro/papers/law.htm)” on this
    one: “Advances in compiler optimizations double computing power
    every 18 *years*.” This implies that programmer productivity is far
    more important than compiler optimization. Ruby is the latest great
    example of this phenomenon.

Mark Cooper – [Page XML](http://pagexml.net/) : An XML based domain
specific language for developing web applications

-   Page XML is a DSL for building web apps. Unfortunately, it isn’t
    released yet and it was hard to get a sense of what a solution built
    with Page XML would look like from the individual features described
    on slides. But I was certainly intrigued.
-   As a DSL, Page XML needs to encode domain-specific abstraction. One
    example they provided that I thought was cool was their URL
    handling. Good URL design is an important usability feature. URLs in
    PageXML are split into constant and variable parts, so in a URL like
    mysite.com/news/somechannel/4, the “somechannel” and the “4″ would
    be variable parts that would map into parameters that are passed to
    a page handler. Very cool.
-   There were a large number of what felt like small and simple yet
    eminently usable features. Too many for me to write down.
-   The only think I didn’t like is the use of XML. No only are domain
    specific concepts like URLs encoded in XML, but also relatively
    mundane things like loops and if statements. This gets ugly really
    quickly. I imagine, the creators of Page XML did this so they
    wouldn’t have to build their own parser, but it really hurts the
    usability of the language.
-   The last point really points to the need for a simple meta-language
    – a language for building languages. Lex/Yacc and their derivatives
    just don’t cut it. [Ruby is
    good](http://jayfields.blogspot.com/2006/05/executing-internal-dsl-in-multiple.html)
    for building [internal
    DSLs](http://martinfowler.com/articles/languageWorkbench.html#InternalDsl),
    but I’d like something faster and amenable to static typing as well
    as something more light weight for building [external
    DSLs](http://martinfowler.com/articles/languageWorkbench.html#ExternalDsl).

This post is long enough and I have “real” work to do (the downside of
leaving evangelism!
:smile: ).
I’ll post about the afternoon sessions later.

