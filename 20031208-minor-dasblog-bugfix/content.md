A few months ago, one of my first enhancements I made to dasBlog was to
change the way the CommentView page is rendered. Previously, it was
rendered using the item template. However, I don’t include the entry
post date in the item template, since it’s in big bold letters on the
day template. So I changed the CommentView to render the single entry
being displayed using the day template. This makes the CommentView page
consistent with the Permalink page, which also renders the single entry
using the day template.

However, when I made the change, I introduced a bug that shipped as part
of the v1.4 release. When I called ProcessDayTemplate, I passed in the
entry’s CreatedUtc time as the day to render parameter. This caused an
issue where the CommentView would not render the entry when the day of
the CreatedUtc did not equal the time-zone adjusted created date. For
example, if I posted a new entry at 8pm PST, that is 4am UTC the
following day. So if I ask to render the UTC based date, the time-zone
adjusted entry does not fall on that day, and thus doesn’t render. So I
changed the call to ProcessDayTemplate to use the entry’s
CreatedLocalTime property instead of the CreatedUtc. I tested, all
seemed good, so I submitted the fix, which made it into the v1.5
release.

Today, I noticed a
[thread](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=170130)
on the dasBlog [GDN
workspace](http://www.gotdotnet.com/Community/Workspaces/workspace.aspx?id=77a29128-4746-4473-b676-e4f1517a1907) indicating
the bug was still there. A little bit of tracking down and I discovered
that what the server thinks is the local time does not always match what
dasBlog thinks the local time is. CreatedLocalTime is based on the
server local time. If you run your server in a different time zone than
dasBlog is configured for, you run into basically the same issue as
before. Of course, since I run my dev server in the same timezone as
dasBlog, I never noticed it. However, since my production server is on
the east coast and I’m on the west coast, the issue showed up on my
production machine.

I posted a code fix over on the [GDN Message Board
Thread](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=170130).
Basically, I calculate the correct time based off the dasBlog configured
time zone. Seems to have fixed the problem on my dev and production
machines. (I’m running my dev machine in a different time zone now). Let
me know if you run into any more issues.
