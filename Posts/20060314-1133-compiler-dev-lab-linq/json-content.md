Even though I haven’t finished my ETech postings, I’m already onto
another event. This week, thanks to an invite from [Michael
Lehman](http://blogs.msdn.com/mglehman/), I’m sitting in on a Compiler
Lab discussing implementing other languages for CLR. The first day was
about [LINQ](http://msdn.microsoft.com/netframework/future/linq/). Much
of the info is rehashed from PDC or the docs up on MSDN. However, I have
learned a few new things.

-   One of the standard features of LINQ is Extension Methods. That
    enables you to declare a static method like “static void Foo(this
    string source)” and then use it like “stringvar.Foo()”. Apparently,
    they are considering adding other types of extension members
    including properties and fields. The idea of extension fields is
    somewhat scary but powerful.
-   LINQ uses something Anders called deferred query execution. The
    query isn’t executed until the values are asked for (typically by
    calling foreach on the query). That means you can compose queries to
    your hearts content with no perf impact until you actually invoke
    the query.
-   [Query
    Comprehensions](http://msdn.microsoft.com/vbasic/Future/default.aspx?pull=/library/en-us/dnvs05/html/vb9overview.asp#vb9overview_topic7)
    in C\# and VB is a pattern implementation in a similar vein to
    foreach. Foreach is relatively simple shorthand for iterating
    through an collection by calling IEnumerator.MoveNext until it
    returns false. While LINQ enables arbitrary composition of queries,
    there is obvious gravitational pull towards the SELECT / FROM /
    WHERE / ORDER BY / GROUP BY approach favored by SQL. So if you build
    your own query operator, you can include it in a LINQ query, but C\#
    and VB won’t be able to include it in the Query Comprehension
    syntax. Probably not a big deal, given the breadth of standard query
    operators as well as the deferred query execution, but it’s good to
    understand how the abstraction works.
-   I want to know more about how
    [DLinq](http://download.microsoft.com/download/c/f/b/cfbbc093-f3b3-4fdb-a170-604db2e29e99/DLinq%20Overview.doc)
    is implemented. I’ve been refining my thinking about data since
    [working with Ning’s content
    store](http://devhawk.net/2006/02/27/Experimenting+With+Ning.aspx)
    and I’m convinced of the need for a simplified datastore. SQL is
    designed for significantly complex database schemas, which means a
    significantly complex development environment.
-   I’m looking much more closely at VB, given the new features in [VB
    9.0](http://msdn.microsoft.com/vbasic/Future/default.aspx?pull=/library/en-us/dnvs05/html/vb9overview.asp).
    Not only the LINQ stuff from C\# like type inference, extension
    methods and anonymous types but also VB specific stuff like [XML
    Literals](http://msdn.microsoft.com/vbasic/Future/default.aspx?pull=/library/en-us/dnvs05/html/vb9overview.asp#vb9overview_topic6)
    and [Duck
    Typing](http://msdn.microsoft.com/vbasic/Future/default.aspx?pull=/library/en-us/dnvs05/html/vb9overview.asp#vb9overview_topic12).
    Combined with VB’s existing support for late binding, there are
    compelling features to make VB attractive over C\#.
-   I’ve been hanging out with [Brian
    Beckman](http://weblogs.asp.net/brianbec). He’s a hoot.
-   I think I need to take a deeper look at
    [F\#](http://research.microsoft.com/fsharp/).

