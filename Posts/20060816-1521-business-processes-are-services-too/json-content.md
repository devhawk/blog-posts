I’ve been having a
[conversation](http://unhandledx.blogspot.com/2006/08/state-in-services-architecture.html)
with [Piyush Pant](http://unhandledx.blogspot.com/) over on his blog
that started as a [comment he
left](http://devhawk.net/CommentView,guid,4d427e9f-7775-4aae-a487-8cf8c1d8a991.aspx#commentstart)
on my [Services Aren’t
Stateless](http://devhawk.net/2006/07/27/Services+Arent+Stateless.aspx)
post. He thinks that I’m “missing the crucial point here by implicitly
conflating business process and service state”. While Piyush hasn’t
really defined what he means by these terms, I think I understand what
he’s getting at. Yes, process and service state are different in many
ways, but they are also similar in that they are both service private
data.

Pat Helland (side note – I wish Pat would start blogging again) wrote an
article some time ago titled [Data on the Outside vs. Data on the
Inside](http://msdn.microsoft.com/library/en-us/dnbda/html/dataoutsideinside.asp) where
he talked about the differences between service private data and data in
the space between the services. For example, data on the outside is
immutable, requires an open schema for interop, doesn’t need
encapsulation and is representable in XML. Service private data is not
immutable, doesn’t need an open schema for interop, requires
encapsulation and is typically stored in a SQL RDBMS. So on this front,
process and service state are both service private data so conflating
them makes some sense.

However, what’s not in the article is the idea of Resource and Activity
data. Not sure why Pat didn’t include this in the article, but he was
talking about it as [far back as PDC
2003](http://www.stucharlton.com/blog/archives/000041.html). [Stu
Charlton](http://www.stucharlton.com/blog/) described the difference
between resource and activity data in his [Autonomous
Services](http://www.theserverside.net/tt/articles/showarticle.tss?id=AutonomousServices)
article:

> **Activity Data** – This is “work in progress” data for any
> long-running business operation, and is usually encapsulated by
> business logic. A classic example is a shopping cart in any e-commerce
> system. This data is mutable, but typically has low concurrency
> conflicts, as it is not widely shared. Typically activity data retires
> after a long running operation completes, and may be archived in a
> decision support system for later analysis.
>
> **Resource Data** – This is “state of the business” data, which
> represents the resources of an organization, and is usually
> encapsulated by business logic. Examples are: room availability in a
> hotel, inventory levels in a warehouse, account statuses, employee and
> customer information. Some resources have a small life span, others
> may last a very long time (years). Resource data is usually volatile
> with potential for high concurrency conflicts.

So I’m fairly sure that when Piyush says “process state” I should hear
“activity data”. Similarly “service state” is “resource data”. The
differences between activity and resource data lead to some interesting
implementation artifacts, which I assume he getting at when he says I’m
conflating the two. For example, since activity data like shopping cart
has low or no concurrency issues, using an optimistic concurrency scheme
is entirely appropriate, which you would never use for highly volatile
resource data like warehouse inventory levels. In fact, since activity
data doesn’t have concurrency issues, you could even store it inside an
instance of [workflow](http://wf.netfx3.com/) or
[orchestration](http://msdn.microsoft.com/biztalk/learning/dev/orch/default.aspx),
which gets serialized to a persistent store when it’s in an idle state.

However, the fact that activity and resource data is handled differently
doesn’t mean that most services won’t have activity data. When [Thomas
Erl says](http://webservices.sys-con.com/read/136190.htm) that that
stateless services is a “common principle of service orientation”,
essentially what I think he’s saying that services should only have
resource data. And as I said before, this seems wrong to me. Sure,
*some* services will be stateless. But *all* services? Services
implement business capabilities. Most business capabilities are long
running processes. Doesn’t that imply that most services in the
enterprise will need to be long running workflows or orchestrations?

So for the most part, Piyush and I just seem to have different names for
the same concepts. The one issue I have with Piyush’s descricription of
process and service state is that he seems to implicitly assume that
processes aren’t services. Why not? Again, not *all* services will be
processes, but if you’re not exposing processes as services, how exactly
are you exposing them?
