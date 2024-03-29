*(Harry is @ DevTeach in Vancounver with his family this week. He was
hoping to still do Morning Coffee posts, but that’s turned out to be
infeasible. So instead, you get a series of pre-written posts about
F\#.)*

It’s not all puppy dogs and ice cream with F\#. Here are a few things
that I didn’t like about the lanugage.

### Linear Scoping

In C\#, a given piece of code is able to call any function it wants to
(limited by CAS and visibility of course). If I define two functions,
the first can call the second even thought the compiler has never seen
the second function when it’s parsing the first.

F\# has linear scoping like C++ does. You can’t call functions that
haven’t already been defined in the file (or a previous file that’s
already been fed to the compiler). This makes writing mutually recursive
functions (A calls B, B calls C, C calls A) fairly annoying. Typically,
in F\# we declare functions with “let”. But in the Additive function
above, we’re declaring the function with “and”. By using “and”, we’re
basically chaining together function declarations into a logical unit.
Then, you mark the first function declaration in the chain as recursive,
and now those methods are enabled for mutual recursion. Not exactly
intuitive.

Frankly, I like C\#’s ability to bind to methods that haven’t been
declared yet. I wonder if this is an intrinsic issue with FP or F\#
scoping rules, or if it’s something they could fix if they took the
time.

### No Method Overloading

In my CheckForToken method, I use a string type to hold the token I’m
looking for, since tokens can often be multi-character. However, for one
character tokens, this is over kill. Not just in terms of creating a
string object to contain just one character, but also in how I pattern
match the token against the input string. If we’re only looking for one
character, we can skip recursion entirely. Yet there’s no way to define
two functions called Token that have different signatures.

Given type inference, this isn’t surprising, but it’s still a little
annoying for folks coming from C\# land.

### Limited VS support

More evidence of a rotted brain. F\#’s integration into VS is limited at
best. It does syntax highlighting and debugging, but that’s about it.
The problem I keep running into is that I have two projects – my main
project and my test project. Even though I’ve define the test project as
being dependent on the main project, it doesn’t automatically compile
the test project when I change the main project. So I keep doing
something like fix a bug, recompile, then run NUnit to see if the light
turned green. It doesn’t, because I haven’t rebuilt the test project and
it’s still referencing the old version of the main project. Now that
it’s a [“real”
product](http://blogs.msdn.com/dsyme/archive/2007/10/17/s-somasegar-on-taking-f-forward.aspx),
I’m hoping to see better integration into VS08. Maybe even an F\#
Express that leverages the new VS08 shell?
