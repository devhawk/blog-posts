My brother called earlier this week to let me know that the [Pat McGee
Band](http://www.patmcgeeband.com/), a band he introduced me to, has a
new album “Save Me” and a new EP “Drive By Romance” with four live
tracks. I picked up both on Napster last week. Also, they will be in
Seattle on May 4th. Most of the bands my brother introduces me too are
local to the east coast, so I rarely get to see them.

If you want to know how good Pat McGee is live, you can head over to the
[Internet Archive](http://www.archive.org/) where they have archived
about 140 live shows of Pat
[with](http://www.archive.org/audio/etreelisting-browse.php?collection=etree&cat=Pat%20McGee%20Band)
and
[without](http://www.archive.org/audio/etreelisting-browse.php?collection=etree&cat=Pat%20McGee%20Band)
his band. Pat McGee is “[trade
friendly](http://wiki2.etree.org/index.php?page=TradeFriendly)” which
means he lets his fans tape and trade his live concerts. Other artists
up on the [Live Music
Archive](http://www.archive.org/audio/collection.php?collection=etree)
include the Grateful Dead (over 300 shows!), Little Feat and Toad the
Wet Sprocket.

The only issue with the the Live Music Archive is that the songs are
mostly in a lossless compression format called “shorten”. Unfortunately,
there’s no way to play shorten files in Windows Media Player (as far as
I know – there is a [plugin for
WinAmp](http://wiki.etree.org/index.php?page=ShnAmp)). What I really
want is to convert these files to Windows Media format using the
Lossless codec. No such utility exists, though I did find a free
[command-line utility](http://www.etree.org/shnutils/shorten/) to
convert shorten files to uncompressed wav files. So I hacked up a little
batch program to convert each file from shorten to wav and then to WMA
lossless. Turns out that the WMA lossless versions of the files are
about half the size of the shorten versions, so I get both playback
convenience as well as a non-trivial space savings. I’d post the batch
file, except that when I said I hacked it up, I really mean it.
Hard-coded paths, implicit assumptions, bad code, the works. I’m going
to take another pass at it, then I’ll post it.
