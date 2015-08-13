Before we start using [\_\_clrtype\_\_
metaclasses](http://devhawk.net/2009/04/20/introducing-__clrtype__-metaclasses/),
we need to understand a bit about how IronPython maps between CLR types
and Python classes. IronPython doesn’t support Reflection based APIs or
custom attributes today because IronPython doesn’t emit a custom CLR
types for every Python class. Instead, it typically shares a single CLR
type across many Python classes. For example, all three of these Python
classes share a single underlying CLR type.

``` python
class shop(object):
  pass

class cheese_shop(shop):
  def have_cheese(self, cheese_type):
    return False

class argument_clinic(object):
  def is_right_room(self, room=12):
    return "I've told you once"

import clr
print clr.GetClrType(shop).FullName
print clr.GetClrType(cheese_shop).FullName
print clr.GetClrType(argument_clinic).FullName
```

Even though cheese\_shop inherits from shop and argument\_clinic
inherits from object, all three classes share the same underlying CLR
type. On my machine, running [IronPython 2.6 Alpha
1](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=22982),
that type is named ``IronPython.NewTypes.System.Object_1$1``.

IronPython can share the CLR type across multiple Python classes because
that CLR type has no code specific to a given Python class. CLR types
are immutable – once you build a CLR type, you can’t do things like add
new methods, remove existing method or change the inheritance hierarchy.
But all those things are legal to do in Python. Here, I’m creating an
instance of the cheese\_shop class, but then changing that instance to
be an argument\_clinic instance instead.

```
>>> cs = cheese_shop()

>>> cs.have_cheese("Venezuelan Beaver Cheese")
False
>>> cs.is_right_room(12)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'cheese_shop' object has no attribute 'is_right_room'

>>> # Change the object's class at runtime
>>> cs.__class__ = argument_clinic # don't try this in C#!

>>> cs.have_cheese("Venezuelan Beaver Cheese")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'argument_clinic' object has no attribute 'have_cheese'
>>> cs.is_right_room(12)
"I've told you once"
```

When you call a method on a Python object, the name is resolved by
walking a series of dictionaries. First, the dictionary of the object
itself is searched for the method name. Assuming the name isn’t in the
object dictionary, Python then looks in the \_\_class\_\_ dictionary. If
it’s not there, Python recursively looks through the base classes stored
in the \_\_bases\_\_ tuple until it finds the method or the name fails
to resolve. If we re-assign \_\_class\_\_ at run time, we change the
dictionary Python uses to resolve method names.

There are cases where IronPython generates a new underlying CLR type.
For example, if you build a Python class that inherits from a CLR type,
then IronPython will have to generate a new underlying CLR type that
inherits from the CLR type in order to remain compatible. IronPython
automatically overrides all the virtual methods of the base type,
implementing the same dynamic method dispatch that I described above.
This lets you pass the IronPython class wherever the base CLR type is
expected.

The ability to swap Python classes at runtime depends on having the same
underlying CLR type. If the underlying CLR type doesn’t match, then
assigning a new value to the \_\_class\_\_ field of an object will fail.
This applies both to IronPython classes that inherit from CLR types as
well as \_\_clrtype\_\_ metaclass types. In the code I’ll be blogging, I
always generate a unique CLR type for every Python class, which means
that I can’t dynamically retype the object. Given that the point of
\_\_clrtype\_\_ metaclasses is to generate static type information, this
hardly seems like a limitation. However, it’s something to be aware of
as we explore the \_\_clrtypes\_\_ feature.
