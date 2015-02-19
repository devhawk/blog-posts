In the [last
post](http://devhawk.net/2007/12/13/Practical+F+Parsing+Syntactical+Productions+1.aspx),
I gave you a sneak preview of what the EndOfLine production would look
like using Active Patterns. But before we get to how to build that, let
me give you a little background on why. If you want the full
explanation, check out [the
whitepaper](http://blogs.msdn.com/dsyme/archive/2007/04/07/draft-paper-on-f-active-patterns.aspx).

Basically, Active Patterns (aka AP) are a way to use the pattern
matching of functional languages with abstractions rather than native
language types. If you’ll recall, I [built functions to abstract the
parse
buffer](http://devhawk.net/2007/12/11/Practical+F+Parsing+The+Parse+Buffer.aspx)
so I could later change it’s implementation if I needed to. The problem
is that since the parse buffer is an abstraction, you can’t use it in
the match clauses. For example, here’s a version of EndOfLine that uses
a native char list.

``` {.brush:fsharp}
///EndOfLine <- ‘rn’ / ‘n’ / ‘r’
let EndOfLine input =
    match input with
    | ‘r’ :: ‘n’ :: input -> Some(input)
    | ‘n’ :: input -> Some(input)
    | ‘r’ :: input -> Some(input)
    | _ -> None
```

That’s straightforward like the AP preview at the end of the last post,
but I’ve lost the benefit of the parse buffer abstraction. In other
words, if I wanted to change the implementaiton of the parse buffer to a
string, or some other type, I’d be screwed if I wrote EndOfLine this
way. Traditionally, functional language developers had an either/or
choice when it came to abstractions vs. pattern matching. AP let’s you
use both.

Using a special syntax, you can indicate that an F\# function is an AP
by surrounding the name in what Don calls “bananas”. Here’s the AP
version of NC:

``` {.brush: .fsharp}
let (|NC|_|) input =
    match input with
    | i :: input -> Some(i, input)
    | [] -> None
```

This function is identical to the one defined in [the first
post](http://devhawk.net/2007/12/11/Practical+F+Parsing+The+Parse+Buffer.aspx),
except for the name. By surrounding the actual name in paren/pipe
“bananas”, you’re indicating the function can be used in match clauses,
not just the match input. The trailing underscore in the name indicates
this is a partial pattern, which means it returns an option value (aka
Some(\_) or None).

There’s no reason why you can’t use an AP function like any other
function. I find I do this often in my unit tests. Here’s an updated
version of an NC unit test.

``` {.brush: .fsharp}
[<Fact>]
let test_NC_empty_string () =
    let ret = (|NC|_|) !!""
    Assert.Equal(None, ret)
```

While you can still call the function like this, the primary benefit of
using Active Patterns is so you can use the function in pattern match
clauses directly. This allows the production clauses to mirror the
actual grammar rules directly. For simple productions like EndOfFile and
EndOfLine, the AP F\# implementation isn’t much more complex than the
grammar rule itself:

``` {.brush: .fsharp}
///EndOfFile <- !.
let (|EndOfFile|_|) input =
    match input with
    | NC (_) -> None
    | _ -> Some()  

///EndOfLine <- 'rn' / 'n' / 'r'
let (|EndOfLine|_|) input =
    match input with
    | TOKEN "rn" (input) -> Some(input)
    | TOKEN "n" (input) -> Some(input)
    | TOKEN "r" (input) -> Some(input)
    | _ -> None
```

You see in these functions, the calls to NC and TOKEN are used in the
match clauses (i.e. after the pipe) rather than the match input (i.e.
between match and with). Note, when used in a match clause, you just use
the name directly without the bananas.

You’ll notice that for TOKEN, the token string to match goes outside the
parentheses. This is because “rn” is an input parameter to the TOKEN AP
function. Alternatively, I could have written EndOfLine using only the
NC function, though I find TOKEN version easier to read.

``` {.brush: .fsharp}
///EndOfLine <- 'rn' / 'n' / 'r'
let (|EndOfLine|_|) input =
    match input with
    | NC ('r', NC ('n', (input))) -> Some(input)
    | NC ('n', input) -> Some(input)
    | NC ('r', input) -> Some(input)
    | _ -> None
```

In this version, the values of ‘r’ and ‘n’ are pattern matched against
the result of calling NC, so they go inside the parentheses. In other
words, the TOKEN clauses are matched if TOKEN returns some value.
However, the NC clauses are only matched if the returned result matches
the value specified in the match clause. inside the parentheses. TOKEN
has two parameters, the token string and the parse buffer, while NC only
has the parse buffer. When you write an AP function, the last parameter
gets bound to the match clause input. Additional parameters, like
TOKEN’s token, much be specified in the match clause.

Notice I’ve defined these grammar productions as active patterns as
well, which will make them compose nicely with higher-order productions.
For example, here’s the Space grammar production, which reuses
EndOfLine:

``` {.brush: .fsharp}
///Space <- ' ' / 't' / EndOfLine
let (|Space|_|) input =
    match input with
    | TOKEN " " (input) -> Some(input)
    | TOKEN "t" (input) -> Some(input)
    | EndOfLine (input) -> Some(input)
    | _ -> None
```

It’s DSL-esque, wouldn’t you say? Active Patterns is a little
parens-heavy – the NC version of EndOfLine has three nested APs which
isn’t exactly easy on the eyes. However, the concept is very solid and
it make the parsing code almost easier to write by hand than it would be
to use a parser generator like yacc. Almost.
