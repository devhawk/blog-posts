We’ve had some technical difficulties around here.
[Tom](http://conpro.net/) installed ASP.NET 2.0 Beta 1 on this box and
it automatically upgraded all the web apps on the machine to the new
version. It caused a bunch of issues including breaking the admin
interface and requiring a reboot every few hours. I spent some time this
afternoon getting all the web apps back on ASP.NET 1.1. I uninstalled
all of the beta bits, but it still didn’t work – I needed to use the
aspnet\_regiis utility to completely uninstall the IIS registration and
then reinstall. I get the feeling that I could have left the beta bits
hanging installed and just used aspnet\_regiis to reset the
registration, but better safe than sorry.

Anyway, since I couldn’t log in, I obviously couldn’t blog. I keep an
Outlook task folder of “Shit to Blog” that’s gathered a few items, so
I’m looking forward to getting those posted.
