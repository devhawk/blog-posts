First, I need to convert the HTML [list of Rock Band
songs](http://www.rockband.com/music/songs) into a machine readable
format. That means doing a little screen scraping. Originally, I used
[Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/) but I
found that
[UnicodeDammit](http://www.crummy.com/software/BeautifulSoup/documentation.html#Beautiful%20Soup%20Gives%20You%20Unicode,%20Dammit)
got confused on names like Blue Öyster Cult and Mötley Crüe. I’m
guessing it’s broken because IronPython doesn’t have non-unicode
strings.

Instead, I used SgmlReader to provide an XmlReader interface over the
HTML, then queried that data via Linq to XML. I used the [version of
SgmlReader from
MindTouch](http://wiki.developer.mindtouch.com/Community/SgmlReader)
since they include a compiled binary and it seems to be the only active
maintained version. I wrapped it all up in a function called load that
loads HTML from either disk or the network (based on the URI scheme)
into an
[XDocument](http://msdn.microsoft.com/en-us/library/system.xml.linq.xdocument.aspx).

``` python
def loadStream(streamreader):
  from System.Xml.Linq import XDocument
  from Sgml import SgmlReader

  reader = SgmlReader()
  reader.DocType = "HTML"
  reader.InputStream = streamreader
  return XDocument.Load(reader)

def load(url):
  from System import Uri
  from System.IO import StreamReader

  if isinstance(url, str):
    url = Uri(url)

  if url.Scheme == "file":
    from System.IO import File
    with File.OpenRead(url.LocalPath) as fs:
      with StreamReader(fs) as sr:
        return loadStream(sr)
  else:
    from System.Net import WebClient
    wc = WebClient()
    with wc.OpenRead(url) as ns:
      with StreamReader(ns) as sr:
        return loadStream(sr)

def parse(text):
  from System.IO import StringReader
  return loadStream(StringReader(text))
```

I call load, passing in the URL to the list of songs. The “official”
Rock Band song page loads the actual content from [a different
page](http://www.rockband.com/music/getSearchResultsTable_Ajax?sort_on=songs.NAME&sort_order=asc)
via AJAX, so I just load the actual list directly via my load function.

Once the HTML is loaded as an XDocument, I need a way to find the
specific HTML nodes I was looking for. As I said earlier, XDocument uses
Linq to XML – there is not other API for querying the XML tree. In the
HTML, there’s a div tag with the id “content” that contains all the song
rows as table row elements. I built a simple function that uses the LINQ
Single method to find the tag by it’s id attribute value.

``` python
def FindById(node, id):
  def CheckId(n):
    a = n.Attribute('id')
    return a != None and a.Value == id

  return linq.Single(node.Descendants(), CheckId)
```

(Side note – I didn’t like the verbosity of the “a != None and a.Value == id” line of code, by XAttributes
are not comparable by value. That is, I can’t write
“node.Attribute(‘id’) == XAttribute(‘id’, id)”. And writing
“node.Attribute(‘id’).Value == id” only works if every node has an id
attribute. Not making XAttribute comparable by value seems like a
strange design choice to me.)

LINQ to objects works just fine from IronPython, with a few caveats.
First, IronPython doesn’t have extension methods, so you can’t chain
calls together sequentially like you can in C\#. So instead of
collection.Where(…).Select(…), you have to write
Select(Where(collection, …), …). Second, all the LINQ methods are
generic, so you have to use the verbose list syntax (for example:
Single[object] or Select[object,object]). Since Python doesn’t care
about the generic types, I wrote a bunch of simple helper functions
around the common LINQ methods that just use object as the generic type.
Here are a few examples:

``` python
def Single(col, fun):
  return Enumerable.Single[object](col, Func[object, bool](fun))

def Where(col, fun):
  return Enumerable.Where[object](col, Func[object, bool](fun))

def Select(col, fun):
  return Enumerable.Select[object, object](col, Func[object, object](fun))
```

Once I have the content node, all the songs are in tr nodes beneath it.
I wrote a function called ScrapeSong that transforms a song tr node into
a Song object (which I’ll talk about in the next installment of this
series). I use LINQ methods Select, OrderBy and ThenBy to provide me an
enumeration of Song objects, ordered by date added (descending) than
artist name.

``` python
def ScrapeSong(node):
  tds = list(node.Elements(xhtml.ns+'td'))
  anchor = list(tds[0].Elements(xhtml.ns+'a'))[0]

  title = anchor.Value
  url = anchor.Attribute('href').Value
  artist = tds[1].Value
  year = tds[2].Value
  genre = tds[3].Value
  difficulty = tds[4].Value
  _type = tds[5].Value
  added = DateTime.Parse(tds[6].Value)

  return Song(title, artist, added, url, year, genre, difficulty, _type)

songs = ThenBy(OrderByDesc(
          Select(content.Elements(xhtml.ns +'tr'), ScrapeSong),
          lambda s: s.added), lambda s: s.artist)
```

And that’s pretty much it. Next, I’ll iterate thru the list of songs and
get the details I need from Zune’s catalog web services in order to
write out a playlist that the Zune software will understand.
