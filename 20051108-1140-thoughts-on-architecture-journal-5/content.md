If you haven’t had a chance to check out the [most recent
issue](http://www.microsoft.com/architecture/default.aspx?pid=journal.5)
of [The Architecture
Journal](http://www.microsoft.com/architecture/default.aspx?pid=journal.5),
I highly recommend it. In particular, I liked [Metropolis and SOA
Governance](http://www.microsoft.com/architecture/library.aspx?pid=journal.5&id=msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/Jour5metro.asp)
by [Richard Veryard](http://www.veryard.com/so/soapbox.htm) and Philip
Boxer as well as [Value Driven
Architecture](http://www.microsoft.com/architecture/library.aspx?pid=journal.5&id=msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnmaj/html/Jour5Value.asp)
by Charlie Alfred.

Richard and Philip dive deep on governance, leveraging Chris Alexander’s
[Nature of Order](http://www.natureoforder.com/) and Pat Helland’s
[Metropolis](http://www.microsoft.com/architecture/library.aspx?pid=journal.2&id=msdn.microsoft.com/architecture/journal/default.aspx?pull=/library/en-us/dnmaj/html/aj2metrop.asp).
In particular, I liked the section on the structural implications of
service orientation. As per Alexander, large complex systems can’t be
designed in the traditional manner – they evolve over time. This leads
Richard and Philip to discuss the highly fascinating concept of
asymmetric demand. To quote the article: “Asymmetry means that the forms
of demand are increasingly specific to the context in which they arise.”
I can’t do the concept justice – just go read the article – but my
takeaway is that what you sell isn’t necessarily what people are buying.
Take [SQL Server](http://www.microsoft.com/sql) for example – you know,
one of those products that [launched a new version
yesterday](http://www.microsoft.com/windowsserversystem/applicationplatform/launch2005).
Amazing product, but nobody buys SQL Server on its own. It’s always
bought in the context of a larger solution. SQL is extremely flexible,
so the number of contexts in which it’s appropriate is extremely high.
But still, how many business people have ever said “We need to buy a
database”. I’m guessing zero. Business people say things like “We need
to keep better track of our shipments/inventory/customers/orders/etc” or
“we need to better insight into business trends” or “we need to be able
to demonstrate our compliance with \<insert government regulation
here\>”. These business problems all need a database like SQL Server,
but they need more than SQL Server alone. That’s the asymmetry.
Microsoft sells SQL Server (among other things of course, but let’s
focus for a second), but customers are buying a solution to their
business problem.

On the topic of business problems, Charlie’s article on value modeling
flat out states that traditional requirements based design is
ineffective. Charlie’s agrees with Jack and Keith that requirements
define a system, not the problem the system is intended to address. As
such, often critical design decisions are made while defining
requirements that have drastic impact on the development of the system
down the road. As a somewhat silly example, if I define requirements for
a software system, I am precluding any non-software system solution to
the problem. What if the best solution for a problem isn’t software?
Because of mistaken assumptions I’ve made in the requirements gathering
process, I’ve eliminated the best solution to the problem. Woops.

And Charlie has this great quote about the requirements gathering
process:

> Traditional approaches, like use case scenarios or business/marketing
> requirements, start by focusing on the types of actors with which the
> system interacts. This approach has several major limitations:
>
> -   It focuses more on what things the actors do, and less on why they
>     do them.
>
> -   It tends to stereotype actors into categories, where all
>     individuals of a type are essentially the same (traders, portfolio
>     managers, or system administrators, for example).
>
> -   It tends to ignore differences in limiting factors (for example:
>     Is an equity trader in New York the same as one in London? Is
>     trading at market open the same as trading during the day?).
>
> -   It is based on binary outcomes: the requirement is met or it
>     isn’t. The use case completes successfully or it doesn’t.
>
> There is a very logical, practical reason why this approach is
> popular. It uses sequential and classification-based reasoning, so it
> is easy to teach and explain, and it can produce a set of objectives
> that are easy to verify. Of course, if simplicity were the only goal
> that counted, we’d all still be walking or riding horses to get from
> one place to another.

I love the point about simplicity. Often, we do things in IT that are
simple for IT but that are more complex (and thus bad) for the business.
For example, a web app may be the easiest to deploy for IT, but if I
have a mobile workforce that web application will cause more business
headaches than it solves in IT.

In other Architecture Journal related news, you can sign up for a [free
subscription](http://www.microsoft.com/architecture/register/defaultc.mspx),
so what are you waiting for?
