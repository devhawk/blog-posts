Robert Bauman left the following
[comment](http://blogs.msdn.com/devhawk/archive/2005/02/24/379473.aspx#379697)
on my [Separated at
Birth](http://devhawk.net/2005/02/24/mda-and-software-factories-separated-at-birth/)
post?

> The nice thing about using a general purpose modeler is that you can
> house all of your requirements, use cases, etc. in the same model.
> Rational provides the 4+1 view, Sparx Systems Enterprise Architect
> provides several views out of the box that you can easily navigate
> around… It means that everyone is working off of the same set of
> rules.
>
> As soon as you start putting those rules into Visual Studio, they
> change and deviate from the model. It’s true that the AndroMDA does
> require you to remember to use certain stereotypes, but that’s all
> part of the game anyhow.
>
> That’s like saying, “well, the GoF patterns are nice, but then you
> have to remember what it means to have an Observer pattern”.
> Furthermore, UML tools let you customize the list of stereotypes that
> show in the dropdown, and even the picture that should be associated
> with those stereotypes. Why mess with some other modeling standard
> when you can do it all with a proper UML tool

The point I was making is that when you start using the class model to
design something other than classes, you’re using a domain specific
language – even if you’re using a general purpose modeling tool.  Take a
look at this [example](http://www.andromda.org/modeling.html) from the
AndroMDA website. Their example reads:

> You tag a CustomerService class with a \<\<Service\>\> stereotype.
> AndroMDA sees this stereotype, looks into its internal dictionary of
> available code generation components (called “cartridges”) and finds
> the EJB cartridge. In the EJB cartridge, two templates correspond to
> the \<\<Service\>\> stereotype: SessionBean.vsl and
> SessionBeanImpl.vsl. AndroMDA uses the internal representation of
> CustomerService loaded from the model, calls the processing engine
> twice, and two output files are generated: CustomerServiceBean.java
> and CustomerServiceBeanImpl.java.

In this example, classes with the \<\<Service\>\> stereotype actually
generate two code classes – the Bean and the BeanImpl. But if we were
using the class diagram *as it was intended*, wouldn’t there be a
one-to-one mapping between a class in the model and a class in the code?
As soon as you break that one-to-one mapping, you’re no longer modeling
classes. A \<\<Service\>\> is something at a higher level of abstraction
than a class – otherwise it wouldn’t take two classes to implement it.

BTW, I’m not saying that there is anything wrong with this approach at
all! I’m just pointing out the similarities between an approach that
many people are using to achieve practical results with UML today and
what you can do with the modeling tools that Microsoft is building.

The key difference comes down to tools. Yes, you can use the class
diagram and stereotypes to model stuff at a higher level of abstraction
like Services and Entities. But putting a square peg in a round hole
like that has problems. Since you’re not using the tools as they were
designed, you have to manually enforce rules that the tool doesn’t know
about. Sure, you can add some semantics via stereotypes, but you can’t
take anything away. How easy is it to build a valid class model that
isn’t a valid service model? Pretty easy. For example, do services
support inheritance? Classes do. My EJB is a little rusty, but I don’t
think beans do. It certainly doesn’t make sense for a service to inherit
from an entity or vis-versa. Yet, the class modeler will happily let you
do this, even though it makes no sense in the domain you’re actually
trying to model.

The value of domain specific languages is that have a tool that is
specifically designed to model the domain you’re working in. If you’re
designing classes, of course you’d want to use a class model. We have a
[great
one](http://msdn.com/library/en-us/dv_vstechart/html/clssdsgnr.asp)
coming in VS2005. But if you’re designing services or entities or page
flows or whatever else, why wouldn’t you want a tool that’s specific to
the problem at hand?
