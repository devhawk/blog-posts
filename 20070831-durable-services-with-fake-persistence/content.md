I’ve been investigating the new WCF/WF integration in .NET Framework
3.5. I want to understand how the new context features work.
Unfortunately, there’s not much info out there (that I could find at any
rate). You’re pretty much stuck with the
[samples](http://www.microsoft.com/downloads/details.aspx?FamilyID=2611a6ff-fd2d-4f5b-a672-c002f1c09ccd&DisplayLang=en)
and Jesus Rodriguez’s [overview of durable
services](http://weblogs.asp.net/gsusx/archive/2007/06/14/orcas-durable-services.aspx).
So I sat down to dig a little deeper.

> Note, since there are no docs on this stuff as I write this, many of
> the links below are [Reflector](http://www.aisto.com/roeder/dotnet)
> code links.

I started by lifting the [DurableCalculator
sample](http://msdn2.microsoft.com/en-us/library/bb410782(VS.90).aspx)
contract and service implementation and dumping it into a new WCF
Service Library project. I did this for two reasons. First, VS08 has
added a WCF Service Host much like VS05 added the ASP.NET Development
Server. Very cool. But the existing sample is still written to be hosted
in IIS, so I wanted to change that. Second, and much more important, I
wanted to start with a vanilla config file. I knew it wouldn’t work out
of the box, but the point of this exercise was to learn how this works
under the covers.

When you fire up the durable service with the vanilla config file, you
get an error (as expected). Services marked with the
DurableServiceAttribute require a binding that supports the context
protocol. WsHttpBinding, the default binding when you create a new
service, doesn’t. However, it’s easy to fix by switching to
[wsHttpContextBinding](http://referencesource.microsoft.com/#System.ServiceModel/System/ServiceModel/WSHttpContextBinding.cs,a42bcbded9a8a4e9)
instead. Via Reflector, we see that wsHttpContextBinding inherits from
wsHttpBinding and [adds a ContextBindingElement to the binding element
collection](http://referencesource.microsoft.com/#System.ServiceModel/System/ServiceModel/WSHttpContextBinding.cs,0e68f000d4c87202)
created by the base class.
[BasicHttpContextBinding](http://referencesource.microsoft.com/#System.ServiceModel/System/ServiceModel/BasicHttpContextBinding.cs,b69fd93ab77f85aa)
and
[netTcpContextBinding](http://referencesource.microsoft.com/#System.ServiceModel/System/ServiceModel/NetTcpContextBinding.cs,c087854154279a2f)
work the same way.

Even after changing to wsHttpContextBinding, we’re still getting an
error on service start. But it’s a new error, so we’re making progress.
Now, we’re told that services marked with DurableServiceAttribute need a
persistence provider to be specified. If we look in the original
sample’s web.config file, we find a persistenceProvider element in the
service behavior. This element references the
[SqlPersistenceProviderFactory](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/SqlPersistenceProviderFactory.cs,3f29f58c9fe37104)
type. Obviously, the point here is to persist durable service instances
to the database between calls, much as WF can do.

However, merely configuring the existing SQL persistence provider
doesn’t really tell you what’s going on under the hood. Besides, often
when you’re experimenting, you don’t really want to go thru the headache
of setting up a SQL store for persisting instances to. Somewhere along
the line, I implemented a fake persistence service for WF that stored
the serialized instances in memory. So I decided to do the same for WCF
durable services.

Building a WCF Persistence Provider requires building two classes: a
factory and the provider itself. Factories inherit from
[PersistenceProviderFactory](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProviderFactory.cs,b38efb64c1b5437a),
which exposes only one
non-[CommunicationObject](http://msdn2.microsoft.com/en-us/library/system.servicemodel.channels.communicationobject.aspx)
method:
[CreateProvider](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProviderFactory.cs,ab461aa283e7a4d7).
It appears that the service host creates a single persistence provider
factory and calls CreateProvider whenever it needs a persistence
provider. Providers themselves inherit from
[PersistenceProvider](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProvider.cs,8496f7ccfc9160f3),
which exposes methods to
[Load](http://referencesource.microsoft.com/System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProvider.cs.html#34611453bc4cfe69),
[Save](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProvider.cs,df031aede3036ced)
and
[Delete](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/PersistenceProvider.cs,1a6a98f80410b51d)
durable service instances.

My FakePersistenceProvider (and factory) are brain dead simple, though
the ratio of “real” code to factory and CommunicationObject scaffolding
is quite low (about 40 lines out of 258). The factory keeps a dictionary
of serialized service instances, keyed by guid. When providers are
created, this key guid is passed as a parameter to CreateProvider. The
provider instances delegate Load, Save and Delete back to internal
methods on the factory class. The methods themselves use the
[NetDataContractSerializer](http://msdn2.microsoft.com/en-us/library/system.runtime.serialization.netdatacontractserializer.aspx)
to serialize the service instance out to a byte array and deserializing
it back again. I chose NetDataContractSerializer because that’s what the
SQL persistence provider uses under the hood.

PersistenceProvider supports async versions of Load, Save and Delete but
I didn’t implement them. Also, there’s a
[LockingPersistenceProvider](http://referencesource.microsoft.com/#System.WorkflowServices/System/ServiceModel/Persistence/LockingPersistenceProvider.cs,8749710e6d0e6396)
abstract class which adds (you guessed it) instance locking semantics.
However, my fake provider doesn’t span machines, much less require
locking semantics so I skipped it.

So it looks like DurableServiceAttribute, context-supporting bindings
and persistence providers are all inter-related. Certainly, you can’t
use the attribute with out the binding and persistence provider. As I
continue to dig, I’m want to see how context inter-relates with WF as
well as it’s possible usage outside of DurableServiceAttribute based
scenarios.

If you’re interested in the code, I’ve [stuck it up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/Public/Code/FakePersistenceProvider.zip).
In addition to the FakePersistenceProvider implementation and the simple
Durable Calculator service, it includes a simple client to test the
service and persistence provider. The WCF Service Host includes a test
client, but it doesn’t appear to support the context protocol, so I had
to build a simple test app instead. Enjoy.
