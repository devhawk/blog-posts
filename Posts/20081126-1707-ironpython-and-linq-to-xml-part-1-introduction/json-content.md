Shortly after I joined the VS Languages team, we had a morale event that
included a [Rock Band](http://www.rockband.com/) tournament. I didn’t
play that day in the tournament since I had never played before, but I
was hooked just the same. I got [Rock
Band](http://www.xbox.com/games/rockband) for my birthday, [Rock Band
2](http://www.xbox.com/games/rockband2) shortly after it came out in
September and I’m hoping to get the [AC/DC Track
Pack](http://www.rockband.com/games/acdc) for Christmas.

There are [lots of songs](http://www.rockband.com/music/songs) available
for Rock Band – 461 currently available between on-disc and downloadable
tracks – with more added every week. Frankly, there’s lots of music on
that list that I don’t recognize. Luckily, I’m also a [Zune
Pass](http://www.zune.net/software/zunepass/) subscriber, so I can go
out and download all the Rock Band tracks and listen to them on my Zune.
But who has time to manually search for 461 songs? Not me. So I wrote a
little Python app to download the list of Rock Band songs and save it as
a Zune playlist.

I ended up use Linq to XML very heavily in this project. Zune playlists
use the same XML format as [Windows
playlists](http://msdn.microsoft.com/en-us/library/bb249686.aspx), Zune
exposes the backend music catalog via a Atom feeds and I used [Chris
Lovett’s
SgmlReader](http://www.lovettsoftware.com/blogs/blog.aspx?id=56) to
expose the HTML list of Rock Band songs as XML. I realize Linq to XML
wasn’t on “[the
list](http://devhawk.net/2008/11/13/IronPython+And+LtInsert+MSFT+Technology+Heregt.aspx)”,
but I had a specific need so it got bumped to the head of the line.

BTW, for those who just want [the
playlist](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Zune/rockband.zpl),
I stuck it on my Skydrive. Unfortunately, there’s no Skydrive API right
now, so I can’t automate uploading the new playlist every week. If
anyone has alternative suggestions or a way to programmatically upload
files to SkyDrive, let me know.
