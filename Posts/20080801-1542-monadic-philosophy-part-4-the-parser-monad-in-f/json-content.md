In the [last
post](http://devhawk.net/2008/07/31/monadic-philosophy-part-3-the-parser-monad-in-c/),
I built out a basic parser monad in C\#. While the approach worked OK,
the syntax is still a little foreign to your typical .NET programmer,
what with it’s nested anonymous functions and all. Now, I’m going to
translate that code to F\# and take a look at the special monadic syntax
F\# supports that makes using monads as easy any sequential code.

First, let’s translate our Parser delegate, Bind, Result and Item
functions over to F\#. Just for kicks, let’s also port over the final
version of TwoItems too.

``` fsharp
type Parser<'input, 'result> = 'input-> ('result * 'input) option

// the Bind function, defined as a custom operator
let (>>=) p f : Parser<'i,'r> =  
    fun input ->
        match p input with
        | Some(value, input) -> (f value) input
        | None -> None

let Result v : Parser<'i,'r> = fun input -> Some(v, input)

let Item : Parser<string, char> =  
    fun input ->
        if string.IsNullOrEmpty(input)  
            then None
            else Some(input.[0], input.Substring(1))

let BestTwoItems =  
    Item >>= (fun v1 ->  
    Item >>= (fun v2 ->  
    Result (sprintf "%c%c" v1 v2)))
```

First, we start with the declaration of the Parser type. Unlike C\#, F\#
has built in support for tuples, so I didn’t bother to define a Result
type (just the Result function). A Parser is declared to be a function
that takes in some generic input type and returns an optional tuple
pairing the result with the remaining input to be parsed. As I’ve
blogged before, F\#’s option type is kinda like C\#’s Nullable type, so
a parser that returns None is considered to have failed to parse the
input.

Next up is are the monad functions Bind and Result. The only significant
change from the C\# version is that I used the custom operator \>\>= for
the Bind function. So instead of calling “Item().Bind(some\_function)”,
we can call “Item \>\>= some\_function”. F\# functions aren’t attached
to a type like C\# extension methods are, so this is the only way to get
the more readable infix notation. I’m using \>\>= as the bind operator
because that’s the operator [Haskell
uses](http://www.haskell.org/haskellwiki/Monad) for their monad
function. Other than the custom operator name, Bind and Result work
identically to their C\# counterparts. Note, I explicitly specified the
return type of Bind, Result and Item, but I didn’t have to. F\# can
infer the types of all the parameters from usage just fine. I added the
type specifications for the reader, in case you’re not familiar with
F\#’s syntax.

Likewise, Item is identical to the C\# version including using strings
as the parse input, except for than the F\# syntax. Typically, in a real
parsing app you would use an intrinsic list of chars instead of strings,
since F\#s list is a much more efficient data structure than strings for
operations that strip characters off the head of the list (like parsers
are wont to do). However, I wanted to make this code as similar to the
previous code, so I stuck with strings.

Finally, we have BestTwoItems. Again, syntax aside, it’s exactly like
it’s C\# cousin though I did use the slightly more compact sprintf
function instead of string.Format. Again, while BestTwoItems it works
well, it uses the same nested anonymous function syntax from the C\#
version. Maybe I shouldn’t have called it “BestTwoItems”!

However, in F\# it’s possible to define a custom syntax for your monad
that let’s you write the function this way:

``` fsharp
let VeryBestTwoItems =
    parse {
        let! v1 = Item
        let! v2 = Item
        return sprintf "%c%c" v1 v2 }
```

With this monadic syntax, we’ve now completely eliminated not only the
Parser delegate and the input string, but also the nested anonymous
functions needed by the Bind function, making the code appear completely
sequential.

The secret to making this work is the parse monad object. It the code
above, the word parse almost feels like a language keyword, but it’s
not. It’s actually an instance of an parse monad object with a specific
signature. F\# knows how to take the syntax above and combine it with
the parse monad object to produce the right code. Here’s the parse
monad:

``` fsharp
type ParseMonad() =
    member w.Delay(f) = fun input -> f () input  
    member w.Return(v) = Result v  
    member w.Bind(p, f) = p >>= f

let parse = ParseMonad()
```

As you can see, there’s an obvious direct correlation of Result and Bind
functions we defined last time and the Return and Bind methods in the
ParseMonad. The only thing we haven’t seen before is the Delay method.
Monads are one of of F\#’s many [delayed
expressions](http://research.microsoft.com/projects/fsharp/manual/spec2.aspx#_Toc202383770).
F\# wraps the entire monad in a call to Delay to ensure the monad isn’t
executed prematurely.

As per the [F\# grammar
spec](http://research.microsoft.com/projects/fsharp/manual/spec2.aspx#_Toc202383771),
there are several other functions you can define on your monad if you so
choose. My “real” parser monad also implements Zero and Combine. Zero
returns a parser that unconditionally fails. By defining Zero on my
monad object, I can write ifs without elses, the parser monad will
implicitly inject Zero clause as your else statement. Combine combines
results (I know, a shocker!). I use it as a prioritized choice. In other
words, when you Combine two parsers, you only call the second parser if
calling the first parsers fails. Prioritized Choice is used very often
in PEGs, which is why I chose to define it this way.

F\# monadic syntax also support For, Let, While, Using, TryFinally and
TryWith. Frankly, I haven’t spent much time thinking about scenarios
where you’d use these other syntax elements. The only one that’s obvious
to me is Using for deterministic finalization, which you could see using
anywhere you access IDispoasble objects. Here’s hoping the F\# folks
document in detail how to use this powerful syntax.

So that’s it for basic monads in F\#. I’ve gotten some great comments
(and one less than great comments) as I’ve written this series. In my
last post on monads (in this series at least) I’ll repost some of those
comments as well as provide some concluding thoughts.
