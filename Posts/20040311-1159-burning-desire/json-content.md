After actually [building
something](http://devhawk.net/PermaLink.aspx?guid=5c560426-b750-4eac-b618-e254c7b14298)
for the first time in a while, I spent some time last night researching
other stuff I want to write. One of the things I’m thinking about
building is a WMA to Audio CD burning program. Of course,
[WMP9](http://www.microsoft.com/windows/windowsmedia/players.aspx) (and
many other programs) does this today. However, there’s one specific
feature I need and it doesn’t appear to be one of the more standard
ones.

Pretty soon, we’re going to make the [Architecture Strategy
Series](http://msdn.microsoft.com/architecture/overview/series/) content
available for download. For each presentation, we’re going to provide
the slides, the full Producer presentation, and a WMA file suitable for
burring to CD. We’re even using the Windows Media Time Compression
technology to get all the sessions under 80 minutes so they fit on CD.
However, when you burn the file, it creates basically one long track,
making it difficult to move back and forth within the presentation. I
could break it into separate files per track, but that’s a pain. At
least with one big file, there’s no chance of getting it out of order.

The [Windows Media
Format](http://msdn.microsoft.com/library/en-us/wmform/htm/aboutthewindowsmediaformatsdk.asp)
supports named
[markers](http://msdn.microsoft.com/library/en-us/wmform/htm/markers.asp).
My burning program could build multiple tracks, based on those markers.
Other audio players or CD burners would just ignore those markers. That
way you get one file to download, but multiple tracks when you burn –
the best of both worlds.

However, I have precious little time to dedicate to such a project,
primarily as I have higher priority projects to build first.
Additionally, I’d have to write it in C++ due to the lack of managed
support for the various APIs and SDKs I would need. ([Windows Media
Format
SDK](http://msdn.microsoft.com/library/en-us/wmform/htm/introducingwindowsmediaformat.asphttp:/msdn.microsoft.com/library/en-us/wmform/htm/introducingwindowsmediaformat.asp)
to read audio file and the [Image Mastering
API](http://msdn.microsoft.com/library/en-us/devio/base/image_mastering_api.asp)
to create the audio CD) So I gotta wonder if this capability already
exists somewhere? Are there commonly-available tools that can use either
named markers or a playlist file to create multiple tracks from on audio
file? I’d hate to reinvent the wheel if I didn’t need to.
