**Update**: This approach *doesn’t work*. Please see
the [followup article](http://devhawk.net/2008/10/21/the-fifth-assembly/)
for the gory details.

[Ed. Note – This long post is about changes we made in the DLR to avoid
type collisions with System.Core. The short version of this post is “You
can safely ignore the CS1685 warning you’ll get if you embed IPy 2.0
Beta 5 or later in your C\# 3.0 application”. The long version below has
the gory details of what we did, why we did it, a little about how
extension methods work and why you can ignore warning CS1685.]

[Author note – I don’t really have an editor.]

Between Beta 3 and Beta 4 of IronPython 2.0, the DLR team made a very
significant change to Microsoft.Scripting.Core.dll. As [JB
noticed](http://evain.net/blog/articles/2008/07/29/net-4-c-4-and-the-dlr),
the DLR expression trees have merged with the LINQ expression trees. As
part of this effort, they moved the newly merged expression tree types
in Microsoft.Scripting.Core.dll into the System.Linq.Expressions
namespace – the same namespace where those types live in System.Core.dll
in .NET Framework 3.5.

This change caused [quite a few
issues](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-August/thread.html#8036)
with our users. Basically, because of the expression tree merge and the
namespace change, the beta 4 version of Microsoft.Scripting.Core.dll had
type collisions with System.Core.dll all over the place, making it hard
or impossible to use them together. If you’re using C\# you could get
around these type collisions by using an [assembly reference
alias](http://msdn.microsoft.com/en-us/library/yabyz3h4.aspx). However,
assembly reference aliases aren’t supported for Web Sites projects or in
Visual Basic.

To fix this, we’re changing the top level namespace in
Microsoft.Scripting.Core.dll from System to Microsoft. We’re not going
back to the namespaces as they were in Beta 3 – for example, DLR
expression trees were originally in the Microsoft.Scripting.Ast
namespace but now they’ll be in Microsoft.Linq.Expressions. We don’t
think this change will be much of an issue because most people don’t use
types from Microsoft.Scripting.Core.dll directly. Unless you’re building
your own DLR language, this namespace change shouldn’t affect you at all
except to solve the type collision problem.

However, we did hit a small snag.

The LINQ expression tree code, having been written for .NET 3.5, is a
heavy user of extension methods. This means IronPython is now also a
heavy user of extension methods. However, unlike LINQ, IronPython has to
run against .NET 2.0 SP1. That means we can’t reference System.Core.dll
in IPy or DLR. If you try to compile C\# code with extension methods but
without a reference System.Core.dll, you get a [compiler
error](http://msdn.microsoft.com/en-us/library/bb384020.aspx)
complaining that it can’t find the required
[ExtensionAttribute](http://msdn.microsoft.com/en-us/library/system.runtime.compilerservices.extensionattribute.aspx)
type, which is defined in System.Core.dll.

This might appear to be an unsolvable problem, but it turns out the C\#
compiler doesn’t actually care *where* the ExtensionAttribute type comes
from. You can actually define your own copy of ExtensionAttribute (in
the [right
namespace](http://msdn.microsoft.com/en-us/library/system.runtime.compilerservices.aspx))
and C\# will happily compile extension methods without complaint.
Furthermore, ExtensionAttribute is only used as a marker – there’s [no
real code in
it](http://referencesource.microsoft.com/#mscorlib/system/runtime/compilerservices/extensionattribute.cs,dba09c2b000dafa2)
– so implementing your own copy is trivial. In the DLR source, you’ll
find they have defined their own copy of
[ExtensionAttribute](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=478318&changeSetId=39144)
so they can use extension methods and remain .NET 2.0 SP1 compatible.
Since we were using them in Microsoft.Scripting.Core.dll, we started
using extension methods in Microsoft.Scripting.dll and IronPython.dll as
well.

If you’ll recall back to the start of this post, we’re changing
namespaces in order to eliminate type collisions. The snag we hit was
that we couldn’t change the ExtensionAttribute namespace without
breaking all the extension methods. But we couldn’t leave it the same
without having a type collision with the ExtensionAttribute defined in
System.Core.dll. If you had a project including both copies of
ExtensionAttribute, C\# would generate a multiple type definition
warning and VB would generate a multiple type definition error.

We’ve looked at a several possible solutions to this. One idea was to
ship two completely different sets of binaries – one for .NET 2.0 and
one for .NET 3.5. But the upgrade story for that stinks – you want to
upgrade your app to .NET 3.5 you have to swap out all your IPy and DLR
dlls. Yuck. We considered having separate copies of just
Microsoft.Scripting.Core.dll – one defining ExtensionAttribute and the
other linked to System.Core.dll and using
[TypeForwardedTo](http://msdn.microsoft.com/en-us/library/system.runtime.compilerservices.typeforwardedtoattribute.aspx)
– but since the assemblies are strongly typed they’d have to same exact
version number in order to be swappable. Double yuck.

In the end, we decided to put an internal copy of ExtensionAttribute in
each assembly that needs it. As previously indicated, that’s
IronPython.dll and Microsoft.Scripting.dll as well as making the copy
already in Microsoft.Scripting.Core.dll internal. For
[IronRuby](http://www.ironruby.com/) fans reading this, we also added a
copy of ExtensionAttribute to IronRuby.dll and
IronRuby.Libraries.Scanner.dll as well.

It seems counterintuitive, doesn’t it? To solve a multiple type
definition problem, we defined even more copies of the type in question.

The key thing is that all these copies of ExtensionAttribute (except the
one in System.Core.dll) are internal rather than public types. If you
build a VB app that references System.Core.dll and
Microsoft.Scripting.Core.dll (beta 4), you end up with multiple *public*
copies of ExtensionAttribute and are rewarded with a VB compiler error.
However, as long as there’s only one public copy of ExtensionAttribute –
regardless of the number of internal copies of that type – VB is happy.
So if you’re building a VB app against Microsoft.Scripting.Core.dll
(beta 5) and System.Core, you should be golden.

In C\# 3.0, on the other hand, continues to throw a warning. If
ExtensionAttribute was a user-defined type, we’d be fine. However, since
Extension attribute is a “predefined system type”, you get [C\# warning
1685](http://msdn.microsoft.com/en-us/library/8xys0hxk.aspx) even though
the copies of ExtensionAttribute are all internal. Furthermore, since
there are multiple internal copies of ExtensionAttribute in the IPy
dlls, you’ll get this warning even if you’re not referencing
System.Core. It seems here that C\# 3.0 considers ExtensionAttribute a
predefined system type while VB doesn’t.

I realize that always having a warning in C\# 3.0 – even if you’re not
referencing System.Core.dll – doesn’t feel particularly clean. Given our
desire to support both .NET v2 and v3.5 with the same binaries, it was
the only choice. Remember that ExtensionAttribute has literally no code
and is only used to signal the compiler for extension methods, so we
decided it was fairly ignorable as warnings go.

If you’re willing to compile from source yourself, it’s fairly easy to
build a set of binaries for a specific version .NET that doesn’t have
the warning. If you’re building for v3.5, you need to remove
Extension.cs from the three projects that have a copy of it
(Microsoft.Scripting.Core, Microsoft.Scripting, IronPython) and add a
reference to System.Core.dll. If you’re building for v2.0, remove the
Extension.cs from Microsoft.Scripting and IronPython then change the
visibility in the Microsoft.Scripting.Core version from internal to
public. Note, we [treat warnings as
errors](http://msdn.microsoft.com/en-us/library/microsoft.build.tasks.managedcompiler.treatwarningsaserrors.aspx)
in IPy, but we did add CS1685 to the list of
[WarningsNotAsErrors](http://msdn.microsoft.com/en-us/library/microsoft.build.tasks.csc.warningsnotaserrors.aspx)
so the code still compiles. Of course, if you’re defining a framework
specific version, you won’t get the warning anyway.

As usual, we appreciate all feedback from our community so hammer on
this build as much as you can – esp. if you’ve been having type conflict
errors with Beta 4. As I [said in an earlier
post](http://devhawk.net/2008/09/17/ironpython-beta-5/), this is our
last planned beta, so now’s the time put it thru the paces to make sure
there’s nothing blocking you before we get to 2.0.

Finally, major props to Curt…aka [IRON
CURT](http://blogs.msdn.com/curth/)…for driving these dev changes and
putting up with the constant barrage of “where are we now?” status
requests from yours truly. I’m sure he now regrets sitting across the
hall within easy earshot.
