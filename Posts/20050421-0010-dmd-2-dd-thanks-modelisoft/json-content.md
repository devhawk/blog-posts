Anyone who’s played with the [DSL
toolkit](http://lab.msdn.microsoft.com/teamsystem/Workshop/DSLTools/)
knows that it’s a 50/50 experience. Building the domain model means
using a pretty straight forward
[designer](http://dnjonline.com/images/articles/architect/mar05_DSL.jpg)
(itself a DSL). Building a desinger means groveling around in a really
ugly XML file. I hear that the designer design experience is going to
get better in later builds, but for now it’s all hand coding. If you
work thru the DSL Toolkit tutorial, you spend a lot of time finding and
replacing names of domain model elements in the designer definition
file. But now, Modelisoft has a utility called
[DMD2DD](http://www.modelisoft.com/Dmd2dd.aspx) (i.e. Domain Model
Definition to Designer Defintion) that automates all of that nasty find
and replace / hand coding. Once you build your DMD, you run their tool
and it automatically adds reasonable defaults to the DD for new domain
model elements and removes designer elements from the DD for domain
model elements that have been removed. The [DMD2DD
tutorial](http://modelisoft.dyndns.org/Nouveau/Dmd2ddTutorial.aspx) is
much more straightforward than the DSL walkthru, since you don’t do all
that hand editing.

Haven’t tried it yet, but if works anywhere near as well as the tutorial
makes it look I’m going to keep a sharp eye on Modelisoft. From their
[homepage](http://modelisoft.dyndns.org/Nouveau/Default.aspx), it looks
like their primary business is generating and reverse engineering .NET
code from/for Rational Rose. I wonder what they’re doing w/ the DSL
Toolkit?
