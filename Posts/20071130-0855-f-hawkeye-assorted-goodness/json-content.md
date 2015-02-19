*(Harry is @ DevTeach in Vancounver with his family this week. He was
hoping to still do Morning Coffee posts, but that’s turned out to be
infeasible. So instead, you get a series of pre-written posts about
F\#.)*

### Significant Whitespace

If you’re a Python programmer, you already know this one. Instead of
delineating code blocks explicit with curly braces or begin/end
keywords, F\# uses whitespace. Code blocks are indented relative to
their parent. This enforces readability standards as well as
conciseness. You can see that in the code Additive function above.
Technically, this is optional in F\# if you specify the \#light compiler
option, but pretty much all the docs and books assume this by default.

### Custom Operators

This is minor, but cool nonetheless. Many languages let you overload
existing operators like + and \*. However, F\# goes a step further and
also lets you create custom operators. You just pick a combination of
symbols that isn’t already being used and define a function for it. For
example, in my parsing code I wanted a simple way to adorn my input
parse strings in my tests so that I could later easily change their type
if I changed the type of NextChar and CheckForToken as described above.
I defined the “double bang” operator !!. Currently, double bang converts
a string into a character list, but originally it simply returned the
string since I had written my Char and Token classes in terms of string.
