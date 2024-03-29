*(Harry is @ DevTeach in Vancounver with his family this week. He was
hoping to still do Morning Coffee posts, but that’s turned out to be
infeasible. So instead, you get a series of pre-written posts about
F\#.)*

Most FP languages include some type of pattern matching, and F\# is no
exception. At first blush, pattern matching looks a little like a switch
statement, but it’s much more powerful. Where switch statements
typically only do simple matches such as “does this variable equal this
constant?”. In F\#, you can break apart types, use wildcards even pass
the potential match data into a custom function to determines if there’s
a match. Of course, you can also do your more run-of-the-mill “does
value equal constant” comparisons as well.

The problem with most functional language is that while pattern matching
is powerful, it’s not particularly extensible. As Don pointed out in a
[recent
paper](http://blogs.msdn.com/dsyme/archive/2007/04/07/draft-paper-on-f-active-patterns.aspx),
this becomes a real problem when trying to integrate FP with OO. OO is
designed to hide details behind abstractions. Yet those abstractions
can’t be used in pattern matching. Luckily, Don and the F\# Guys (sounds
like a band) have invented an extensible pattern matching syntax called
Active Patterns to deal with this problem. Basically, in more recent
versions of F\#, you can adorn functions with special syntax so that you
can use them in your pattern matching clauses.

This turns out to be wicked cool for writing parsers. I’m building
recursive descent parsers, so each grammar production is implemented as
a function. Yet, since I’m using the active pattern syntax, I can use
them in pattern matching clauses. This allows me to chain together
functions in a single match clause rather than having multiple match
statements. And it’s very readable. For example, the function to
recognize the grammar production ``Additive  <- Multitive ‘+’ Additive |
Multitive`` is translated into the following F\#:

``` fsharp
and (|Additive|_|) input =
    match input with
    | Multitive(v1,Token '+' (Additive(v2, input))) -> Some(v1+v2,input)
    | Multitive(v,input) -> Some(v,input)
    | _ -> None
```

The weird “bananas” around Additive on the first line indicate this is
an active pattern. Multitive and Token are also an active patterns. This
syntax is a little parens heavy, but otherwise, that translation from
grammar to F\# is nearly declarative. It almost defeats the need for
having a parser generator when building a parser is this
straightforward. Almost.
