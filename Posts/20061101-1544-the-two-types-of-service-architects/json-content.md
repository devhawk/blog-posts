Tomas Restrepo
[comments](http://www.winterdom.com/weblog/2006/10/29/WCFAndDuplexChannels.aspx)
on my recent SSB and WCF posts:

> [Harry
> Pierson](http://www.winterdom.com/weblog/ct.ashx?id=d948c914-95e1-4fe1-ba48-392fd6468be7&url=http%3a%2f%2fdevhawk.net%2f)
> asks how well [WCF supports long running
> tasks](http://www.winterdom.com/weblog/ct.ashx?id=d948c914-95e1-4fe1-ba48-392fd6468be7&url=http%3a%2f%2fdevhawk.net%2f2006%2f10%2f29%2fIs%2bWCF%2bQuotStraightforwardquot%2bFor%2bLong%2bRunning%2bTasks.aspx).
> He suggests that WCF does not support them very well, and says that’s
> one reason he likes SQL Server Service Broker so much. I’d say SSSB is
> a good match only as long as the long running tasks you’re going to be
> executing are purely database driven and can be executed completely
> within the database. Sure, this is an “expanded universe” with the CLR
> support in SQL Server 2005, but even so it makes me nervous at times
> ![](http://www.winterdom.com/weblog/smilies/happy.gif).
>
> You could also consider using a custom service with MSMQ or something
> like BizTalk Server for this if you had long running processes that
> were not completely tied to the DB (or a single DB for that matter).

Sam Gentile [follows
up](http://feeds.feedburner.com/~r/SamGentile/~3/43478464/New-and-Notable-118.aspx):

> In that same post, but I needed to call it out separate, Tomas
> rightfully says, “I’d say SSSB is a good match only as long as the
> long running tasks you’re going to be executing are purely database
> driven and can be executed completely within the database,” in
> response to [Harry liking Service Broker so
> much](http://devhawk.net/2006/10/28/is-wcf-straightforward-for-long-running-tasks/).
> Talk about a narrow edge case. That’s way I never really got excited
> or cared about Service Broker. Its a narrow solution to a special edge
> case when everything is database driven and can be executed totally
> inside the database. That’s the old Microsoft Data-Driven Architecture
> for sure. Me, I’d rather have a rich Domain-Driven architecture most
> of the time. Then if you have Oracle databases in your architecture
> too, where does it leave you? Nowhere.

As you might expect, I have a few comments,  clarifications and
corrections.

First, Tomas’ statement that Service Broker only supports service logic
“executed completely within the database” in flat out wrong. Service
Broker can be used from any environment that can connect to SQL Server
and execute DML statements. If you can call SELECT/INSERT/UPDATE/DELETE,
then you can also call BEGIN DIALOG/SEND/RECEIVE/END CONVERSATION. This
includes Windows apps and services, web apps and services, console apps
and even [Java apps](http://msdn.microsoft.com/data/ref/jdbc/). Of
course, you can also access Service Broker from stored procedures if you
wish, but you’re not limited to them as Tomas suggested.

Tomas’ misconception may come from a feature of Service Broker called
[Activation](http://msdn2.microsoft.com/en-us/library/ms171617.aspx).
Activation is a feature of Service Broker that [dynamically scales
message processing to match
demand](http://msdn2.microsoft.com/en-us/library/ms171601.aspx). For
example, Service Broker can be configured to launch a new instance of a
specified stored procedure if messaging processing isn’t keeping up with
incoming message traffic on a given queue. This is called [internal
activation](http://msdn2.microsoft.com/en-us/library/ms171585.aspx) and
because it uses stored procedures it does execute within the database as
Thomas said. Service Broker also supports [external
activation](http://msdn2.microsoft.com/en-us/library/ms171581.aspx) where
it notifies an external application when activation is needed. You do
have to build an application to host your service logic and handle these
notifications, but that application doesn’t execute within the
database. So while you could argue that it’s easier to execute your
service logic within the database (no need to build a separate host
app), it’s not required.

Given that you don’t have host your service logic in the database, then
you’re also not limited to “a single DB” as Tomas suggests. You don’t,
in fact, have to put your Service Broker queues in the same database
with your business data. So if you have Oracle in your environment, like
the scenario Sam mentioned, you would host your service logic in an
external application that processed messages from a queue in a SQL 2005
database while accessing and modifying business data from tables in the
Oracle database. Using multiple databases does require using distributed
instead of local transactions, but if you’re using MSMQ as Tomas
recommended, you’re already stuck with the DTC anyway.

Finally, I didn’t get Tomas’ “purely database driven” or Sam’s
“everything is database driven” comments at all. While there are
exceptions, the vast majority of systems I’ve ever seen/built/designed
have essentially been one or more stateless tiers sitting in front of a
stateful database. If it’s a traditional three tier web app, there’s a
stateless presentation tier, a stateless business logic tier and a
stateless data access logic tier. For a web service, there’s no
presentation tier, but there’s is the stateless SOAP processing tier
typically provided by the web service stack. Does this mean the vast
majority of web apps and services are  “purely database driven” too? If
so, then I guess it’s a good thing, right?

In the end, maybe there are two types of service architects – those that
believe the majority of services will be atomic and those that believe
the majority of services will be long running. For atomic services,
Service Broker is overkill. But if it turns out that most services are
long running, [WCF’s lack of
support](http://devhawk.net/2006/10/28/is-wcf-straightforward-for-long-running-tasks/)
is going to be a pretty big roadblock.

I’m obviously in the long running camp. I’m not sure, but I get the
feeling this is the less popular camp, at least for now. We’ll have to
wait to see, but I do know is that whenever someone brings me what they
think is an atomic business scenario, it doesn’t take much digging to
reveal that the atomic scenario is actually a single step of a long
running business scenario that also needs to be automated.

Here’s a question for Tomas, Sam and the rest of you: Which group do you
self select into? Are most services going to be atomic or long running
in the (pardon the pun) long run?
