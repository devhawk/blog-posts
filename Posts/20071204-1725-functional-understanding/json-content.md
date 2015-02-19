I was showing some of my cool (well, I think it’s cool) F\# parsing code
to some folks @ DevTeach. I realized very quickly that a) most
mainstream developers are fairly unaware of functional programming and
b) I suck at explaining why functional programming matters. So I decided
to take another stab at it. I probably should have posted this before my
[recent series on
F\#](http://devhawk.net/2007/11/28/F+As+A+Second+NET+Language.aspx), but
better late than never I suppose.

Right off the bat, the term “functional” is confusing. When you say
“function” to a mainstream developer, they hear
“[subroutine](http://en.wikipedia.org/wiki/Function_%28computer_science%29)“.
But when you say “function” to a mathematician, they hear
“[calculation](http://en.wikipedia.org/wiki/Function_%28math%29)“.
Functions in functional programming (aka FP) are closer to the
mathematic concept. If you think about math functions, they’re very
different than subroutines. In particular, math functions have no
intrinsic mutable data. If you have a math function like f(x) = x^3^,
f(7) always equals 343, no matter how many times you call it. This is
very different then a function like String.Length() where the value
returned depends on the value of the string.

Another interesting aspect of math-style functions is that they have no
side-effects. When you call StringBuilder.Append(), you’re changing the
internal state of the StringBuilder object. But FP functions don’t work
like that. Providing the same input always provides the same output
(i.e. the same independent variable always yields the same dependent
value).

If you’re a .NET developer, this may sound strange, but you’re probably
very familiar with the [String
class](http://msdn2.microsoft.com/library/system.string.aspx) which
works exactly the same way.

> A **String** object is a sequential collection of
> [System.Char](http://msdn2.microsoft.com/en-us/library/k493b04s.aspx)
> objects that represent a string. The value of the **String** object is
> the content of the sequential collection, and that value is immutable.
>
> A **String** object is called immutable (read-only) because its value
> cannot be modified once it has been created. Methods that appear to
> modify a **String** object actually return a new **String** object
> that contains the modification.

In other words, all variables in FP are a lot like .NET Strings. In
fact, in many FP languages, variables are actually called “values”
because they don’t, in fact, vary.

It turns out that this approach to programming has significant upside
for unit testing and concurrency. Unit tests typically spend a
significant effort getting the objects they’re testing into the right
state to invoke the function under test. In FP, the result of a function
is purely dependent on the values passed into it, which makes unit
testing very straight forward. For concurrency, since functions don’t
share mutable state, there’s no need to do complicated locking across
multiple processors.

But if values don’t vary, how to we managed application state? FP apps
typically maintain their state on the stack. For example, my F\# parser
starts with a string input and return an abstract syntax tree. All the
data is passed between functions on the stack. However, for most
user-oriented non-console applications, keeping all state on the stack
isn’t realistic.  As Simon Peyton Jones [points
out](http://research.microsoft.com/Users/simonpj/papers/marktoberdorf/),
“The ultimate purpose of running a program is invariably to cause some
side effect: a changed file, some new pixels on the screen, a message
sent, or whatever.” So all FP languages provide some mechanism for
purposefully implementing side effects, some (like Haskell) stricter in
their syntax than others.

One of the nice things about F\#’s [multi-paradigm
nature](http://research.microsoft.com/fsharp/faq.aspx#WhatSortOfLanguage)
is that side effects is a breeze. Of course, that’s both a blessing and
a curse, since the much of the aforementioned upside comes from
purposefully building side-effect free functions. But the more I work
with F\#, the more I appreciate the ability to do both functional as
well as imperative object-oriented operations in the same language. For
example, my parsing code so far is purely functional – it takes in a
string to be parsed and returns an AST. But the logical next step would
be to generate output based on that AST. Since F\# supports
non-functional code – not to mention the rich Base Class Library –
generating output should be straightforward.
