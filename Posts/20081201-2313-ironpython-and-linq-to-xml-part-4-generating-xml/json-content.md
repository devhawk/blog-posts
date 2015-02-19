Now that I have my [list of Rock Band
songs](http://devhawk.net/2008/11/27/IronPython+And+Linq+To+XML+Part+2+Screen+Scraping.aspx)
and I can [get the right Zune
metadata](http://devhawk.net/2008/11/27/IronPython+And+Linq+To+XML+Part+3+Consuming+Atom+Feeds.aspx)
for most of them, I just need to write out the playlist XML. This is
very straight forward to do with the classes in System.Xml.Linq.

``` {.brush: .python}
def GenMediaElement(song):
  try:
    trackurl = zune_catalog_url + song.search_string     
    trackfeed = XDocument.Load(trackurl)
    trackentry = First(trackfeed.Descendants(atomns+'entry'))
    trk = ScrapeEntry(trackentry)
    return XElement('media', (XAttribute(key, trk[key]) for key in trk))
  except:
    print "FAILED", song     
     
zpl = XElement("smil",     
  XElement("head",  
    XElement("title", "Rock Band Generated Playlist")),     
  XElement("body",     
    XElement("seq", (GenMediaElement(song) for song in songs))))

settings = XmlWriterSettings()
settings.Indent = True     
settings.Encoding = Encoding.UTF8     
with XmlWriter.Create("rockband.zpl", settings) as xtw:
  zpl.WriteTo(xtw)
```

XElement’s
[constructor](http://msdn.microsoft.com/en-us/library/bb302741.aspx)
takes a name
([XName](http://msdn.microsoft.com/en-us/library/system.xml.linq.xname.aspx)
to be precise) and any number of [child
objects](http://msdn.microsoft.com/en-us/library/bb943882.aspx). These
child objects can be XML nodes (aka
[XObjects](http://msdn.microsoft.com/en-us/library/system.xml.linq.xobject.aspx))
or simple content objects like strings or numbers. If you pass an
IEnumerable, the XElement constructor will iterate the collection and
add all the items as children of the element. If you’ve had the
displeasure of building an XML tree using the
[DOM](http://www.w3.org/DOM/), you’ll really appreciate XElements’s
fluent interface. I was worried that Python’s significant whitespace
would force me to put all the nested XElements on a single line, but
luckily Python doesn’t treat whitespace inside parenthesis as
significant. 

Creating collections in Python is even easier than it is in C\#.
Python’s supports a [yield
keyword](http://www.python.org/doc/2.5.2/ref/yield.html) which is
basically the equivalent of C\#’s [yield
return](http://msdn.microsoft.com/en-us/library/9k7k7cf0(VS.80).aspx).
However, Python also supports list comprehensions (known as [generator
expressions](http://www.python.org/doc/2.5.2/ref/genexpr.html)), which
are similar to [F\#’s sequence
expressions](http://research.microsoft.com/fsharp/manual/lexyacc.aspx#_Toc207785615).
These are nice because you can specify a collection in a single line,
rather than having to create a separate function, which is what you have
to do to use yield. I have two generator expressions: (XAttribute(key,
trk[key]) for key in trk) creates a collection of XAttributes, one for
every item in the trk dictionary and (GenMediaElement(song) for song in
songs) which generates a collection of XElements, one for every song in
the song collection.

Once I’ve finished building the playlist XML, I need to write it out to
a file. Originally, I used Python’s built in open function, but the
playlist file had to be UTF-8 because of band names like Mötley Crüe.
Zune’s software appears to always use UTF-8. In addition to setting the
encoding, I also specify to use indentation, so the resulting file is
somewhat readable by humans.

The playlist works great in the Zune software, but since it’s a
[streaming
playlist](http://www.mjefferson.net/2008/04/03/zune-streaming-playlists/)
there’s no easy way to automatically download all the songs and sync
them to your Zune device. I expected to be able to right click on the
playlist and select “download all”, but there’s no such option. Zune
does have a concept called
[Channels](http://www.zune.net/NR/rdonlyres/51AE197B-221B-4192-AC4A-7CA1CBFC8312/0/channels.wmv)
where the songs from a regularly updated feed are downloaded locally and
synced to the device. However, the Zune software appears to be hardcoded
to only download channels from the catalog service so I couldn’t tap
into that. If anyone knows how to sign up to become a Zune partner
channel, please drop me a line.

Otherwise, that’s So there you have it. As usual, I’ve stuck the code
[up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/RockBandZunePass.zip).
If I can remember, I’ll try and run the script once a week and upload
[the new
playlist](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Zune/rockband.zpl)
to my SkyDrive as well.
