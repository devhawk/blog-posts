4. All communication from the host to the workflows goes thru the
[WorkflowQueuingService](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowqueuingservice.aspx).
Unlike other WF services, the queuing service *is not* replaceable.
Communication from a workflow activity instance to the host goes thru
some other service. There is no “default” activity -\> host
communication service, though WF ships with the
[ExternalDataExchangeService](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.activities.externaldataexchangeservice.aspx).
You have to manually add the ExternalDataExchangeService to your
workflow runtime instance. WF also includes the
[wca.exe](http://windowssdk.msdn.microsoft.com/en-us/library/ms734408.aspx) utility
which generates strongly typed
[HandleExternalEvent](http://windowssdk.msdn.microsoft.com/en-us/library/ms734592.aspx)
and
[CallExternalMethod](http://windowssdk.msdn.microsoft.com/en-us/library/ms734739.aspx)
activities for your workflow. And according to
[Jon](http://www.masteringbiztalk.com/blogs/jon), the [External Data
Exchange
system](http://windowssdk.msdn.microsoft.com/en-us/library/ms735872.aspx)
was added specifically for SharePoint.

5. The built-in sequential and state machine workflows are customizable.
So if you wanted to have a custom designer or validation experience for
an otherwise standard sequential or state machine workflow, you can
inherit from the standard workflow type and add the custom validation
and / or designer support. For example, as I [wrote
earlier](http://devhawk.net/2006/10/09/things-i-didnt-realize-about-wf/),
you can load a workflow from XAML. XAML workflows can’t support the Code
Activity. So if you wanted to use the standard sequence designer but
disallow the use of the Code Activity, you wouldn’t have to rewrite the
sequence activity from scratch.

6. You can execute workflows across a farm, similar to how you build a
web farm. Workflows that get persisted to the persistence service can be
loaded on any node in the farm. Of course, like web servers in a farm,
you’d have to have the same bits installed on all the machines in the
workflow farm. Sounds like an opportunity for something like
[Application Center](http://www.microsoft.com/applicationcenter/default.mspx) for WF.

7. The built in [SQL Persistence
Service](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.sqlworkflowpersistenceservice.aspx)
is a toy. When you start your workflow engine, the SQL Persistence
Service will auto-load all the existing persisted workflows into memory,
as an “optimization”. So if you have thousands of order workflows
persisted in your database and you decide to bring another workflow
processing node online, that new workflow processing node will happily
load *ALL* of the outstanding orders that it can find in the database.
This service should have been included as a sample like the [file based
persistence service
sample](http://windowssdk.msdn.microsoft.com/en-us/library/ms741725.aspx) rather
than
[described](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.sqlworkflowpersistenceservice.aspx)
as “a fully functional persistence service” in the docs.

8. WF Web Service integration is also a toy. WF leverages basic ASMX for
all it’s web service integration, so your only choice for web services –
[consuming](http://windowssdk.msdn.microsoft.com/en-us/library/ms735862.aspx)
or
[exposing](http://windowssdk.msdn.microsoft.com/en-us/library/ms733602.aspx)
– is atomic request/response style services. You can have a workflow
with multiple operations, but the default ASMX hosting infrastructure
squirrels the WF Instance ID in the ASP.NET session, which will time out
in twenty minutes (by default). Furthermore, the built in ASMX workflow
host doesn’t provide an option to specify the web service namespace, so
it ends up with the default http://tempuri.org namespace. Again, like
the SQL Persistence, this should have been included as a sample, not
included in the standard activities.

9. Activities can [generate
code](http://windowssdk.msdn.microsoft.com/en-us/library/ms734652.aspx).
In the previous item, I mentioned there’s basic ASMX hosting integration
for a workflows. Turns out the WebService Activities generate that
hosting code as part of the workflow compilation process. So in other
words, if you add a WebService activity to your workflow, the activity
will inject the custom ASMX hosting code into your compiled workflow. In
this WebService activity case, the injected code isn’t very good, but
the fact you can do this at all is *very* cool.
