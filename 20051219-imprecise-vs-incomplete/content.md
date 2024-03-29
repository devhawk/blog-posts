[Gareth](http://blogs.msdn.com/garethj) responds to the first tenet of
[Code is Model](http://devhawk.net/2005/10/05/code-is-model/):

> [A]lthough as an industry we desperately need to drag models kicking
> and screaming from the far left of pretty-picturedom a good long way
> to the right in the direction of precision, I don’t want to throw the
> baby out with the bathwater.
>
> I’m going to take it as a given that folks believe that precise models
> are valuable development artefacts. Why do I think imprecise models
> are also valuable? Here are three things that tools for imprecise
> models help you to do:
>
> 1.  Communicate with people about design
> 2.  Think out loud in a way that’s more shareable that your whiteboard
> 3.  Start with an imprecise model and progress gradually toward
>     precise models
>
> Hopefully the first of these is obvious – there is value in model as
> communication device – it’s just not enormous.  I’ve [talked before
> about the
> value](https://blogs.msdn.com/garethj/archive/2004/10/13/241985.aspx)
> of the second – I draw pictures on my whiteboard and when I’m on a
> conference call to Redmond, they’re effectively useless.
>
> The third is something I’ve only recently become a convert to.  I’m
> happy to have models which are not precise so long as I can still
> reason about them programmatically.  This allows me to have
> development processes that are about a quantitive process of iterative
> refinement.
>
> Here’s an example – in some infrastructure modelling tool, I have a
> node type which specifies a logical machine group.  One of its
> properties is the number of actual machines required to suit the
> proposed scale of the application to be deployed.  I’d like to be able
> to put “Depends on outcome of Fred’s scalability investigation” into
> that numeric field, or perhaps “4-\>8″.  I can still generate a pretty
> good report from this model, but I can’t really provision a set of
> physical servers from it.
>
> But here’s the kicker – it’s vital that I can write tools that
> programmatically assess this model and tell me what work needs to be
> done in order to make it precise.  I want to know exactly what must be
> done on this model before, for example, it is suitable for feeding
> into some kind of provisioning tool.  You might say it needs to be
> precisely imprecise; I prefer to think of it as quantifiable
> imprecision.
>
> [[Imprecise Models and Killing
> Hippies](http://blogs.msdn.com/garethj/archive/2005/12/07/imprecisehippies.aspx)]

The only thing I disagree with Gareth about is terminology. Like the
term architecture, model has become a catch-all for things that aren’t
code. Regular readers of this blog know I like to be more precise than
that. As such, I think items \#1 and \#2 from Gareth’s list aren’t
actually models at all. I think of them as pseudomodels, similar to the
concept of [pseudocode](http://en.wikipedia.org/wiki/Pseudocode).
Actually, I like the name pseudomodel – it also applies well to [Grady’s
scaffolding](http://devhawk.net/2005/12/16/scaffolding-isnt-a-model/).
Like psuedocode, pseudomodels have tons of value in communication and
reasoning about a problem but they can’t be used as development
artifacts.

As for the third, I think what Gareth is describing is an incomplete
model, rather than an imprecise one. If the model is imprecise, there’s
no way to programmatically reason about it. But if we look to code as an
example, obviously, there are many cases where code is incomplete. Every
compiler error you’ve ever seen is an example of incomplete code. And
because the language is precisely specified, the compiler can tell you
what needs to be done in order to make it precise, exactly as Gareth
requested. I don’t think of writing code as “progressing gradually
towards precision” and I doubt anyone else does either. And while I do
see development as an “iterative process”, I don’t think of it as
“iterative refinement”. Modeling shouldn’t be any different.

One area where I do see refinement being critical is in the development
of the modeling language itself. Traditionally, the language stays
stable while the program written with it changes. But with the
introduction of DSLs, it becomes possible for both to vary
independently. I would assume that a DSL would evolve over time to have
better “coverage” of a given domain. For example, if I was building a
[CAB DSL](http://devhawk.net/2005/11/23/thoughts-on-cab/), I would
implement support for WorkItem right off the bat, but supporting
WorkItemExtension would be much lower on the priority list. This
represents language refinement, but I would argue it’s a refinement of
coverage not a refinement of precision.
