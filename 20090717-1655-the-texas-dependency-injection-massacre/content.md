Since I think I’ve beaten the “I think what most people call
architecture is really engineering” meme to death, let’s move on to
something else. Eric Smith of [The Limber
Lambda](http://thelimberlambda.com/) blog (love that name!)
[commented](http://www.lyricsdepot.com/david-lee-roth/experience.html):

> I’m a little concerned with the intimation that use of interfaces,
> respect for visibility of type members and use of dependency injection
> equates to “over-engineering”. As with everything, it depends on what
> you’re trying to achieve, and generalisations in this regard,
> especially when junior people who may not understand what’s at stake
> are reading, can be damaging.
>
> I find it an uphill battle to engender a constructive mindset in
> developers who have established bad habits and whose pride lies in the
> way of addressing those habits.
>
> Anti-”process” talk by Joel Spolsky and the “pragmatism brigade” makes
> it harder. A while ago I had a new developer refuse to write unit
> tests despite it being an established practice in our team because “…
> Jeff and Joel said they were bad in the StackOverflow podcast …”.
> Yikes.

Let me be very clear. I *never* suggested that techniques such as
interfaces and dependency injection are over engineering. These are good
engineering practices, and every software engineer should understand
them. And if Joel and Jeff really said unit tests were bad, well that
would be about the dumbest thing I’d have every heard either of those
two say. Yikes indeed.

But as Eric writes, “it depends on what you’re trying to achieve”.
Engineering techniques like dependency injection, polymorphism,
encapsulation are tools, and there are many good reasons to use them.
But like many tools, they can also be used [for
evil](http://en.wikipedia.org/wiki/The_Texas_Chain_Saw_Massacre).

In other words, the tools themselves are always innocent – you have to
look at how and why they are being used by the people who are using
them.

Let’s take [dependency
injection](http://en.wikipedia.org/wiki/Dependency_injection) as an
example. Externalizing a software component’s dependencies enables you
to test it isolation from the rest of your system. For example, it’s
very common to inject a dependency that writes to a durable store, such
as a logger or a data access component. In your unit tests, you inject a
mock durable store instead of the real dependency. The mock will be
faster (no need to actually write to disk), cleaner (no need to clean up
the files on disk between test runs) and will behave exactly to the spec
(bugs in the dependency component won’t create false failures in the
component you’re testing). Those are all good engineering arguments for
using DI, full stop.

Furthermore, DI helps insulate a software component against changes in
its dependencies. I may not be able to predict specific changes with any
precision, but it’s probably safe to assume that there a given
component’s dependencies aren’t going to remain completely static. DI
doesn’t insulate you 100% from possible changes – in particular, it
doesn’t help if the dependency’s interface changes.

But I would argue that you can go too far with DI. Let’s go back to the
logger component example I described above. Maybe, the over engineer
thinks, we’ll want the logger to write to the database instead of the
file system in the future. Or maybe we’ll want the logger to write to a
different database. And if it’s supporting a different database, then
maybe the logger should support different back end databases. Or maybe,
Or Maybe, OR MAYBE..

We’ve gone from a simple component that logs to the file system and
turned it into a engineering monstrosity with multiple points of
variability and extensibility. When you start saying “maybe we should”
or “this could change in the future” or stuff like that, that’s when you
start over engineering something.

Unfortunately, there’s only one way to know when you’ve started
over-engineering: Experience. Sorry Eric, I can’t help you with your
junior engineers. As David Lee Roth [once
sang](http://www.lyricsdepot.com/david-lee-roth/experience.html),
Experience is the “worst teacher goin’”. But if there’s a better way to
learn, I don’t know it. In the meantime, I suggest code reviews and pair
programming.
