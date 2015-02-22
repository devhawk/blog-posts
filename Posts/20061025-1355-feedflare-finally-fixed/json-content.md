I moved over to [FeedBurner](http://www.feedburner.com/) a while back.
[DasBlog](http://dasblog.info/) has great support for FeedBurner – all
you do set your FeedBurner feed name in the DasBlog config and it
handles the rest, including permanently redirecting your readers to the
new feed.

However, I haven’t been able to make FeedFlares work today. FeedFlares
“build interactivity into each post” with little links like “Digg this”,
“Email this” or “Add to del.icio.us”. Since FeedBurner is serving the
XML feed, it’s no big deal for them to add those links into the RSS
feed. But to get those same flares to work on the web site, you have to
embed a little script at the end of each item. Scott [shows how to do
this](http://www.hanselman.com/blog/AddingFeedBurnerFeedFlareToDasBlog.aspx)
with DasBlog, except that it didn’t work for me. I’ve tried off and on,
but for some reason, the FeedBurner script file I was including was
always empty.

Then I noticed the other day that my post
[WorkflowQueueNames](http://devhawk.net/2006/10/17/workflowqueuenames/) had
the flare’s on them. Hmm, why would that post work and none of the rest
of mine work? Turns out that it works because there’s no spaces in the
title. Unlike most of the rest of the DasBlog community, I’m using ‘+’
for spaces in my permalinks, instead of removing them. So I get
*http://devhawk.net/FeedFlare+Finally+Fixed.aspx* as the permalink url
instead of *http://devhawk.net/FeedFlareFinallyFixed.aspx*. In fact,
that feature is in DasBlog because I pushed for it (a fact
[Scott](http://www.computerzen.com) reminded me of while I was
troubleshooting this last night). And it was breaking the FeedFlares.

The solution is to URL encode the ‘+’, which is %2B, in the FeedFlare
script link. I created a custom macro, since I already had a [few custom
macro’s](http://devhawk.net/2006/02/11/new-devhawk-design/) powering
this site anyway, and now I get the FeedFlares on all my blog entries.
I’ll also go update the DasBlog source, but creating a custom macro was
both easier and less risky than patching the tree and upgrading
everything.
