[Denny Figuerres](http://www.figuerres.com/) left the following
[comment](http://weblogs.asp.net/devhawk/archive/2004/08/29/222328.aspx#222366)
on my [last
post](http://devhawk.net/2004/08/29/the-most-popular-modeling-environment-ever-so-far/):

> [O]ne of my “wish” items would be a kind of editor that would be a
> merge of flow-chart and text editor so that I could view my function
> as text or as a kind of zooming diagram with more details as I
> drilldown. like when you use a map program, first you see an area and
> major routes, rivers, lakes etc… and as you zoom-in you see a smaller
> area with more detail. at some point you are down to a single line of
> code that is an expression of some kind.

I think this is a great idea, and is completely in line with Software
Factories. Denny, what you’re talking about is working at higher levels
of abstractions. If you read the [Software Factories
article](http://theserverside.net/articles/showarticle.tss?id=SoftwareFactories)
on [TheServerSide.NET](http://theserverside.net/), Jack writes:

> How…do we work at higher levels of abstraction? We use more abstract
> models, and move the platform closer to the models with either
> frameworks or transformations, as illustrated in Figure 4.

![](http://image.devhawk.net/blog-content/20040830-1303-zooming-in-from-high-levels-of-abstraction/IM04.gif)

> -   We can use a framework to implement higher level abstractions that
>     appear in the models, and use the models to generate snippets of
>     code at framework extension points. Conversely, the models help
>     users complete the framework by visualizing framework concepts,
>     and exposing its extension points in intuitive ways. A pattern
>     language can be used instead of a framework, as described by
>     [Hohpe and Woolf](http://www.eaipatterns.com/). This requires the
>     tool to generate the pattern implementations, in addition to the
>     completion code. This approach is illustrated in Figure 4 (a).
> -   Instead of a framework or pattern language, we can generate to a
>     lower level DSL. We can also use more than two DSLs to span a wide
>     gap, leading to progressive transformation, where models written
>     using the highest level DSLs are transformed into executables
>     through a series of refinements, as shown in Figure 4 (b).

I think we’ll see a combination of these two approaches. Obviously, as
an industry, we have lots of experience building frameworks and I don’t
see those going away anytime soon. The second approach, however, is much
more fascinating as you get that “zooming” effect that Denny describes.

One thing to note about this zooming approach of using higher level
abstractions – different systems use different abstractions. The
abstractions you use to build an ERP system are not the same as the ones
you would use to build a telephone billing system. So the view of the
top-level abstractions will be very different, even if they both end up
implemented on the same platform using the same programming language.
