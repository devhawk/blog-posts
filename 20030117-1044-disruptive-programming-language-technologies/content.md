At one of my first programming jobs out of college, I was working at
company that shall remain nameless. I was part of a small 4 person dev
staff building a client/server app that ran with a variety of back end
databases – abstraction of said databases provided primarily by ODBC.
However, ODBC was a [leaky
abstraction](http://www.joelonsoftware.com/articles/LeakyAbstractions.html),
and different DB vendors had varying levels of support. In particular,
at the time Informix supported multiple left outer joins in one query
and Oracle did not. I know this because one of my coworkers (who was
later fired for drug use and attempted workers comp fraud) wrote some of
the worst code I had ever seen. He duplicated large portions of the code
– once using multiple left outer joins and once using multiple queries .
If the multiple join query failed, he used the multiple query version.
Besides the obvious questions of code modularity, readability,
reusability, etc. one massive question stuck out to me like a sore
thumb: “Since it always works, why not just use the multi-query version
all the time?”. The answer: “Performance”. He wanted to squeeze every
ounce of performance out of the app, so he wanted to avoid multiple
database roundtrips. The fact that he made the code essentially
unworkable in the process was of little concern. This was the biggest
example of the “only performance matters” mentality, but his code was
littered with such “optimizations”. I inherited the code when he got the
boot, and we eventually scrapped the app completely because it was so
bad.

At the time, I thought that optimizing for performance above all else
was a bad policy. Things like development time and cost count too. (Now,
I assert they count more.) But I never really had a name for it until
someone pointed out “Proebstring’s Law” to me:

> “Moore’s Law” asserts that advances in hardware double computing power
> every 18 months. I (immodestly) assert “Proebsting’s Law”, which says
> that advances in compiler optimizations double computing power every
> 18 *years*. [[Todd Proebsting’s Home
> Page](http://research.microsoft.com/~toddpro/)]

Todd is a Senior Researcher at [Microsoft
Research](http://research.microsoft.com). His law basically means that
in the face of Moore’s Law, optimizing compilers (and by extension,
applications) is mostly irrelevant and that compiler (and application)
developer’s time would be better spent focused on other types of
optimizations – primarily developer productivity. In a talk that he
calls Disruptive Programming Language Technologies,
([ppt](http://research.microsoft.com/~toddpro/papers/disruptive.ppt) and
[video](http://stanford-online.stanford.edu/courses/ee380/020424-ee380-100.asx))
he points out that recently adopted languages – such as Visual Basic,
Java and Perl – were all very slow compared to the dominant language at
the time: C/C++. They were also devoid of “academic” innovation. Yet
each of these languages provided solutions to real world problems that
C/C++ couldn’t match. And today, they are in wide adoption with VB
easily outpacing C++ in terms of number of developers. Todd goes on to
list a series of disruptive technologies that he predicts will be
incorporated into future languages. These include: Application Crash
Analysis, Checkpoints/Undo, Database Access, Parsing, XML Manipulation,
Constraint Solving and Distributed Programming.

There are a few conclusions I draw from this:

-   If there is going to be future language innovation that will make my
    life easier as a develop, I’m going to want to use a platform that
    is designed to support multiple languages. Obviously, I’m thinking
    CLR here – JVM’s “me too” approach to multiple language support just
    doesn’t cut it.

-   These language innovations will probably *not* include “typical”
    programming language elements such as if/then and for/next loops. We
    have great languages such as C\#, Visual Basic and Java that already
    include all that stuff. With CLR’s true language interoperability,
    there’s no point in duplicating those elements in each new language.
    I can build a disruptive technology into a language that exposes
    classes to the CLR. Then I can use C\#, VB or even J\# to provide
    the glue logic. This makes the language design and compiler building
    much easier, meaning the “barrier to entry” for innovative language
    design has dropped significantly.

-   Code generation will be replaced with disruptive programming
    languages. There used to be code generation wizards in VC++ for
    building event handlers. In VB, you didn’t need them. Technologies
    where code generation is used extensively (such as database access)
    are ripe for a disruptive programming language.

-   I want to learn more about language design and compiler development.
    [These](http://www.microsoft.com/mspress/books/5771.asp)[books](http://search.barnesandnoble.com/textbooks/booksearch/isbnInquiry.asp?isbn=0130622966)
    are a good start, plus there’s the [Coco/R
    toolkit](http://www.ssw.uni-linz.ac.at/Research/Projects/Coco/CSharp/)
    for building parsers in C\#.

-   Performance is almost irrelevant. I mean, you can’t ignore it
    completely. However, in the face of other factors – such as time and
    money – performance is low on the priority list. I’d rather optimize
    for developer productivity than performance. After all, I can get
    more hardware cheaper and easier than I can get more developers.


