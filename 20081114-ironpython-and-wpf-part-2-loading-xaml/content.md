If we’re going to build a WPF app, we’re going to want to be able to
load some XAML. Sure, you can programmatically build up your UI, but WPF
and more importantly WPF tools like [Expression
Blend](http://www.microsoft.com/expression/products/Overview.aspx?key=blend)
are designed to work with XAML. Luckily, loading XAML is fairly easy:

``` python
def LoadXaml(filename):
    from System.IO import File
    from System.Windows.Markup import XamlReader
    with File.OpenRead(filename) as f:
        return XamlReader.Load(f)
```

We simply open the filename provided and use XamlReader to build out the
corresponding WPF object graph. Note, this is very different from the
XAML approach used by C\#/VB or even by IronPythonStudio. In those
scenarios, the XAML is compiled into a binary format (BAML) and embedded
in the compiled assembly. For my TechieWife Photo viewer, it’s all
script so there’s neither a XAML to BAML compile step nor a compiled
assembly to embed the BAML into, so we’re just loading raw XAML.

Since we’re using raw XAML, there are additional rules we need to
follow. First, when using compiled XAML, we can specify the name of the
event handler in the XAML directly. For XamlReader, that’s no allowed
since there’s no C\#/VB class associated with the XAML. Speaking of
class, you can’t specify x:Class either. Finally, anywhere you want to
use a static resource, as far as I can tell those need to be compiled in
a static language. I think you could build one in C\#, add a reference
to that assembly via clr.AddReference, then use it from XAML and it
should just work. However, since I’m trying to stick to IronPython
exclusively, I didn’t try that scenario out. 

Since you can’t specify the event handlers in XAML loaded by XamlReader,
you have to bind the event handlers in code. There are two listboxes in
my photo viewing app, and I want to capture the SelectionChanged event
of both of them. Binding event handlers in IronPython code uses the
same += syntax as C\# uses.

``` python
win1 = wpf.LoadXaml('win1.xaml')

win1.listbox1.SelectionChanged += listbox1_OnSelectionChanged
win1.listbox2.SelectionChanged += listbox2_OnSelectionChanged
```

My win1.xaml file has a Window type instance as the root. You don’t need
to be a deep WPF expert to realize that the WPF Window doesn’t have
listbox1 or listbox2 properties. Yet, in the code snippet above, I was
able to say win1.listbox1 and get back the WPF ListBox element with that
name. Cool trick, eh? Well, I can’t take credit for it – I [copied the
code](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=649471&changeSetId=43433)
from our Silverlight integration for dynamic languages. Unfortunately,
this code has to be written in C\# code, but it is the only C\# code in
my whole solution (and it’s reusable!)

``` csharp
[assembly: ExtensionType(
    typeof(FrameworkElement),  
    typeof(DevHawk.Scripting.Wpf.FrameworkElementExtension))]  

namespace DevHawk.Scripting.Wpf  
{  
    public static class FrameworkElementExtension  
    {  
        [SpecialName]  
        public static object GetBoundMember(FrameworkElement e, string n)  
        {  
            object result = e.FindName(n);  
            if (result == null)  
            {  
                return OperationFailed.Value;  
            }  
            return result;  
        }  
    }  
}
```

GetBoundMember is kinda like Python’s
[\_\_getattr\_\_](http://www.python.org/doc/2.5.2/ref/attribute-access.html)
or Ruby’s [method\_missing](http://www.thinkruby.org/2007/10/48). Of
course, it doesn’t work with C\#, but it does lets us trap dynamic
member resolution when calling a C\# object from a DLR language.
Srivatsn has a [great write
up](http://blogs.msdn.com/srivatsn/archive/2008/04/12/turning-your-net-object-models-dynamic-for-ironpython.aspx)
on using GetBoundMember and the four other special methods you can use
to make your CLR objects act more dynamic.

In this case, if the standard reflection-based member name resolution
fails, we try calling FrameworkElement’s FindName method to see if
there’s a corresponding control with the provided name. So ``win.listbox1``
is the equivalent to ``win.FindName('listbox1')``, but with less code and a
much more pythonic feel.

You’ll notice that we’re attaching this GetBoundMember method to
FrameworkElement as an extension method. It’s kinda cool that we can
inject a new method into an existing class to provides dynamic behavior
and it all works seamlessly from Python. However, DLR uses a different
mechanism to locate and bind extension methods than C\# or VB. Those
languages use
[ExtensionAttribute](http://msdn.microsoft.com/en-us/library/system.runtime.compilerservices.extensionattribute.aspx)
to mark extension methods and the assemblies and classes that contain
them. However, that approach forces you to examine ever single class in
marked assemblies and every single method in marked classes. Examining
every class and method is no big deal to do at compile time, but it
would be a significant perf issue at runtime. By using ExtensionType
attribute, the DLR only has to look at assembly attributes in order to
bind extension methods.

Once you’ve got the compiled FrameworkElementExtension assembly, you
just need to load it via clr.AddReference. I called the assembly
Devhawk.Scripting.Wpf and I load it automatically in my wpy.py module.
So if you’re building a WPF app in IronPython, you can simply “import
wpy” and you get the GetBoundMember extension method, the LoadXaml
function, and a bunch of WPF related namespaces imported into the wpf
scope. That way, you can write ``wpf.Button()`` instead of
``System.Windows.Control.Button()`` to programmatically create a new button.
