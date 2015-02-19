One of the cool things about WF is that you can specify the Guid it uses
to identify a workflow instance.
[WorkflowRuntime.CreateWorkflow](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime.createworkflow.aspx) has
an
[overload](http://windowssdk.msdn.microsoft.com/en-us/library/ms594870.aspx)
(actually
[two](http://windowssdk.msdn.microsoft.com/en-us/library/ms594866.aspx))
where you can specify said workflow instance identifier. This is awesome
for using WF with Service Broker, as Service Broker already has the idea
of a [conversation
group](http://msdn2.microsoft.com/en-us/library/ms166131.aspx) which is
roughly analogous to a [workflow
instance](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowinstance.aspx).
Conversation groups even use a Guid identifier, so there’s not even any
mapping required to go from conversation group to workflow instance.

However, things get less cool when you call
[WorkflowRuntime.GetWorkflow](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime.getworkflow.aspx).
If you call GetWorkflow with a Guid that has no corresponding workflow
instance, it throws an InvalidOperationException instead of just
returning null. That seems like an odd choice. If you’re going to
support specifying the instance identifier when you create the workflow
instance, doesn’t it make sense that you should also gracefully support
the scenario where an instance identifier is invalid?

I see two ways to deal with this:

-   Iterate through the list of
    [loaded](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.workflowruntime.getloadedworkflows.aspx)
    and
    [persisted](http://windowssdk.msdn.microsoft.com/en-us/library/system.workflow.runtime.hosting.sqlworkflowpersistenceservice.getallworkflows.aspx)
    workflow instances looking for the one in question.
-   Call GetWorkflow and swallow the exception.

I ended up picking the “Swallow the Exception” approach as I can’t
imagine the iteration thru every loaded and persisted instance would be
very performant. But swallowing exceptions always makes me feel icky.
I’m a fan of the “exceptions only for exceptional situations” approach
and as far as I’m concerned, an invalid instance identifier isn’t that
exceptional. Still, it’s a minor annoyance, especially given how cool it
is to be able to specify the workflow instance identifier in the first
place.
