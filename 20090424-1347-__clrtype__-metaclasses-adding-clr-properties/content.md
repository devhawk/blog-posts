When I was first experimenting with \_\_clrtype\_\_, I got to the point
of making CLR fields work and then immediately tried to do some data
binding with Silverlight. Didn’t work. Turns out Silverlight can only
data bind against properties – fields aren’t supported. So now let’s add
basic property support to ClrTypeMetaclass. Python has a [rich
mechanism](http://docs.python.org/library/functions.html#property) for
defining properties, but hooking that up requires DLR binders so for now
I’m going to generate properties that are simple wrappers around the
associated fields.

There’s enough code involved in defining a property to break it out into
it’s own method:

``` python
@staticmethod
def define_prop(typebld, name, fieldtype, fieldbld):
    attribs = ( MethodAttributes.Public
              | MethodAttributes.SpecialName
              | MethodAttributes.HideBySig)
    clrtype = clr.GetClrType(fieldtype)

    getbld = typebld.DefineMethod("get_" + name, attribs, clrtype, None)
    getilgen = getbld.GetILGenerator()
    getilgen.Emit(OpCodes.Ldarg_0)
    getilgen.Emit(OpCodes.Ldfld, fieldbld)
    getilgen.Emit(OpCodes.Ret)

    setbld = typebld.DefineMethod("set_" + name, attribs, None, (clrtype,))
    setilgen = setbld.GetILGenerator()
    setilgen.Emit(OpCodes.Ldarg_0)
    setilgen.Emit(OpCodes.Ldarg_1)
    setilgen.Emit(OpCodes.Stfld, fieldbld)
    setilgen.Emit(OpCodes.Ret)

    prpbld = typebld.DefineProperty(name,
      PropertyAttributes.None, clrtype, None)
    prpbld.SetGetMethod(getbld)
    prpbld.SetSetMethod(setbld)
```

You provide define\_prop the TypeBuilder for the Type being constructed,
the name and type of the property as well as the FieldBuilder that gets
returned from the call to DefineField. In the [previous
installment](http://devhawk.net/2009/04/23/__clrtype__-metaclasses-adding-clr-fields/),
I wasn’t bothering to save the FieldBuilder to a variable since I never
used it again. Now, I’m stashing it away for the call to define\_prop as
I’ll show below.

For each field, we define a get method, a set method and a property. The
get function first executes
[ldarg\_0](http://msdn.microsoft.com/en-us/library/system.reflection.emit.opcodes.ldarg_0.aspx)
to load the current object reference onto the execution stack, then it
executes
[ldfld](http://msdn.microsoft.com/en-us/library/system.reflection.emit.opcodes.ldfld.aspx)
to load the specified field from the object onto the stack, then it
returns. The set function executes
[ldarg\_0](http://msdn.microsoft.com/en-us/library/system.reflection.emit.opcodes.ldarg_0.aspx)
to load the current object reference and
[ldarg\_1](http://msdn.microsoft.com/en-us/library/system.reflection.emit.opcodes.ldarg_1.aspx)
to load the value passed as the first argument onto the execution stack,
then it executes
[stfld](http://msdn.microsoft.com/en-us/library/system.reflection.emit.opcodes.stfld.aspx)
to store the value in the specified field of the object. Once I have the
two methods, I call DefineProperty to create the PropertyBuilder and
then associate the get and set methods with that property.

As I said before, Reflection.Emit is straightforward though tedious.
Honestly, I didn’t go thru the Emit docs to figure out what the methods
should look like. Instead, I wrote a basic wrapper property in C\# and
looked at the generated IL in Reflector.

The only other change here is adding the call to define\_prop on our
first iteration thru list of \_clrfields. Since the rest of
\_\_clrtype\_\_ is the same, here’s just that code snippet:

``` python
if hasattr(cls, "_clrfields"):
    for fldname in cls._clrfields:
        fieldtype = clr.GetClrType(cls._clrfields[fldname])
        fieldbld = typebld.DefineField(fldname, fieldtype, FieldAttributes.Public)
        ClrTypeMetaclass.define_prop(typebld, fldname, fieldtype, fieldbld)
```

As I said above, I simply save off the result of calling DefineField so
I can pass it to define\_prop. I also save off the field type in a
variable since I use it more than once. Avoids the second dictionary
lookup and is clearer to understand what the function does.

Accessing the CLR properties via reflection is pretty straightforward –
not very different than reflecting over CLR fields. The only significant
difference between them is that CLR properties can be indexable and
fields can’t, so you have to pass an index parameter to
[GetValue](http://msdn.microsoft.com/en-us/library/b05d59ty.aspx) and
[SetValue](http://msdn.microsoft.com/en-us/library/xb5dd1f1.aspx). These
aren’t indexed properties, so I pass in None for the index parameter.

```
>>> p = Product("Crunchy Frog", 10, 12)
>>> pi = p.GetType().GetProperty("name")
>>> pi.GetValue(p, None)
'Crunchy Frog'
>>> pi.SetValue(p, "Spring Surprise", None)
>>> pi.GetValue(p, None)
'Spring Surprise'
>>> p.name
'Spring Surprise'
```

One quick aside about the CLR type I’m generating here. I’m fairly
certain this reflected object wouldn’t pass muster with the C\#
compiler. I’m defining a field and a property with the same name. It
clearly works at the IL level, but I’m not sure what the C\# compiler
would do if you tried to refer to a CLR type like this. I should
probably be prepending an underscore or something on the field name, but
then I wonder if the field should also be private. There’s a whole API
design discussion down that road, but I’m not quite ready to have that
yet so I’m just leaving the fields public and having fields and
properties with the same name. Luckily, I’m never generating a CLR type
on disk so you can’t build a C\# project that refers to it anyway.
