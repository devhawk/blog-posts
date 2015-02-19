Now that I’ve [explained the
AST](http://devhawk.net/2007/12/19/Practical+F+Parsing+The+Abstract+Syntax+Tree.aspx),
there are several more semantic productions to go. I’m not going to
describe them all in detail, just hit a few important highlights.

Many of the semantic productions return lists of other productions.
Class returns a list of Ranges, Literal and Identifier returns lists of
characters, etc. As you would expect, these multiples are encoded in the
grammar. For example, here’s the implementation of Literal:

``` {.brush: .fsharp}
///Literal <- ['] (!['] Char)* ['] Spacing
///         / ["] (!["] Char)* ["] Spacing
let (|Literal|_|) input = 

    let rec (|LitChars|_|) delimiter chars input = 
        match input with
        | TOKEN delimiter (_) -> Some(L2S chars, input)
        | Char (c, input) ->  
            (|LitChars|_|) delimiter (chars @ [c]) input 
        | _ -> None 
     
    match input with
    | TOKEN "'"  (LitChars "'"  [] (lit, TOKEN "'"  (Spacing(input)))) ->  
        Some(lit, input)
    | TOKEN """ (LitChars """ [] (lit, TOKEN """ (Spacing(input)))) ->  
        Some(lit, input)
    | _ -> None
```

I’m using a local recursive function LitChars to retrieve the characters
between the quote delimiters. The quote parameter – i.e. single or
double quote – is passed in as a parameter. I also pass in an empty list
of chars as a parameter. Remember that functional programs keep their
data on the stack, a list parameter is a common way to keep state in a
recursive function. When I match a single non-delimiter character, I add
it to the list with the chars @ [c] expression. [c] converts a single
value c into a list of one element while the @ operator concatenates to
lists. I’m not sure adding the value to he end like that is a good idea
perf wise. [Programming
Erlang](http://www.pragprog.com/titles/jaerlang/) recommends only adding
items to the head then reversing the list when you’re done matching. But
F\# isn’t Erlang, so I’m not sure what the guidance is here.

Another thing you find in productions is the backtracking syntactic
predicates. We saw an example of them in the [implementation of
Comment](http://devhawk.net/2007/12/17/Practical+F+Parsing+Syntactical+Productions+2.aspx).
Often, their used to indicate the end of a list of other productions,
such as Literal, above. However, sometimes, they’re used to ensure the
correct production is matched. For example, a Primary can be an
Identifier, as long as it’s not followed by a left arrow. An identifier
followed by a left arrow indicates a Definition.

``` {.brush: .fsharp}
///Primary <- Identifier !LEFTARROW
///         / OPEN Expression CLOSE
///         / Literal / Class / DOT
let rec (|Primary|_|) input = 

    let (|NotLEFTARROW|_|) input = 
        match input with
        | LEFTARROW (_) -> None 
        | _ -> Some(input)

    match input with
    | Identifier (id, NotLEFTARROW (input)) ->  
        Some(Primary.Identifier(id), input)
    | OPEN ( Expression (exp, CLOSE (input))) -> 
        Some(Primary.Expression(exp), input)
    | Literal (lit, input) -> Some(Primary.Literal(lit), input)
    | Class (cls, input) -> Some(Primary.Class(cls), input)
    | DOT (input) -> Some(Primary.Dot, input)
    | _ -> None
```

Here, I need a way to match the absence of LEFTARROW, so I’ve build a
simple local function called NotLEFTARROW. This isn’t very clean IMO –
I’d rather have a used a custom operator like !!! and &&& for my
backtracking predicates. But I haven’t figured out how to use custom
operators as Active Patterns. I was able to write a standard
non-operator AP function, but then I have to use the full AP function
name. Here’s a version of Primary written that way:

``` {.brush: .fsharp}
///Backtracking failure predicate
let (|NotPred|_|) f input = 
    match f input with
    | Some (_) -> None 
    | _ -> Some(input) 
     
let rec (|Primary|_|) input = 
    match input with
    | Identifier (id, NotPred (|LEFTARROW|_|) (input)) ->  
        Some(Primary.Identifier(id), input) 
    //Other matches omited
```

Frankly, I don’t think that’s very readable, so I didn’t implement it
that way. If I can figure out how to use custom operators and pass
around AP functions without using their full ugly name, I’ll change it.

Finally, there are a few things about F\#’s scoping rules that you need
to understand. F\# uses linear scoping, which is to say there’s no way
to use a type or function that hasn’t been declared, sort of like C/C++.
The difference is that while C/C++ have a way to declare a type or
function separately from its implementation, F\# has no such capacity.
This becomes an issue when you have circular references. For example,
Primary can be an Expression, which is a list of SequenceItems, each of
which is a Primary with an optional prefix and suffix. In order to
declare those in F\#, you have to use a special “and” syntax to link the
types/functions together.

``` {.brush: .fsharp}
//ToString and Exp2Str omitted for clarity
type Primary = 
| Identifier of string
| Expression of Expression 
| Literal of string
| Class of Range list 
| Dot  

//ToString omitted for clarity
and SequenceItem = 
    {  
        primaryItem: Primary; 
        itemPrefix: Prefix option;      
        itemSuffix: Suffix option; 
    }

and Sequence = SequenceItem list 

and Expression = Sequence list
```

Likewise, the AP functions to recognize Primary, SequenceItem, Sequence
and Expression are anded together. For me, this is one of the hardest
things to get used to about F\#. But as you can see from the
expressiveness of the code, it’s well worth the trouble
