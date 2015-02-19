In the last post, I showed two semantic productions, Char and Range.
Char returns an option tuple of a native char and the parse buffer.
Range returns a tuple of either a single character or a character range
and the parse buffer. Certainly, I could have written Range to always
return a char \* char tuple, passing in the same character for both in
the case of a single character range. However, this provides an
opportunity to introduce F\#’s [discriminated
unions](http://research.microsoft.com/fsharp/manual/quicktour.aspx#QuickTourDiscriminatedUnions)
(or simply union for short).

The F\# Manual describes a discriminated union as “a new type composed
of a fixed number of distinct alternatives”. Many of the semantic
productions return “a fixed number of distinct alternatives” so I find a
union is a good way to model the return value of semantic production
functions. Here’s the definition of Range:

``` {.brush: .fsharp}
///AST Type for Range production
type Range = 
| Single of char
| Dual of char * char
    with
    override this.ToString() =  
        match this with
        | Single x -> sprintf "Range.Single (%A)" x 
        | Dual (x,y) -> sprintf "Range.Dual (%A,%A)" x y
```

So Range is either a single character, or a tuple of two characters. As
you saw in the last post, you create an instance of a union with the
type.alternative syntax. You can also use simply the alternative name,
assuming F\# can determine the correct union type. Personally, I like
using the full name – it helps me remember what the type really is.

Notice that the AP function and the union type appear to have the same
name. Actually, they don’t since the name of the AP function’s name
includes the bananas – i.e. (|Range|\_). However, if you want you can
define a function called simply Range and still have a type named Range
as well – as long as you’re not interested in language interop. F\# can
tell the difference between the Range function and the Range union, but
C\# can’t. So I’d say we’re best off avoiding overloading the names
entirely.

If you look at the compiled union in Reflector, you’ll see the Range
type, with public internal classes named \_Single and \_Dual that
inherit from Range. In other words, F\# implements union types as an
inheritance tree.  Range also provides static constructors for the
various disparate types in the union.

One last thing I want to point out about the Range type is how I
overrode ToString. This is primarily for unit testing – if you don’t
override ToString, you only get the type name which isn’t very useful
when trying to figure out why a given unit test failed. I’m using the
F\# native sprintf function rather than string.Format, so the [format
string is a little
different](http://research.microsoft.com/fsharp/manual/fslib/Microsoft.FSharp.Text.Printf.html).

The other major F\# type we’ll use in the AST are [record
types](http://research.microsoft.com/fsharp/manual/quicktour.aspx#QuickTourRecords).
These are similar conceptually to structs in C\#. Basically, they’re a
tuple with names. For example, here’s the Definition record type (though
we haven’t seen any functions that use this type yet).

``` {.brush: .fsharp}
///AST Type for Definition production 
type Definition =   
    {  
        name: string;  
        exp: Expression;  
    }  
    with  
    override this.ToString() =   
        sprintf "Definition (name: %A, exp: %A)" this.name (Primary.Exp2Str this.exp)
```

I could have simply defined this type as (string \* Expression), but
having the fields named makes it crystal clear what the semantic meaning
of each field is. The only place where I used an anonymous tuple in the
AST instead of a record is in the Range union above – I figured that was
simple enough not to warrant named fields.

I also have a couple of [type
aliases](http://research.microsoft.com/fsharp/manual/quicktour.aspx#QuickTourTypeAbbreviations).
For example, I have a record type called SequenceItem. An array of
SequenceItems is a Sequence and an array of Sequences is an Expression
(which we saw in the Definition type above).

``` {.brush: .fsharp}
///AST Type for Sequence Item production
let SequenceItem = 
    {  
        primaryItem: Primary; 
        itemPrefix: Prefix option;      
        itemSuffix: Suffix option; 
    }

///AST Type for Sequence production
let Sequence = SequenceItem list 

///AST Type for Expression production
let Expression = Sequence list
```

Note, unlike unions and records, type aliases can’t override base class
methods like ToString. This is because there is no actual Sequence or
Expression types in the compiled code – F\# compiles away type aliases
completely. Looking at the implementaiton of Definition in reflector
confirms that the exp member is of type List\<List\<SequenceItem\>\>.
Since I need to convert Expressions to strings in two different places,
I wrote a static Exp2Str method on the Primary type (not shown). It
feels a bit hacky to stick Expression’s ToString implementation on the
Primary type, but I had little choice given F\#’s scoping rules.

Technically, since they get compiled away anyway, I could have skipped
the Sequence and Expression declarations and simply defined the exp
field of Definition as “SequenceItem list list”. But the “list list”
syntax throws me a bit. I mean, I understand it, but I found using the
terms Sequence and Expression far more readable. Also, I used the
definition of Expression in the definition of Primary, so it makes sense
for it to have it’s own name.
