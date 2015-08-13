Several languages, such as
[Python](http://www.python.org/doc/current/tut/node7.html#SECTION007300000000000000000),
have the concept of a
[Tuple](http://en.wikipedia.org/wiki/Tuple#Usage_in_computer_science)
built into the lanugage. One of things it’s used for in Python is
multiple return values. So you can call “return x,y” to return two
values. Of course, C\# can only return one. If you need to return more
values, you have to define out parameters.

LINQ / C\# 3.0 / VB 9 support the idea of [anonymous
types](http://msdn.microsoft.com/library/en-us/dnvs05/html/vb9overview.asp?frame=true#vb9overview_topic5),
which is similar to a tuple. The big difference is that, because they’re
anonymous, they can’t leave the scope they’re defined in. In other
words, they’re great within a function, but if you want to pass them out
of your function type-safely, you have to define a non-anonymous type
for them.

Interestingly enough,
[F\#](http://research.microsoft.com/fsharp/fsharp.aspx) supports
[tuples](http://research.microsoft.com/fsharp/manual/quicktour.aspx#QuickTourTuples),
though it a bit of a hack. Since the CLR doesn’t support tuples, F\#
basically [defines different Tuple
classes](http://research.microsoft.com/fsharp/manual/export-interop.aspx#Tuples)
for up to seven tuple parameters (i.e. Tuple\<t1,t2,t3,t4,t5,t6,t7\>),
For .NET 1.x, it’s even worse – they have to define different type names
(Tuple2, Tuple3, etc). Ugh.

**Update**: [Robert Pickering](http://strangelights.com/blog/) pointed
out that F\#’s tuple implementation is entirely transparent inside of
F\#. He’s right – I was writing from the perspective of a C\# developer
using F\#’s implementation of tuples. Maybe I need to be looking closer
at F\#?
