![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/8d7a6d959c67_6D72/image_thumb_1.png "image")

Now that I’ve got Pygments and its dependencies [packaged up in an
easy-to-distribute
assembly](http://devhawk.net/2009/08/10/Compiling+Python+Packages+Into+Assemblies.aspx),
I need to be able to call it from C\#. However, if you pop open
pygments.dll in Reflector, you’ll notice it’s not exactly intuitive to
access. Lots of compiler generated names like pygments\$12 and
StringIO\$64 in a type named DLRCachedCode. Clearly, this code isn’t
intended to be used by anything except the IronPython runtime.

So we better create one of those IronPython runtime thingies.

As you can see in the layer diagram to the left, PygmentsCodeSource is
split into two parts – a C\# part and a Python part. The Python part is
very simple – just importing a couple of Pygments functions into the
global namespace and a simple helper function to generate syntax
highlighted HTML from a given block of code in a given language and
style. The code itself is pretty simple. Note the reference to the
pygments assembly I described last post. Here’s the entire file:

``` python
import clr
clr.AddReference("pygments")

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

def generate_html(code, lexer_name, style_name):
  from pygments import highlight
  from pygments.lexers import get_lexer_by_name
  from pygments.styles import get_style_by_name
  from devhawk_formatter import DevHawkHtmlFormatter

  if not lexer_name: lexer_name = "text"
  if not style_name: style_name = "default"
  lexer = get_lexer_by_name(lexer_name)
  return highlight(code, lexer, DevHawkHtmlFormatter(style=style_name))
```

Instead of including this in the Pygments assembly, I embedded this file
as a resource in my C\# assembly. This way, I could use the standard DLR
hosting APIs to create a script source and execute this code. I did have
to build a concrete StreamContentProvider class to wrap the resource
stream in, but otherwise, it’s pretty straight forward.

``` csharp
static ScriptEngine _engine;
static ScriptSource _source;

private void InitializeHosting()
{
    _engine = IronPython.Hosting.Python.CreateEngine();

    var asm = System.Reflection.Assembly.GetExecutingAssembly();
    var stream = asm.GetManifestResourceStream(
                   "DevHawk.PygmentsCodeSource.py");
    _source = _engine.CreateScriptSource(
                new BasicStreamContentProvider(stream),  
                "PygmentsCodeSource.py");
}
```

Once I got the engine and script source set up, all that remains is
setup a script scope to execute the script source in. For this specific
application, it’s probably overkill to have a scope per instance – I
think the syntax highlighting process is stateless so a single scope
should be easily shared across multiple PygmentsCodeSource instances.
But I didn’t take any chances, I created a script scope per instance to
execute the source in.

``` csharp
ScriptScope _scope;
Thread _init_thread;

public PygmentsCodeSource()
{
    if (_engine == null)
        InitializeHosting();

     _scope = _engine.CreateScope();

    _init_thread = new Thread(() => { _source.Execute(_scope); });
    _init_thread.Start();
}
```

You’ll notice that I’m executing the source in the scope on a background
thread. That’s because it takes a while to execute, especially the first
time. However, I don’t actually use the Python code until after the user
types or copies a block of code into the UI and presses OK. In my
experience, executing the Python code is typically finished by the time
I get code into the box and press OK. I just need to make sure I add an
\_init\_thread.Join guard anywhere I’m going to access the \_scope to be
sure the initialization is complete before I try to use it.

In the next, and last, post in this small series we’ll see how to invoke
Python functions in the \_scope I initialized above from C\#.
