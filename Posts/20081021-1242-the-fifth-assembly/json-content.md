As I’ve [written
previously](http://devhawk.net/2008/09/17/DLR+Namespace+Change+Fire+Drill.aspx),
we’ve had a few challenges recently with name collisions in the DLR. In
that post, I described how we had solved – or thought we solved, as it
turned out – the problem with ExtensionAttribute name collisions between
Microsoft.Scripting.Core.dll and System.dll.

However, as it turns out, having lots of copies of the same type [didn’t
solve the
problem](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-September/008485.html).
Since ExtensionAttribute is a known type to the C\# 3.0 compiler, it has
to choose one of the multiple copies that are in the project. We
*thought* that given a choice, it would favor the System.Core version.
However, what folks discovered after we released Beta 5 is that C\# 3.0
will choose the *first* copy of ExtensionAttribute that it finds. So if
you have System.Core.dll and IronPython referenced in your project, and
you define your own extension methods, the compile fails if the C\# 3.0
compiler finds one of the IronPython or DLR private copies of
ExtensionAttribute before the public copy in System.Core.

Furthermore, there doesn’t seem to be any way to set the reference order
in MSBuild files. I’ve never dug deep into the MSBuild file format, but
changing the order of the references in the csproj file didn’t seem to
effect the order the references were passed to the C\# compiler. I’m
guessing we might be able to change this by fiddling with the
[ResolveAssemblyReference
task](http://msdn.microsoft.com/en-us/library/9ad3f294.aspx), but we
didn’t want to force low level MSBuild file hacking on our user base.

We looked at a variety of other solutions, including rewriting the IL
after compilation to change the namespace of the ExtensionAttribute.
However, we had trouble making that solution work and besides, changing
the ExtensionAttribute namespace would have broken anyone using the
existing DLR or IPy extension methods. So instead, we went with a
different solution that we like to refer to as “The Fifth Assembly”
around the office.

[![IPy
References](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheFifthAssembly_B085/image_thumb.png "IPy References")](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheFifthAssembly_B085/image_2.png)In
IronPython 2.0 Beta 5, there were four DLLs that implement IronPython:
IronPython.dll, IronPython.Modules.dll, Microsoft.Scripting.dll and
Microsoft.Scripting.Core.dll. In our RC1 release, we’ve added “The Fifth
Assembly”: Microsoft.Scripting.ExtensionAttribute.dll. As you might
guess from its name, it has only a single public type:
ExtensionAttribute. By having ExtensionAttribute in its own dedicated
assembly, we can avoid the type collision at compile time by not
referencing both System.Core.dll and
Microsoft.Scripting.ExtensionAttribute.dll in the same project.

In IronPython, we reference the ExtensionAttribute assembly because we
use the C\# 3.0 complier but IPy has to be able to run on .NET Framework
2.0 SP1.
[![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheFifthAssembly_B085/image_thumb_1.png "image")](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheFifthAssembly_B085/image_4.png)However,
projects that embed IronPython in a .NET 3.5 project (aka C\# 3.0 or VB
9.0) will reference System.Core instead. The only reason why you would
explicitly use the ExtensionAttribute assembly was that if you, like us,
wanted to build your app with .NET 3.5, use extension methods but still
be compatible with .NET 2.0 SP1. We’re guessing there aren’t many of our
customers doing that, but if you are, explicitly referencing
ExtensionAttribute will work just as it does for compiling IronPython
itself.

It’s important to remember two things about the Fifth Assembly:

1.  Never reference System.Core and
    Microsoft.Scripting.ExtensionAttribute in the same project.
2.  Always deploy Microsoft.Scripting.ExtensionAttribute.dll as part of
    any solution that embeds IronPython (or IronRuby or vanilla DLR for
    that matter), even if you don’t reference it explicitly within your
    project.

This change is public in the source code as of [change set
42076](http://www.codeplex.com/IronPython/SourceControl/DirectoryView.aspx?SourcePath=&changeSetId=42076)
and will also be in the nearly-ready RC1 release of IronPython 2.0. If
you’ve got any questions or \<shudder\> find any more issues with this
solution, please let us know right away.
