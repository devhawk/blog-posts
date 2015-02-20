Certainly not [my father’s](http://halpierson.blogspot.com/) C++. I sat
thru a presenation on VC++ 2005 today. Wow, I hadn’t realized all the
coolness there.

First off, all the syntax is working it’s way thru the standards bodies,
so no more [underscore underscore
syntax](http://msdn.com/library/en-us/vcmex/html/vclrfmxkeywords.asp).
It makes the code somewhat easier to read, but more importantly it’s
following a similar standardization process to CLI and C\#.

Secondly, you can now use all the native C++ features (templates,
multiple inheritance, buffer overrun protection, etc) and all the CLI
features (garbage collection, generics, language interop) together.
Previously, you had very limited choices for mixing the two coding
idioms. No longer – go ahead and mix and match. This gives you the best
of both worlds. Use templates, and expose them to other .NET languages
as generics.

Finally, it brings deterministic finalization to .NET. In VC++ 2005, you
can declare both a destructor (used when a class goes out of scope or is
explicitly deleted) and a finalizer (used when the class is garbage
collected). This is similar to the whole IDisposable approach for
classes that wrap unmanaged resources (file handles, network sockets,
etc). Actually, it’s *identical* to IDisposable because that’s how it’s
implemented! And it works both ways – if you instance a managed class
that implements IDisposable “on the heap” then it will automatically
call dispose at the end of scope. For example:

``` cpp
{  //C++ Version
   FileStream fs = FileStream(path, FileMode::Create);
   fs.Read(...);
   fs.Write(...);
}  //fs.Dispose called automatically
```

Even though the FileStream is implemented in C\#, it behaves here like a
stack type and is destructed as you would expect. In C\#, you’d have to
use a [using
statement](http://msdn.com/library/en-us/csref/html/vclrfusingstatement.asp)
to achieve the same effect. For this trival example, it’s not that big a
deal. But if you have multiple stack instances created at different
times within a scope, this helps out immensely.

Not sure I would move to C++ for all my managed programming, but I’ll
certainly be giving VC++ 2005 another look.
