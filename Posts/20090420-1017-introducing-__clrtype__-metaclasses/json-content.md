Everyone knows [Anders announced at
PDC08](http://channel9.msdn.com/pdc2008/TL16/) that [C\#
4.0](http://code.msdn.microsoft.com/csharpfuture/Release/ProjectReleases.aspx?ReleaseId=1686)
will include new features (aka the dynamic keyword + the DLR) that makes
it much easier for C\# to call into dynamically typed code. What you
probably don’t know is that IronPython 2.6 includes a new feature that
makes it easier for IronPython code to be called by statically typed
code.

While the vast majority of .NET is available to IronPython, there are
certain APIs that just don’t work with dynamic code. In particular, any
code that uses Reflection over an object’s CLR type metadata won’t work
with IronPython. For example, while [WPF
supports](http://devhawk.net/2008/11/17/ironpython-and-wpf-part-3-data-binding/)[ICustomTypeDescriptor](http://msdn.microsoft.com/en-us/library/system.componentmodel.icustomtypedescriptor.aspx),
Silverlight only supports data binding against reflectable properties.
Furthermore, any code that uses custom attributes inherently uses
Reflection. For example, Darrel Hawley recently blogged a [WCF host he
wrote in
IronPython](http://www.darrellhawley.com/2009/03/writing-ironpython-wcf-host.html),
but he wrote the WCF service in C\#. You can’t write WCF services in
IronPython because WCF expects service classes [to be
adorned](http://msdn.microsoft.com/en-us/library/ms731835.aspx) with
[ServiceContract](http://msdn.microsoft.com/en-us/library/system.servicemodel.servicecontractattribute.aspx)
and
[OperationContract](http://msdn.microsoft.com/en-us/library/system.servicemodel.operationcontractattribute.aspx)
attributes (among *many* others). IronPython users want access to use
these APIs. Support for custom attributes is one of the most [common
requests](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-July/007733.html)
we get – it’s currently the [5th highest vote getter among open
issues](http://ironpython.codeplex.com/WorkItem/View.aspx?WorkItemId=20489).

In IronPython 2.6, we’re adding the ability to customize the CLR type of
Python classes. This means you can add custom attributes, emit
properties, whatever you want. For those of you who’ve been dreaming of
implementing WCF services or databinding in Silverlight purely in
IronPython, then this is the feature for you.

In a nutshell, IronPython 2.6 extends Python’s
[metaclass](http://docs.python.org/reference/datamodel.html#customizing-class-creation)
feature that lets you to customize the creation of classes. In the
metaclass, you can implement an IronPython-specific method
\_\_clrtype\_\_ which returns a custom
[System.Type](http://msdn.microsoft.com/library/system.type.aspx) of
your own creation that IronPython will then use as the underlying CLR
type of the Python class. Implementing \_\_clrtype\_\_ gives you the
chance to implement whatever reflectable metadata you need:
constructors, fields, properties, methods, events, custom attributes,
nested classes, whatever.

Over a series of posts, I’ll be demonstrating this new feature and
implement some common scenario requests – including Silverlight
databinding and WCF services – purely in Python. Quick warning:
\_\_clrtype\_\_ uses low level features like Python metaclasses,
[Reflection.Emit](http://msdn.microsoft.com/en-us/library/system.reflection.emit.aspx)
and [DLR
Binders](javascript:window.location.href='http://dlr.codeplex.com/Project/Download/FileDownload.aspx?DownloadId=51534';)
so these posts will be deeper technically than usual. Don’t worry – this
isn’t the API interface we expect everyone to use. Eventually, we want
to have an easy to use API that will sit on top of the low-level
\_\_clrtype\_\_ hook.
