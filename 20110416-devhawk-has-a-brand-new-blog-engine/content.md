So it would make a crappy song, but the title of this post is still
true. This is my first post on the new-and-improved DevHawk running on
[WordPress](http://wordpress.org/).

I decided a while back that it was time to modernize my blog engine –
[DasBlog](http://dasblog.info/) is getting a little long of tooth and
there hasn’t been a new release in over two years. I spent some time
looking at different options, but settled on WordPress for much the same
reasons [Windows Live
did](http://windowsteamblog.com/windows_live/b/windowslive/archive/2010/09/27/wordpress-com-and-windows-live-partnering-together-and-providing-an-upgrade-for-30-million-windows-live-spaces-customers.aspx): “host
of impressive capabilities”, scalable and widely used. Also, it’s very
extensible, has about a billion available themes and has a very active
development community. I was able to find plugins to [replicate
DasBlog’s archive
page](http://www.viper007bond.com/wordpress-plugins/clean-archives-reloaded/)
as well as [archive
widget](http://www.emmanuelgeorjon.com/en/plugin-eg-archives-1745/) that
replicated custom functionality that I added to DasBlog via [custom
macros](http://dasblog.info/CreatingCustomMacrosForDasBlog.aspx).

Of course, moving eight years worth of posts to a new engine took quite
a bit of effort and planning. I wanted to make sure that I maintained
all my posts and comments as well as take advantage of some of the new
features available to me from WordPress. For example, I took the
opportunity to flatten my list of categories and move most of them to be
tags. I also went thru and converted all of my old code snippets to use
[SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/)
instead of
[CodeHTMLer](http://codehtmler.codeplex.com/releases/view/9505)
or [Pygments for WL
Writer](http://devhawk.net/2009/04/05/pygments-for-windows-live-writer/).
Of course, I automated almost all of the conversion process. For anyone
interested in following my footsteps, I [published my PowerShell
scripts](https://bitbucket.org/devhawk/dasblog-wxr-convert) for
converting DasBlog to the [WordPress WXR import/export
format](http://ipggi.wordpress.com/2011/03/16/the-wordpress-extended-rss-wxr-exportimport-xml-document-format-decoded-and-explained/)
up on BitBucket.

Not only did I want to save all my data, I also wanted to make sure I
saved my search engine mojo (if I have any left after blogging a paltry
six times in the past sixteen months). So I hacked up a WordPress plugin
to redirect my old DasBlog links to the new WordPress URLs. That’s [up
on BitBucket as well](https://bitbucket.org/devhawk/devhawk-redirect)
for anyone who wants it. It’s got some DevHawk specific bits in there
(like the category cleanup) but if you tore those parts out it would be
usable for any DasBlog-to-WordPress conversion. If there’s interest,
maybe I’ll write up how the conversion scripts and redirect plugin work.

The plan is that now that I’m finally done moving my blog over the new
back end, I will actually start writing on a more regular basis again.
We’ll see how that works out.
