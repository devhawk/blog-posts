[Javier](http://www.dsic.upv.es/~jmunoz) got me thinking when he left a
[comment](http://devhawk.net/CommentView.aspx?guid=0b5ae99e-f851-4a35-bc55-ad9912559622)
to my square peg model post. I’ll get to intended semantics of class
diagrams in another post, but I wanted respond to the latter part of the
following comment:

> I suppose you are assuming that the Class Diagram is intended to be
> used for design purposes. Then, a class diagram could be considered
> simply as a code visualizer.

That’s a great point that ties into something I’ve been thinking about
lately: the Class Designer in VS2005 is not a modeling tool, it’s a
visualization tool. For me, the difference comes down to abstraction and
transformation. In VS2005, the Class Designer is built on top of the
same metamodel as the underlying language. This means there is no
transformation and that the diagram and the text of the code itself are
at exactly the same level of abstraction. To me, you’re not modeling
unless you’ve raised the level of abstraction.

However, while I think VS2005′s class diagram is a visualization, I also
believe that UML’s class diagram is a model. UML is not built on the
same metamodel as the underlying language. It’s at a slightly higher
level of abstraction. That’s why you can generate Java, C++, Ruby or C\#
from a given class model. That transformation step between diagram and
code is what makes UML a model. Granted, the class model of UML is
intentionally close in abstraction to the code, but it’s still an
abstraction.

The only reason it matters IMO if a given diagram is a model or a
visualization is to be explicit about the need for transformation. And
even the need or lack of transformation is only important for usage
purposes. Each method has its pros and cons. UML can’t model C\# code as
precisely as VS2005 can visualize it, but VS2005 can’t be used to
generate code for non .NET languages.

Javier’s point cuts right to the idea that modeling classes “for design
purposes” isn’t particularly valuable as classes are such a low level
abstraction. I think that’s why so many people use UML’s class model as
a general purpose “thing” designer. The question is, what was the class
diagrams intended use?
