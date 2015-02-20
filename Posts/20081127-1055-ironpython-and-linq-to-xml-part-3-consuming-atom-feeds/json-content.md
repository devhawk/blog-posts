Now that I have [my list of Rock Band
songs](http://devhawk.net/2008/11/27/IronPython+And+Linq+To+XML+Part+2+Screen+Scraping.aspx),
I need to generate a Zune playlist. I wrote that Zune just uses the [WMP
playlist format](http://msdn.microsoft.com/en-us/library/bb249686.aspx),
but that’s not completely true. [Media
elements](http://msdn.microsoft.com/en-us/library/bb262730(VS.85).aspx)
in a Zune playlist have several attributes that appear unique to Zune.

Because of Zune Pass, Zune supports the idea of [streaming
playlists](http://www.mjefferson.net/2008/04/03/zune-streaming-playlists/)
where the songs are downloaded on demand instead of played from the
local hard drive. In order to enable this, media elements in Zune
playlists can have a serviceID attribute, a GUID that uniquely
identifies the song on the Zune service. We also need the song’s album
and duration – the Zune software summarily removes songs that don’t
include the duration.

Of course, the Rock Band song list doesn’t include the Zune song service
ID. It also doesn’t include the song’s album or duration. So we need a
way, given the song’s title and artist (which we do have) to get its
album, duration and service ID. Luckily, the Zune service provides a way
to do exactly this, albeit an undocumented way. Via
[Fiddler2](http://www.fiddler2.com/fiddler2/), I learned that Zune
exposes a set of Atom feed web services on catalog.zune.net that the UI
uses when you search the marketplace from the Zune software. There are
feeds to search by artist and by album but the one we care about is the
search by track. For example, here’s the track query for [Pinball Wizard
by The
Who](http://catalog.zune.net/v1.2/music/track?q=pinball+wizard+the+who).

Since these feeds are real XML, I can simply use
[XDocument.Load](http://msdn.microsoft.com/library/system.xml.linq.xdocument.load.aspx)
to suck down the XML. Then I look for the first Atom entry element using
similar LINQ to XML techniques I [wrote about last
time](http://devhawk.net/2008/11/27/IronPython+And+Linq+To+XML+Part+2+Screen+Scraping.aspx).
If there’s no Atom elements, that means that the search failed – either
Zune doesn’t know about the song or it can’t find it via the Rock Band
provided title and artist. Of the 461 songs on Rock Band right now, my
script can find 417 of them on Zune automatically.

Of course, since the Zune data is in XML instead of HTML, finding the
data I’m looking for is much easier that it was to find the Rock Band
song data. Here’s the code pull the relevant information out of the Zune
catalog feed that we need.

``` python
def ScrapeEntry(entry):
  id = entry.Element(atomns+'id').Value  
  length = entry.Element(zunens+'length').Value  

  d = {}  
  d['trackTitle'] = entry.Element(atomns+'title').Value  
  d['albumArtist'] = entry.Element(zunens+'primaryArtist')
                       .Element(zunens+'name').Value  
  d['trackArtist'] = d['albumArtist']  
  d['albumTitle'] = entry.Element(zunens+'album')
                       .Element(zunens+'title').Value  

  if id.StartsWith('urn:uuid:'):  
    d['serviceId'] = "{" + id.Substring(9) + "}"  
  else:  
    d['serviceId'] = id  

  m = length_re.Match(length)  
  if m.Success:  
    min = int(m.Groups[1].Value)  
    sec = int(m.Groups[2].Value)  
    d['duration'] = str((min * 60 + sec) * 1000)  
  else:  
    d['duration'] = '60000'  

  return d  

trackurl = catalogurl + song.search_string
trackfeed = XDocument.Load(trackurl)  
trackentry = First(trackfeed.Descendants(atomns+'entry'))  
track = ScrapeEntry(trackentry)
```

A few quick notes:

-   The code above isn’t valid Python, I added a couple of carriage
    returns (albumArtist and albumTitle) to get it to read well on the
    blog without wrapping badly.
-   song.search\_string returns the song title and artist as a plus
    delimited string. i.e. pinball+wizard+the+who. However, many Rock
    Band songs end in a parenthetical like (Cover Version) so I
    automatically strip that off for the search string
-   duration in the Atom feed is stored like PT3M23S, which means the
    song is 3:23 long. The playlist file expect the song length in
    milliseconds, so I use a .NET regular expression to pull out the
    minutes and seconds and do the conversion. It’s not exact – songs
    lengths usually aren’t exactly a factor of seconds, but as far as I
    can understand, Zune just uses that to display in the UI – it
    doesn’t affect playback at all.

Now I have a list of songs with all the relevant metadata, next time
I’ll write it out into a Zune playlist file.
