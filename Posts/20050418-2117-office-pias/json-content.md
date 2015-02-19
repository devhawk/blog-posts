Not that I do a bunch of Office development, but I did build a [pretty
nifty utility](http://devhawk.net/Build+Slide+Export+.aspx) for
PowerPoint a while back. Getting it installed on anyone elses machine,
however, was a pain in the ass because while I always remember to
install the Office Primary Interop Assemblies when I install Office, I’m
fairly certain I’m in the minorty on doing so. So installing Build Slide
Exporter was alway tricky. Now, the Office PIA’s are available as a
[seperate
install](http://www.microsoft.com/downloads/details.aspx?familyid=3c9a983a-ac14-4125-8ba0-d36d67e0f4ad&displaylang=en).
Not sure if you can redist them, but the readme file that comes with the
installer specifically mentions “Wrap the O2003pia.msi in another setup
package through Visual Studio or other Windows Installer aware setup
editor” so it sounds like they expect it to be redistributed.
