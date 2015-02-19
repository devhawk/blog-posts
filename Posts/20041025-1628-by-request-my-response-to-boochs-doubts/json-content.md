Mac [asked
me](http://blogs.msdn.com/devhawk/archive/2004/10/25/247289.aspx#247367)
to respond to [Booch’s doubts about
DSLs](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=64398)
in his blog. This is at least the second time Booch expressed his
skepticism about DSLs, having [also done
so](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=50148)
back in May. The upshot of Booch’s argument is that the semantics across
all stakeholder viewpoints must be common.

> “There is no doubt that different domains and different stakeholders
> are best served by visualizations that best speak their language…but
> there is tremendous value in having a common underlying semantic model
> for all such stakeholders. Additionally, the UML standard permits
> different visualizations, so if one follows the path of pure DSLs, you
> essentially end up having to recreate the UML itself again, which
> seems a bit silly given the tens of thousand of person-hours already
> invested in creating the UML as an open, public standard.” (Grady
> Booch, [Expansion of the
> UML](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=50148),
> May 21st 2004)
>
> “[W]hile I agree that development is a team sport and that multiple
> stakeholders must collaborate in weaving together their diverse,
> interdependent views, one still needs to have a common semantic basis
> for all those languages. If you accept that not unreasonable position,
> you will end up covering the identical semantic ground as has the UML
> – albeit in an open manner, quite unlike Microsoft’s historical
> record.” (Grady Booch, [Domain-specific
> Languages](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=64398),
> Oct 25th, 2004)

Stuart [responded to this
argument](http://blogs.msdn.com/stuart_kent/articles/142330.aspx) back
in May:

> “[Booch] seems to imply that a domain specific-language is just about
> having a different graphical notation – that the semantics that
> underpin different DSLs is in fact the same – only the notation
> changes…[W]hat if the semantic model excludes the concepts that the
> stakeholders actually want to express?…Surprise, surprise, there are
> differences from one domain to another, from one organization to
> another. Far from there being a common semantics, there are
> significant and actual differences between the interpretations of
> models being taken.” (Stuart Kent, [Domain Specific Modelling. Is UML
> really the best tool for the
> job?](http://blogs.msdn.com/stuart_kent/articles/142330.aspx), May
> 26th, 2004)

In other words, Booch’s argument against DSL’s falls apart if we don’t
have common semantics across all phases of the system’s lifecycle. And
frankly, we don’t. Furthermore, Booch offers no explanation as to *why*
you need a common semantic model across all the stakeholders, instead
choosing to call it a “not unreasonable position”. Sorry, but I’m not
ready to accept the need for a common semantic model as an axiom. I will
accept that you need traceability between viewpoints, but I think that
is more readily achievable by precise transformations between viewpoints
than by a common semantic model of all stakeholder viewpoints.

Common semantic model starts to sound too much like “monolith” as far as
I’m concerned. UML 2 addresses a subset of the stakeholder’s viewpoints
and many people consider it unusable. After last year’s OOPSLA, Fowler
[commented](http://martinfowler.com/bliki/UnwantedModelingLanguage.html)
“Even on the MDA panel at OOPSLA, the pro-MDA speakers based their
assumptions on the fact that they would be using a simplified subset of
UML”. If we can’t get a single usable semantic model across UML 2, how
are we going to have a single usable semantic model across all the
stakeholder viewpoints? Booch paints a pretty rosy picture of UML , but
I think the reality of UML is much less attractive, certainly according
to the customers I’ve spoken to.
