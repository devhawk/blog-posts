In [my last
post](http://devhawk.net/2009/06/17/__clrtype__-metaclasses-positional-attribute-parameters/),
I added support for custom attribute positional parameters . To finish
things off, I need to add support for named parameters as well. Custom
attributes support named parameters for public fields and settable
properties. It works kind of like C\# 3.0’s [object
initalizers](http://msdn.microsoft.com/en-us/library/bb384062.aspx).
However, unlike object initalizers, the specific fields and properties
to be set on a custom attribute as well as their values are passed to
the [CustomAttributeBuilder
constructor](http://msdn.microsoft.com/en-us/library/ex9y2dsf.aspx).
With six arguments – five of which are arrays – it’s kind of an ugly
constructor. But luckily, we can hide it away in the make\_cab function
by using Python’s [keyword arguments
feature](http://docs.python.org/tutorial/controlflow.html#keyword-arguments).

``` python
def make_cab(attrib_type, *args, **kwds):
  clrtype = clr.GetClrType(attrib_type)
  argtypes = tuple(map(lambda x:clr.GetClrType(type(x)), args))
  ci = clrtype.GetConstructor(argtypes)

  props = ([],[])
  fields = ([],[])

  for kwd in kwds:
    pi = clrtype.GetProperty(kwd)
    if pi is not None:
      props[0].append(pi)
      props[1].append(kwds[kwd])
    else:
      fi = clrtype.GetField(kwd)
      if fi is not None:
        fields[0].append(fi)
        fields[1].append(kwds[kwd])
      else:
        raise Exception, "No %s Member found on %s" % (kwd, clrtype.Name)

  return CustomAttributeBuilder(ci, args,
    tuple(props[0]), tuple(props[1]),
    tuple(fields[0]), tuple(fields[1]))

def cab_builder(attrib_type):
  return lambda *args, **kwds:make_cab(attrib_type, *args, **kwds)
```

You’ll notice that make\_cab now takes a third parameter: the attribute
type and the tuple of positional arguments we saw last post. This third
parameter “\*\*kwds” is a dictionary of named parameters. Python
supports both positional and named parameter passing, like VB has for a
while and C\# will in 4.0. However, this \*\*kwds parameter contains all
the extra or leftover named parameters that were passed in but didn’t
match any existing function arguments. Think of it like the
[params](http://msdn.microsoft.com/en-us/library/w5zay9db.aspx) of named
parameters.

As I wrote earlier, custom attributes support setting named values of
both fields and properties. We don’t want the developer to have to know
if given named parameter is a field or property, so make\_cab iterates
over all the named parameters, checking first to see if it’s a property
then if it’s a field. It keeps a list of all the field / property infos
as well as their associated values. Assuming all the named parameters
are found, those lists are converted to tuples and passed into the
[CustomAttributeBuilder
constructor](http://msdn.microsoft.com/en-us/library/ex9y2dsf.aspx).

In addition to the change to make\_cab, I also updated cab\_builder
slightly in order to pass the \*\*kwds parameter on thru to the
make\_cab function. No big deal. So now, I can add an attribute with
named parameters to my IronPython class and it still looks a lot like a
C\# attribute specification.

``` python
clr.AddReference("System.Xml")
from System.Xml.Serialization import XmlRootAttribute
from System import ObsoleteAttribute, CLSCompliantAttribute
Obsolete = cab_builder(ObsoleteAttribute)
CLSCompliant = cab_builder(CLSCompliantAttribute)
XmlRoot = cab_builder(XmlRootAttribute)

class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"
  _clrclassattribs = [
    Obsolete("Warning Lark's Vomit"),
    CLSCompliant(False),
    XmlRoot("product", Namespace="http://samples.devhawk.net")]

  # remainder of Product class omitted for clarity
```

As usual, sample code is [up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_/custom%7C_attrib%7C_with%7C_named%7C_args.py).

Now that I can support custom attributes on classes, it would be fairly
straightforward to add them to methods, properties, etc as well. The
hardest part at this point is coming up with a well designed API that
works within the Python syntax. If you’ve got any opinions on that, feel
free to share them in the comments, via
[email](mailto:devhawk@outlook.com), or on the [IronPython mailing
list](http://lists.ironpython.com/listinfo.cgi/users-ironpython.com).
