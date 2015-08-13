[Ori Amiga](http://blogs.msdn.com/oriamiga/) is a Group Program Manager
over in the Live Framework team whom you might have seen at PDC08
delivering the [Lap Around LiveFX & Mesh
Services](http://channel9.msdn.com/pdc2008/BB04/) and [LiveFX
Programming Model Architecture and
Insights](http://channel9.msdn.com/pdc2008/BB19/) talks. And apparently,
he’s an IronPython fan as posted a small [LiveFX Python
module](http://blogs.msdn.com/oriamiga/archive/2008/11/09/livefx-using-ironpython.aspx)
to his blog. It’s pretty simple – it only wraps Connect and ConnectLocal
– but it does cut about ten lines of path appending, reference adding
and module importing code into a single import statement. Here’s the
profile access script from [my last
post](http://devhawk.net/2008/12/12/ironpython-and-livefx-accessing-profiles/)
rewritten to use Ori’s LiveOE module.

``` python
import LiveOE     
from devhawk import linq

uid = raw_input("Enter Windows Live ID: ")
pwd = raw_input("Enter Password: ")

loe = LiveOE.Connect(uid, pwd)

general = linq.Single(loe.Profiles.Entries,  
  lambda e: e.Resource.Type == LiveOE.ProfileResource.ProfileType.General)

print loe.Mesh.ProvisionedUser.Name
print loe.Mesh.ProvisionedUser.Email
print general.Resource.ProfileInfo.PersonalStatusMessage
print linq.Count(loe.Contacts.Entries)
```

FYI, make sure you update the sdkLibsPath in LiveOE.py – I’m not sure
where Ori has installed the LiveFX SDK, but it’s \*not\* in the location
suggested by the read me file.

BTW, it turns out the [WL Profile information is read
only](http://social.msdn.microsoft.com/Forums/en-US/liveframework/thread/81ab8f62-3244-4ca5-b376-2d5879f47c9f/)
which answers a question I had. However, reading the thread it sounds
like they will eventually get around to making it read-write at some
point.
