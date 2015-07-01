As I wrote last time, in order to make debug stepping actually useful in
ipydbg I need to avoid stepping into frames that are part of the
IronPython infrastructure. I did something similar when I [hide
infrastructure frames in the stack
trace](http://devhawk.net/2009/03/09/writing-an-ironpython-debugger-dynamic-stack-trace/).
Originally, I had planned to automatically stepping again if we ended up
on a frame that didn’t correspond to a python file. However, [Mike
Stall](http://blogs.msdn.com/jmstall/default.aspx) showed me a much
cleaner and better performing solution: Just My Code. As I mentioned at
the [start of this
series](http://devhawk.net/2009/02/27/writing-an-ironpython-debugger-introduction/),
support for JMC is one of the main reasons I wanted to build my own
debugger rather than use MDbg.

Enabling JMC in the stepper object is trivial:

``` python
def create_stepper(thread, JMC = True):
  stepper = thread.ActiveFrame.CreateStepper()
  stepper.SetUnmappedStopMask(CorDebugUnmappedStop.STOP_NONE)
  stepper.SetJmcStatus(JMC)  
  return stepper
```

If I make that single change and run ipydbg, any step effectively turns
into a full continue since none of the code has been marked as “My Code”
yet. As you see, the tricky part of JMC isn’t enabling it on the
stepper, it’s “painting” the parts of the code where you want JMC
stepping to work. You can set JMC status at the
[module](http://msdn.microsoft.com/en-us/library/ms231586.aspx),
[class](http://msdn.microsoft.com/en-us/library/ms230160.aspx) or the
[method](http://msdn.microsoft.com/en-us/library/ms230220.aspx) level.
In the case of ipdbg, it’s easiest to work at the class level:

``` python
infrastructure_methods =  ['TryGetExtraValue',
    'TrySetExtraValue',
    '.cctor',
    '.ctor',
    'CustomSymbolDictionary.GetExtraKeys',
    'IModuleDictionaryInitialization.InitializeModuleDictionary']

def OnClassLoad(self, sender, e):
    cmi = CorMetadataImport(e.Class.Module)
    mt = cmi.GetType(e.Class.Token)
    print "OnClassLoad", mt.Name

    if not e.Class.Module.IsDynamic:
      e.Class.JMCStatus = False
    elif mt.Name.startswith('IronPython.NewTypes'):
      e.Class.JMCStatus = False
    else:
      e.Class.JMCStatus = True
      for mmi in mt.GetMethods():
        if mmi.Name in infrastructure_methods:
          f = e.Class.Module.GetFunctionFromToken(mmi.MetadataToken)
          f.JMCStatus = False
```

OnClassLoad is where the action is. This event handler is responsible
for enabling JMC for all class methods that map to python code. To
understand how the logic in OnClassLoad works, you need to understand a
little about the .NET types and code that IronPython generates. Note,
the following description is for the IronPython 2.0 branch. Code
generation evolves from release to release and I know for a fact there
are changes in the upcoming 2.6 version. I assume that I’ll eventually
have to sniff the IronPython version in order to set JMC correctly.

Today, IronPython generates all code into dynamic modules and methods.
Since I want to limit stepping to python code only, I automatically
disable JMC for non-dynamic modules. I can imagine a scenario where I
want to step into non-dynamically generated code, but I think the best
way to handle that would be to disable JMC at the stepper rather than
widening the amount of code marked as JMC enabled.

For every module that gets loaded, IronPython generates a type. At a
minimum you’re going to load two modules: site.py and whatever python
script you ran. If you have the python standard library installed,
site.py loads a bunch of other modules as well. Each of these module
types have a bunch of standard methods that always get generated. For
example, the global scope code in the module is placed in a static
method on the module type called Initialize. Any python functions you
define get generated static methods with mangled names on the module
type [^1]. All these methods have corresponding python code and should be
JMC enabled. The other standard methods on a module type should not be
JMC enabled. So in my debugger, I mark the class as JMC enabled but then
iterate over the list of methods and mark any in the list of standard
methods (except for Initialize) as JMC disabled.

Of course, you can also [create
classes](http://docs.python.org/reference/compound_stmts.html#class-definitions)
in Python. As you might expect, classes in Python are generated as .NET
types. However, the semantics of Python classes are very different than
.NET types. For example, you can change the inheritance hierarchy of
python classes at runtime. That’s obviously not allowed for .NET types.
So the .NET types we generate have all the logic to implement Python
class semantics. As it turns out, these .NET types *only* have the
logic to implement Python class semantics, which is to say they
have *none* of Python class methods code. This makes sense when you
think about it – since Python can add and remove methods from a class at
runtime, IronPython can’t put the method code in the .NET type itself.
Instead, Python class methods are generated as static methods on the
module type, just like top-level functions are. Since Python class types
only contain Python class semantics logic, we never want to enable JMC
for Python class types. Python class types get generated in the
IronPython.NewTypes namespace, so it’s fairly easy to check the class
name in OnClassLoad and automatically disable JMC for classes any in
that namespace.

Adding JMC support makes ipydbg significantly more usable. It’s almost
like a real tool now, isn’t it? [Latest
bits](http://github.com/devhawk/ipydbg/tree/39eb5ea81b8a493d9605d4cce4b3ef75fec4f327)
are up on GitHub.

[^1]: FYI, IronPython generates python functions as [dynamic
methods](http://msdn.microsoft.com/en-us/library/system.reflection.emit.dynamicmethod.aspx)
in release mode and static module class methods in debug mode since you
can’t step into dynamic methods. The description above is specific to
debug mode since ipydbg exclusively runs in debug mode.
