Now that I can [get the local
variables](http://devhawk.net/2009/03/25/writing-an-ironpython-debugger-getting-local-variables/)
for a given frame, I need to display them in the console. Eventually,
I’d like to provide the ability to update the local variables as well,
but you gotta crawl before you can run. Luckily, the debugger API is
consistent about using same COM interfaces – wrapped by the managed
[CorValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L17)
class – to represent all data values, including local variables,
function arguments and object fields. So the work I do now to display
CorValues in the console will be reusable in other contexts down the
road.

While the debugger API is consistent about how it represents values in
the target process, the API it uses is very complicated. The primary COM
interface for accessing values is
[ICorDebugValue](http://msdn.microsoft.com/en-us/library/ms232466.aspx),
but it has *eight* siblings:
[ICorDebugReferenceValue](http://msdn.microsoft.com/en-us/library/ms230256.aspx),
[ICorDebugHandleValue](http://msdn.microsoft.com/en-us/library/ms231264.aspx),
[ICorDebugStringValue](http://msdn.microsoft.com/en-us/library/ms232482.aspx),
[ICorDebugObjectValue](http://msdn.microsoft.com/en-us/library/ms231878.aspx),
[ICorDebugGenericValue](http://msdn.microsoft.com/en-us/library/ms232458.aspx),
[ICorDebugBoxValue](http://msdn.microsoft.com/en-us/library/ms230800.aspx),
[ICorDebugArrayValue](http://msdn.microsoft.com/en-us/library/ms232916.aspx),
[ICorDebugHeapValue](http://msdn.microsoft.com/en-us/library/ms230290.aspx).
All those COM interfaces are represented in managed code by CorValue and
it’s subclasses.

Furthermore, confusingly ICorDebugValues have both a
[Type](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/CorDebug/CorDebug/Value.cs#L26)
and an
[ExactType](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/CorDebug/CorDebug/Value.cs#L37).
ExactType is what .NET developers typically think of as the type, aka
the CLR type. Well, the [debugger API’s
representation](http://msdn.microsoft.com/en-us/library/ms231926.aspx)
of the CLR type at any rate. You can retrieve the value’s metadata as a
[System.Type](http://msdn.microsoft.com/library/system.type.aspx)
compatible object via value.ExactType.Class.GetTypeInfo().CorValue’s
Type property, on the other hand, represents the object’s primitive or
[element
type](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/CorDebug/CorDebug/NativeApi/ICorDebugWrappers.cs#L161).
For example, instances of .NET classes have an element Type of
ELEMENT\_TYPE\_CLASS. There are a collection of primitive types
(boolean, char, ints of various signage and size, floats of various
size) as well as types you wouldn’t call primitive but that the runtime
has specific knowledge of (string, array and value types – aka structs
in C\# terminology).

If you’re confused by all that, don’t worry so am I. Honestly, I’ve
re-written this code several times, each time understanding the API just
a bit better. Whatever the \*right\* way to use the interfaces, I’m sure
I don’t know it. For my first cut at this, I essentially ported MDbg’s
high level CorValue API – aka MDbgValue::InternalGetValue if you’re
looking at the MDbg source code – over to Python. Along the way, I’ve
improved on that code as I’ll describe below.

A given CorValue may be a primitive value like an int or it may be a
reference to or a boxed version of some other CorValue object. So in
order to print the CorValue, you have to go thru a series of attempts to
dereference and unbox until you get to the “real” underlying CorValue
object. From there, converting the value to a string I can print depends
on the value’s element type. For primitive types like ints and floats,
you can call
[CastToGenericValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L105)
to get a
[CorGenericValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L320)
“view” of the same CorValue object [1]. A CorGenericValue can read and
write the raw bytes from memory in the target process of the value. The
[GetValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L473)
method reads the data from target process then does an unsafe cast to
appropriate managed type. For example, an ELEMENT\_TYPE\_R4 CorValue
gets cast into a
[System.Single](http://msdn.microsoft.com/library/system.single.aspx).
For CorValue strings, I call
[CastToStringValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L95)
and then access the [String
property](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L244).
For classes, value types and objects, there’s no simple or standard
approach to retrieving the data, so for now I return the result of
calling
[CastToObjectValue](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L100).
Eventually, I’ll want to provide a mechanism to read the specific fields
of a class or value type.

Unfortunately, the mechanism above to read primitive types doesn’t work
with IronPython. GetValue needs to know the correct element type in
order to do the unsafe cast. For value types (aka any struct other than
the basic primitives), GetValue will return a data as a byte array. The
problem is that when you box a primitive, the original element types
gets overwritten by ELEMENT\_TYPE\_VALUETYPE. You can’t get the original
element type back, even after unboxing. So for boxed primitives, you can
only retrieve the data as a raw byte array or as a CorObjectValue,
neither of which is very useful.

Luckily, I was able to work around this. Under the hood, GetValue calls
[UnsafeGetValueAsType](http://github.com/devhawk/ipydbg/blob/b53ac99f95e0018db782abd52efea8e1fa56abd8/CorDebug/CorDebug/Value.cs#L497)
to do the actual work of reading the data from the target process and
casting it to the right managed type. UnsafeGetValueAsType It accepts
the an element type value as a method parameter. If your know the right
element type value, you could call UnsafeGetValueAsType directly if
instead of going thru GetValue. While boxing overwrites the original
element type value, an unboxed CorValue still has the CLR type metadata
available. So I was able to map CLR Types to element types (e.g.
System.Single –\> ELEMENT\_TYPE\_R4) in order to retrieve the underlying
value of boxed primitive types.

``` python
_type_map = { 'System.Boolean': ELEMENT_TYPE_BOOLEAN,
  'System.SByte'  : ELEMENT_TYPE_I1, 'System.Byte'   : ELEMENT_TYPE_U1,
  'System.Int16'  : ELEMENT_TYPE_I2, 'System.UInt16' : ELEMENT_TYPE_U2,
  'System.Int32'  : ELEMENT_TYPE_I4, 'System.UInt32' : ELEMENT_TYPE_U4,
  'System.IntPtr' : ELEMENT_TYPE_I,  'System.UIntPtr': ELEMENT_TYPE_U,
  'System.Int64'  : ELEMENT_TYPE_I8, 'System.UInt64' : ELEMENT_TYPE_U8,
  'System.Single' : ELEMENT_TYPE_R4, 'System.Double' : ELEMENT_TYPE_R8,
  'System.Char'   : ELEMENT_TYPE_CHAR, }

_generic_element_types = _type_map.values()

class NullCorValue(object):
  def __init__(self, typename):
    self.typename = typename

def extract_value(value):
    rv = value.CastToReferenceValue()
    if rv != None:
      if rv.IsNull:
        typename = rv.ExactType.Class.GetTypeInfo().Name
        return NullCorValue(typename)
      return extract_value(rv.Dereference())
    bv = value.CastToBoxValue()
    if bv != None:
      return extract_value(bv.GetObject())

    if value.Type in _generic_element_types:
      return value.CastToGenericValue().GetValue()
    elif value.Type == ELEMENT_TYPE_STRING:
      return value.CastToStringValue().String
    elif value.Type == ELEMENT_TYPE_VALUETYPE:
      typename = value.ExactType.Class.GetTypeInfo().Name
      if typename in _type_map:
        gv = value.CastToGenericValue()
        return gv.UnsafeGetValueAsType(_type_map[typename])
      else:
        return value.CastToObjectValue()
    elif value.Type in [ELEMENT_TYPE_CLASS, ELEMENT_TYPE_OBJECT]:
      return value.CastToObjectValue()
    else:
      msg = "CorValue type %s not supported" % str(value.Type)
      raise (Exception, msg)
```

It’s kinda ugly code and I’m thinking that at least some of really
belongs in the CorValue C\# classes rather than in ipydbg. However, I’m
not that interested in doing the significant refactoring it would take
to make the CorValue API developer-friendly, so I did it here.

One thing to note that I didn’t cover earlier is the NullCorValue
object. For reference values, there’s a IsNull property that may be set.
If it is set, I need a mechanism to indicate the null value, but also
includes the type information. So I created a custom type that can store
the type name to represent null. Again, something that should be a part
of the CorValue API.

Once I have my extracted value, I need to display it in the console.
This is much simpler than the extracting the value. As I wrote above,
I’m not making any attempt to print a real representation for
CorObjectValues. I could look at making a call ToString call to get
something useful, but that requires invoking a function in the target
process and I haven’t gotten that far with ipydbg yet. So I just print
“\<…\>” if it isn’t a string, primitive or null value.

``` python
def display_value(value):
  if type(value) == str:
    return (('"%s"' % value), 'System.String')
  elif type(value) == CorObjectValue:
    return ("<...>", value.ExactType.Class.GetTypeInfo().FullName)
  elif type(value) == NullCorValue:
    return ("<None>", value.typename)
  else:
    return (str(value), value.GetType().FullName)
```

Now all I need is to iterate thru the list of local variables and call
extract\_value and display\_value on each in turn and print the results.
I won’t reproduce that code here, but you [can see
it](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/ipydbg.py#L325)
in the [ipydbg project source on
GitHub](http://github.com/devhawk/ipydbg/tree/9dd12dadb79469ceac57b84b8adb1b0b531337c4).

I’m happy with what I’ve gotten working (it took several days of banging
my head against the proverbial wall to get it this far) but there’s
still room for improvement. First, I’d like to be able to call ToString
to get a class-specific generic representation as I described above.
Second, I need a way to display the fields of a CorObejctValue object.
It’s just a combination of metadata reading and
CorObjectValue::[GetFieldValue](http://github.com/devhawk/ipydbg/blob/9dd12dadb79469ceac57b84b8adb1b0b531337c4/CorDebug/CorDebug/Value.cs#L292),
but that code won’t write itself. Finally, there are other Python
primitives – like list, dictionary and tuple – that ipydbg should have
specific knowledge of and be able to display without requiring the user
to drill into the member variables and the like.

------------------------------------------------------------------------

[1] While the CorValue API does certain things very well, I wish it did
a better job abstracting away the existence of the various
ICorDebugValue interfaces. Hence the need for all the calls to
CastToWhatever().
