Here’s the short version of this post: data binding in WPF to IPy
objects just works…mostly. However, I’m guessing you are much more
interested in the long version.

Typically, data binding depends on reflection. For example, the
following snippet of XAML defines a data bound list box where the title
property of each object in the bound collection gets bound to the text
property of a text block control. WPF would typically find the title
property of the bound objects via reflection.

``` xml
<ListBox Grid.Column="0" x:Name="listbox1" >
  <ListBox.ItemTemplate>
    <DataTemplate>
      <TextBlock Text="{Binding Path=title}" />
    </DataTemplate>
  </ListBox.ItemTemplate>
</ListBox>
```

The problem is that IronPython objects don’t support reflection – or
more accurately, reflection won’t give you the answer you’re expecting.
Every IPy object does have a static type, but it implements Python’s
dynamic type model. [^1] Thus, if you reflect on the IPy object looking
for the title property or field, you won’t find it. It might seem we’re
in a bit of a bind (pun intended). However, WPF does [provide an
out](http://msdn.microsoft.com/en-us/library/ms743643.aspx):

> “You can bind to public properties, sub-properties, as well as
> indexers of any common language runtime (CLR) object. The binding
> engine uses CLR reflection to get the values of the properties.
> Alternatively, objects that implement
> [ICustomTypeDescriptor](http://msdn.microsoft.com/en-us/library/system.componentmodel.icustomtypedescriptor.aspx)
> or have a registered
> [TypeDescriptionProvider](http://msdn.microsoft.com/en-us/library/system.componentmodel.typedescriptionprovider.aspx)
> also work with the binding engine.”\
> WPF [Binding Sources
> Overview](http://msdn.microsoft.com/en-us/library/ms743643.aspx), MSDN
> Library

Luckily for us, IronPython objects implement ICustomTypeDescriptor [^2].
That snippet of XAML above? It’s straight from my photo viewing app. All
I had to do was define the data template in the list box XAML then set
the ItemsSource property of the list box instance.

``` python
w.listbox1.ItemsSource = albumsFeed.channel.item
```

As I said, it just works. However, I did hit one small snag – hence the
“mostly” caveat above.

If you look at the [top level WL Spaces photos
feed](http://techiewife.spaces.live.com/photos/feed.rss), you’ll see
that each item’s title starts with “Photo Album:”. Yet in the
[screenshot of my
app](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/IronPythonandWPF_EFC4/image_4.png),
you’ll notice that I’ve stripped that redundant text out of the title.
Typically, if you want to change the bound value during the binding
process, you build an
[IValueConverter](http://msdn.microsoft.com/en-us/library/ms752347.aspx#data_conversion)
class. I needed two value conversions in my app, stripping “Photo
Album:” for the album list box and converting a string URL into a
BitmapImage for the image list box.

IronPython objects can inherit from a .NET interface, so there’s no
problem building an IValueConverter. However, in order to use a custom
IValueConverter from XAML, you need to [declare it in XAML as a static
resource](http://msdn.microsoft.com/en-us/library/ms752091.aspx).
However, as you might imagine, dynamic IPy objects don’t work as static
resources. So while I can define an IValueConverter in Python, I can’t
create one from XAML.

There are a few possible solutions to this. The first is to build up the
data template in code. If you do that, they you can [programmatically
add the converter to the
binding](http://msdn.microsoft.com/en-us/library/ms742863.aspx). I was
hopeful that I could define the data template in XAML then manipulate
the binding, but there doesn’t appear to be any way to do that. Another
option would be to build some type of generic IValueConverter class in
C\# that loads either an IPy based IValueConverter or embedded python
conversion code. That’s problematic because those IPy object would need
to be created in the right ScriptRuntime, and there’s no built-in way to
access that. There are also a small set of XamlReader extensions such as
[XamlTypeMapper](http://msdn.microsoft.com/en-us/library/system.windows.markup.xamltypemapper.aspx)
that might be able to provide the right hook into the XAML parsing to
allow IronPython based conversion.

In the end, I took the easiest way out – I transformed the data to be
bound before binding it. It’s cheating of sorts, but given the read-only
nature of this app, it was the easiest thing to do. So the actual line
of code to set listbox1’s ItemsSource looks like this:

```python
class Album(object):
  def __init__(self, item):
    self.title = item.title.Substring(13)
    self.itemRSS = item.itemRSS

w.listbox1.ItemsSource = [Album(item) for item in albumsFeed.channel.item]
```

I create a Python class for each RSS item in the feed, saving the
stripped title and the album RSS URL as fields. It’s kinda annoying to
basically be parsing the feed twice, but at least it’s not much code.
Python’s list comprehension syntax makes creating a list of Albums from
a list of RSS items a single line of code. I do something very similar
for data binding the second list box:

``` python
class Picture(object):
  def __init__(self, item):
    self.title = item.title  
    self.picture = BitmapImage(Uri(item.enclosure.url + ":thumbnail"))

w.listbox2.ItemsSource = [Picture(item) for item in albumfeed.channel.item]
```

Here I’m not only converting the raw data (adding “:thumbnail” at the
end of the URL) but also changing the data type from string to
BitmapImage. I’m binding to an image object in the second list box, but
to do that I need a BitmapImage instead of a string.

This “convert the data first” approach feels like a hack to me. After I
get this series of posts done, I am planning on going back and improving
this sample. Hopefully, I can find a better approach to value
conversions. Any gurus out there on XAML parsing, please feel free to
drop me a line or leave me a comment.

[^1]: you can access the underlying CLR type for any Python type via the
clr.GetClrType method. You an also check out the CreateNewType method
from
[NewTypeMaker.cs](http://www.codeplex.com/IronPython/SourceControl/FileView.aspx?itemId=649510&changeSetId=43433)

[^2]: I spent the better part of an afternoon trying to make
TypeDescriptionProviders work before Dino pointed out that we already
support ICustomTypeDescriptor in Python objects. I didn’t realize at
first because I had a case sensitivity bug in my original prototype code
– it turns out that “Title” != “title”.
