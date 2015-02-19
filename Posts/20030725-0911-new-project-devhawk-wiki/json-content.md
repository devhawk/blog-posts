I got my latest project posted – [DevHawk Wiki](prj_wiki.aspx). I was
hoping to have this up yesterday, but GDN wouldn’t cooperate. It’s
pretty minimal right now – it’s a v0.1 release. [Collaborators
welcome](http://www.gotdotnet.com/Community/Workspaces/applyjoin.aspx?id=9513f6ed-41c2-4c0f-a5d6-730371bb4b45).

The cool part about DevHawk Wiki is that the wiki rendering code is
separated out into a separate assembly. This means you could embed it in
other apps (I’m thinking about a wiki-style comment system for this
blog). One of the things I had to do to make this work is keep things
like the wiki file repository independent of the wiki rendering itself.
I used delegates to do this, then I read [Don’s recent
post](http://www.gotdotnet.com/team/dbox/default.aspx?key=2003-07-21T08:36:33Z)
on delegates and loose coupling. Here’s an example of what Don was
talking about, in the wild.
