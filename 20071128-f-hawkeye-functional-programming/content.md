*(Harry is @ DevTeach in Vancounver with his family this week. He was
hoping to still do Morning Coffee posts, but that’s turned out to be
infeasible. So instead, you get a series of pre-written posts about
F\#.)*

If you’re coming from the imperative object-oriented world of C\#, Java
or VB, functional programming just seems odd at first. But you might as
well start getting used to it – functional aspects have been leaking
into C\# and VB with every version. The way LINQ chains together
iterators (Where, Select, Order By, etc) is heavily influenced by FP
(aka functional programming).

It takes a while to get the hang of FP, but I’ve found that some
problems that are hard to solve in C\# are easy in F\#. For example, in
my parsing code, I have a bunch of boilerplate caching and tracing code
that I need to execute in each parsing function. How do I do that in C\#
without having to cut and paste the boilerplate code over and over
again?

In F\#, I wrote a function called CacheAndTrace that takes a parsing
function as a parameter and returns a new function that adds the caching
and tracing code. Since the new function has the same signature as the
original parsing function, the caller can’t tell the difference but it
saves me having to write the boilerplate code over and over again.

Actually, you can do this type of functional composition with C\#. In
fact, I first wrote my version of the CacheAndTrace function in C\#. But
F\#’s syntax is much better for functional programming – probably since
it was designed for FP, rather than having FP tacked on later. 

My father once compared functional programming to Aspect Oriented
Programming. AOP is about factoring apart cross cutting concerns, which
tends to be hard to do in a straight-up OO language. But in an FP
language, AOP-esque separation of concern is fairly straightforward.

F\# isn’t a pure functional language – it’s actually a multi-paradigm
language, so you can do imperative and OO stuff if you want to. For
example, variables are typically immutable in functional programming. So
how do you do something like cache the most recent result from a given
function – which is what my CacheAndTrace function does? Frankly, I
don’t know. But in F\#, I can easily mark the cache value as mutable so
I can update it on every call. Sort of the best of both worlds, though
mixing and matching can get a little tricky.

F\#’s OO support is really useful when you interop with other .NET
languages, since they’re mostly OO themselves. For example, I’m using
NUnit test cases for all my parsing code. My parsing code is F\#, so I
wanted to write my tests in F\# as well. NUnit requires test methods to
be grouped into classes known as test fixtures. Frankly, if I were
designing a native F\# xUnit library, I wouldn’t require all the test
methods to be grouped into a class. But it’s easier to just define an
test fixture object in F\# rather than build my own xUnit Framework for
F\#
