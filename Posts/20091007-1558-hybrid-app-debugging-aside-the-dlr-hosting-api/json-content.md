In my series on [Hybrid App
Debugging](http://devhawk.net/2009/10/06/lightweight-debugging-for-hybrid-cironpython-apps/),
I showed the following code for executing a Python file in a hybrid
C\#/IronPython app.

``` csharp
private void Window_Loaded(object sender, RoutedEventArgs e)
{
    ScriptEngine engine = Python.CreateEngine();
    ScriptScope  scope = engine.CreateScope();
    scope.SetVariable("items", lbThings.Items);
    engine.ExecuteFile("getthings.py", scope);
}
```

The [DLR Hosting API](http://dlr.codeplex.com/Project/Download/FileDownload.aspx?DownloadId=84001)
has three distinct levels of functionality. As simple as this is,
technically it’s level 2 since it’s using a ScriptEngine directly. If
you wanted to use the simplest level 1 hosting API, you could use
runtimes instead of engines and save a line of code.

``` csharp
private void Window_Loaded(object sender, RoutedEventArgs e)
{
    ScriptRuntime runtime = Python.CreateRuntime();
    runtime.Globals.SetVariable("items", lbThings.Items);
    runtime.ExecuteFile("getthings.py");
}
```

The ScriptRuntime version of ExecuteFile doesn’t include an overload
that takes a ScriptScope like ScriptEngine does, so instead you add the
items variable to the globals scope. However, this doesn’t automatically
add the items object to every child scope – you have to explicitly
import items into the local scope if you want to use it. So for Python,
that means you need to add “import items” to the top of the GetThings.py
script. Nothing else changes.

Personally, I find DLR Hosting API Level 2 to be straightforward and
easy enough to understand, so I tend to code to that level by default. I
actually had to go read the doc to discover the ScriptRuntime.Globals
property and talk to Dino about importing those variables into a local
scope. However, I wanted to point out that nothing in my Hybrid App
Debugging sample so far is really dependent on the level 2 API. If you
just want to execute some Python files in the context of your C\#
application, you can stick with the simpler level 1 API if you want. You
can even use lightweight debugging with the level 1 API – there’s an
overload of the SetTrace extension method for ScriptRuntimes just as
there is for ScriptEngines. Just something to keep in mind.
