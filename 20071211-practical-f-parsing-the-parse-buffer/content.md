The first thing I need for my F\# parser is a type to represent the
buffer of characters being parsed. For now, I’m using the [simplest
thing that could possibly
work](http://www.artima.com/intv/simplest.html): an intrinsic F\#
character list. Lists are heavily used in functional languages, so they
tend to have very efficient native list types. F\# is no exception.
Along with a native list type, F\# has a native operation for retrieving
the head of a list. For example, If you execute the following code, head
will be bound to '1' and tail will be bound to the list ['2';'3';'4']

```fsharp
let head :: tail = ['1';'2';'3';'4']
```

The problem using the native list head operator is that my parsing code
will be explicitly bound to work on character lists only. However, I’m
not sure an in-memory character list is the best way to read long files
of text off the disk for processing, so I’d rather not limit future
options like this. So instead, I’ll define my own function to retrieve
the head of the parsing buffer.

``` fsharp
let NC input =
    match input with
    | head :: tail -> Some(head, tail)
    | _ -> None
```

Note, in all my F\# code I use the [\#light
syntax](http://blogs.msdn.com/dsyme/archive/2006/08/24/715626.aspx)
which means code blocks are indicated by significant whitespace
indentation similar to Python.

NC stands for Next Character, though I gave it a short name since it’s
used often. It’s basically wraps the native list head operator. If
there’s at least one element in the list, the first clause matches and
the function returns Some(head,tail). If the list is empty, the second
clause matches and the function returns None. The use of Some and None
means this function returns an F\# option type, which is similar to
.NET’s
[Nullable](http://msdn2.microsoft.com/en-us/library/system.nullable.aspx)
type. (head,tail) is a tuple – in this case, combining the head and the
tail of the list together. Finally, the underscore in the second match
clause is a wildcard, so that clause matches anything. I’m using it here
like the default clause of a switch statement in C\#.

The F\# type for this function is ``a list -> ('a * 'a list) option``.
The 'a is a generic type parameter and the asterisk indicates a tuple.
So NC takes a generic list, and returns an option tuple with a single
generic element and a generic list. Even though the function is named
Next Character, it would work with a list of any type.

Now that I have my own list head function, the rest of my parsing code
can it. If I later decide to change the type of the parse buffer, I can
change the implementation of NC – including the input and return types –
without having to change the parsing functions that use NC. For example,
here’s a different implementation where the input parameter is a .NET
string instead of a char list.

``` fsharp
let NC (input : string) =
    if input.Length > 0
        then Some(input.Chars(0), input.Substring(1))
        else None
```

Since I’m calling methods on the input parameter, I need to explicitly
tell F\# what type it is. The F\# type for this function is ``string ->
(char * string) option``, which is obviously different from the type
definition of the original NC version. But F\#’s [type
inference](http://devhawk.net/2007/11/29/f-hawkeye-type-inference/)
automatically adjusts to handle the change in the type so functions that
call NC don’t have to change. FP languages like F\# handle list
operations extremely efficiently, so this version of NC is probably a
step in the wrong direction. However, it’s good to know I can easily
encapsulate the details our the parse buffer type away from the rest of
my parsing code.

Here’s another function I’ll use in parsing, defined entirely in terms
of NC.

``` fsharp
let TOKEN token input =
    let rec ParseToken token input =
        match token, NC input with
        | t :: [], Some(i, input) when i = t ->
            Some(input)
        | t :: token, Some(i, input) when i = t ->
            ParseToken token input
        | _ -> None
    ParseToken (List.of_seq token) input
```

The TOKEN function checks to see if the token string is at the front of
the input parse buffer. If so, it returns the remainder of the buffer
after the token. If not, it returns None. It’s defined entirely in terms
of NC, so it works the same with both the versions of NC I’ve written so
far. However, depending on the implementation of NC, I might rewrite
TOKEN. For example, if I was using the string version of NC, I’d
probably rewrite this function to use
[String.StartsWith](http://msdn2.microsoft.com/en-us/library/system.string.startswith.aspx)
instead of recursion.

TOKEN defines a local recursive function called ParseToken. It’s very
common to see local functions defined inside other functions in FP,
similar to how classes can define local classes in OO languages like
C\#. ParseToken recursively compares the characters in the token string
with the characters in the input buffer, finishing when either it
reaches the end of the token string or there’s a mismatch. By default,
functions in F\# can’t call themselves recursively by default, so
ParseToken is declared to be recursive by using “let rec” instead of
simply “let”.

ParseToken shows off something interesting about the way symbols are
used in F\#. Remember that F\# values are immutable by default. Yet, the
symbols “token” and “input” appear to change. In the match statement,
token and input represent the values passed into the function. However,
in the match clauses, token and input represent the tail of those two
lists. Technically, the values didn’t change, F\# allows you to reuse
the symbols. If I wanted to avoid reusing symbols, I could define
ParseToken this way (though I find this much less readable):

``` fsharp
let rec ParseToken token input =
    match token, NC input with
    | t :: [], Some(i, itail) when i = t ->
        Some(itail)
    | t :: ttail, Some(i, itail) when i = t ->
        ParseToken ttail itail
    | _ -> None
```

Other than declaring ParseToken, the TOKEN function is a single line of
code. It simply calls ParseToken, converting the token parameter into a
char list along the way. While lists are very efficient, which would you
rather type?

``` fsharp
let token = TOKEN ['f';'o';'o'] input
let token = TOKEN "foo" input
```

Personally, I like the second version. I’m sure there’s a slight perf
hit to convert from a string to a list, but frankly I value readability
over performance so I used strings for tokens. TOKEN uses the
List.of\_seq function to do the conversion. Seq is F\#’s name for
IEnumerable. Technically, TOKEN would work with any IEnumerable type.
However, in my source code, it’s always going to be a string.

I also used List.of\_seq to define a helper function String to Parse
Buffer (aka S2PB) that converts a string into a character list. I use
function often in the test code.

``` fsharp
let S2PB input = List.of_seq input
```

If I were to change the input type of NC, I’d also change the
implementation of S2PB so that it still took in a string but returned
whatever the correct input type for NC.

The one problem with S2PB function is that you have to use it with
parentheses almost all the time. If I write ``NC S2PB "foo"``, F\# can’t
tell if I’m calling NC with two parameters or passing the result of ``S2PB
"foo"`` to NC. Since NC is strongly typed to have only one input
parameter, you might have thought it could automatically determine the
calling order, but it doesn’t.

I could make the function calls explicit with parenthesis by writing ``NC
(S2PB "foo")``. F\# also provides a pipe operator, so I could pipe the
result of S2PB into NC by writing ``S2PB "foo" |> NC``. I didn’t like
either of those solutions, so instead I defined a custom unary operator
!! as an alias. The parameter binding rules are different for custom
operators because I can write ``NC !! "foo"`` without piping or parenthesis.

``` fsharp
let (!!) input = S2PB input
```

So now I’ve got three functions and a custom operator that completely
abstract away the parse buffer type. As long a my parsing functions only
uses these functions to access the parse buffer, I’ll be able to later
change the buffer type without affecting my parsing code at all.
