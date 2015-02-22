(Since I accidentally [published part
one](http://devhawk.net/2008/07/29/pushed-the-wrong-button/) of this
series a few minutes ago, I figured I might as well start publishing the
series.)

If you start learning functional programming, eventually you’ll come
across the idea of a
[monad](http://en.wikipedia.org/wiki/Monad_%28functional_programming%29).
Coming from the object/imperative world of languages like C\#, I’ve had
a hard time wrapping my head around this concept. There’s no shortage of
[monad
tutorials](http://en.wikipedia.org/wiki/Monad_%28functional_programming%29#External_links)
out there, but most use [Haskell’s
IO](http://www.prairienet.org/~dsb/monads.htm) as the prototypical
example of a monad. Given that I don’t know Haskell very well, I found
it hard to separate the Haskell stuff from monad stuff. So I set monads
on the back burner and decided not to worry about them.

However, all that changed when Stephan Tolksdorf alerted me to his very
cool monadic parser combinator library
[FParsec](http://www.quanttec.com/fparsec). I found the FParsec parsers
much easier to read [my F\# parser
efforts](http://devhawk.net/2007/12/10/practical-parsing-in-f/), so
I became very interested in monadic parser combinators. As you might
guess, a “monadic parser combinator library” makes heavy use of monads.
Time to switch burners.

The problem with learning monads with FParsec is that it’s really
designed for production use. I needed to break monads down to first
principles, so I rolled my own monadic parser library. Make no mistake,
if I were looking to build a production parser in F\# right now, I’d use
with FParsec. My monadic parser library might “get there” eventually,
but right now it’s a toy.

Over a series of posts, I’m going to describe what I know about monads.
I didn’t set out to write a tutorial on monads – as I said, there are
plenty of them out there. However, I found most of the the many monad
tutorials I read lacking because the did a good job explaining the
“how”, but not such a good job on the “why”. Coming from an imperative
world, I wanted to understand the philosophy better. That being said,
there’s a lot of tutorial in and around the philosophy. Hopefully,
you’ll find both useful.
