Over the past couple of weeks, I’ve gotten a chance to spend time
investigating the [Guidance Automation
Toolkit](http://msdn2.microsoft.com/en-us/teamsystem/aa718948.aspx). For
those who aren’t familiar with GAT, it is the underlying enabling
technology that powers [p&p’s Software
Factories](http://msdn2.microsoft.com/en-us/practices/bb190387.aspx).
Several of p&p’s factories include data access guidance, but that works
against an actual database rather than a
[VSTDB](http://msdn2.microsoft.com/en-us/teamsystem/aa718807.aspx)
project. Given my [newfound
love](http://devhawk.net/2007/03/19/vstdb-where-have-you-been-all-my-life/)
for VSTDB + my interest in GAT, I thought I would whip up some simple
automated guidance.

The key word in that last sentence is “thought”. Turns out that
authoring guidance in GAT is extremely unfriendly. GAT’s unit of
automation is called a recipe, which consists of arguments, wizards and
actions. Arguments are GAT’s equivalent of variables, wizards gather
argument data from the user and actions execute changes to the solution
based on the values of the arguments. There’s more granularity to the
GAT authoring model – for example, GAT arguments have optionally have
value providers and converters (which should be called validators) – but
you get the basic idea.

What makes GAT so hard is that all these recipe elements are wholly
independent. This makes individual recipe elements easy to write and
recipes fairly modular, but at the cost of making recipe very difficult
to write. Your recipe has to define both the list of these elements that
it uses as well as their interconnections. For example, arguments
optionally contain value providers and converters. They are exposed to
the user in wizards as either custom pages or arguments. They are fed
into actions as input parameters. Action input parameters can also come
from the output parameters of other actions. All these interconnections
have to be hand coded in XML with fully specified type names like
“Microsoft.Practices.RecipeFramework.VisualStudio.Library.Templates.TextTemplateAction,
Microsoft.Practices.RecipeFramework.VisualStudio.Library”. Ugh.

The good news for GAT is that help is on the way. Clarius’ [Software
Factories Toolkit](http://softwarefactoriestoolkit.net/) includes a
[graphical domain specific
language](http://softwarefactoriestoolkit.net/RecipeDesigner_final.html)
for authoring recipes. With that tool, you can pick the various recipe
elements from a list and connect them graphically instead of hand coding
all of that in XML. But why do we have this problem in the first place?
How much are we gaining by using this XML format in the first place?
Frankly, I don’t think very much. I think it would make more sense to
define recipes in code than XML.

I was talking to [Michael Lehman](http://blogs.msdn.com/mglehman/) about
[Project Glidepath](http://projectglidepath.net/), which is built on
GAT. However, Glidepath only uses GAT for integration with Visual
Studio’s menu system (which seems [much more
difficult](http://msdn2.microsoft.com/en-us/library/bb164639(VS.80).aspx)
than it needs to be, but that’s a separate post). Instead of GAT’s
recipe system, Glidepath plugins simply expose an Execute() method.
Within that method, the plugin can do whatever it wants. Michael showed
me the code behind the [Vista Bridge
package](http://projectglidepath.net/blog/blogs/glidepath/archive/2007/04/04/166.aspx),
and it is MUCH simpler than the GAT equivalent. I could see having a
little more structure than just Execute(), but GAT seems like overkill
in comparison.

Sometimes [complexity is
necessary](http://devhawk.net/2005/11/23/as-simple-as-possible-but-no-simpler/).
But I can’t help but think that GAT’s complexity wasn’t really
necessary. Wouldn’t it have been simpler and just as modular to define a
recipe in code instead?
