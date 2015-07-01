It’s not quite out the door yet, but things have gotten quieter around
here since we shipped the [Release Candidate of
2.6](http://devhawk.net/2009/09/23/ironpython-2-6-release-candidate/).
But there’s no rest for the dynamic, so we’ve already started thinking
about what we do next.

Since we shipped 2.0 last December, we’ve shipped two service releases:
2.0.1 two months later in February and 2.0.2 four months after that in
June. We weren’t planning on doing a 2.0.3 release, but then we
discovered the CLR folks made a breaking change to partial trust in
Windows 7. David [recently
emailed](http://lists.ironpython.com/pipermail/users-ironpython.com/2009-September/011268.html)
the IronPython mailing list looking for feedback on other must-fix bugs
we can get to for 2.0.3. If you’ve got an opinion on 2.0.3 must-fix
bugs, please respond to that thread.

For 2.6 service releases, we’re looking to tighten up the timeframe a
bit from last time. We’re planning to ship service releases of 2.6 in
December and February. However, since we don’t have a major release ship
vehicle in the 2.x branch until Python 2.7 next summer, these service
releases may contain new functionality in addition to bug fixes. In
particular, we will look to include any missing modules work that I
discussed in my [RC announcement
post](http://devhawk.net/2009/09/23/ironpython-2-6-release-candidate/)
in these service releases.

In addition to the IronPython 2.6 service releases, we’ll also continue
to track the [Visual Studio
2010](http://www.microsoft.com/visualstudio/2010) beta cycle as it heads
to RTM. I can’t comment on VS2010 dates, but I can say that we will ship
a CTP of IronPython 2.6 for .NET Framework 4.0 for Visual Studio 2010
Beta 2 and that we are committed to shipping the RTM of our .NET 4.0
version the day that Visual Studio 2010 is publicly available. Given
that dynamic the [big new feature of C\#
4.0](http://msdn.microsoft.com/en-us/library/dd264736(VS.100).aspx), we
want to make sure IronPython is ready to go as soon as C\# 4.0 is
available.

BTW, we are well aware that “IronPython 2.6 for .NET Framework 4.0” is a
long ugly name. Any suggestions on a different one? We’ve been thinking
“IronPython 2.6 R2” since the “R2” nomenclature is
[big](http://technet.microsoft.com/en-us/windowsserver/bb428898.aspx)
[around](http://www.microsoft.com/sqlserver/2008/en/us/R2.aspx)
[here](http://www.microsoft.com/windowsserver2008/en/us/r2-editions-overview.aspx).
But “R2” doesn’t really capture the essence of the .NET 4.0 compatible
release. Besides, when has the dynamic languages team at Microsoft ever
done ANYTHING because it was popular with the Microsoft marketing folks?
:smile:

At this point, we’ve got the next few months mapped out, but not much
more beyond that. Specifically, we have two gaping holes in the roadmap:

-   Visual Studio Integration
-   IronPython 3.x

For now, I’m going to leave these holes unfilled. Currently, the rest of
my VS Languages teammates (along with the rest of DevDiv) are heads down
driving towards beta 2 of Visual Studio 2010. Once they reach that
milestone, planning on Visual Studio v.next will begin. Those plans have
the potential for impacting how the IronPython team proceeds going
forward.

Frankly, several members of the dynamic languages team have been
pitching in with the “drive to beta 2” effort so we’re a little more
short handed than usual. If we get those people back, then we’re in a
much better position to execute on both VS Integration and IronPython
3.x. If we don’t, then we have to make some hard choices about how to
proceed. I’m guessing most would agree that VS integration is more
important IronPython 3.x support. However, those aren’t equal efforts by
any stretch of the imagination. How valuable is VS integration if, for
example, we don’t have the bandwidth to build decent intellisense? As I
said, hard choices.

If you want to make your voice heard on Microsoft’s level of commitment
to IronPython, make sure you go rate the [IronPython integration
issue](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=475830)
on Microsoft Connect. (while you’re there, rate the [IronRuby
integration
issue](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=479957)
too.) The IronPython integration is currently the top rated open issue
on the VS Connect site and is the second highest vote getter out of all
the Connect issues (active or otherwise) logged since VS 2010 shipped
it’s first CTP! [^1]

[^1]: Seriously, the next most recent Connect issue with more votes than
IronPython integration is [HttpRuntime.ProcessRequest() does not work in
IIS7 Integrated Pipeline
Mode](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=308352)
from November 2007. The next one before that was [Create Service Pack
for Visual Studio
2005](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=106007)
from November 2005.

