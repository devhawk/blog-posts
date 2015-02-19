I recently got access to both the [Windows
Azure](http://www.microsoft.com/azure/windowsazure.mspx) and [Live
Framework](http://dev.live.com/liveframework/) CTP programs. Frankly,
I’m very interested in [Live Mesh](https://www.mesh.com), so I decided
to start with a simple LiveFX program. Scott (aka
[ScottIsAFool](http://www.liveside.net/members/ScottIsAFool/default.aspx))
at [LiveSide](http://www.liveside.net) posted a [“quick and dirty”
console
app](http://www.liveside.net/developer/archive/2008/11/10/a-quick-and-dirty-console-application-using-the-livefx.aspx)
that pulls info from a user’s profile via LiveFx. It’s not Mesh per se,
but it does use the same framework and resource model so I decided to
port it to IronPython. FYI, this app won’t run unless you’ve been
received a LiveFx CTP token and provisioned yourself.

``` {.brush: .python}
#Add LiveFX References     
import sys     
sys.path.append('C:\Program Files\Microsoft SDKs\Live Framework SDK\v0.9\Libraries\.Net Library')

import clr     
clr.AddReference('Microsoft.LiveFX.Client')
clr.AddReference('Microsoft.LiveFX.ResourceModel')

from Microsoft.LiveFX.Client import LiveOperatingEnvironment     
from Microsoft.LiveFX.ResourceModel.ProfileResource import ProfileType     
from System.Net import NetworkCredential     

from devhawk import linq     

#get username and password from the user     
uid = raw_input("Enter Windows Live ID: ")
pwd = raw_input("Enter Password: ")
creds = NetworkCredential(uid, pwd, "https://user-ctp.windows.net")

#print out user's info     
loe = LiveOperatingEnvironment()
loe.Connect(creds)

general = linq.Single(loe.Profiles.Entries,  
  lambda e: e.Resource.Type == ProfileType.General)

print loe.Mesh.ProvisionedUser.Name     
print loe.Mesh.ProvisionedUser.Email     
print general.Resource.ProfileInfo.PersonalStatusMessage     
print linq.Count(loe.Contacts.Entries)
```

I did modify the app slightly, reading the WLID and password off the
console – I was \*sure\* I would accidently post my personal credentials
if I left them embedded in the app. Otherwise, it’s a straight port.
First, I add references the LiveFX dlls. Since they’re not local to my
script, I add the directory where they’re installed to sys.path, which
lets me call clr.AddReference directly. Then I retrieve the user’s ID
and password using raw\_input (Python’s equivalent to Console.ReadLine).
Finally, I connect to the user’s LiveOperatingEnvironment and pull their
name, email address, personal status message and the number of contacts
they have.

As per the original app, I use LINQ to find the right profile as well as
count the number of contacts. I was able to reuse the linq.py file I
wrote for my [Rock Band song list screen
scraper](http://devhawk.net/2008/11/27/IronPython+And+Linq+To+XML+Part+2+Screen+Scraping.aspx)
(though I did have to add the Count function since I hadn’t needed it
previously). I’ve posted [this
script](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/LiveFxPsmDemo.zip)
on my SkyDrive, and it includes my most recent linq.py file.

BTW, it doesn’t appear that you can set the PersonalStatusMessage
programmatically, at least not currently. I was thinking it would be
cool to build an app that sets your PSM via Twitter, but the set method
of PersonalStatusMessage is marked internal. In fact, all the set
methods of all the profile properties I looked at are marked internal.
If someone knows how to update LiveFX resource objects in the current
CTP, I’d appreciate it if you dropped me a line or left me a comment.
