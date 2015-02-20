I said this was going to be a slow week, so I dug out something I wrote
while I was on paternity leave. I was saving it for a rainy day, which
is pretty silly since if it was raining I wouldn’t mind staying indoors
and writing long posts about levels of abstraction, portability and
productivity.

------------------------------------------------------------------------

My [father](http://halpierson.blogspot.com/) and I have a running
~~argument~~ debate about the value of platform independence in the
system design and development process. As you might guess, as an
employee of a platform company I stand firmly on the “platform
neutrality is irrelevant” side of the debate. Having been around Bell
Labs during the development of Unix and C as well as having done a stint
for an ISV, my father is firmly on the “platform neutrality is
important”. Typically, these discussions turn into childish argument
where my father continuously says “what if” and I continuously say “that
never happens” and neither of us actually makes any ground on convincing
the other of the error of their ways.

So herein is yet another salvo in the discussion, for your
entertainment. It’s long and drawn out, but since it’s written it means
he can’t interrupt me to say “what if”
:smile:

As mentioned above, my father was at Bell Labs in the early 70′s when
Unix and C were developed. I guess it’s no surprise that he harps so
much on portability – going back and reading some of the papers that
came out of Bell Labs at the time, it’s obvious that their culture
heavily valued portability. On Dennis Ritchie’s
[site](http://cm.bell-labs.com/cm/cs/who/dmr) (the ‘R’ in
[‘K&R’](http://www.amazon.com/o/ASIN/0131103628)) there is a wide
variety of relevant material including [The Evolution of the Unix
Time-sharing System](http://cm.bell-labs.com/cm/cs/who/dmr/hist.html),
[The Development of the C
Language](http://cm.bell-labs.com/cm/cs/who/dmr/chist.html), and
[Portability of C Programs and the UNIX
System](http://cm.bell-labs.com/cm/cs/who/dmr/portpap.html). Given the
drastic evolution in computing at the time, it’s not surprising that
both Unix and C had portability as primary goals. While I jokingly refer
to C’s portability as “write once, compile everywhere”, the reality is
that the portability of C and Unix was a key to Unix’s success.
According to the portability article, 95% of the C portion of the Unix
kernel required no changes when they ported Unix from PDP-11 to the
Interdata 8/32. Only the core kernel, which was written in assembly, had
to be completely rewritten. Even a significant portion of the device
drivers ported over to the new machine.

However, C isn’t just portable. It also provides significant abstraction
above assembly code. Anyone who has done any assembly work knows how low
level it is and how significant the abstraction jump up to C really is.
For example, the simple C statement of “a = b + c” requires three lines
of assembly code. Here’s how Ritchie describes C’s level of abstraction:

> BCPL, B, and C all fit firmly in the traditional procedural family
> typified by Fortran and Algol 60. They are particularly oriented
> towards system programming, are small and compactly described, and are
> amenable to translation by simple compilers. They are \`close to the
> machine’ in that the abstractions they introduce are readily grounded
> in the concrete data types and operations supplied by conventional
> computers, and they rely on library routines for input-output and
> other interactions with an operating system. With less success, they
> also use library procedures to specify interesting control constructs
> such as coroutines and procedure closures. At the same time, *their
> abstractions lie at a sufficiently high level that, with care,
> portability between machines can be achieved*.  (emphasis added) [[The
> Development of the C
> Language](http://cm.bell-labs.com/cm/cs/who/dmr/chist.html) – [Dennis
> M. Ritchie](http://cm.bell-labs.com/cm/cs/who/dmr/index.html)]

That last sentence is key. C’s portability derives from raising the
level of abstraction. But raising the level of abstraction also had an
important productivity impact. Even if you’re are only building for a
single platform and you don’t care about portability, most people would
rather code in C rather than assembly because the raised level of
abstraction makes the developer much more productive. However, raising
the level of abstraction comes with a performance cost. C is pretty
‘close to the machine’ as Richie put it, but there is still a small
penalty. If you’re writing ultra-perf sensitive code, sometimes writing
in assembly is necessary. There’s a reason why [books on the
topic](http://www.amazon.com/o/ASIN/193176932X) keep getting written and
the Visual C++ compiler [supports inline assembly
code](http://msdn.microsoft.com/library/en-us/vclang/html/_core_Assembler_.28.Inline.29_.Topics.asp).

So here’s my point: Raising the level of abstraction is powerful because
it can enable both portability and productivity. However, it also
typically carries a performance penalty. As long as the portability and
productivity benefits outweigh the performance penalty, everything’s
cool. The problem is that productivity is typically WAY *WAY***WAY**
more important than portability. So abstractions that enable portability
without significant positive productivity benefits will not offset the
performance penalty associated with raising the level of abstraction.

The canonical example of “portability without productivity” abstraction
that leaps to mind today is the Java platform. Certainly, Java has been
pretty successful, though I would argue that its success has been
extremely localized. Java on the client has never had mass adoption (the
only non-toy Java client app I can think of off the top of my head is
Eclipse) and the many of the parts of Java on the server bear a striking
resemblance to Microsoft technology. (ODBC vs. JDBC, ASP vs. JSP,
Session beans vs. MTS, etc.) Either way, Java adoption has fallen below
.NET adoption even though Java had the promise of platform neutrality as
well as several years head start. [1]

I would argue that one of the main reasons that Java has had only
limited success is that while Java is portable, it doesn’t provide much
in the way of productivity improvements. Sure, garbage collection is
much easier to program to than C++’s explicit memory management model.
But Java’s primary competitor (at least in hindsight) was Visual Basic,
not C++. While Java focused on portability, VB focused on productivity
and in the end it was productivity that drove VB’s massive market share.
If you were a Java developer, you had worse tools than VB and worse
performance than C++ and the only advantage you had was portability
which turned out to be more problematic and less important than
advertised. Server apps are rarely re-platformed and Java’s UI
implementation caused as many problems as it solved.

From a geek aesthetic perspective, you would have guessed that Java with
its clean language and programming model would crush VB and COM in the
marketplace, but it just didn’t happen. VB, with its [software
factory-esque
approach](http://devhawk.net/2004/08/29/The+Most+Popular+Modeling+Environment+Ever+So+Far.aspx),
was easier to use and thus attracted more developers who got more apps
written. I’d guess that ease of use / developer productivity is the key
indicator of success for programming environments. If Java had focused
on productivity and portability, I might be working for Sun today.

[1] Obviously, there are varying opinions on this point. [SteveB said @
TechEd](http://www.microsoft.com/presspass/exec/steve/2005/06-06TechEd.mspx)
that .NET is the weapon of choice (my words not his) for 43% of all
developers. Java was second with 35% and non .NET Windows development
was third (no percentage given).  Even if you want to nit-pick on the
numbers, you’d be hard pressed to argue that Java hasn’t been losing
ground dramatically to .NET in the past three years since VS 2002 RTMed.

