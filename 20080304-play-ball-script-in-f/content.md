Scott Hanselman
[wanted](http://www.hanselman.com/blog/2008WindowScriptingGamesAdvancedPowerShellEvent7.aspx)
an F\# version of this [Play
Ball!](http://www.microsoft.com/technet/scriptcenter/funzone/games/games08/aevent7.mspx)
round-robin scheduling PowerShell script. Here’s what I came up with:

``` fsharp
let randomize list =
    let random = new System.Random()
    let list'=  
        list  
        |> List.map (fun i -> (random.Next(), i))
        |> List.sort (fun (i1,_) (i2,_) -> Int32.compare i1 i2)  
    let (_,list'') = List.unzip list'
    list''

let rec makeGames teams =
    match teams with
    | first :: rest ->
        [for team in rest -> (first, team)] @ (makeGames rest)
    | [] ->  []

let teams = ['a'..'f']
let games = teams |> makeGames |> randomize
```

MakeGames uses pattern matching to see if the list of teams is empty or
not. If the list is empty, we simply return an empty list of games. If
not, we use F\#’s list comprehension syntax to generate a list of games
between the first team in the list and each of the remaining teams. This
list is combined (via the ‘@’ operator) with the results of calling
makeGames recursively. This generates the un-randomized list of games.

Once we have the list of games, we need to randomize it. I ported the
randomize function above over from a [version I found in
Erlang](http://wiki.trapexit.erlang-consulting.com/RandomShuffle).
Basically, it attaches a random number to each element in the list to be
randomized, sorts by those randomly generated numbers, then throws the
numbers away and returns the just the randomized list. Note, the Erlang
version I referenced runs randomize log(length of list) times to ensure
a fair shuffle, but I thought once would be enough for this simple
script.

(Note to F\# team: perhaps List.randomize should be a part of the
standard F\# library?)
