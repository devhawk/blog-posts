Ray has [posted
extensively](http://spaces.msn.com/rayozzie/blog/cns!FB3017FBB9B2E142!285.entry)
about his session this morning, but if you haven’t read it the basic
idea is “How do we bring the copy and paste paradigm to the web?” Sure,
for this crowd he might have been better off saying “the UNIX pipe
paradigm”, but the result is the same. How do have a simple way of
letting an end user connect systems together? The idea of using the
clipboard paradigm is brilliant in its simplicity.

The coolest part of the demo IMO was the integration between the Live
Clipboard (of course, it’s branded [Live](http://www.live.com)) and the
desktop. Copy an event out of [Eventful](http://eventful.com/), paste
into [Outlook](http://office.microsoft.com/en-us/FX010857931033.aspx).
Copy an image out of [Flickr](http://www.flickr.com), paste into the
file system. Even cooler: Paste an image feed out of Flickr and paste
into a folder in the file system with integration into the [Feeds
API](http://msdn.microsoft.com/library/en-us/FeedsAPI/rss/rss_entry.asp)
to keep the local folder in sync with the Flickr feed (OK, the Feed API
integration wasn’t done in time to demo). This was the best demo of the
all the keynotes.

I need to think more about the implications of this. First off is the
importance of data formats. I’ve written about [RSS as the generic
list](http://devhawk.net/2006/02/14/Reinventing+The+List.aspx) semantics
on top of XML, but I’m thinking
[microformats](http://www.microformats.com) will be huge when combined
with Live Clipboard. Also, there’s the implication of user driven
integration. [Pat Helland](http://pathelland.com) derides the clipboard
in
[Metropolis](http://msdn.microsoft.com/library/en-us/dnmaj/html/aj2metrop.asp),
but the support for structured data eliminates the Pat’s primary issues
with the clipboard as an integration medium. Finally, there’s huge
implication in the enterprise for this, but I’m not sure how positive it
is. IT shops are already struggling with thousands of shadow
applications built on Office running in the wild. If I can copy
structured data out of an enterprise app and paste it into Excel without
losing the schema, it will encourage still more of these shadow apps. IT
will hate it, but users will love it.
