Back at [POPL 06](http://www.cs.princeton.edu/~dpw/popl/06/), [Tim
Sweeny](http://en.wikipedia.org/wiki/Tim_Sweeney_(game_developer)) of
[Epic Games](http://www.epicgames.com/) delivered a talk titled “[The
Next Mainstream Programming Language: A Game Developer’s
Perspective](http://www.cs.princeton.edu/~dpw/popl/06/Tim-POPL.ppt)“. I
imagine he was a little too busy getting [Gears of
War](http://www.gearsofwar.com/) out the door to attend the [Lang.NET
Symposium](http://www.langnetsymposium.com/). Too bad, as there were
interesting solutions presented that solved two of the issues Tim
identified in his his POPL talk.

One of the issues Tim identified is one of Modularity. Gears of War uses
the [Unreal Engine
3](http://www.unrealtechnology.com/html/technology/ue30.shtml). In other
words, UE3 is a game framework and GoW uses that framework. As you might
expect, this framework is exposed as a hierarchy of objects. Tim’s
example had “Actor” as the base class in the framework hierarchy, with
classes like “Player”, “Enemy” and “InventoryItem” inheriting from
“Actor”. Then he had game-specific classes like “Dragon” and “Sword”
inheriting from the generic “Enemy” class. The problem is that game
developers also need to extend the functionality of the framework’s base
classes. That is, they need a game-specific version of “Actor” or
“InventoryItem” in addition to the game specific subclasses like
“Dragon” and “Sword”. Unfortunately, the current generation of languages
don’t support this, so game developers often clone the entire framework,
which is error-prone and hard to support.

At Lang.NET, [Professor Markus Lumpe](http://www.cs.iastate.edu/~lumpe/)
demonstrated an implementation of the Classbox concept for .NET.
Classbox is essentially a solution to the modularity problem Tim
identified. They’ve modified C\#’s using syntax to apply to individual
classes. When using a class in this fashion, you can add extensions to
it like new methods and new fields. I’m not sure the scope of these
extensions – whether it’s the file with the using clause or the
containing assembly – but it’s key to realize this is a local extension.
The original framework isn’t modified at all. Within you assembly, the
metadata for the extended classes is re-written to include the new
extension. So to use Tim’s example, if you extended the framework’s
“Actor” class, it would create a YourGame.Actor class that inherited
from the Framework.Actor and contained your extensions. Then it would
re-write the inheritance metadata (again, only for your assembly) so
classes that inherited from Framework.Actor such as Framework.Enemy and
Framework.InventoryItem now inherit from YourGame.Actor.

Now I’m sure there are some nefarious uses of this type of inheritance
tree hacking. But there are scenarios such as Tim’s Gaming Framework
example where this behavior is exactly what you want. I spoke briefly to
Markus and at length with Hua Ming, one of Markus’ grad students, about
perhaps having a keyword indicating that a class is “classbox enabled”
rather than allowing any class to be classboxed in this way. Looking
forward to their future work.

Another issue Tim identified was Reliability. He called this problem “If
the compiler doesn’t beep, my program should work”. He showed a very
simple method to iterate an index array and transform the associated
vertex from a vertex array by a provided matrix. A simple function –
four lines of code. Yet, the compiler can’t detect null pointer or
out-of-bound array access. Adding code to check those runtime conditions
would easily double or triple the length of the function. While modern
managed languages (C\#/VB/Java) have made great strides in eliminating
“random memory overwrites” (via type safety) and “memory leaks” (via
garbage collection) they don’t help you with these other types of
dynamic failures.

At Lang.NET, Microsoft Researcher [Mike
Barnett](http://research.microsoft.com/users/mbarnett/) demonstrated
[Spec\#.](http://research.microsoft.com/specsharp/) Spec\# is a superset
of C\# that solves these and other types of dynamic errors. The idea, in
Mike’s words, is to better bridge developer intent and code by embedding
certain specifications into the code itself. Furthermore, it uses a
combination of static and data flow analysis to detect the types of
dynamic errors Tim described in his talk. So if you took Tim’s simple
transform function and fed it into the Spec\# compiler, it would warn
you of the possible null pointer dereferences. Furthermore, you can
eliminate this warning by specifying the caller never pass you a null
pointer. This is simply accomplished by adding an exclamation point to
the type declaration. In other words, the vertex array method parameter
would be declared “Vertex[]! vertices” to indicate you can’t pass in a
null array. With Spec\#, you can also specify method pre and post
conditions, which can solve the out-of-bound array access issue, as well
as object invariants, which can specify the valid states an object
instance can be in.

I didn’t see Tim give this presentation, I only saw the slides after the
fact. But I get the feeling that one of Tim’s points is that game
development is extremely cutting edge, and the issues they’re running
into now will be mainstream issues in a few years. Good to see language
researchers are already well on their way to solving these issues.

The only thing I worry about is when will these ideas make it into
mainstream languages? And will they be extensions to existing languages
– i.e. will C\# 4.0 and VB 10 include classboxing and specifications –
or will they be entirely new languages? How much can you improve a
language by adding features until it collapses under it’s own weight?
