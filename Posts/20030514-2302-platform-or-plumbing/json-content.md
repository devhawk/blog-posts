> I definately agree with Scott to a point. In the end, you can’t have
> pure .NET, because even the APIs themselves are going to call COM
> objects. So, if .NET can do it, why not my app? Well, for one, I want
> my apps to work under Mono and any other runtimes that come out. Not a
> big deal today, but planning ahead is a good thing.\
>  [[Jesse Ezell’s
> Weblog](http://dotnetweblogs.com/jezell/posts/7018.aspx)]

To me, the biggest reason to write 100% managed code is the obvious one
– [less
work](http://www.microsoft.com/resources/casestudies/CaseStudy.asp?CaseStudyID=14042).
CLR and BCL do much more heavy lifting than COM or Win32. What better
reason do you need?

.NET APIs not only call to COM objects but also into the Win32 API as
well. When you call System.IO.File.Open(), eventually that ends up as a
call to CreateFile(). In Rotor, File.Open results in the construction of
a FileStream object. You can see the call to CreateFile in the internal
FileStream constructor (sscliclrsrcbclsystemiofilestream.cs).
[Reflector](http://www.aisto.com/roeder/dotnet/) reveals a similar
implementation for the .NET Framework. But as we start to see other
[CLR](http://msdn.microsoft.com/net/sscli)[implementations](http://www.go-mono.com)
on [other](http://www.linux.org/)[platforms](http://www.freebsd.org/), I
start to wonder how many of the underlying platform unmanaged API’s will
be consistent across platforms? Some will obviously be consistent – file
access, memory management, network sockets to name a few. Others such as
distributed transaction management or 3D rendering will be missing or
implemented in a inconsistent manner. For example: it would be very
difficult to build a generic 3D library that used DirectX or OpenGL
under the hood. You’d probably wind up with a library that targets the
lowest common denominator, leaving vast portions of both APIs unexposed.
Developers using your 3D library would be able to target both
environments, but at a stiff price – lack of access to the cutting edge
features of either environment.

Here’s a question I pose to blogspace: Is the .NET Framework a platform
or just better plumbing for the underlying platform?
