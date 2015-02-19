I was updating [my webdev powershell
script](http://devhawk.net/2008/03/20/WebDevWebServer+PowerShell+Function.aspx)
today. I wanted to add support for a -browser switch that would
automatically launch a browser window the way chiron from the
[Silverlight Dynamic Languages SDK](http://codeplex.com/sdlsdk). does. I
also set the script to serve up the current directory by default. I
posted [the new
version](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/webdev.ps1)
up on my SkyDrive.

While I was working on the script, I thought about how one might
shutdown the WebDev server from the command line. That turned out to be
much harder. Basically, you have to look thru all the top level windows
for one that has “ASP.NET Development Server” in the window text, then
you send that window two messages – WM\_QUERYENDSESSION and WM\_QUIT.
Not sure why the WebDev server uses WM\_QUERYENDSESSION to shut down
it’s tray icon, but if you look at WebDev.WebServer.exe in Reflector,
you’ll see the tray icon form overrides WinProc in order to look for
message 0×11, i.e. WM\_QUERYENDSESSION.

I threw together a quick little [C\# console
app](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Utilities/KillWebDevServer.exe)
to shutdown the WebDev server and stuck it up on my SkyDrive as well.
[Source
code](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Utilities/KillWebDevServer.zip)
is up there too. I had to use a bunch of P/Invokes to make it work, or I
would have written it in Powershell or IronPython.

Enjoy.
