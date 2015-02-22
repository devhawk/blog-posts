Now that we have the [basic \_\_clrtype\_\_ metaclass
infrastructure](http://devhawk.net/2009/04/22/__clrtype__-metaclasses-customizing-the-type-name/)
in place, let’s enhance it to add support for CLR fields. To do this,
we’re going to need to add two things to our custom CLR type. First, we
need to define the fields themselves. Second, we need to make sure that
Python code will read and writes to the statically typed fields for the
specified names rather than the storing them in the object dictionary as
usual. Here’s the updated version of ClrTypeMetaclass (or you can get it
[from my
skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_))

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

    if hasattr(cls, "_clrfields"):
      for fldname in cls._clrfields:
        typebld.DefineField(
          fldname,
          clr.GetClrType(cls._clrfields[fldname]),
          FieldAttributes.Public)

    new_type = typebld.CreateType()

    if hasattr(cls, "_clrfields"):
      for fldname in cls._clrfields:
        fldinfo = new_type.GetField(fldname)
        setattr(cls, fldname, ReflectedField(fldinfo))

    return new_type
```

All the base type, type name, type builder and constructor code in the
first half of the \_\_clrtype\_\_ method is the same as last time, so
we’ll focus on the second half. After emitting the constructor(s), next
we iterate thru a dictionary named \_clrfields (if it exists in the
class) that maps field names to types. For each of these dictionary
entries, we emit a public field on the CLR type with the specified name
and type.

The first time I tried this, I simply added the custom field generation
code I just described and left it at that. Didn’t work. Python doesn’t
look to store information in fields defined by the static type metadata
unless explicitly instructed to. That’s why I need to iterate over the
declared list of fields a second time after the type has been created.
The first time creates the CLR fields, the second time inserts a
[ReflectedField](http://ironpython.codeplex.com/SourceControl/changeset/view/49291#384587)
instance into the class dictionary. ReflectedField is a [Python
descriptor](http://docs.python.org/reference/datamodel.html#implementing-descriptors)
that reads and writes the field value by calling
[GetValue](http://msdn.microsoft.com/library/system.reflection.fieldinfo.getvalue.aspx)
and
[SetValue](http://msdn.microsoft.com/library/system.reflection.fieldinfo.setvalue.aspx)
on the contained [FieldInfo
object](http://msdn.microsoft.com/library/system.reflection.fieldinfo.aspx).
Python uses the same name resolution for fields as it does for method
(In Python, methods are fields that store callable objects) so when
IronPython discovers the ReflectedField descriptor in the class
instance, it uses that to get or store the value rather than sticking it
in the local dictionary.

Now here’s the new version of the Product class, this time with CLR
fields as well as a custom type name:

``` python
class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"
  _clrfields = {
    "name":str,
    "cost":float,
    "quantity":int,
    }

  def __init__(self, name, cost, quantity):
    self.name = name
    self.cost = cost
    self.quantity = quantity

  def calc_total(self):
    return self.cost * self.quantity
```

As you can see, the only thing that’s changed is the addition of the
\_clrfields dictionary. But now, we can use reflection to get and set
the Product fields, like so:

```
>>> p = Product("Crunchy Frog", 5.99, 10)
>>> t = p.GetType()
>>> p.name
'Crunchy Frog'
>>> namefi = t.GetField("name")
>>> namefi.GetValue(p)
'Crunchy Frog'
>>> namefi.SetValue(p, "Spring Surprise")
>>> p.name
'Spring Surprise'
```

This is great progress, but not enough to get us to our first “real”
scenario: data binding in Silverlight. Silverlight only supports data
binding against public properties, so I’ll need to wrap all these CLR
fields in CLR properties in my next post.
