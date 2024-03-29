Now that I’ve moved over to [Active
Patterns](http://devhawk.net/2007/12/14/practical-f-parsing-active-patterns/),
I want to go back and finish the syntactic productions for my PEG
parser. Most of the syntactic productions are very straightforward when
implemented in AP. We’ve seen EndOfFile, EndOfLine and Space already.
There is also a series of symbol identifiers that have only a single
match clause. For example, here’s DOT:

``` fsharp
///DOT <- '.' Spacing
let (|DOT|_|) input =
    match input with
    | TOKEN "." (Spacing(input)) -> Some(input)
    | _ -> None
```

I’m not going to go thru all the symbol AP functions since their all
basically like this one. However, you’ll notice that this function
references an AP we haven’t seen yet – Spacing. I want to close out the
section on Syntactical Productions by looking at the Spacing and Comment
productions. Since Spacing depends on Comment, I’ll start with Comment.

Comments in PEG grammars are single lines that start with a \# symbol,
similar to the // line comments in F\# and C\#. This is the PEG grammar
rule for Comment:

``` fsharp
///Comment <- '#' (!EndOfLine .)* EndOfLine
```

Basically, this says that a comment starts with a \#, then matches zero
or more characters that are not EndOfLine, and ends with an EndOfLine.
The exclamation point is a *syntactic predicate*, which means that we
unconditionally backtrack after attempting to match. PEG has both a
success and failure syntactic predicate – the ! is the failure predicate
while & is the success predicate. So inside the parens, this production
rule says to test the current point in the parse buffer for EndOfLine.
If it finds it, the match fails and we exit out of the parens (where we
match EndOfLine again without backtracking it this time). If it doesn’t
find it, the parser backtracks, consumes the next character regardless
what it is, then repeats.

Unfortunately, there’s a bug in this production. If the parse buffer
ends in a comment, the production will fail since it hasn’t reached the
EndOfLine and there are no more characters to consume. So I changed the
production to:

``` fsharp
///Comment <- '#' ((!EndOfLine / !EndOfFile) .)* EndOfLine?
```

This rule now ends the comment if it reaches an EndOfLine or EndOfFile.
Additionally, it makes the final EndOfLine match optional. So if the
comment ends with a new line, the new line is consumed as part of the
grammar production. If the comment ends with the end of file, the
EndOfFile is not consumed as part of the production. If you’ll recall,
EndOfFile returns Some(unit) rather than Some(char list). In F\#, the
various branches of a match clause have to have the same return type, so
you can’t return Some() from one branch and Some(input) from another.
It’s no big deal – you use the EndOfFile production at the top-level
grammar to ensure you’ve consumed the entire file anyway.

Here’s the F\# implementation of Comment:

Comment defines a local AP function called CommentContent, which
implements the part of the grammar production inside the parens.

``` fsharp
///Comment <- '#' ((!EndOfLine / !EndOfFile) .)* EndOfLine?
let (|Comment|_|) input =  
    let rec (|CommentContent|_|) input =  
        match input with
        | EndOfLine (input) -> Some(input)
        | EndOfFile -> Some(input)
        | NC (_,input) -> (|CommentContent|_|) input
        | _ -> None
    match input with
    | TOKEN "#" (CommentContent (input)) -> Some(input)
    | _ -> None
```

Local AP function CommentContent recurses thru the input buffer after
the pound sign, looking for  EndOfLine or EndOfFile. This function
should never match the final default clause, but I put it in to keep the
compiler from complaining. Notice that I use symbol redefinition here so
both EndOf match clauses return Some(input). For EndOfLine, I’m
re-defining input to mean what is returned by EndOfLine. For EndOfFile,
I’m not re-defining, so input still means the list that is passed into
the pattern match statement.

Compared to Comment, Spacing is pretty trivial:

``` fsharp
///Spacing <- (Space / Comment)*
let rec (|Spacing|) input =  
    match input with
    | Space (input) -> (|Spacing|) input
    | Comment (input) -> (|Spacing|) input
    | _ -> input
```

There are two things I want to call out about spacing. First, it’s a
recursive function, so it’s defined with let rec. AP functions can be
recursive, just like normal functions. Also, note the lack of an
underscore in the name of this AP function. Spacing is defined as zero
or more spaces or comments, so it’s perfectly valid to match nothing.
Thus, Spacing is always a successful match. In this case, we don’t put
the underscore in the AP function name and we don’t wrap the return
result in Some(). You’ll notice the last match clause simply returns
input, rather than Some(input).

That’s all the syntactic predicates. Next up, the meat of the grammar:
semantic predicates.
