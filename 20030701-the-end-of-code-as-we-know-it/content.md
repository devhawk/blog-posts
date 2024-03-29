Early Adopter has a
[couple](http://radio.weblogs.com/0117167/2003/06/30.html) of
[thoughts](http://radio.weblogs.com/0117167/2003/07/01.html) on code
generation that mirror my own. It’s not the end of coding as we know it.
My big problem with code generation is intelligence: developers
(usually) have it, code generating programs don’t. They can only
generate what they’ve been programmed to. Which means they’re only good
for redundant tasks. Data access code is a good example of this. But I
can’t write my whole program that way.

Code generation is a simple first step, but it’s only the first step on
a road that ends in language innovation. The point of higher level
programming languages is to eliminate the redundant mindless tasks.
While code generation is valuable (the original C++ compiler was simply
a C code generator) you don’t stop there and declare victory. Developers
are much more productive when the higher level abstraction is embedded
in the language. VB.NET’s event handling mechanism is a great example of
this. In C\#, you (or the tool) need to write a bunch of code to wire up
event handlers. In VB.NET, I just declare the method handles a specific
event with the “Handles” keyword. True, VS.NET writes that for you in
C\#, but you still have to manually manage it. I’ve deleted event
handler methods in C\# countless times, which results in a compiler
error since the auto-magically generated code isn’t auto-magically
deleted.

Places where code generators are useful are indicative of future
[disruptive programming](http://devhawk.net/2003/06/11/to-infinity-and-beyond/)
[language innovations](http://devhawk.net/2003/01/17/disruptive-programming-language-technologies/).
