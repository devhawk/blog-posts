Jon Flanders [throws a little
vitriol](http://www.masteringbiztalk.com/blogs/jon/PermaLink,guid,fa3c471d-a0f5-4790-a1b7-1fc374df651b.aspx)
at the WCF team fore their design of the abstract ServiceHostBase class,
calling the current design “stupid”. Normally, I’m not one to take up
for the WCF team. I’ve spent many an hour banging my head against WCF
for different reasons but exactly how Jon describes. However, in this
case, the WCF team looks caught between a rock and a hard place, where
the rock is correct behavior and the hard place is the way CLR object
construction works.

The crux of Jon’s beef is that if you build your own ServiceHost by
inheriting from
[SeviceHostBase](http://msdn2.microsoft.com/en-us/library/system.servicemodel.servicehostbase.aspx),
it’s not enough just to override the abstract
[CreateDescription](http://msdn2.microsoft.com/en-us/library/aa717533.aspx)
method. You also have to call the “magic”
[InitializeDescription](http://msdn2.microsoft.com/en-us/library/system.servicemodel.servicehostbase.initializedescription.aspx)
method in your derived class constructor. If you don’t,
CreateDescription never gets called. CreateDescription returns a
[ServiceDescription](http://msdn2.microsoft.com/en-us/library/system.servicemodel.description.servicedescription.aspx)
instance which is to route messages from the channel layer to the and
service layer. Jon writes that “Creating a valid ServiceDescription and
returning the list of implemented contracts is essential for making your
ServiceHostBase-derived class work.” I.e. it’s really important. Yet,
unless you remember to call InitializeDescription, this “essential”
ServiceDescription doesn’t get configured correctly. Yep, I see how that
might sound stupid.

But if this design is stupid, what would be a better design? After
thinking about this specific problem a while, I’m don’t think there is a
better design out there.

The question is, when is the right time to set up the service
description? Jon called ServiceDescription “essential” to the operation
of ServiceHostBase. That implies it should be configured during the
construction of a new service host instance. It wouldn’t do to have
ServiceDescription unconfigured for some period of time between
construction and use. What if the ServiceDescription is invalid or the
call to CreateDescription throws an exception? Then you’d be in a
position where you could create what looks like a valid service host,
but it would throw an exception when you tried to use it. You can see
why the WCF team would want to avoid that scenario.

So if you want the service host to have a valid ServiceDescription by
the end of construction, what choices do you have? Given that the
ServiceDescription depends on derived class data, the *only* choice is
to use a magic method! Here’s an example to demonstrate what I mean:

``` csharp
public abstract class Base
{
    public Base()
    {
    }

    private string _importantThing;
    protected abstract string CreateImportantThing();

    protected void InitImportantThing()
    {
        _importantThing = CreateImportantThing();
        if (_importantThing == null)
            throw new Exception();
    }

    public string ImportantThing  
    {  
        get { return _importantThing; }  
    }
}

public class Derived : Base
{
    private object _data;

    public Derived(DateTime dt)
    {
        _data = dt;
    }

    protected override string CreateImportantThing()
    {
        return _data.ToString();
    }
}
```

I’ve tried to distill out the relevant parts of ServiceHostBase. In the
example, Base stores some important thing that gets created by the
derived class based on data that’s passed into the derived class’s
constructor. Remember, we want the class to be fully configured by the
end of the constructor. If CreateImportantThing throws an exception or
returns null, we want to know about it right away when the object is
created.

In the code above, the magic method InitImportantThing never gets called
and thus the \_importantThing field never gets setup. This roughly
corresponds to Jon’s scenario where he didn’t know to call
InitalizeDescription. And like WCF, we can make this sample work by
inserting a call to InitImportantThing at the end of Derived’s
constructor.

You might be tempted to put the call to InitImportantThing in Base’s
constructor. But that won’t work because Base’s constructor runs before
Derived’s constructor does. Thus, Derived’s \_data field will still be
null and the call to CreateImportantThing throws a null reference
exception.

The final option would be to place the a call to InitImportantThing in
ImportantThing’s property get method, if \_importantThing is null. This
defers construction of \_importantThing until the first time it’s used.
By this time, the derived class constructor will have run and so the
derived class data will be available for use. This eliminates the magic
method call, but it means we don’t know if the instance is valid until
we go to use it – i.e. the scenario we were expressly trying to avoid.

So basically, the looks like the WCF team had two choices:

1.  Err on the side of caution and require calling InitializeDescription
    in the ServiceHostBase derived class’s constructor.
2.  Err on the side of easy extensibility and call InitializeDescription
    the first time the ServiceDescription.

Put that way, what the WCF team ended up doing doesn’t seem so stupid.
This is especially true when you consider that the vast majority of
people aren’t creating their own service hosts anyway. It would have
been possible to do both: explicitly call InitializeDescription in
ServiceHost’s constructor but also have an implicit call in
ServiceDescription property get if the field was null. But I’m not on
the product team, so I don’t know what other tradeoffs that implies.
Checking for a null reference seems like no big deal, but I don’t know
how often this property gets called.

One other point: even though I don’t think this design is stupid, I
agree 100% with Jon that the exception is misleading.The way it’s
written, the immediate assumption is that your implementation of
CreateDescription is bad, not that you forgot to call
InitializeDescription. It turns out that ServiceHostBase is already
tracking wether InitializeDescription has been called via the
[initializeDescriptionHasFinished](http://referencesource.microsoft.com/#System.ServiceModel/System/ServiceModel/ServiceHost.cs,305)
field. So why can’t it throw an exception like “Dude, you forgot to call
InitializeDescription” when that field is false? It wouldn’t make the
design any cleaner, but it would have saved Jon hours of digging thru
the implementation of ServiceHost and ServiceHostBase in Reflector.
