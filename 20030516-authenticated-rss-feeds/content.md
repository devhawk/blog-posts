I’ve got an internal customer running my [WSS
RSS](prj_sharepointsynd.aspx) feed generator (perhaps [Scoble will be
next](http://radio.weblogs.com/0001011/2003/05/16.html#a3046)?) and I’ve
discovered a common issue with most news aggregators. They don’t handle
feeds that require authentication. Windows SharePoint is designed to be
a team collaboration tool. Obviously, part of team collaboration is not
allowing non-team members access. I checked through the source code to
[RSS
Bandit](http://www.gotdotnet.com/Community/Workspaces/Workspace.aspx?id=cb8d3173-9f65-46fe-bf17-122e3703bb00)
and discovered that while it handles many HTTP errors, including
redirection and moved permanently, it doesn’t handle unauthorized. I was
able to add support for credentials via one line of code
(request.Credentials = CredentialCache.DefaultCredentials;). Of course,
what I want is to try the default credentials first, then pop up a
dialog to allow the user to enter alternative credentials. XP provides
some of this plumbing, but I’m not sure how much is exposed via BCL.
