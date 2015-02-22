Since David Ing responded to my
[REST/CRUD/CRAP](http://devhawk.net/2007/05/24/rest-is-neither-crud-nor-crap/)
entry [on his
blog](http://www.from9till2.com/PermaLink.aspx?guid=2dbee669-07fd-435e-a5f9-51f709ef183f),
I guess that means I respond to his response here, right?

Actually, this is going to be very short(\*) because I mostly agree with
what David wrote. For example:

> If we say stuff like ‘REST shall/must replace all foolish WS-\* SOAP
> systems (insert Nelson-style HaHa here)’ then we are just repeating
> the same lessons as before – One size won’t fit all and there is no
> One Ring to Bind Them illusion in REST as well. If you have something
> complex that fits the WS-\* style then maybe REST isn’t the droid you
> are looking for.

Of course, this begs the question “what is complex?” David described
complex as “long running transaction updating multiple distributed
stores”. Personally, I’d replace “stores” with “systems” and I hate term
“long running transaction” so I would have written “long running
operation” or “business process”, but grammatical nitpicking aside that
certainly seems like a fair description. Certainly, most of the
scenarios I’m looking at in my day job could be described as being long
running and updating multiple systems. David says later that he thinks
“a lot of apps don’t need to be modeled that way”, but I’m not aware of
the alternatives so I’ll let him expand on this on his own blog. I’ll
try to get to writing about my thoughts around protocol state next week.

I did disagree with this one point:

> We may *say* REST is really about a protocol state and not CRUD, but
> unless the rest of the world gravitates to that view then I’m afraid
> it just won’t be. If, say, through some ongoing groundswell of common
> usage, people start modelling entities as dereferenceable URI’s and
> using POST to do Create and Updates, then REST *will* be about CRUD by
> default. This is all very unacademic and unjust, but thems the breaks
> peachy. The lesson from SOAP is not to fight it by trying to
> re-educate the masses after they get a perception in their head.

I think it doesn’t really matter how the rest of the world gravitates,
it only matters how you as the the service provider choose to expose
your service. If you’re doing something simple like ATOM publishing, you
can probably get away with REST as CRUD. (Would that be hi or lo REST?)
If you’re doing something more complex, either in terms of being long
running or needing multiple updates in one atomic operation like [Tim’s
airline
example](http://pluralsight.com/blogs/tewald/archive/2007/04/27/47031.aspx),
you’ll probably need to gravitate towards REST as protocol state. But
can’t the two models can co-exist nicely, even in the same app? No
re-education required.

UPDATE – From [Fielding’s
Dissertation](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm):
“REST relies instead on the author choosing a resource identifier that
best fits the nature of the concept being identified”. My point exactly.

------------------------------------------------------------------------

(\*) Wow, this post wasn’t that short at all. Can you imagine how long
this would have been if I had mostly disagreed with David?
