Given that I [work on the Windows
team](http://devhawk.net/2009/10/26/joining-windows/), it shouldn’t come
as a surprise that we use [Windows Deployment
Services](http://technet.microsoft.com/en-us/library/cc772106(v=WS.10).aspx)
to distribute Windows images internally. For most machines, it’s really
convenient. You trigger a network boot (on my Lenovo, you press the
“ThinkVantage” button during start up), select the image to install and
what partition to install it to, wait a while, answer the installation
finalization questions (machine name, user name, etc) and you’re done.

However, I have an [Dell Inspiron
Duo](http://www.dell.com/us/p/inspiron-duo/pd) (with the cool flip
screen) netbook that lacks a built in network port. No network port, no
network boot. I’ve got a USB network dongle, but it doesn’t support
network boot either. No network boot, no ultra-convenient WDS
installation, sad DevHawk.

I was able to work around this by building a custom [WDS Discover
image](http://technet.microsoft.com/en-us/library/cc730907(WS.10).aspx)
that I loaded onto a USB flash drive. Now, I plug in the USB drive,
select it as the boot device and I’m off and running…err, off and
installing at any rate. Building the image was kind of tricky, so I
figured it would be a good idea to write it down and share.

**Step One: Install the [Windows Automated Installation Kit (AIK)\
](http://technet.microsoft.com/en-us/library/dd349343(v=WS.10).aspx)**The
AIK is a set of tools for customizing Windows Images and deployment. In
particular, it includes the [Windows Preinstallation
Environment](http://technet.microsoft.com/en-us/library/dd744322(v=WS.10).aspx)
(aka WinPE) which is the minimal OS environment that Windows Setup runs
in. We’ll be building a custom WinPE image to launch the WDS discovery
and setup from.

**Step Two: Create a new PE image\
** The AIK includes a command line tool for creating a blank PE image.
Step 1 of this
[walkthru](http://technet.microsoft.com/en-us/library/dd744530(v=WS.10).aspx)
shows you how to use it. It’s pretty easy. Open the Deployment Tools
Command Prompt as an administrator and run the following commands:

``` {.brush:plain}
copype.cmd x86 C:\winpe_x86
copy winpe.wim ISO\sources\boot.wim
```

The copype.cmd batch file creates a new PE image of the
specified architecture in the specified location. The Inspiron is an
Atom processor so I chose an x86 PE image.

Note, in several steps below I assume you’ve created your  PE image in
c:\\winpe\_x86. If you’ve created it somewhere else, make sure to swap
in the correct path when executing the steps below.

**Step Three: Mount the PE Boot image with DISM\
** Now that we have our basic PE boot image, we need to update it with
custom drivers and the setup experience that can load WDS images across
the network. Before we can update boot.wim, we need to mount it on the
file system.

The AIK includes the [Deployment Image Servicing and Management
(DISM)](http://technet.microsoft.com/en-us/library/dd744256(WS.10).aspx)
tool for working with WIM files. To mount the boot.wim file, execute the
following command:

``` {.brush:plain}
dism /Mount-WIM /WimFile:C:\winpe_x86\ISO\sources\boot.wim /index:1 /MountDir:c:\winpe_x86\mount
```

Copype.cmd created an empty mount directory specifically for DISM to
mount WIM images in.

**Step Four: Add Custom Device Driver\
** The driver for my USB network dongle is not included in the standard
Windows driver package, so it needs to be [manually added to the PE
image](http://technet.microsoft.com/en-us/library/dd799289(WS.10).aspx).
Again, we use DISM to do this.

``` {.brush:plain}
dism /image:c:\winpe_x86\mount /add-driver /driver:"PATHTODRIVERDIRECTORY"
```

**Step Five: Add Setup packages\
** The PE image does not include the Windows Setup program by default.
There are [several optional
packages](http://technet.microsoft.com/en-us/library/dd744533(WS.10).aspx)
that you can add to your PE image. For WDS discovery, you need to add
the setup and setup-client packages. Again, we use DISM to update the
image.

``` {.brush:plain}
dism /image:c:\winpe_x86\mount /add-package /packagepath:"c:\Program Files\Windows AIK\Tools\PETools\x86\WinPE_FPs\winpe-setup.cab"
dism /image:c:\winpe_x86\mount /add-package /packagepath:"c:\Program Files\Windows AIK\Tools\PETools\x86\WinPE_FPs\winpe-setup-client.cab"
```

**Step Six: Add winpeshl.ini file\
** Now that we’ve added the setup program to the image, we need to tell
setup to [run in WDS discovery mode on
startup](http://technet.microsoft.com/en-us/library/cc730907(WS.10).aspx#BKMK_custom).
This is accomplished by adding a winpeshl.ini file to the
WindowsSystem32 folder of the PE image.

Note, the [official
instructions](http://technet.microsoft.com/en-us/library/cc730907(WS.10).aspx#BKMK_custom)
on TechNet have a bug. The path to setup.exe should be
%**SYSTEMDRIVE**%sources, not %**SYSTEMROOT**%sources. Here’s the
contents of my winpeshl.ini file:

``` {.brush:plain}
[LaunchApps]
%SYSTEMDRIVE%\sources\setup.exe, "/wds /wdsdiscover"
```

You can also add /wdsserver:\<server\> to the command line if you want
to hard code the WDS Server to use in your image.

**Step Seven: Add Lang.ini file\
** If you do all the above steps and try to boot the resulting image,
you’ll get a nasty “Windows could not determine the language to use for
Setup” error. Turns out there’s another bug in the official docs – [you
need a lang.ini file in your sources
directory](http://www.msfn.org/board/topic/139298-winpe-30-wds-problems/)
along side setup.exe in order to run. I just grabbed the lang.ini file
off the normal Win7 boot image and copied it to the sources directory of
my mounted boot image.

**Step Eight: Commit and Unmount the PE Boot image\
** We’re now done updating the boot image, so it’s time to close and
unmount it. This is accomplished with DISM:

``` {.brush:plain}
dism /unmount-wim /mountdir:c:\winpe_x86\mount /commit
```

At this point, the contents of the ISO folder are ready to be
transferred to a USB stick for booting.

**Step Nine: Prepare the USB Flash Drive\
** To enable your USB flash drive to be bootable, it needs to have a
single FAT32 partition spanning the entire drive. Instructions in this
[walkthru](http://technet.microsoft.com/en-us/library/dd744530(v=WS.10).aspx)
show you how to configure and format your USB drive.

Note, not all USB drives are created equal. I have one USB drive where
the Duo just comes up with a blank screen when I try to use it for USB
Boot. If you follow these steps and can’t boot, try a different USB
drive.

**Step Ten: Copy the image contents to the Flash Drive\
** I just did this with xcopy. In this case, my flash drive is E:, but
obviously you should swap in the drive letter for your flash drive.

``` {.brush:plain}
xcopy c:\winpe_x86\ISO\*.* /e e:
```

**Step Eleven: Boot your Netbook from the USB drive\
** With the USB drive containing the image + the network dongle both
plugged in, boot the machine and trigger USB boot. For the Duo, you can
hit F12 during boot to manually select your boot source. Your custom
image will be booted, and it will then look out on the network to find
the WDS server to load images from. Select the image you want and where
you want to install it and away you go.

One thing to remember is that you’re adding the  USB network dongle
driver to the WDS discovery boot image, but *not* to the image that gets
installed via WDS. So chances are you’ll need the driver again once you
get the image installed. I put that driver on the same USB key that
holds the boot image. That way I can easily install the driver once
Windows is installed.
