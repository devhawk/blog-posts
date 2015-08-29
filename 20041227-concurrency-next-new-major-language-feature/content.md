Several people have pointed out Herb Sutter’s great article on
concurrency entitled [The Free Lunch Is
Over](http://www.gotw.ca/publications/concurrency-ddj.htm). When I
blogged last week about new possible features of [“full-grown” OO
languages](http://devhawk.net/2004/12/21/new-features-for-full-grown-oo-languages/)
I mentioned dynamic typing but I didn’t think about concurrency. I think
Herb is right: “programming languages…will increasingly be forced to
deal well with concurrency” as applications get more CPU bound. Maybe I
need to take another look at
[Comega](http://www.research.microsoft.com/Comega/) (or Cw). Cw extends
C\# in two areas – data typing/querying and concurrency. The concurrency
extension used to be called Polyphonic C\#, but the name got changed
when it merged with Xen/X\#. (BTW, there’s a new Cw release (v1.0.2) but
no specifics as to changes other than no longer needed VS.NET 2003 to be
installed in order to use it.)

Cw adds the idea of asynchronous methods and something called chords –
sets of methods with the same method body. The chord method body in only
executed when all the associated methods have been called. In the
[simple buffer
tutorial](http://www.research.microsoft.com/Comega/doc/comega_tutorial_buffer.htm),
the buffer class has a synchronous Get method and asynchronous Put
method. If you call Get before Put, it blocks until Put is called, then
the method body is executed. If you call Put before Get, then the Put
call returns immediately (it is async after all) but the call is queued
so that when Get is called, the method body is executed immediately.
FYI, the Cw docs have a variety of other
[tutorials](http://www.research.microsoft.com/Comega/doc/comega_tutorials_concurrency_extensions.htm)
of async methods and chords.

BTW, speaking of my post on full grown OO languages…My father
[suggested](http://devhawk.net/CommentView.aspx?guid=283ef85e-e61c-46f0-b0a2-87ec14c8bc06)
that I not jump to conclusions regarding the
[X-develop](http://www.x-develop.com/xdevelop_extend.htm)‘s support for
what they [term](http://www.x-develop.com/xdevelop_extend.htm) “toy
languages or little domain specific languages”. In fact, Hans Kratz of
[Omnicore](http://www.omnicore.com/) (which makes X-develop) had [this
to
say](http://blogs.msdn.com/devhawk/archive/2004/12/21/329215.aspx#329604):

> This comment on our website was not intended to bash DSLs at all.
> Instead we wanted to make clear that the plugin API in X-develop is
> powerful enough to allow integrating support for “full-grown”
> languages without placing arbitrary restrictions on language
> complexity.
>
> For a language developer/integrator this is a plus regardless if he
> wants to integrate support for a DSL or “full-grown” programming
> language.

Makes sense. Maybe I was just too sensitive to the use of the word “toy”
so close in proximity to “DSL”. Sorry about that Hans. 
