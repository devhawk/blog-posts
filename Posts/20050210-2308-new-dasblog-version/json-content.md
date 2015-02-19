I just finished upgrading my blog to the new 1.7.2 RC build. I’m excited
about some of the new features, such as the major caching improvements,
CAPTCHA for avoiding comment spam, and the new permalinks. The
permalinks one is pretty silly, esp. because I pushed for a version that
used pluses for spaces. So the permalink for this post will be
New+DasBlog+Version.aspx instead of NewDasBlogVersion.aspx. But it’s a
style thing (I *am* in marketing now, right?). Speaking of style, I also
upgraded the site template and pared down my navigation links. I moved
the blogs on that list to a new “friends and family” blogroll. I did add
a link to the new [Archives](http://devhawk.net/archives.aspx) page,
which lists all the posts I’ve ever made, by category. And I added flair
links to add this blog to your [desktop
newsreader](feed://devhawk.net/rss.ashx) of choice (that supports
feed://) as well as to [My
MSN](http://my.msn.com/addtomymsn.armx?id=rss&ut=http://devhawk.net/rss.ashx&ru=http://devhawk.net)
and
[NewsGator](http://www.newsgator.com/ngs/subscriber/subext.aspx?url=http://devhawk.net/rss.ashx).

There’s still room for improvement. DasBlog still need story support,
IMO. Also, I’d like to have a good offline posting experience. None of
the existing blog authoring tools work for me since I use crossposts for
my [MSDN blog](http://blogs.msdn.com/devhawk) (which is what gets pulled
into [Architecture Center](http://msdn.microsoft.com/architecture)). I
end up writing my posts in FrontPage and then cutting and pasting into
the dasBlog web interface. Yuck.

One quick note – because of the new permalink title support, a set of
existing URL mappings on my site started causing internal exceptions.
This is because any URL ending in aspx that isn’t a file on disk is
assumed to be a permalink. Of course, all my existing mappings aren’t
files on disk nor are they permalinks to blog entries. I changed these
mappings from \*.aspx to \*.ashx to avoid these exceptions and my
template and navigation links to match. The only .aspx mapping I left
intact was rss.aspx, since pretty much all of my subscribers use that as
my rss feed. When I upgraded from my original blog engine, I had to add
the rss.aspx mapping to avoid breaking any existing subscribers. Of
course, I certainly don’t want to break those subscribers now. As a
quick and *very* dirty workaround, I created an empty rss.aspx file in
my web app directory. Now, the title mapper doesn’t attempt to map to a
permalink since there’s an existing file on disk. Oh well, that’s why
this is a release candidate version.
