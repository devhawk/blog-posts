To prep for my [Lang.NET](http://www.langnetsymposium.com/) talk, I went
back and reviewed [my PEG
parser](http://devhawk.net/2007/12/10/practical-parsing-in-f/). One
thing I was not happy with was that all the recursion was handled in a
one-off manner. When I needed to match multiple characters in the
comment rule, I wrote a special one-off function to recursively process
the comment until it reached an EOL. When I needed to parse a series of
ranges, characters or definitions, I wrote special one-off functions to
handle that recursion. Obviously, that’s not the best approach. So, I
wrote the following active pattern functions to handle recursion.

``` fsharp
//ZOM == Zero Or More
let rec (|ZOM|) f input =
    match f input with
    | Some(i,input) ->
        let j,input = (|ZOM|) f input
        (i :: j, input)
    | None -> [], input

//OOM == One Or More
let (|OOM|_|) f input =
    match (|ZOM|) f input with
    | [], input -> None
    | v, input -> Some(v,input)

//ZOO == Zero Or One
let (|ZOO|) f input =
    match f input with
    | Some(i,input) -> Some(i), input
    | None -> None,input
```

With these functions at the ready, I can stop writing one-off recursion
functions. Instead, I write a function that matches a single item, which
I pass as an argument to one of the three functions above. For example,
here is the original and new version of the top level Grammar function.

``` fsharp
//Original version
let (|Grammar|_|) input =
    let rec ParseDefinitions dl input =
        match input with
        | Definition (d, input) -> ParseDefinitions (dl @ [d]) input
        | _ -> Some(dl, input)
    let (|OneOrMoreDefintions|_|) input =
        match input with
        | Definition (d, input) -> ParseDefinitions [d] input
        | _ -> None
    match input with
    | Spacing (OneOrMoreDefintions (dl, EndOfFile)) ->
          Some(List.to_array dl)
    | _ -> None

//New Version
let (|Grammar|_|) = function
    | Spacing (OOM (|Definition|_|) (dl, EndOfFile)) ->
          Some(List.to_array dl)
    | _ -> None
```

The new version is much shorter, because there’s already a function to
match a single definition, which we can pass into OneOrMore (aka OOM).
Note, when I pass an active pattern function as a parameter, I have to
use it’s real name (with the pipes and parameters). Having to use the
real name is pretty ugly, but F\# need to be able to differentiate
between using a function as an active pattern vs using it as a function
parameter. If you could just call “OOM Definition (dl, EndOfFile)”,
would F\# realize Definition is a parameter?

I also defined syntactic predicate functions. If you’ll recall, these
syntactic predicates will try to match but automatically backtrack,
returning success or failure depending on which function you called.

``` fsharp
//FP == Failure Predicate
let (|FP|_|) f input =
    match f input with
    | Some(_) -> None
    | None -> Some(input)

//SP == Success Predicate
let (|SP|_|) f input =
    match f input with
    | Some(_) -> Some(input)
    | None -> None
```

To see this in action, here’s the original and updated Primary function.
Only the first rule is relevant, so I’ve omitted the others.

``` fsharp
//Original version
let (|Primary|_|) input =
    let (|NotLEFTARROW|_|) input =
        match input with
        | LEFTARROW (_) -> None
        | _ -> Some(input)
    match input with
    | Identifier (id, NotLEFTARROW (input)) ->
        Some(Primary.Identifier(id), input)
    //rest of function omitted for clarity

//new version
let (|Primary|_|) = function
    | Identifier (id, FP (|LEFTARROW|_|) (input)) ->
          Some(Primary.Identifier(id), input)
    //rest of function omitted for clarity
```

Instead of writing a special function to match “not left arrow”, I just
pass the left arrow function as a parameter to Failure Predicate (aka
FP). With these recursion and syntactic predicate functions, I was able
to remove all the one-off recursion functions from my parser. (Note, I
posted an [updated version of
PegParser](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Projects/Practical%20Parsing%20in%20F|3/F|3%20PegParser%20|52008-01-29|6.zip)
on my SkyDrive so you can see this in action.)

These five functions significantly reduced the complexity of the code.
Unfortunately, I’m not sure it’s much easier to read. The conciseness is
offset IMO by the ugliness of using the active pattern’s true names.
Also, I would have liked to use custom operators for these five
functions, but operators aren’t allowed to be active pattern functions.
Hopefully, that will change at some point in the future, though if we’re
going to dream of better syntax, can we do something about all the
parens? Personally, I’d love to be able to write the following:

``` fsharp
//This doesn't work, but I can dream, can't I?
let (|Primary|_|) = function
    | Identifier (id) !!LEFTARROW (input) ->
        Some(Primary.Identifier(id), input)
    //rest of function omitted for clarity

let (|Grammar|_|) = function
    | Spacing ++Definition (dl) EndOfFile ->
        Some(List.to_array dl)
    | _ -> None
```

Note to self, talk to F\# team members who come to LangNET about this…
