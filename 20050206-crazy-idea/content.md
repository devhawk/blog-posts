When web servers were first built, there was a one-to-one mapping
between virtual files (i.e. addressable via http) and the physical files
(the ones in the file system). Over time, two important capabilities
were added. First, the contents of a given file became dynamic. So while
you the reader always come back to default.aspx (or rss.aspx as the case
may be) the content changes everytime I post something new. Secondly,
the physical file dependency was removed. It’s not used much in dasBlog,
but in .TEXT this is very prevelant. My [last
post](http://blogs.msdn.com/devhawk/archive/2005/02/01/364380.aspx) on
blogs.msdn.com is located at
http://blogs.msdn.com/devhawk/archive/2005/02/01/364380.aspx. Obviously,
there is no actual file named 364380.aspx, .TEXT uses the filename as a
key into the DB to find the actual entry content. This technique is used
extensively in the new [MSDN2](http://msdn2.microsoft.com) (if you haven’t
already, check out [Tim
Ewald’s](http://www.pluralsight.com/blogs/tewald/default.aspx) MSDN
Magazine
[article](http://msdn.microsoft.com/msdnmag/issues/05/02/InsideMSDN/default.aspx)
about URL design for MSDN2).

So now for the funky idea part – why couldn’t we generate dynamic local
files the same way? I’m not sure I’ve got a great use for this yet –
most of the apps I use are programmable to some extent, so dynamic
content can be generated at the app level rather than at the file system
level. But I’m thinking there may be some scenarios where it would make
sense to do this at the file system. For example, in the new [Winter Fun
Pack](http://www.microsoft.com/genuine/offers/details.aspx?displaylang=en&OfferId=74AA1C1D-DFFC-4D91-BC6F-515BE8E59948)
there’s a new version of the WMP blogging plugin that autoupdates the
Outlook and Outlook Express signature files whenever the song being
played changes (a la Duncan’s Coding4Fun
[article](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun09072004.asp)).
But with virtual files in the file system, you could generate these
files when they are accessed instead of writing new ones everytime the
song changes, even if Outlook open.

Of course, our local file system typically has more writing activity
than the web, so I’m thinking this isn’t that great an idea. But I
figured I’d share in case someone else could think of some good uses. Or
maybe this already exists and I just don’t know about it.
