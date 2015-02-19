One of the cool things about having a blogging conversation with
[someone on the other side of the world](http://blogs.msdn.com/garethj)
is that while you sleep they are thinking of a [good
response](http://blogs.msdn.com/garethj/archive/2005/12/19/505732.aspx)
to your post. The only downside? Having to deal with rampant misspelling
like “artefacts”.
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)

Anyway, Gareth responds to [my
post](http://devhawk.net/2005/12/19/Imprecise+Vs+Incomplete.aspx):

> Until we get models that are perfectly aligned with our business
> domains, we’ll have people who want to create models but who get them
> slightly wrong from a precision point of view – usually in the places
> where the imperfect models interact with other aspects of the system
> across or down the abstraction stack.
>
> With code, you’d likely not want to have people check in sources that
> don’t even compile and then hand them off to other folks who do make
> them compile, but I think that’s exactly the type of process we’ll see
> emerging in modelling for a while. I feel this way because I don’t
> foresee us getting modelling languages of *pure business intent* 100%
> right for some time yet – we’re simply not close enough to formal
> enough descriptions of systems as intensely human as a business yet.
> However, I hope we won’t want to try and keep modelling as locked away
> with the techies as traditional development has been. (Hope I’m not
> talking myself out of a job here…)
>
> [[Pseudomodels and
> intent](http://blogs.msdn.com/garethj/archive/2005/12/19/505732.aspx)]

I keep saying incomplete and Gareth keeps saying imprecise, but I think
we can both agree on the term “imperfect”. There’s a massive difference
between having an precise language that is imperfect versus a language
that is inherently imprecise like UML.

However, I think the primary disconnect here has to do with Gareth and
my views on how higher abstracted languages will evolve. Gareth’s
comments about modeling “pure business intent”, having “models that are
perfectly aligned with our business domains” and not “keep[ing]
modelling as locked away with the techies” imply to me that Gareth wants
to work down from the high level business abstractions into
implementable technical abstractions. Frankly, I don’t think that’s very
likely. Leapfrogging a few levels of abstraction hasn’t worked well in
the past (CASE and UML/MDA) and I don’t think it will work well now.

I find it much more likely that we will build higher level abstractions
directly on top of existing abstractions. Again, this is similar to the
way C++ built on C which in turn built on ASM. Sure, that could keep
modeling “locked away with the techies” for a while, but we’re already
beginning to see the light at the end of that tunnel. [Windows Workflow
Foundation](http://msdn.microsoft.com/windowsvista/building/workflow/default.aspx)
is a significant leap in abstraction while also being something than
non-techies can use. Reports about about Sharepoint “12″ embedding the
WF engine and FrontPage “12″ providing a Workflow Designer for building
SharePoint workflows. While I imagine (and I haven’t used any of the new
Office “12″ suite so this is pure conjecture) these WF tools are
targeting the “power user”, they certainly aren’t only for developers.

Believe me, I would love to be wrong about this. I would much rather
work down from or business user intent than up from the technical
foundation. I just don’t think it’s feasible. The process Gareth
describes breaks the “Model Transformation must be Deterministic” tenet
of [Code is Model](http://devhawk.net/2005/10/05/Code+Is+Model.aspx),
though the word “must” may be to strong to allow for language evolution.
