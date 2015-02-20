[Barry
Kelly](http://barrkel.blogspot.com/) [thinks](http://devhawk.net/CommentView,guid,6ce19647-2f6f-4d41-aff6-b202df528d21.aspx#commentstart)
that “programmers would understand monads better if they were described
as a design pattern”. I agree 100% and would love to see a monad design
pattern written out using p&p’s [pattern
form](http://msdn.microsoft.com/en-us/library/ms979209.aspx). The one
thing I would note on this is that certain language constructs can make
working with certain design patterns easier. For example, C\# obviously
has great language level support for the [Iterator design
pattern](http://en.wikipedia.org/wiki/Iterator_pattern). Once you’ve got
language level support, it doesn’t really feel like a design pattern
anymore, it feels like a language feature. I mean, given that you can
write OO code in a language like C, does that mean technically OO is a
“design pattern”. I don’t think so.

A commenter named atp [warned
me](http://devhawk.net/CommentView,guid,6ce19647-2f6f-4d41-aff6-b202df528d21.aspx#commentstart)
not to “fall into the newbie trap of thinking that monads are about
sequencing operations. They aren’t. A large number of monads (for
example, Reader) are commutative and do not enforce any sort of
statement ordering.” Fair enough. For example, you switch the order of
some LINQ operators and still end up with the same result. If you switch
Where and Select, you should end up with the same output (assuming the
where clause isn’t invalidated by the select projection). But from a
C\#/F\# perspective, I don’t really care about monads for enforcing
order anyway – the language has that natively. I care much more about
the context flow aspect of monads, which it sounds like atp thinks we
should be focused on anyway. Works for me.

Finally, [Yuri K.](http://elder_george.livejournal.com) [pointed
out](http://devhawk.net/CommentView,guid,f0fb5461-eb30-4268-a4b3-7262276768cb.aspx#commentstart)
that we aren’t really stuck with the nested lambda expression syntax in
C\#. In Luke Hoban’s [Monadic Parser Combinators using C\#
3.0](http://blogs.msdn.com/lukeh/archive/2007/08/19/monadic-parser-combinators-using-c-3-0.aspx)
post, he implements a Where, Select and SelectMany extension method for
his Parser delegate type, which allows him to plug into C\#’s query
comprehension syntax. He’s 100% correct and I considered including this
fact in my post. However, the mapping between query comprehension and
the Bind and Result functions is a little murky, so I skipped it.

For C\# query comprehensions, basically SelectMany does double duty, not
only binding the parser and the parser generating function (which Luke
called ‘selector’), but also taking the two parse values and calling to
a projector function and returning the projection return value in a
Result. By implementing SelectMany, you can rewrite the TwoValues parser
like this:

``` csharp
static Parser<string> QueryTwoItems()  
{  
    return from v1 in Item()
           from v2 in Item()
           select string.Format("{0}{1}", v1, v2);  
}
```

which looks pretty much identical to the F\# monadic syntax version.
Luke also implements Where, which I have in my F\# parser library as
Satisfy. Where takes a parser and only returns the parser result if the
provided boolean predicate returns true. Select is a projection, similar
to SelectMany but only used with a single parser. I have a couple of
specific projectors in my F\# library (Ignore which tosses the parse
result and Listify which turns a single result into a single item list)
but I haven’t had any need for a generic projector like Select. I’m
assuming Luke only implemented Select to make the query comprehension
work when you don’t have multiple from statements.
