I know it’s been a while since my [last \_\_clrtype\_\_
post](http://devhawk.net/2009/04/24/__clrtype__-metaclasses-demo-silverlight-databinding/),
but I was blocked on some bug fixes that shipped as part of [IronPython
2.6 Beta 1](http://devhawk.net/2009/05/20/ironpython-2-6-beta-1/). So
now let’s start looking at one of the [most requested IronPython
features](http://ironpython.codeplex.com/WorkItem/View.aspx?WorkItemId=20489)
– custom attributes!

Over the course of the next three blog posts, I’m going to build out a
mechanism for specifying custom attributes on the CLR type we’re
generating via \_\_clrtype\_\_. All the various Builder classes in
[System.Reflection.Emit](http://msdn.microsoft.com/en-us/library/system.reflection.emit.aspx)
support a
[SetCustomAttribute](http://msdn.microsoft.com/en-us/library/system.reflection.emit.typebuilder.setcustomattribute.aspx)
method that works basically the same way. There are two overloads – the
[one I’m going to
use](http://msdn.microsoft.com/en-us/library/sd003w15.aspx) takes a
single
[CustomAttributeBuilder](http://msdn.microsoft.com/en-us/library/system.reflection.emit.customattributebuilder.aspx)
as a parameter.

For this first post, I’m going to focus on the basic custom attribute
infrastructure, so we’re going to use the extremely simple
[ObsoleteAttribute](http://msdn.microsoft.com/en-us/library/system.obsoleteattribute.aspx).
While you can pass some arguments to the constructor, for this first
post I’m going to use the [parameterless
constructor](http://msdn.microsoft.com/en-us/library/0xwcsd3h.aspx). To
keep things less confusing, I’m going back to the [original
version](http://devhawk.net/2009/04/22/__clrtype__-metaclasses-customizing-the-type-name/)
of the Product class, before I introduced CLR
[fields](http://devhawk.net/2009/04/23/__clrtype__-metaclasses-adding-clr-fields/)
and
[properties](http://devhawk.net/2009/04/24/__clrtype__-metaclasses-adding-clr-properties/).
The one change I’m making is that I’m adding a list of attributes I want
to add to the class.

``` python
from System import ObsoleteAttribute

class Product(object):
  __metaclass__ = ClrTypeMetaclass
  _clrnamespace = "DevHawk.IronPython.ClrTypeSeries"
  _clrclassattribs = [ObsoleteAttribute]

  # remainder of class omitted for clarity
```

Python [list
comprehensions](http://docs.python.org/reference/expressions.html#list-displays)
use the same square bracket syntax as C\# properties, so it kinda looks
right to someone with a C\# eye – though having the attribute
specifications inside the class, rather than above it, is totally
different. I wish I could use Python’s [class
decorators](http://docs.python.org/whatsnew/2.6.html#pep-3129-class-decorators)
for custom class attributes, but class decorators run after metaclasses
so unfortunately that doesn’t work. Also, I can’t leave off the
“Attribute” suffix like you can in C\#. If I really wanted to, I could
provide a new type name in the import statement (“from System import
ObsoleteAttribute as Obsolete”) but I thought spelling it out was
clearer for this post.

Now that I have specified the class attributes, I can update the
metaclass \_\_clrtype\_\_ method to set the attribute on the generated
CLR class:

``` python
if hasattr(cls, '_clrclassattribs'):
      for attribtype in cls._clrclassattribs:
        ci = clr.GetClrType(attribtype).GetConstructor(())
        cab = CustomAttributeBuilder(ci, ())
        typebld.SetCustomAttribute(cab)
```

I’m simply iterating over the list of \_clrclassattribs (if it exists),
getting the default parameterless constructor for each attribute type,
creating a CustomAttributeBuilder instance from that constructor and
then calling SetCustomAttribute. Of course, this is very simple because
we’re not supporting any custom arguments or setting of named
properties. We’ll get to that in the next post. In the mean time, you
can get the full code for this post [from my
skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_/simple%7C_custom%7C_attributes.py).

There is one significant issue with this custom attribute code.
Attributes are typically marked with the [AttributeUsage
attribute](http://msdn.microsoft.com/en-us/library/system.attributeusageattribute.aspx)
that specifies a set of constraints, such as the kind of targets a given
attribute can be attached to and if it can be specified multiple times.
For example, the [MTAThread
attribute](http://msdn.microsoft.com/en-us/library/system.mtathreadattribute.aspx)
can’t be specified multiple times and it can only be attached to
methods. However, those attribute constraints are validated by the
compiler, not the runtime. I haven’t written any code yet to validate
those constraints, so you can specify invalid combinations like multiple
MTAThread attributes on a class. For now, I’m just going to leave it to
the developer *not* to specify invalid attribute combinations. Custom
attributes are passive anyway so I’m figure no one will come looking for
a MTAThread attribute on a class or other such scenarios.

However, I’m interested in your opinion: When we get to actually
productizing a higher-level API for \_\_clrtype\_\_, what kinds of
attribute validation should we do, if any?
