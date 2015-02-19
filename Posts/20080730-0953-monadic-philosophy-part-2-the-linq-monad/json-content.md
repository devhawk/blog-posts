If you don’t come from a
[math](http://en.wikipedia.org/wiki/Monad_%28category_theory%29) or
[philosophy](http://en.wikipedia.org/wiki/Monad_%28symbol%29) background
(and I don’t) “monad” sounds like a made-up word. Of course,
understanding OO’s use of terms like “class” and “object” can be hard to
grok at first too. But at least those terms have some grounding in
real-world concepts that non-math geeks come across. Because I couldn’t
draw an analogy of monads to anything at first, it made grasping the
concept of monads very hard for me.

It’s such a unfamiliar word that the F\# team doesn’t like it either:

> “[W]hen the designers of F\# talked with the designers of Haskell
> about this, they agreed that the word *monad* is a bit obscure and
> sounds a little daunting and that using other names might be wise.”\
>  [F\# Workflows and Haskell Monads, [Expert
> F\#](http://www.expert-fsharp.com/default.aspx), p232]

The F\# team thought about calling them workflows, but settled on
*[computation
expression](http://research.microsoft.com/fsharp/manual/spec2.aspx#_Toc202383771)*.
Frankly, I don’t like these names much better. Workflow is too easily
confused with
[WF](http://msdn2.microsoft.com/en-us/library/bb628617.aspx) and if the
term computation expression is way to generic. Isn’t everything in
programming a computation expression? I think I’ll just stick with
monad.

Of course, if there was a short, pithy way of describing a monad, I’m
sure *that’s what we’d call them*. It’s a kinda complicated idea, so
there’s no simple two or three word phrase that accurately describes it.
“Sequential computation with context flow” is the best I could come up
with. It’s a crappy description, but here’s an elegant example that most
.NET programmers are probably already familiar with.

``` {.brush: .csharp}
var Orders = new List<Order>()

//code to populate orders omitted

var q = Orders
    .Where(x => x.OrderDate < DateTime.Now)
    .OrderBy(x => x.OrderDate)
    .Select(x => new {ID = x.OrderID, Date = x.OrderDate})
```

Yes it’s true: LINQ is a monad. The two basic concepts about a monad
from my description above is that it’s a) a sequence of operations and
b) there’s a context that flows from operation to operation. We see both
here in this simple LINQ query. I realize I’m using what looks like a
LINQ to SQL query here, but for the sake of argument let’s assume that
this is all happening in memory.

The query is a sequence of three operations: Where, OrderBy and Select.
LINQ has a set of standard query operators that you can mix and match in
whatever order you need to. Part of the monad’s job is to enforce the
sequence of actions. For C\#, that’s not really a big deal, since it has
explicit sequencing already. However, other languages like Haskell use
lazy evaluation, meaning there is no explicit order of execution. Many
lazy evaluation languages use monads in areas, such as I/O, where order
of execution matters.

While C\# doesn’t need any help to enforce execution order, monads are
very useful in the way they flow context between the operations. In the
case of LINQ, all the standard query operators take an IEnumerable\<T\>
as their first parameter and return an IEnumerable\<T\>. Since they have
the same inputs and outputs, they can be plugged together in whatever
order is required. Yet, you don’t see any reference to GetEnumerator or
the enumerator objects they return in the LINQ code above. All that code
is hidden inside the LINQ query operators so the LINQ developer doesn’t
have to look at it.

If you squint hard enough, IEnumerable kinda looks like a functional
construct. It exposes a single method (GetEnumerator) and can be passed
around much the same way functional languages like F\# pass around
first-order functions. Furthermore, the result of calling GetEnumerator
is an IEnumerator object that likewise exposes one main function
(MoveNext). In other words, you can think of IEnumerable sort of like a
function that returns a function that you call to iterate the
collection.

So to sum up, a monad is a sequence of operations in a specific order
that automatically flows context from one operation to the next. In the
LINQ example, C\# has built-in constructs – IEnumerable\<T\>, foreach
and yield return – that makes the monad seem less foreign (which is why
I used it as my first example!) However, as we’ll see, the concepts of
sequence and context flow in a monad still hold even if we’re not using
built in features of C\# to implement them.
