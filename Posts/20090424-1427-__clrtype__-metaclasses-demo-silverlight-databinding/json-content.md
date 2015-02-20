I’ve gotten to the point where I can actually demo something interesting
with \_\_clrtype\_\_ metaclasses: Silverlight Databinding. This is a
trivial sample, data binding a list of Products (aka the sample class
I’ve been using all week) to a list box. But according to
[Jimmy](http://blog.jimmy.schementi.com/), this is something he gets
asked about on a regular basis and there’s a [AgDLR bug open for
this](http://www.codeplex.com/sdlsdk/WorkItem/View.aspx?WorkItemId=11844).
The \_\_clrtype\_\_ feature is specific to IronPython but I bet the
IronRuby guys could implement something similar if they wanted to.

When you install IronPython 2.6 (or 2.0.1 for that matter), it comes
with the AgDLR bits in the Silverlight subfolder. This includes
Silverlight compatible versions of the DLR and IronPython as well as the
Silverlight DLR host and the development web server
[Chiron](http://www.codeplex.com/sdlsdk/Wiki/View.aspx?title=Chiron) in
the Silverlightbin directory. There is also a script in the
Silverlightscript directory that will generate a dynamic Silverlight
application from a template. I ran “sl.bat python sldemo” in order to
build the skeleton project.

In the generated app.xaml file, I removed the default text box and
replaced it with this XAML code that I stole nearly-verbatim from my
blog post on [data binding in WPF with
IronPython](http://devhawk.net/2008/11/18/IronPython+And+WPF+Part+3+Data+Binding.aspx).
The only thing I changed was the binding path for the text block (title
became name).

``` xml
<ListBox x:Name="listbox1" >
  <ListBox.ItemTemplate>
    <DataTemplate>
      <TextBlock Text="{Binding Path=name}" />
    </DataTemplate>
  </ListBox.ItemTemplate>
</ListBox>
```

Then in the App class, I set the ItemsSource of the ListBox to a
hand-built a list of Products.

``` python
class App:
  def __init__(self):
    root = Application.Current.LoadRootVisual(UserControl(), "app.xaml")
    root.listbox1.ItemsSource = [
      Product("Crunchy Frog", 10, 12),
      Product("Rams Bladder Cup", 10, 12),
      Product("Cockroach Cluster", 10, 12),
      Product("Anthrax Ripple", 10, 12),
      Product("Spring Suprise", 10, 12)]
```

And that’s pretty much it. I used Chiron’s /z command to create a
Silverlight XAP file, uploaded it to [Silverlight
Streaming](http://www.microsoft.com/silverlight/resources/streaming.aspx)
and embedded it right here in this post. Code is [up on my
skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/IronPython%20Stuff/%7C_%7C_clrtype%7C_%7C_)
as well. Uusing Silverlight Streaming for this app was very easy –
basically upload the XAP file to their server and embed some iframe code
in this post via the source view and that was it. I’m not sure I would
use it for a production app, but it rocked for hosting this demo.

The XAP is a big download for such a trivial app – about 1.3MB. The vast
majority of that is the DLR and IronPython assemblies. The XAP would
only be 2.9kB if it was just the Python, XAML and manifest files. This
kinda stinks, but there’s a new [transparent platform extensions
feature](http://sdlsdk.codeplex.com/Wiki/View.aspx?title=Extensions) in
Silverlight 3 so we can at least break the DLR and IronPython DLLs out
into their own separate XAPs. That way they only get downloaded once and
cached in the browser instead of being included in every single
IronPython Silverlight application anyone creates.

So that’s one scenario down, one to go. In order to be able to build WCF
services in IronPython, I have to add a lot more infrastructure –
notably emitting CLR methods that can invoke dynamic methods as well as
emitting custom attributes. Invoking dynamic methods means understanding
[DLR
binders](javascript:window.location.href='http://dlr.codeplex.com/Project/Download/FileDownload.aspx?DownloadId=51534';),
so look for more posts on \_\_clrtype\_\_ next week.
