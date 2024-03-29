As part of my series on [using IronPython with
WPF](http://devhawk.net/2008/11/12/ironpython-and-wpf-part-1-introduction/)
[^1], I built an extension method in C\# that does [dynamic member
resolution on WPF
FrameworkElements](http://devhawk.net/2008/11/14/ironpython-and-wpf-part-2-loading-xaml/).
The upshot of this code is that I can write ``win1.listbox1`` instead of
``win1.FindName('listbox1')`` when using WPF objects from Python or any
DLR language. Convenient, right?

The problem with this approach is that the C\# extension method gets
compiled into an assembly that’s bound to a specific version of the DLR.
I recently started experimenting with a [more recent
build](http://nightlybuilds.cloudapp.net/Project.aspx?project=ironpython)
of IronPython and I couldn’t load the extension method assembly due to a
conflict between the different versions of Microsoft.Scripting.dll. Of
course, I could have simply re-compiled the assembly against the new
bits, but that would mean every time I moved to a new version of
IronPython, I’d have to recompile. Worse, it would limit my ability to
run multiple versions of IronPython on my machine at once. I currently
have three – count ‘em, *three* – copies of IronPython installed: [2.0
RTM](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=8365),
[nightly build version
46242](http://nbs.blob.core.windows.net/ironpython/IronPython.46242.release.zip),
and an internal version [without the mangled
namespaces](http://devhawk.net/2008/09/17/dlr-namespace-change-fire-drill/)
of our public CodePlex releases. Having to manage multiple copies of my
extension assembly would get annoying very quickly.

Instead of adding a reference to the compiled assembly, what if I could
add a reference to a C\# file directly? Kinda like how adding references
to Python files works, but for statically compiled C\#. That would let
me write code like the following, which falls back to adding a reference
to the C\# file directly if adding a reference to the compiled assembly
fails.

``` python
try:
  clr.AddReference('Microsoft.Scripting.Extension.Wpf.dll')
except:
  import codedom
  codedom.add_reference_cs_file('FrameworkElementExtension.cs',
    ['System', 'WindowsBase', 'PresentationFramework',
     'PresentationCore', 'Microsoft.Scripting'])
```

Since this technique uses
[CodeDOM](http://msdn.microsoft.com/en-us/library/f1dfsbhc.aspx), I
decided to encapsulate the code in a Python module named codedom, which
is frankly pretty simple. As a shout-out to my pals on the [VB
team](http://blogs.msdn.com/vbteam/), I broke compiling out into it’s
own separate function so I could easily support adding VB as well as C\#
files.

``` python
def compile(prov, file, references):
  cp = CompilerParameters()
  cp.GenerateInMemory = True
  for ref in references:
    a = Assembly.LoadWithPartialName(ref)
    cp.ReferencedAssemblies.Add(a.Location)
  cr = prov.CompileAssemblyFromFile(cp, file)
  if cr.Errors.Count > 0:
    raise Exception(cr.Errors)
  return cr.CompiledAssembly

def add_reference_cs_file(file, references):
  clr.AddReference(compile(CSharpCodeProvider(), file, references))

def add_reference_vb_file(file, references):
  clr.AddReference(compile(VBCodeProvider(), file, references))
```

The compile function uses a [CodeDOM
provider](http://msdn.microsoft.com/en-us/library/system.codedom.compiler.codedomprovider.aspx),
which provides a convenient function to [compile an assembly from a
single
file](http://msdn.microsoft.com/en-us/library/system.codedom.compiler.codedomprovider.compileassemblyfromfile.aspx).
The only tricky part was adding the references correctly. Of the five
references in this example, the only one CodeDOM can locate
automatically is System.dll. For the others, it appears that CodeDOM
needs the full path to the assembly in question.

Of course, hard-coding the assembly paths in my script would be too
fragile, so instead I use partial names. I load each referenced assembly
via
[Assembly.LoadWithPartialName](http://msdn.microsoft.com/en-us/library/system.reflection.assembly.loadwithpartialname.aspx)
then pass it’s Location to the CodeDOM provider via the
CompilerParameters object. I realize that loading an assembly just to
find its location it kind of overkill but a) I couldn’t find another
mechanism to locate an assemblies location given only a partial name and
b) I’m going to be loading the referenced assemblies when I load the
generated assembly anyway, so I figured it loading them to find their
location wasn’t a big deal. Note, that typically you’re used to passing
a string to clr.AddReference, but it also can accept an assembly object
directly.

Of course, this approach isn’t what you would call “fast”. Loading the
pre-compiled assembly is much, *much* faster than compiling the C\# file
on the fly. But I figure slow code is better than code that doesn’t work
at all. Besides, the way the code is written, I only take the extra
compile hit if the pre-compiled assembly won’t load.

I stuck my
[codedom.py](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/codedom.py)
file up on my SkyDrive. Feel free to leverage as you need.

[^1]: I had to put that series on the back burner in part because the
[December update to Windows
Live](http://windowslivewire.spaces.live.com/blog/cns!2F7EB29B42641D59!26304.entry)
totally broke my WPF photo viewing app. I’ve got a new WPF app I’m
working on, but I’m not quite ready to blog about it yet.
