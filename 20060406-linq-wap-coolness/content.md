I never really missed [Web Application
Project](http://msdn.microsoft.com/asp.net/reference/infrastructure/wap/default.aspx)
support in VS05 until I realized what I could do with it. I’ve been
experimenting with LINQ and wanted to be able to use it in a web
application I’m prototyping. Under the file system model, there’s no
easy way to change the compiler used for dynamic compilation of web
pages. With WAP, it’s no problem.

If you’ve got both WAP and LINQ installed, you can enable LINQ support
in your web apps by doing the folllowing.

1.  Open your WebApp.csproj file in notepad.
2.  Add references to System.Query, System.Data.DLinq and
    System.Xml.XLinq.
3.  Change the Target Import element to import ``$(ProgramFiles)LINQ
    PreviewMiscLinq.targets`` instead of
    ``$(MSBuildBinPath)Microsoft.CSharp.targets``

That’s it! Seems simple, but it let me bind a GridView to the following
function:

``` csharp
public static IEnumerable GetTitles()
{
  var con = new SqlConnection(Properties.Settings.Default.PubsConString);
  var db = new Pubs(con);
  var q = from t in db.Titles select t;

  return q;
}
```

It would be even cooler if I could simply write that query in the conext
of the ObjectDataSource, but of course ObjectDataSource doesn’t know
about LINQ. I imagine a LinqDataSource would be a logical next step.
