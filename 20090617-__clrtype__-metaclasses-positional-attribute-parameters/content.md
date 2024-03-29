The [basic
infrastructure](http://devhawk.net/2009/06/15/__clrtype__-metaclasses-simple-custom-attributes/)
for custom attributes in IronPython is in place, but it’s woefully
limited. Specifically, it only works for custom attributes that don’t
have parameters. Of course, most of the custom attributes that you’d
really want to use require additional parameters, both the positional or
named variety. Since positional parameters are easier, let’s start with
them.

Positional parameters get passed to the custom attribute’s constructor.
As we saw in the previous post, you need a
[CustomAttributeBuilder](http://msdn.microsoft.com/en-us/library/system.reflection.emit.customattributebuilder.aspx)
to attach a custom attribute to an attribute target (like a class).
Previously, I just needed to know the attribute type since I was hard
coding the positional parameters. But now, I need to know both the
attribute type as well as the desired positional parameters. I could
have built a custom Python class to track this information, but it made
much more sense just to use CustomAttributeBuilder instances. I built a
utility function make\_cab to construct the CustomAttributeBuilder
instances.

``` python
def make_cab(attrib_type, *args):
  argtypes = tuple(map(lambda x:clr.GetClrType(type(x)), args))
  ci = clr.GetClrType(attrib_type).GetConstructor(argtypes)
  return CustomAttributeBuilder(ci, args)

from System import ObsoleteAttribute

class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"
  _clrclassattribs = [make_cab(ObsoleteAttribute , "Warning Lark's Vomit")]

  # remaining Product class definition omited for clarity
```

In make\_cab, I build a tuple of CLR types from the list of positional
arguments that was passed in. If you haven’t seed the \*args syntax
before, it works like C\#’s params keyword – any extra arguments are
passed into the function as a tuple names args. I use Python’s built in
map function (FP FTW!) to build a tuple of CLR types of the provided
arguments, which I then pass to GetConstructor. Previously, I passed an
empty tuple to GetConstructor because I wanted the default constructor.
If you don’t pass any positional arguments, you still get the default
constructor. Once I’ve found the right constructor, I pass it and the
original tuple of arguments to the CustomAttributeBuilder constructor.

One major benefit of this approach is that it simplifies the metaclass
code. Since \_clrclassattribs is now a list of CustomAttributeBuilders,
now I just need to iterate over that list and call SetCustomAttribute
for each.

``` python
if hasattr(cls, '_clrclassattribs'):
      for cab in cls._clrclassattribs:
        typebld.SetCustomAttribute(cab)
```

The only problem with this approach is that specifying the list of
custom attributes is now extremely verbose. Not only am I specifying the
full attribute class name as well as the positional arguments, I’m also
having to insert a call to make\_cab. Previously, it kinda looked like a
C\# custom attribute, albeit in the wrong place. Not anymore. So I
decided to write a function called cab\_builder to generates less
verbose calls to make\_cab:

``` python
def cab_builder(attrib_type):
  return lambda *args:make_cab(attrib_type, *args)

from System import ObsoleteAttribute
Obsolete = cab_builder(ObsoleteAttribute)

class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"
  _clrclassattribs = [Obsolete("Warning Lark's Vomit")]

  # remaining Product class definition omited for clarity
```

The cab\_builder function returns an anonymous lambda function that
closes over the attrib\_type variable. Python lambdas are just like C\#
lambdas, except that they only support expressions [^1]. The results of
calling the lambda returned from cab\_builder is exactly the same as
calling make\_cab directly, but less verbose. And since I named the
function returned from cab\_builder Obsolete, now my list of class
custom attributes looks *exactly* like it does in C\# (though still in a
different place). As usual, the code is [up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_/custom%7C_attrib%7C_with%7C_positional%7C_args.py).

If you’re only using the attribute once like this, it is kind of
annoying to first declare the cab\_builder function. If you wanted to
you could iterate over the types in a given assembly, looking for ones
that inherit from Attribute and generate the cab\_builder call
dynamically. However, I’m not sure how performant that would be. Another
possibility would be to iterate over the types in a given assembly and
generate a Python module on disk with the calls to cab\_builder. Then,
you’d just have to import this module of common attributes but still be
able to include additional calls to cab\_builder as needed.

[^1]: The lack of statement lambdas in Python is one of my few issues with
the language.
