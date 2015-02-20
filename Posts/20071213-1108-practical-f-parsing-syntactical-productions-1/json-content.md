Now that I have my [parse buffer
functions](http://devhawk.net/2007/12/11/Practical+F+Parsing+The+Parse+Buffer.aspx)
and [unit test
framework](http://devhawk.net/2007/12/12/Practical+F+Parsing+Unit+Testing.aspx)
taken care of, it’s time to write some parsing expression grammar
productions [1]. In any grammar, there are productions that have
semantic meaning and productions that are only used to specify syntax.
For example, in C\# statements end with a semicolon and code blocks are
delineated with curly braces. Syntactical elements don’t end up in the
abstract syntax tree, so they’re easier to implement.

Most of PEG’s grammar productions are syntactical in nature. Let’s start
with the simplest production, EndOfFile.

``` fsharp
///EndOfFile <- !.
let EndOfFile input =
    match NC input with
    | None -> Some()
    | _ -> None
```

Similar to the underscore in F\#, the period represents any character In
the PEG grammar and the exclamation point is a backtracking not. In
other words, EndOfFile succeeds if NC fails, which only happens when the
parse buffer is empty. Since the parse buffer is empty on a successful
match, there’s no value to return so Ireturn Some(). Some() is kinda
like Nullable, which doesn’t make much sense in C\#. But here it means I
have a successful match but no data to pass back to the caller.

Here’s a slightly more complex grammar production, EndOfLine:

``` fsharp
///EndOfLine <- ‘rn’ / ‘n’ / ‘r’
let EndOfLine input =
    match NC input with
    | Some(‘r’, input) ->
        match NC input with
        | Some (‘n’, input) -> Some(input)
        | _ -> Some(input)
    | Some(‘n’, input) -> Some(input)
    | _ -> None
```

EndOfLine has three possible matches: rn, n and r. Here, you see the use
of nested match statements in the r match clause. If the top character
is r, the function checks the top of the remaining text buffer for n.
F\#’s ability to reuse symbols comes in very handy here.

Unfortunately, this isn’t code very readable. In particular, the match
priority order, which matters in PEGs, is totally lost. For this
production, it’s no big deal, but that won’t always be the case. I’m
also not using the handy TOKEN function I wrote in [a few posts
ago](http://devhawk.net/2007/12/11/Practical+F+Parsing+The+Parse+Buffer.aspx).
Here’s an alternative version that uses TOKEN and preserves the match
priority order.

``` fsharp
///EndOfLine <- ‘rn’ / ‘n’ / ‘r’
let EndOfLine input =
    match TOKEN “rn” input with
    | Some(input) -> Some(input)
    | _ ->
        match TOKEN “n” input with
        | Some(input) -> Some(input)
        | _ ->
            match TOKEN “r” input with
            | Some(input) -> Some(input)
            | _ -> None
```

This time, I use the TOKEN function and nested match statements to chain
the results together. The previous method is probably faster, but this
approach is more readable and explicitly preserves the match order.
However, it sure is a pain to type. Wouldn’t it be great if we could
write something like this:

``` fsharp
///EndOfLine <- 'rn' / 'n' / 'r'
let EndOfLine input =
    match input with
    | TOKEN "rn" (input) -> Some(input)
    | TOKEN "n" (input) -> Some(input)
    | TOKEN "r" (input) -> Some(input)
    | _ -> None
```

Turns out, F\#’s [Active Patterns
feature](http://devhawk.net/2007/11/29/F+Hawkeye+Pattern+Matching.aspx)
let’s me implement EndOfLine exactly like this. We’ll look at how it
works in the next post.

------------------------------------------------------------------------

[1] The full PEG grammar is listed in “[Parsing Expression Grammars: A
Recognition-Based Syntactic
Foundation](http://pdos.csail.mit.edu/~baford/packrat/popl04/)” by
[Brian Ford](http://www.brynosaurus.com/).
