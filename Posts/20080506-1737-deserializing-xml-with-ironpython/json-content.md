Now that I can [stream process
XML](http://devhawk.net/2008/05/06/Stream+Processing+XML+In+IronPython.aspx),
the next logical step is to deserialize it into some type of object
graph. As I said in my last post, there are at least three different
DOM-esque options on the .NET platform as well as two in the Python
library ([xml.dom](http://docs.python.org/lib/module-xml.dom.html) and
[xml.minidom](http://docs.python.org/lib/module-xml.dom.minidom.html))

However, anyone who’s ever programmed against the
[DOM](http://www.w3.org/DOM/) knows just what a major PITA it is.

Instead, you could deserialize the XML into a custom object tree, based
on the nodes in the XML stream. In .NET, there are at least two
libraries for doing this: the old-school
[XmlSerializer](http://msdn.microsoft.com/library/system.xml.serialization.xmlserializer)
as well as the new-fangled
[DataContractSerializer](http://msdn.microsoft.com/library/system.runtime.serialization.datacontractserializer).
In these libraries, the PITA comes in defining the static types with all
the various custom attribute adornments you need to tell the
deserializer how to do it’s job. Actually, if you’re defining your code
first, all those adornments aren’t that big a deal. However, if you’re
starting from the XML, especially XML with lots of different namespaces
– like say [my RSS feed](http://feeds.feedburner.com/Devhawk) – defining
a static type for this gets old fast.

Of course, if you’re not using a statically typed language…
:wink:

One of the cool aspects of dynamic languages is the ability to easily
generate new types on the fly. In Python, you can create a new type by
calling the type function. Here’s an example of creating a new type for
a XML node:

``` python
def create_type(node, parent):  
  return type(node.name, (parent,), {'xmlns':node.namespace})
```

Since I’m working with XML, I wanted to make sure I handled namespaces.
Thus, I add the namespace to the class definition (the third parameter
in the type function above). This lets me walk up to any arbitrary
object created from an XML element and check it’s namespace.

I used this dynamic type creation functionality in my
[xml2py](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/xml2py.py)
module, which I added to my [IronPython SkyDrive
folder](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff).
It leverages
[ipypulldom](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/ipypulldom.py),
so make sure you get both. The heart of the module is the xml2py
function, which recursively iterates thru the node stream and builds the
tree. Attributes and child elements become named attributes on the
object, so I can write code that looks like this:

``` python
import xml2py  
rss = xml2py.parse('http://feeds.feedburner.com/Devhawk')  
for item in rss.channel.item:  
  print item.title
```

You see? No screwing around with childNodes or getAttribute here.

The basic processing loop of xml2py creates a new instance of a new type
when it encounters a start element tag. It then collects all the
attributes and children of that element, and adds them as attributes on
the element object, using the name of the type as name of the attribute.
If there are multiple children with the same type name, xml2py converts
that attribute to a list of values. For example, in an RSS feed, there
will be likely be many rss.channel.item elements. In xml2py, the item
attribute of the channel object will be a list of item objects.

Since attributes and child elements are getting slotted together, I
added a \_nodetype attribute on each so I can later tell (if I care) if
the value was originally an attribute or element. I haven’t written
py2xml yet, but that might be important then.

I do one optimization for simple string elements like
\<foo\>bar\</foo\>. In this case, I create a type that inherits from
string (hence the need for the parent parameter in the create\_type
function above) and contains the string text. It still has the xmlns and
\_nodetype attributes, so I could write item.title.xmlns (which is empty
since RSS is in the default namespace) or item.title.\_nodetype (which
would be XmlNodeType.Element)

It’s not much code – about 100 lines of code split evenly between the
xml2py function and the \_type\_factory object. Given that you usually
see the same element in an XML stream over an over, I didn’t want to
create multiple types for the same element. So \_type\_factory caches
types in a dictionary so I can reuse them. One of the cool things is
that it’s a callable type (i.e. it implements \_\_call\_\_ so I can use
the instance like a function. I started by defining a xtype function
that didn’t cache anything, but then later switched xtype to be a
\_type\_factory instance, but none of my code that called xtype had to
change!

One other quick note. If you put xml2py.py and ipypylldom.py in a
folder, you can experiment with them by launching “ipy -i xml2py”. This
runs xml2py.py as a script, but dumps you into the interactive console
when you’re thru. It will run the little snippet of code above which
runs xml2py on my [FeedBurner
feed](http://feeds.feedburner.com/Devhawk), but then you can play around
with the rss object and see what it contains. Be sure to check out the
xmlns attribute for each object in the rss.channel.link list.

