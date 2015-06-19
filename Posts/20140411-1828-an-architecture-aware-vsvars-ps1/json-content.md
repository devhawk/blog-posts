Like many in the Microsoft dev community, I’m a heavy user of [Visual
Studio](http://www.visualstudio.com) and
[Powershell](http://microsoft.com/powershell). And so, of course, I’ve
been a heavy user [Chris Tavares’ vsvars32.ps1
script](http://www.tavaresstudios.com/Blog/post/The-last-vsvars32ps1-Ill-ever-need.aspx).
However, recently I needed the ability to specify my desired processor
architecture when setting up a VS command line session. Unfortunately,
Chris’s script wraps vsvars32.bat which only supports generating 32-bit
apps. Luckily, VC++ includes a vcvarsall.bat script that let’s you
specify processor architecture. So I updated my local copy of
[vsvars.ps1 ](http://1drv.ms/1kf8g9I) to use vcvarsall.bat under the hood
and added an -x64 switch to enable setting up a 64-bit command line
environment. Vcvarsall.bat supports a [variety of additional
options](http://msdn.microsoft.com/en-us/library/x4d2c09s.aspx), but
64-bit support is all I needed so that’s all I added. I didn’t change
the name of the script because there’s WAY too much muscle memory
associated with typing “vsvars” to bother changing that now.

If you want it, you can get my architecture aware version of vsvars.ps1
from my OneDrive here: <http://1drv.ms/1kf8g9I>.
