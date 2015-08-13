I *LOVE* the new boot from VHD feature in Win7. I am primarily using
it for doing some [VS
2010](http://www.microsoft.com/visualstudio/en-us/products/2010/default.mspx)
dogfooding without messing up my primary drive partition. But man, the
process for setting up a VHD for booting is brutal. Scott Hanselman did
a great job [laying out the
steps](http://www.hanselman.com/blog/LessVirtualMoreMachineWindows7AndTheMagicOfBootToVHD.aspx),
but I wanted something a bit more productive.

First, I created a clean Win7 RC VHD and zipped it up for easy storage.
The basic Win7 RC VHD is just under 5GB, but compresses down to about
1.5GB with [7-zip](http://www.7-zip.org/). I used the [ImageX
process](http://blogs.technet.com/aviraj/archive/2009/01/18/windows-7-boot-from-vhd-first-impression-part-2.aspx)
Aviraj described though in the future I’ll use the
[Install-WindowsImage](http://code.msdn.microsoft.com/InstallWindowsImage)
script. Install-WindowsImage is more convenient to use because it will
list the indexes within a given .wim file instead of making you grovel
thru an XML file like ImageX does. Also Install-WindowsImage is 27k
download while ImageX is part of the 1.4 *gigabyte* [Windows Automated
Installation
Kit](http://www.microsoft.com/downloads/details.aspx?familyid=60A07E71-0ACB-453A-8035-D30EAD27EF72&displaylang=en).
Look, I’m not hurting for bandwidth, but I don’t see the point of
downloading 54442 times more data for a utility that isn’t as useful.

Once you’ve created the VHD, you need to update your Boot Configuration
Data, or BCD for short, using the appropriately named [BCDEdit
utility](http://technet.microsoft.com/en-us/library/cc709667.aspx). The
process is fairly straight forward, if tedious. You have to run BCDEdit
four times, copy the configuration GUID to the clipboard and type out
the path to the VHD in a slightly funky syntax. Blech. So I built a
PowerShell script to automate updating the BCD, called
[add-bcd-vhd](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/add-bcd-vhd.ps1).
You can get it from [my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/add-bcd-vhd.ps1).
Pass in the name of the BCD entry and the path to the VHD and
add-bcd-vhd will do the rest.

I was [whining on Twitter](http://twitter.com/DevHawk/status/2202944230)
yesterday that there’s no PowerShell specific tools for managing the BCD
data. Add-bcd-vhd just runs bcdedit behind the scenes and processes the
text output with regular expressions. Ugly, but effective. I decided to
spend some time trying accessing the BCD data from its [WMI
provider](http://msdn.microsoft.com/en-us/library/bb986746.aspx), but
that turned out to be way too much of a hassle to be effective. If
someone else out there knows how to use the BCD WMI provider from
PowerShell, I’d appreciate some sample code.
