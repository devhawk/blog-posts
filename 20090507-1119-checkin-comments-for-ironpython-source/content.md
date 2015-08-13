We’ve been slowly but surely increasing the frequency of IronPython
source drops. When I joined the team last April, we we only pushing the
source about twice a month (sometimes only once a month). By last July,
we were pushing source about once a week. Since mid-January, we’ve
pushed out the latest source 131 times, which comes to about once a day
on average since the start of the year. Big kudos to [Dave
Fugate](http://knowbody.livejournal.com/), who’s primarily responsible
for improving the frequency of our source code drops.

However, while we’ve been good about source code drop frequency, we
haven’t been good about transparency. All those source drops have the
same less-than-useful checkin comment “Latest IP sources migrated to
CodePlex TFS”. If you wanted to know what was changed in a given
changeset, you had to do the diff yourself.

But all that opaque code changes is a thing of the past now. Dave
upgraded out source push script so that it emails a list of changes as
well as the checkin comments whenever we update the source on CodePlex.
For example, check out the [source push
announcement](http://lists.ironpython.com/pipermail/users-ironpython.com/2009-May/010275.html)
for our [latest source
drop](http://ironpython.codeplex.com/SourceControl/changeset/view/49849). 
Now we publish added, deleted and modified sources as well as the
comments for any checkins included in the source drop.

As Dave [said on the mailing
list](http://lists.ironpython.com/pipermail/users-ironpython.com/2009-May/010245.html),
please let us know if you have any feedback on these source update
emails. I think they’re awesome (though I did have [one small
suggestion](http://lists.ironpython.com/pipermail/users-ironpython.com/2009-May/010277.html))
but we want to know what you think.
