*(Harry is @ DevTeach in Vancounver with his family this week. He was
hoping to still do Morning Coffee posts, but that’s turned out to be
infeasible. So instead, you get a series of pre-written posts about
F\#.)*

For you LINQ early adopters, you may think you know everything about
type inference, but F\#’s uses it much more extensively. In C\#3 , you
can write “var o = new SomeObject()” and the compiler is smart enough to
figure out the variable o is of type SomeObject. Saves some typing, but
it’s not exactly brain surgery. F\# can not only infer the type of local
variables like C\#, but it can also infer type of a function’s input
parameters and return value based on how those variables are used in the
function. For example, in the Additive function, F\# can infer that the
“input” parameter is a char list because Token takes a generic list and
‘+’ is a char.

F\# automatically “generisizes” the functions you write. So if you write
a function for traversing a list, by default it will work on a list of
any type. You don’t have to explicitly declare the generics, F\#
automatically makes your code as generic as possible, based on your
usage of the variables.

What’s really interesting about this approach is that changes to
parameter or return types in a low-level function can have a rippling
effect up the stack. In my parsing code, I haven’t settled on the type
I’m going to use to represent the string to be parsed. My tests are all
short strings, so F\#’s intrinsic char list type is fine. However, I
don’t know how well that will work for longer strings like a typical
input file. F\#’s native parsing tools (based on lex & yacc which I
dislike) have a special LexBuffer class to represent the parse string.
However, I’ve written my code so I can change the type of the
lowest-level functions (NextChar and CheckForToken) and not affect the
rest of my code. That’s pretty wicked.

Type inference does have a downside. I guess VS has [rotted my
mind](http://charlespetzold.com/etc/DoesVisualStudioRotTheMind.html),
but I’m hooked on Intellisense. The BCL is too big to remember all the
classes and all the method parameters. Intellisense is kinda like
~~Google~~ a web search engine. If you sorta know what you’re looking
for, Intellisense helps close the gap to find it. Otherwise, it’s time
to break out the docs. However, if you’re inferring type based on usage,
Intellisense is out of luck. Honestly, there have been times where I’ve
put in an explicit type declaration to get Intellisense to work, written
the code, then removed the type declaration.
