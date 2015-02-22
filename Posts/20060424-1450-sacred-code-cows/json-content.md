I
[wrote](http://devhawk.net/2006/04/14/talking-dynamic-lanugages-with-neal-ford/)
of my meeting w/ [Neal Ford](http://memeagora.blogspot.com/) a few weeks
ago. Today he has a long post on what he calls [Eating Sacred
Hamburger](http://memeagora.blogspot.com/2006/04/eating-sacred-hamburger.html) that
goes into more detail of some of the things we discussed:

> Software development cults tend to create sacred cows: habits and
> idioms that might have meant something at one time but only remain as
> baggage now. I tend to like to kill sacred cows and grill them up,
> with some nice lettuce, tomato, and a sesame seed bun. On my current
> project, we’re actively killing some sacred cows.

The main sacred cow he’s talking about slaughtering is Hungarian
Notation for interfaces. You know, interfaces like
[IDbConnection](http://msdn2.microsoft.com/en-us/library/system.data.idbconnection.aspx) and
[IHttpHandler](http://msdn2.microsoft.com/en-us/library/system.web.ihttphandler.aspx).

> Thankfully, Hungarian Notation has mostly been banished, except for
> one lingering, annoying location in the .NET world: the stupid “I”
> preface on interfaces. In fact, if you understand how interfaces
> should be used, this is exactly the opposite of what you want. In our
> application, every important semantic type is represented by an
> interface. Using interfaces like this makes it easier to do a whole
> host of things, including mocking out complex dependencies for
> testing. Why would you destroy the most important names in your
> application with Hungarian Notation telling you it’s an interface?
> Ironically enough, that your semantic type is an interface is an
> implementation detail — exactly the kind of detail you want to keep
> out of interfaces. I suspect this nasty habit developed in the .NET
> world because interfaces first came to the Microsoft world as COM (or,
> back when it started, OLE). It’s a stupid cow now, and should be
> slaughtered.

I agree 100% with this, though I’m guessing the next time I write an
interface, I’ll have to go back and delete the stupid “I” because I’m so
used to writing it.

The other convention he’s looking to do away with camel and pascal
casing, which is [convention in
.NET](http://msdn.microsoft.com/library/en-us/cpgenref/html/cpconcapitalizationstyles.asp).
He’s a bigger fan of using underscores between words (which is big in
the Ruby world). So far, he’s only using underscores in his test methods
since they tend to be longer, such as
“Verify\_end\_to\_end\_security\_connectivity\_to\_infrastructure”.
Frankly, I’m ambivalent on this one. I’m pretty good at reading camel
and pascal casing and I would hope never to see a production method name
like that.

So that’s two down, but there’s still an entire herd of sacred cows out
there. What other ones do we need to get rid of?
