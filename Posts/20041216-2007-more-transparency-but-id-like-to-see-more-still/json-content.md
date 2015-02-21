I saw a
[post](http://www.theserverside.net/news/thread.tss?thread_id=30623) on
[TSS.NET](http://www.theserverside.net/) pointing to the Outlook 2003
Integration APIs:

> Microsoft has released former “internal only” APIs for developing
> applications that work with Microsoft Outlook. The APIs include
> account management, connection state, free/busy, MAPI-MIME conversion,
> and the Outlook store.

I have no idea why these APIs have been released at this time, but
providing more options/control/tools to developers is better than less –
along the same lines of the [ASP.NET 1.1 Membership
Prototype](http://devhawk.net/2004/12/13/member-management-component-prototype/).

My only issue is that not all the APIs are documented. For example,
recently I was interested in being able to progammatically set Outlook’s
online/offline status. When I read the post above, I thought the
[Connection State
API](http://msdn.microsoft.com/library/en-us/olintapi/html/oliaAbouttheConnectionStateManagementAPI_HV01155189.asp)
would be the answer. Alas, that API can only be used to get notification
when the connection state changes. Or, at least, that’s all that’s
documented: the [IMAPIOfflineMgr
interface](http://msdn.microsoft.com/library/en-us/olintapi/html/oliaIMAPIOfflineMgr_HV01156488.asp)
has seven undocumented methods and the [IMAPIOffline
interface](http://msdn.microsoft.com/library/en-us/olintapi/html/oliaIMAPIOffline_HV01156492.asp)
has two. I’m sure there’s a good reason those others aren’t documented,
but it’s frustrating all the same.

Of course, even with the ommisions, that’s a lot of cool stuff to add to
[Niobe](http://www.gotdotnet.com/workspaces/workspace.aspx?id=e7071b93-7970-4962-a4c2-d72aa2cfbcff).
[Simon](http://weblogs.asp.net/smguest/)?
