1. You can customize how you load workflows. My favorite part of
[Customizing the Microsoft® .NET Framework Common Language
Runtime](http://www.microsoft.com/MSPress/books/6895.asp) is custom
loading assemblies from a [structured
storage](http://msdn.microsoft.com/library/en-us/stg/stg/structured_storage_start_page.asp)
file. In WF, you can load workflows by
[type](http://windowssdk.msdn.microsoft.com/en-gb/library/ms594868.aspx)
or [from
XAML](http://windowssdk.msdn.microsoft.com/en-gb/library/ms594869.aspx).
Of course, these the XAML – or even the types – can be loaded from
anywhere, or even generated on the fly. If you need more control, you
can swap out the [default workflow loader
service](http://windowssdk.msdn.microsoft.com/en-gb/library/system.workflow.runtime.hosting.workflowloaderservice.aspx) with
one of your own creation.

2. You can swap out the [default workflow
scheduler](http://windowssdk.msdn.microsoft.com/en-us/library/ms735790.aspx).
How about a scheduler based on the [Concurrency and Coordination Runtime
(CCR)](http://channel9.msdn.com/wiki/default.aspx/Channel9.ConcurrencyRuntime)?

> Side note – How about a official home page for CCR? And while I’m
> asking, how about a download for CCR separate from [MS Robotics
> Studio](http://msdn.microsoft.com/robotics/)?

3. You can add any object to the workflow runtime as a service. You’re
not limited [the services the WF runtime
knows](http://windowssdk.msdn.microsoft.com/en-us/library/ms734738.aspx)
about. Of course, WF won’t use your service, but you can build
activities that use it. This is likely to be huge for getting data in
and out of the workflow instance.
