I’In the space of 24 hours, [Martin
Fowler](http://martinfowler.com/bliki/ModelDrivenArchitecture.html) and
[Michael
Platt](http://blogs.msdn.com/michael_platt/archive/2004/02/02/66099.aspx)
both point to [this
article](http://www.bptrends.com/publicationfiles/01-04%20COL%20Dom%20Spec%20Modeling%20Frankel-Cook.pdf)
by Steve Cook about Microsoft’s views on MDA. This article plus Keith
Short’s
[whitepaper](http://msdn.microsoft.com/library/en-us/dnvsent/html/vsent_modelinglangs.asp)
and [PDC
presentation](http://microsoft.sitestream.com/PDC2003/ARC/ARCSYM3.htm)
([slides](http://microsoft.sitestream.com/PDC2003/ARC/ARCSYM3_files/Botto_files/ARCSYM3_Short.ppt))
pretty much lay out Microsoft’s position on OMG’s MDA.

> MDA is misnamed: it is not an architecture at all; it is a
> standardized approach to model-driven development based on abstraction
> of platform similarities. As promoted by the OMG, it does not address
> the broader issues involved in using integrated models, patterns,
> frameworks, and tools synergistically to support software product
> lines. Furthermore … the fact that the MDA is based on the use of the
> UML and MOF specifications restricts its usefulness even more.
> [[Domain-Specific Modeling and Model Driven
> Architecture](http://www.bptrends.com/publicationfiles/01-04%20COL%20Dom%20Spec%20Modeling%20Frankel-Cook.pdf)
> by Steve Cook, page 6]

Keith and Steve are architects in the VS.NET group, so this is straight
from the horse’s mouth. Steve joined MS last year, leaving IBM where he
had worked on (among other things, I’m sure) the UML 2.0 specification
process. It’s interesting that someone who has worked on UML so
extensively appears to have such a negative opinion of it’s direction.

Since “MDA” and “Model Driven Architecture” are registered trademarks of
OMG (even though they are often used to refer to the generic approach of
using models in the design process), Steve refers to Microsoft’s
approach as “Domain-Specific Modeling” while Keith writes about “the
idea of a family of inter-related, but individually specialized modeling
languages the industry is calling domain-specific languages”. Here’s the
short version of our vision / scope:

> At Microsoft, we firmly believe that modeling is an increasingly
> important aspect of the software development process, and we will
> integrate support for modeling into forthcoming releases of Microsoft
> Visual Studio. We believe that it is essential to design modeling
> languages very carefully to suit the skills of their target users: we
> intend to delight our users by giving them an experience of modeling
> that is intuitive, agile, productive, and seamless. We are targeting
> our first modeling products at areas that we believe will give most
> immediate benefit to our customers. At the recent Microsoft
> Professional Developers’ conference, we announced modeling tools–we
> call them designers–that help the developer to design and deploy
> distributed service-oriented applications. [[Domain-Specific Modeling
> and Model Driven
> Architecture](http://www.bptrends.com/publicationfiles/01-04%20COL%20Dom%20Spec%20Modeling%20Frankel-Cook.pdf)
> by Steve Cook, page 5]

BTW, the tool we announced at PDC is code named “Whitehorse”. If you
haven’t seen it, it’s described in our [developer tools
roadmap](http://msdn.microsoft.com/vstudio/productinfo/roadmap.aspx)
plus there’s a video about it on [MSDN
TV](http://msdn.microsoft.com/msdntv/episode.aspx?xml=episodes/en/20040129VSTUDIOAT/manifest.xml).

As a firm believer in
[UmlAsSketch](http://martinfowler.com/bliki/UmlAsSketch.html) approach,
I’m very excited about what we’re doing in this space. It’s a very
incremental approach. Whitehorse solves a very specific
real-world problem while MDA is out trying to boil the ocean.
