(If you disregarded [my
advice](http://devhawk.net/2008/07/29/pushed-the-wrong-button/) and
read the previous version of this post, please note I rewrote this post
significantly so you’ll probably want to read it again.)

In the [last
post](http://devhawk.net/2008/07/30/monadic-philosophy-part-2-the-linq-monad/),
we looked at how LINQ is a monad and how IEnumerable is a
pseudo-functional construct. However, C\#’s intrinsic collection support
– aka foreach and yield return – really obscure how you might go about
building your own monad. So for this post, we’re going to take a look at
a parsing monad instead. Just as LINQ broke the big problem of queries
into a collection of standard query operators that were composable, we
want to take the same approach for parsers.

Note, I’m going to stick with C\# for now, and get into F\# monads in my
next post. Quick shout out to [Luke
Hoban](http://blogs.msdn.com/lukeh/archive/2007/08/19/monadic-parser-combinators-using-c-3-0.aspx)
and [Brian
McNamara](http://lorgonblog.spaces.live.com/blog/cns!701679AD17B6D310!124.entry),
from whom I ~~stole~~ obtained some of the code below.

Quick refresher: I’ve described a monad as a sequence of computations
with a context flow. Since C\# has explicit sequencing, we want to focus
on the context flow. For LINQ, the context was IEnumerable. For parsers,
we could define an similar IParser interface like this:

``` csharp
class Tuple<T1, T2>
{
    public readonly T1 Item1;
    public readonly T2 Item2;
    public Tuple(T1 val1, T2 val2) { Item1 = val1; Item2 = val2; }
}

class Result<T> : Tuple<T, string>
{
    public Result(T val, string rest) : base(val, rest) { }
}

interface IParser<T>
{
    Result<T> Parse(string input);
}
```

The Parse function takes a string to be parsed as input and returns the
parsing result which pairs the semantic value with with the remaining
string input to be parsed. I’ve built out a simple generic tuple class
because I know I’ll use it again later. I’ve [long
wished](http://devhawk.net/2006/08/21/language-features-i-wish-c-had-tuples/)
C\# would support intrinsic tuples like F\# does. For convenience, I’ve
also created a strongly typed subclass of Tuple to represent parse
results where the second item is a string, to save some typing. Since
Result is a class, it can be null which means the the Parser failed to
parse the input.

The problem with this approach is that unlike IEnumerable, the C\#
compiler has no built-in knowledge of this interface. That means there
are no easy-to-use keywords like foreach and yield return that can do
our heavy lifting of consuming or creating these IParser types for us.
Instead, we would have to explicitly declare classes to implement the
interface. As we add more and more parsers, that additional overhead of
creating types would become more and more unwieldy. Instead, let’s
redefine Parser as a delegate.

``` csharp
delegate Result<T> Parser<T>(string input);
```

The benefit of this approach is that you can create Parser delegates
inside functions, using C\#’s anonymous delegate syntax, without the
overhead of creating a type. For example, here’s a function to create a
simple primitive parser that strips the first character off the parse
string and returns it as the parse result:

``` csharp
static Parser<char> Item()
{
    return input =>
        {
            return string.IsNullOrEmpty(input)
                ? null
                : new Result<char>(input[0], input.Substring(1));
        };
}
```

That’s a lot more convenient than building a type just to implement a
single method.

Now that we have our Parser type, we need to think about how to compose
Parsers so that we can flow context between them. Much as LINQ provides
a collection of primitive query operators (Select, Where, OrderBy, etc),
you would expect a monadic parser library to provide a collection of
primitive parsers (Item, Satisfy, AnyOf, ItemEqual, etc), that you could
combine into higher-order parsers along with some language specific
lower-order parsers. Here’s an example from the the [PEG
grammar](http://pdos.csail.mit.edu/~baford/packrat/popl04/peg-popl04.pdf):

```
Primary \<- Identifier !LEFTARROW / OPEN Expression CLOSE / Literal / Class / DOT
```

The Primary parser depends on some high-order language specific parsers
(Identifier, Expression, Literal and Class) as well as some language
specific low-order tokenizer style parsers (LEFTARROW, OPEN, CLOSE and
DOT) and finally some language-independent primitive parsers (the
failure predicate ! and the prioritized choice operator /).

So how should we compose these various Parsers? LINQ query operators
were fairly easy to compose because they all take in and return the same
type (IEnumerable) so you can simply chain them together. Parsers are a
little trickier because the inputs and outputs are asymmetric – i.e.
they take a string, but return a Result – so simple chaining won’t work.

We could combine the parsers sequentially, taking the parse string
returned from first parser and feed it into the second. Then we could
combine the two parse values in a Tuple to return them (you see why I
created a generic Tuple class?) resulting in a function that looks like
this:

``` csharp
static Parser<Tuple<T1,T2>> Join<T1,T2>(this Parser<T1> p1, Parser<T2> p2)  
{  
    return input =>  
        {  
            var ret1 = p1(input);  
            if (ret1 == null)  
                return null;  

            var ret2 = p2(ret1.Item2);  
            if (ret2 == null)  
                return null;  

            return new Result<Tuple<T1,T2>>(  
                new Tuple<T1, T2>(ret1.Item1, ret2.Item1),  
                ret2.Item2);  
        };  
}
```

Note this is an extension method so we can call Parser1.Join(Parser2)
rather than the less fluent Join(Parser1, Parser2). I was going to call
this function Combine, but there’s already a static Combine method on
the Delegate type that caused a conflict, so I used Join instead.

The Join approach works, but it’s a bit unwieldy to return the parsing
values in a tuple. Every set of joined parsers will result in another
level of tuple nesting in the Result that’s returned. That gets pretty
ugly pretty fast. For example, lets say we want to create a parser that
combines two instances of Item. It looks like this:

``` csharp
static Parser<Tuple<char, char>> TwoItems()
{
    return Item().Plus(Item());
}
```

That’s not so bad. But now look what happens if we combine the TwoItems
parser with another instance of Item:

``` csharp
static Parser<Tuple<Tuple<char, char>, char>> ThreeItems()
{
    return TwoItems().Plus(Item());
}
```

The result is a nested tuple. Yuck. We need a better way. Enter the
monadic bind. The code looks like this:

``` csharp
static Parser<U> Bind<T, U>(this Parser<T> p1, Func<T, Parser<U>> fun)
{
    return input =>
        {
            var ret1 = p1(input);
            if (ret1 == null)
                return null;

            var p2 = fun(ret1.Item1);
            if (p2 == null)
                return null;

            return p2(ret1.Item2);
        };
}
```

Like the Join function above, Bind starts by calling the first parser
function, returning null if the parse fails. However, instead of calling
to the second parser directly, it calls to the provided function that
generates the second parser. This function acts as a
[closure](http://en.wikipedia.org/wiki/Closure_%28computer_science%29),
packaging up the parse value from the first parser for later processing.
Finally, Bind calls to the generated second parser, feeding in the
remaining text from the first parser result.

This approach allows you to inject code that combines the parsing values
however we like rather than always pairing them up in a tuple. Here’s a
version of TwoItems that binds a call to Item with a custom function
that calls Item again and returns the two characters as a string rather
than a tuple:

``` csharp
static Parser<string> BetterTwoItems()
{
    return Item().Bind<char, string>(
        val =>  
        {
            return input =>
            {
                var result = Item()(input);
                return new Result<string>(
                    string.Format("{0}{1}", val, result.Item1),
                    result.Item2);
            };
        });
}
```

It’s kinda strange to see a lambda expression that returns a lambda
expression in C\#, but that’s what this code does. The first lambda
expression (val =\>) defines the custom function, the second lambda
expression (input =\>) defines the Parser delegate. Val is the parse
value from calling Item() the first time – ret1.Item1 in the Bind
function above. Input is the remainder of the parse string – ret1.Item2
from the Bind function.

Unfortunately, while this approach avoids nested tuples for parse
values, we’ve had to give up quite a bit of simplicity. The original
TwoItems method was a single line of code. BetterTwoItems is
significantly more complex. Furthermore, the double lambda expression
syntax confuses C\#’s type inference, forcing you to explicitly specify
the generic types on the Bind method. Luckily there’s a better way to
write this. However, let’s start by rewriting the function like this:

``` csharp
static Parser<string> SlightlyBetterTwoItems()
{
    return Item().Bind(
        v1 => Item().Bind<char, string>(
            v2 =>
            {
                return input =>
                {
                    return new Result<string>(
                        string.Format("{0}{1}", v1, v2),
                        input);
                };
            }));
}
```

SlightlyBetterTwoItems pulls the second call to Item out into a second
Bind operation. The point of this refactoring is to make it clear that
we can view this function as a call to Item, bound to a second call to
Item, bound to custom function to return a Parser that returns the two
parse value chars formatted as a string. You’ll notice that by
eliminating the the double lambda expression on the first call to Bind,
we were able to drop out the explicit generic type specification.

This version is a little clearer, but we can make it clearer yet. It
turns out that wrapping up a parse value in a Parser that
unconditionally returns the parse value and the parse text input in a
Result is a very common operation. So let’s create a primitive function
Result to wrap up a parse value in a Parser delegate and build our final
version of TwoItems that uses it.

``` csharp
static Parser<T> Result<T>(T val)  
{  
    return input => new Result<T>(val, input);  
}  

static Parser<string> BestTwoItems()
{
    return Item().Bind(
        v1 => Item().Bind(
        v2 => Result(string.Format("{0}{1}", v1, v2))));
}
```

Now it’s very clear that we have a call to Item, bound to a second call
to item, which is in turn bound to a call to Result. We’ve now dropped
all use of double lambdas, which means C\# can infer the types to each
of our Bind calls implicitly. But more importantly, do you see *any*
reference to Parser\<T\> delegates or input strings in this code? Only
in the return type specification. Just as LINQ hides the specifics of
flowing IEnumerable or enumerator objects between standard query
operators, the parser monad hides the specifics of flowing Parser
delegates or input strings between parse operations.

The Parser delegate plus the Bind and Result methods are all there are
to our basic parser monad. Seriously, all that worry that monad “is a
bit obscure and sounds a little daunting” and it’s really just two
functions and a delegate type.

While this code is fairly straight forward, the whole nested lambdas
expressions is fairly atypical syntax that some developers might have a
hard time understanding. Unfortunately, if we’re writing our parsers in
C\#, we’re kinda stuck with this syntax. However, F\# has a special
syntax that lets you write what looks like normal sequential code, while
still flowing the Parser context between parse operations exactly like
the code above does. We’ll take a look at that syntax in the next post.
