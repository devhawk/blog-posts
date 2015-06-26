Grady Booch @ the OOPSLA 05 [Structured Design and Modern Software
Practices Panel](http://www.oopsla.org/2005/ShowEvent.do?id=304) at
(according to the
[transcript](http://wiki.cs.uiuc.edu/OOPSLA05/Structured+Design+and+Modern+Software+Practices))

> The most important part is the executable code. I typically throw my
> models away, but I always save my source code. I design because I need
> abstractions to help me reason out my projects.

Grady Booch ranting on [his
blog](http://www-106.ibm.com/developerworks/blogs/dw_blog_comments.jspa?blog=317&entry=102317&ca=drs-bl):

> It’s sad how one can be
> [misquoted](http://www.metacase.com/blogs/jpt/blogView?showComments=true&entry=3308396982)
> and then for that misquote to be picked up by [someone
> else](http://blogs.msdn.com/stevecook/archive/2005/11/08/490303.aspx)
> with both then making a spin of the events to support their position.
> How silly is that.
>
> Juha-Pekka Tovanen quoted me from my OOPSLA panel as saying that “when
> the project gets closer to the delivery you normally throw away UML
> models.”
>
> \<snip\>
>
> Let me be excruciatingly clear: Over the years I have been consistent
> in saying that in a) the most important artifact of any software
> development organization is executable code and yet b) modeling is
> essential in constructing such executables. This is because c) models
> help us reason about, specify, construct, and document
> software-intensive systems at levels of abstraction that transcend
> source code (and the UML is the accepted open standard for doing so).
> That being said, it is a pragmatic reality that d) some models are
> essential (and should be retained) while others are simply scaffolding
> (and should be discarded). I have never said and do not say now that
> one should throw away all models, as Juha-Pekka then Harry then Steve
> imply.

First off, Grady claiming to be misquoted his pretty disingenuous.
Juha-Pekka’s account of what Grady said on the panel is pretty spot on.
Furthermore, Grady claming that I implied he said “throw away all
models” is also disingenuous. I [specifically
wrote](http://devhawk.net/2005/11/07/grady-booch-sez-throw-models-away/)
that I thought Grady was being taken out of context:

> I’ve gotta believe that this comment was somehow taken out of context
> and that the Grand Poobah of the [Common Semantic
> Model](http://devhawk.net/2004/12/10/booch-on-dsls-round-3/)
> doesn’t actually believe that tossing the model at the end of the
> project is a good thing.

But he-said/she-said nitpicking aside, where’s the guidance on which
models are essential and which are “simply scaffolding”. Last time I
checked the UML spec, none of the models are labeled as disposable. How
about Rational Rose? Any dialog boxes that pop up reading: “Don’t worry
keeping this model up to date, it’s just scaffolding”? I don’t think so.

Obviously, working at a higher level of abstraction helps you reason
about a project. But reasoning at high levels of abstraction doesn’t
mean you’re modeling. When a building architect sits down with a
prospective customer and a sketchpad, they may be working out great
ideas but no one is going to call the result a blueprint. Grady’s
scaffolding “models” break nearly every tenant of [Code is
Model](http://devhawk.net/2005/10/05/code-is-model/). Scaffolding
isn’t precise or deterministic. And if it ends up in the recycle bin, I
guess it’s not intrinsic to the development process.

Actually, it’s good that scaffolding isn’t a model. It means Grady is
specifically *not* suggesting to throw away models. He just needs to
get his terminology right.

As for Grady’s request for “just one DSM out there in production”, Don
[lists a
few](http://pluralsight.com/blogs/dbox/archive/2005/12/14/17469.aspx):
Workflow languages (XLANG and WF), Business Rules Engine Languages and
Build lanugages (MSBuild, Ant and NAnt). Juha-Pekka pointed to this list
of [DSM case studies](http://www.dsmforum.org/cases.html). I’d also add
UI Designers such as the Windows Forms and ASP.NET designers in Visual
Studio. In the Window Forms case, the code is stored in a seperate file
(yay partial classes) and are specifically marked: “do not modify the
contents of this method with the code editor.” In the ASP.NET case, the
code for an ASPX file isn’t even generated until runtime. And how about
HTML itself? I’m thinking HTML qualifies as “in production”?
