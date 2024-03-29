Now that we know a [little about how IronPython uses CLR types under the
hood](http://devhawk.net/2009/04/21/__clrtype__-metaclasses-ironpython-classes-under-the-hood/),
let’s start customizing those types. In a nutshell, \_\_clrtype\_\_
metaclasses are metaclasses that implement a function named
\_\_clrtype\_\_ that takes the Python class definition as a parameter
and returns a
[System.Type](http://msdn.microsoft.com/library/system.type.aspx).
IronPython will then use the returned Type  as the underlying CLR type
whenever you create an instance of the Python class.

Technically, you could emit whatever custom CLR Type you want to in the
\_\_clrtype\_\_, but typically you’ll want to emit a class that both
implements whatever static CLR metadata you need as well as the dynamic
binding infrastructure that IronPython expects. The easiest way to do
this is to ask IronPython emit a type that handles all the dynamic
typing and then inherit from that type to add the custom CLR metadata
you want.

Let’s start simple and hello-worldly by just customizing the name of the
generated CLR type that’s associated with the Python class. There’s a
fair amount of boilerplate code that is needed even for this simple
scenario, and I can build on that as we add features that actually do
stuff. If you want to follow along at home, you’ll need [IronPython 2.6
Alpha
1](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=22982)
(or later) and you can get this code [from my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_).

``` python
class ClrTypeMetaclass(type):
  def __clrtype__(cls):
    baseType = super(ClrTypeMetaclass, cls).__clrtype__()
    typename = cls._clrnamespace + "." + cls.__name__
                 if hasattr(cls, "_clrnamespace")
                 else cls.__name__

    typegen = Snippets.Shared.DefineType(typename, baseType, True, False)
    typebld = typegen.TypeBuilder

    for ctor in baseType.GetConstructors():
      ctorparams = ctor.GetParameters()
      ctorbld = typebld.DefineConstructor(
                  ctor.Attributes,
                  ctor.CallingConvention,
                  tuple([p.ParameterType for p in ctorparams]))
      ilgen = ctorbld.GetILGenerator()
      ilgen.Emit(OpCodes.Ldarg, 0)
      for index in range(len(ctorparams)):
        ilgen.Emit(OpCodes.Ldarg, index + 1)
      ilgen.Emit(OpCodes.Call, ctor)
      ilgen.Emit(OpCodes.Ret)

    return typebld.CreateType()
```

Like all Python metaclasses, ClrTypeMetaclass inherits from the
[built-in Python type
object](http://docs.python.org/library/stdtypes.html#type-objects). If I
wanted to [customize the Python
class](http://docs.python.org/reference/datamodel.html#customizing-class-creation)
as well, I could implement \_\_new\_\_ on ClrTypeMetaclass , but I only
care about customizing the CLR type so it only implements
\_\_clrtype\_\_. If you want to know more about what you can do with
Python metaclasses, check out Michael Foord’s [Metaclasses in Five
Minutes](http://www.voidspace.org.uk/python/articles/five-minutes.shtml).

First off, I want to get IronPython to generate the base class that will
implement all the typical Pythonic stuff like name resolution and
dynamic method dispatch. To do that, I call \_\_clrtype\_\_ on the
[supertype](http://docs.python.org/library/functions.html#super) of
ClrTypeMetaclass – aka the built-in type object. That function returns
the System.Type that IronPython would have used as the underlying CLR
type for the Python class if we weren’t using \_\_clrtype\_\_
metaclasses.

Once I have the base class, next I figure out what the name of the
generated CLR type will be. This is pretty simple, I just use the name
of the Python class. To make this logic a little more interesting, I
added support for a custom namespace. If the Python class has a
\_clrnamespace field, I append that as the custom namespace for the
name. I should probably be using a double underscore – i.e.
\_\_clrnamespace – but I didn’t want to wrestle with [name
mangling](http://docs.python.org/tutorial/classes.html#private-variables)
in this prototype code.

Now that I have a name and a base class, I can generate the class I’m
going to use. I’m using the DefineType method in
[Microsoft.Scripting.Generation.Snippets](http://ironpython.codeplex.com/SourceControl/changeset/view/49291#760277)
DLR class for three reasons. First, there’s a [CLR
bug](http://www.mail-archive.com/users@lists.ironpython.com/msg08702.html)
that doesn’t let you create a dynamic assembly from a dynamic method.
Second, reusing the snippets assembly avoids the overhead of generating
a new assembly. Finally, the types in Snippets.Shared get saved to disk
if you run with the -X:SaveAssemblies flag, so you can inspect custom
CLR type that gets generated. The DefineType function takes four
parameters, the type name, the base class, a preserve name flag and a
generate debug symbols flag. If you pass false for preserve name, you
get a name like foobar\$1 instead of just foobar. As for debug symbols,
since I don’t have any source code that I’m generating IL from, emitting
debug symbols doesn’t make a lot of sense. DefineType returns a
[TypeGen](http://ironpython.codeplex.com/SourceControl/changeset/view/49291#760661),
but I only need the
[TypeBuilder](http://msdn.microsoft.com/library/system.reflection.emit.typebuilder.aspx).

The last thing I need to do is implement the custom CLR type
constructor(s). IronPython CLR types will always have at least one
parameter – the
[PythonType](http://ironpython.codeplex.com/SourceControl/changeset/view/49291#384570)
(PythonType == IronPython’s implementation of Python’s built-in type
object) that’s used for dynamic name resolution. I don’t want to add any
custom functionality in my custom CLR type constructors, so I simply
iterate thru the list of constructors on the base class and generate a
constructor on the custom CLR type with a matching parameter list and
that calls the base class constructor. 

Generating the IL to emit the constructor and the base class is
straightforward, if tedious. I define the constructor with the same
attributes, calling convention and parameters as the base class
constructor. Then I emit IL to load the local instance (i.e. ldarg 0)
and all the parameters onto the stack, call the base constructor and
finally return. Once all the constructors are defined, I can create the
type and return.

Using the ClrTypeMetaclass is very easy – simply specify the
\_\_metaclass\_\_ field in a class. If you want to customize the
namespace, specify the \_clrnamespace field as well. Here’s an example:

``` python
class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"

  def __init__(self, name, cost, quantity):
    self.name = name
    self.cost = cost
    self.quantity = quantity

  def calc_total(self):
    return self.cost * self.quantity
```

You can verify this code has custom CLR metadata by calling GetType on a
Product instance and inspecting the result via standard reflection
techniques.

```
>>> m = Product('Crunchy Frog', 10, 20)
>>> m.GetType().Name
'Product'
>>> m.GetType().FullName
'DevHawk.IronPython.ClrTypeSeries.Product'
```

Great, so now I have a custom CLR type for my Python class.
Unfortunately, at this point it’s pretty useless. Next, I’m going to add
instance fields to the CLR type.
