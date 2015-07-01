When it comes to processing XML, there are two basic approaches – load
it all into memory at once or process it a node at a time. In the .NET
world where I have spent most of the past ten years, those two models
are represented by
[XmlDocument](http://msdn.microsoft.com/library/system.xml.xmldocument)
and [XmlReader](http://msdn.microsoft.com/library/system.xml.xmlreader).
There are alternatives to XmlDocument, such as
[XDocument](http://msdn.microsoft.com/library/system.xml.linq.xdocument)
and
[XPathDocument](http://msdn.microsoft.com/library/system.xml.xpath.xpathdocument),
but you get the idea.

Out in non-MSFT land, the same two basic models exist, however the de
facto standard for stream based processing is SAX, the [Simple API for
XML](http://www.saxproject.org/). SAX is supported by [many
languages](http://www.saxproject.org/langs.html), [including
Python](http://www.python.org/doc/current/lib/module-xml.sax.html).

Personally, I’ve never been a fan of SAX’s event-driven approach.
Pushing events makes total sense for a human driven UI, but I never
understood why anyone thought that was a good idea for stream processing
XML. I like XmlReader’s pull model much better. When you’re ready for
the next node, just call
[Read](http://msdn.microsoft.com/library/system.xml.xmlreader.Read)() –
no mucking about setting [content
handlers](http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html)
or handling node processing events.

Luckily, the [Python standard
library](http://docs.python.org/lib/lib.html) supports both approaches.
It provides both a [SAX based
parser](http://docs.python.org/lib/module-xml.sax.html) as well as a
[pull based parser called
pulldom](http://docs.python.org/lib/module-xml.dom.pulldom.html).
Pulldom doc’s are fairly sparse, but [Paul
Prescod](http://www.prescod.net/) wrote a [nice
introduction](http://www.prescod.net/python/pulldom.html). Here’s an
example from Paul’s site (slightly modified):

``` python
from xml.dom import pulldom
nodes = pulldom.parse( "file.xml" )  
for (event,node) in nodes:  
    if event=="START_ELEMENT" and node.tagName=="table":  
        nodes.expandNode( node )
```

Actually, I like this *better* than XmlReader, since it provides the
nodes in a list-like construct that appeals to the functional programmer
in me. I’d like it even more if Python had a native pattern matching
syntax – you know, like F\# – but you can get similar results by
chaining together conditionals with
[elif](http://docs.python.org/ref/if.html).

However, IronPython doesn’t support any of the XML parsing modules from
Python’s standard library. They’re all based on a C-based python module
called
[pyexpat](http://docs.python.org/lib/module-xml.parsers.expat.html)
which IronPython can’t load. [^1] I wanted a pulldom type model, so I
decided to wrap XmlReader to provide a similar API and lets me write
code like this:

``` python
import ipypulldom  
nodes = ipypulldom.parse( "sample.xml" )
for node in nodes:
  if node.nodeType==XmlNodeType.Element:
    print node.xname
```

There are a few differences from pulldom, but it’s basically the same
model. I’m using the native .NET type XmlNodeType rather than a string
to indicate the node type. Furthermore, I made the node type a property
of the node, rather than a separate variable. I also didn’t implement
expandNode, though doing so would be a fairly straightforward
combination of XmlReader.ReadSubtree and XmlDocument.Load.

I stuck the [code for
ipypulldom](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/ipypulldom.py)
up in a new folder on my Skydrive: [IronPython
Stuff](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/IronPython%20Stuff).
It’s fairly short – only about 45 lines of code. Feel free to use it if
you need it.

[^1]: The [FePy project](http://fepy.sourceforge.net/) has a [.NET port of
pyexpat](https://fepy.svn.sourceforge.net/svnroot/fepy/trunk/lib/pyexpat.py)
as part of their distribution, so I assume that lets you use the
standard pulldom implementation in IPy. FePy looks really cool but I
haven’t had time to dig into it yet.
