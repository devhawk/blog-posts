For a project I’ve been working on, I had to do some spelunking on C\#’s
operator overloading support. I discovered some interesting things about
the equality and increment operators and how they are handled by the C\#
compiler in classes that do and do not overload them. I’ll be sharing
the code soon, but I figured I’d share the learning right away.

**Equality Operator**

There are two main mechanisms for testing equality in the CLR: the
System.Object.Equals method and the equality operator (i.e. the double
equal sign ==). Every object in CLR has an Equals() method that it
inherits from System.Object. The default implementation of this method
uses bitwise equality for value types and referential equality for
reference types. The equality operator maps to the IL opcode “ceq”
(check equality) which has similar semantics to the Equals() method.
However, the equality operator only works with native value types and
referential types. You can’t use the equality operator with value types
that you define (i.e. structs in C\#) unless you create an overload for
it.

For some referential types, the default behavior is inappropriate. For
example, even though System.String is a referential type, its Equals()
method has been overridden to provide value type semantics. So when you
compare two strings that have the save character values, Equals()
returns true even if they are two different string instances. Since
Equals() is a virtual function, it gets [overridden in the standard
fashion](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconequals.asp).
^[Actually, String.Equals() is implemented in native code by the runtime for performance reasons.]
However, the important thing to keep in mind is that while Equals() and
the equality operator have similar semantics, *they are not the same
operation*. You override and implement them separately. If you override
the equality operator in your class, the C\# compiler generates a call
to that method instead of a ceq IL opcode. If you want Equals() and the
equality operator to yield the same result, you can call one from the
other. For example, the overloaded equality operator for System.String
calls the overridden Equals() method under the hood.

Having to semantically similar but separately overridable mechanisms for
testing equality can get sticky. Not all languages support operator
overloading. If I’m using VB.NET, there’s no way to override the
equality operator (VB.NET uses a single = instead of C\#’s double ==).
It gets worse in cross language scenarios. I can consume a C\# object
that overrides Equals() and equality from VB.NET with no problem, but if
I try to go the other way, the equality operator ends up with
potentially different semantics than the Equals() method. This must be
why, according to
[MSDN](http://msdn.microsoft.com/library/en-us/cpgenref/html/cpconimplementingequalsoperator.asp),
it is recommended that most reference types not override the equality
operator, even if they override Equals(). This way, you just get into
the habit of always using Equals() I guess. Personally, I do all my work
in C\# so I decided to take full advantage of the language and overload
the equality operator of my class to call Equals() under the hood, just
like System.String.

**Increment Operator**

One of the tricky aspects about the increment operator (i.e. the double
plus sign ++) is the difference between prefix and postfix notation.
Both versions of the increment operator increment the current value and
return a result. The difference between the two versions is the order in
which these operations are applied. In prefix (i.e. ++foo), the value is
incremented and then the incremented value is returned as the result. In
postfix (i.e. foo++), the original value is saved, the value is
incremented, and then the original value is returned as the result. In
both cases, the value of the variable is the same after the operation is
completed. C\# supports both
[prefix](http://msdn.microsoft.com/library/en-us/csspec/html/vclrfcsharpspec_7_6_5.asp)
and
[postfix](http://msdn.microsoft.com/library/en-us/csspec/html/vclrfcsharpspec_7_6_5.asp)
notations as well as overloading the ++ operator. What it doesn’t
support, however, is having different implementations of the prefix and
postfix operations.

In C++, the prefix and postfix versions overloads are specified
separately, though there is a template that provides a standard
implementation of the postfix version in terms of the prefix version. In
pseudo-code, it reads “Save old version, call prefix increment
operation, return saved version”. In C\#, this pseudo-code is generated
by the compiler, not the overloaded operator implementation. This means
you only build the single increment operation and the C\# compiler
generates the appropriate IL to handle the pre- and post fix scenarios.

For example, if I have an integer i and I call Console.Write(++i), the
C\# compiler generates the following IL:

```cil
ldloc.0  //load i variable onto the stack
ldc.i4.1 //load the value 1 onto the stack
add      //add the two values on top of the stack
dup      //duplicate the value on the top of the stack
//This stack item gets passed to Console.Write
stloc.0  //store the result of the addition
call Console.Write
```

And if I call Console.Write(i++):

```cil
ldloc.0  //load i variable onto the stack
//This stack item gets passed to Console.Write
dup      //duplicate the value on the top of the stack
ldc.i4.1 //load the value 1 onto the stack
add      //add the two values on top of the stack
stloc.0  //store the result of the addition
call Console.Write
```

As you can see, the incremented value is always stored back into the
variable i (loc.0 in the IL). However, what is left on the stack differs
depending on the pre- or postfix version. In prefix, the value is
incremented then duplicated. One duplicate is saved back to the variable
while the other is passed to Console.Write. In postfix, it is duplicated
then incremented. The incremented version is saved back to the variable
while the original value is passed to Console.Write.

The same rules apply for classes that override the increment operator.
In that case, a call to the overloaded increment operator instead of
directly loading 1 onto the stack and calling the add operand. Also, the
same rules apply for decrement (i.e. double minus sign –).
