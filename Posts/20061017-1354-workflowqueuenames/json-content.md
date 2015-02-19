As I wrote in my [last
post](http://devhawk.net/2006/10/17/WF+Clarifications+And+Corrections.aspx),
I’m doing a bunch of WF related work. I’m close to releasing some WF
related stuff I started building last week in
[Jon’s](http://www.masteringbiztalk.com/blogs/jon/default.aspx) class.
But I discovered something cool about the way WF’s queuing system works,
and wanted to blog about it.

> Side note - Speaking of Jon, he’s
> [joined](http://www.masteringbiztalk.com/blogs/jon/PermaLink,guid,5cc60ee3-38ce-4fcd-94d7-a8ca9b3b8d5d.aspx)
> the “WF is not a toy” conversation. He had an interesting point about
> the persistence service that I hadn’t thought of. If you use the SQL
> persistence service and you have TransactionScope in your workflow,
> you end up with a distributed transaction, even if these are all
> writing against the same SQL instance. That’s a good enough reason to
> write your own persistence service right there.

In the WF stuff I’m building, I need a way for the WF runtime to notify
a given workflow instance when something happens. WF has a low level
[queuing
system](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowqueuingservice(VS.80).aspx)
as well as the higher abstraction [data exchange
system](http://windowssdk.msdn.microsoft.com/en-us/library/ms735872(VS.80).aspx).
I’m more interested in low level knowledge of WF, so I decided to use
the queuing system.

In my implementation, the workflow instances only need to be notified
when specific events happen. That is, I’m not passing in any real data
on the queue – the arrival of the data is what’s important, not the data
itself. Queues are identified by name and I started by using a simple
string as my queue name. However, the queue name isn’t limited to be a
string, it supports any
[IComparable](http://msdn2.microsoft.com/en-us/library/system.icomparable.aspx)
class. This turned out to be a huge advantage for me.

Things worked fine when I was building a simple sequence, but when I
moved to a parallel activity things went south. Since I was using a
simple string, I ended up creating two queues with the same name, which
didn’t work out well. Furthermore, I have two different notification
situations. So I needed a way to have a unique queue name for the same
activity type in parallel branches of the workflow as well as supporting
two different notification situations.

Because queue name is IComparable instead of a string, I was able to
create two queue name types – one for each notification situation. Each
of these queue name types includes a string that I initialize to the
activity’s [qualified
name](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.componentmodel.activity.qualifiedname(VS.80).aspx),
which as per the docs is “always unique in a workflow instance”. So I
was able to kill two birds with one stone – supporting multiple parallel
activities as well as multiple notification scenarios. That’s pretty
cool. If they had used simple strings, I would have had to have a naming
system like “notificationscenario:notificationdata:activityname” and
then have to parse out the queue name string. In fact, I started down
this path before I remembered that queue name is IComparable. Using
IComparable is *much much* cleaner.
