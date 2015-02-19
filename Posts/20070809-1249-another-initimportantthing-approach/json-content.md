I thought of another approach to the InitImportantThing problem that I
[blogged about
yesterday](http://devhawk.net/2007/08/08/Calling+InitImportantThing.aspx).
I think it’s a bit harder to code, but it’s certainly explicit and
avoids the magic method that Jon [dislikes so
much](http://www.masteringbiztalk.com/blogs/jon/PermaLink,guid,fa3c471d-a0f5-4790-a1b7-1fc374df651b.aspx).

The crux of the problem is that ServiceHostBase needs a valid
ServiceDescription in order to operate. The WCF team chose to provide
said description to ServiceHostBase via the abstract CreateDescription
method. But as we saw, ServiceHostBase can’t call CreateDescription from
it’s own constructor. So instead, derived classes are forced to call
InitializeDescription in their own constructor. Since that call isn’t
enforced by the compiler, it’s easy to forget to include it. Since the
exception that gets thrown doesn’t really tell you what went wrong, it’s
easy to spend hours trying to figure it out.

So here’s a better approach: since the ServiceHostBase needs a valid
ServiceDescription in order to operate, why not pass it in as a
constructor parameter?

ServiceHostBase has a protected constructor with no parameters. But
since it needs you to call InitializeDescription in your derived class
constructor, it really needs the ServiceDescription, a collection of
ContractDescriptions (also returned from CreateDescription) and a
collection of base addresses (passed into InitalizeDescription). If
these were parameters on ServiceHostBase’s constructor, it could
validate that information directly, without needing abstract or magic
methods.

The one problem with this approach is that the creation of a
ServiceDescription is non-trivial. ServiceHost’s [implementation of
CreateDescription](code://System.ServiceModel:3.0.0.0:b77a5c561934e089/System.ServiceModel.ServiceHost/CreateDescription(System.Collections.Generic.IDictionary<String,System.ServiceModel.Description.ContractDescription>&):System.ServiceModel.Description.ServiceDescription)
generates the ServiceDescription by reflecting over the service type.
You still need that code, but now you would call it from the base
constructor initializer instead. That means it has to be a static
method, but otherwise it would work just fine. Here’s yesterday’s code,
updated for this approach:

``` {.brush: .csharp}
public abstract class Base 
{ 
    public Base(string importantThing) 
    { 
        if (string.IsNullOrEmpty(importantThing)) 
            throw new Exception(); 

        _importantThing = importantThing; 

    } 

    private string _importantThing; 

    public string ImportantThing  
    {  
        get { return _importantThing; }  
    } 
} 

public class Derived : Base 
{ 
    private object _data; 

    public Derived(DateTime dt) : base(CreateImportantThing(dt)) 
    { 
        _data = dt; 
    } 

    private static string CreateImportantThing(DateTime dt) 
    { 
        //this is obviously trivial, but could be much
        //more complicated if need be
        return dt.ToLongDateString(); 
    } 
}
```

This seems like the best approach to me. You remove the un-obvious magic
method call requirement when deriving your own service host while still
enforcing the data consistency check in the base class during
construction. Best of both worlds, right?

So I wonder why the WCF team didn’t do it this way? 
