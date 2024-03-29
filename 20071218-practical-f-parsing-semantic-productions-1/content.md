All the [syntactic
productions](http://devhawk.net/2007/12/17/practical-f-parsing-syntactical-productions-2/)
in my PEG parser, save one, have the exact same signature. They take in
a char list and return a char list option. Which is to say, they take a
parse buffer in and return either the remaining parse buffer on a
successful match or nothing on a failed match. The only exception is
EndOfFile which doesn’t return the remaining parse buffer because there
isn’t any buffer left to parse.

Now we’re moving on to look at the productions with semantic
implications. In Parsing Expression Grammars, there are eleven: Char,
Range, Class, Literal, Identifier, Primary, Sequence Item, Sequence,
Expression, Definition and Grammar. Like their syntactic brethren, these
semantic productions will all have a single char list input parameter.
However, they will all return some semantic value along with the
remaining parse buffer.

We’ll start with Char, since it’s the only semantic production that
doesn’t return a custom type:

```fsharp
///Char <- '\' [nrt'"[]\]
/// / '\' [0-2][0-7][0-7]
/// / '\' [0-7][0-7]
/// / '\' [0-7]
/// / !'\' .
let (|Char|_|) input =  

    let (|InRange|_|) upper input =
        let i2c value = Char.chr(Char.code '0' + value)
        let c2i value = Char.code value - Char.code '0'

        match input with
        | NC (c, input) when (i2c 0) <= c && c <= (i2c upper) ->
            Some((c2i c), input)
        | _ -> None

    match input with
    | TOKEN @"" (NC(c, input))  
    when List.exists (fun x -> x=c) ['n';'r';'t';''';'"';'[';']';'\'] ->  
        match c with
        | 'n' -> Some('n', input)
        | 'r' -> Some('r', input)
        | 't' -> Some('t', input)
        | _ -> Some(c, input)
    | TOKEN @"" (InRange 2 (i1, InRange 7 (i2, InRange 7 (i3, input)))) ->
        Some(Char.chr (i1 * 64 + i2 * 8 + i3), input)
    | TOKEN @"" (InRange 7 (i1, InRange 7 (i2, input))) ->
        Some(Char.chr (i1 * 8 + i2), input)
    | TOKEN @"" (InRange 7 (i1, input)) ->
        Some(Char.chr (i1), input)

    | NC(c, input) when c <> '\' -> Some(c, input)
    | _ -> None
```

Note, this production is slightly different from the one in the PEG
whitepaper. This way was easier to pattern match. Also, I typically
don’t wrap my when guards onto the next line, but this way it doesn’t
wrap funny on my blog.

While long, Char is fairly straight-forward. There are five ordered
choices that can match this production. The first is for escaped
characters, the next three are for character codes, and the last one is
matching any character except the backslash escape character. Note,
tracking F\#’s escape characters and PEG’s escape characters can get
tricky. I’ve used verbatim strings for all my TOKEN parameters in order
to help try and keep it straight.

The escape character match clause uses a when guard to narrow down the
selection criteria. I use the built-in List.exists method to see if the
character is in a hard-coded list of special characters. List.exists
takes in a function parameter, and returns true if that function returns
true for any of the value is the list. Since I’m just matching a value,
my function parameter is a trivial equality test. If List.exists returns
true, I return that special character as part of the return tuple. Of
all the escape characters in PEG, only three are also escape characters
in F\#, so I use a second match clause to return the correct char value.
There’s probably a way to do that more elegantly, but since there were
just three clauses, I figured it was easier to type them out manually.

For the character code clauses, I wrote a special local AP function
called InRange to determine if the specified character was within a
specified range and to convert it from a char to an int. Note, the way
the production is written, the largest character code you can specify is
277, which means you can encode slightly more than the standard UTF-8
character set. Honestly, this should be updated to support full UTF-16,
but I’m not here to critique the grammar, so I didn’t try to fix this
issue.

Note, all the results (save None) return a tuple of the matched
character value and the remaining input buffer. Again, all the remaining
productions will work like that. For example, here’s the Range
production:

``` fsharp
///Range <- Char '-' Char / Char
let (|Range|_|) input =
    match input with
    | Char (c1, TOKEN "-" (Char (c2, input))) ->  
        Some(Range.Dual (c1, c2), input)
    | Char (c1, input) ->  
        Some(Range.Single (c1), input)
    | _ -> None
```

Compared to Char, Range is fairly simple. It’s either two chars,
separated by a hyphen (for example: a-z) or it’s a single char. Again,
being able to use Active Patterns to build on lower level productions is
a huge helper.

But what does this function return? What does Range.Single and
Range.Dual mean? Those are refer to a special F\# construct called a
discriminated union. Before we can continue writing semantic
productions, we need to define these types to hold the results of these
productions.
