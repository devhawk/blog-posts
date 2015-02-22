Since folks were interested in [my favorite
tools](http://devhawk.net/2008/02/28/devhawks-inessential-list-of-tools/),
I thought I’d blog how I have PowerShell configured. I’m not an
ultra-power user, but I hold my own and hopefully you can use some of
this configuration for yourself. Please tell me you’re not still using
CMD.

First, I use a trick I [picked up from Tomas
Restrepo](http://www.winterdom.com/weblog/2008/01/24/ModifyingTheHomeInPowerShell.aspx)
to change your home directory and profile script. Here’s my
Microsoft.PowerShell\_profile.ps1 file (in the WindowsPowerShell
subdirectory of My Documents)

``` powershell
# reset $HOME and $PROFILE variables
set-variable -name HOME -value "D:HPierson.Files" -force  
(get-psprovider FileSystem).Home = $HOME  
set-variable -name Profile -Value "$HomeScripts_profile.ps1"

# Run the $PROFILE script
. $profile
```

By default, PS uses the user’s personal directory (c:usershpierson in my
case) as the home directory and the aforementioned filename for the
profile script. Personally, I like to keep all “real” data off my boot
partition so that I don’t have to back it all up when I repave. So my
“real” home location is d:HPierson.Files. The above script sets both the
\$HOME variable and file system home property to this directory. It also
resets the \$PROFILE variable to a script in my \$homeScripts folder and
runs it.

My \$PROFILE script does several things of note:

-   It adds the aforementioned \$homeScripts folder to the path. My
    utilities folder is a permanent part of the path, put I only add the
    scripts folder when I’m actually running PS.
-   If I’m running as administrator, I set the background color of the
    console window to red. I think I picked up this script from [Brad
    Wilson](http://bradwilson.typepad.com/) at some point.
-   Set location to home, otherwise when I start PS as admin, it starts
    in c:winsys32.
-   I have a simple prompt script file that displays current folder, the
    current command number and a list of yellow plus signs indicating
    how deep I am in the directory stack. To get it to work, I have to
    remove the standard prompt function, which I do in \$PROFILE.
-   I can’t ever remember the space between “cd” and “..”, so I wrote a
    simple function called “cd..” that executes “cd ..”.
-   I have a su function that leverages the [Script Elevation
    PowerToys](http://technet.microsoft.com/en-us/magazine/cc162321.aspx).
    If you pass in a command, it executes it with elevated credentials.
    If you just execute su, it runs an elevated PowerShell.
-   I use [7-zip](http://www.7-zip.org/) for my compression needs,
    including the 7za command line app. However, PS has issues w/
    executing an exe that starts with a number. So I aliased 7za as
    “zip”. **UPDATE:** Tomas [points
    out](http://twitter.com/tomasrestrepo/statuses/870758014) that you
    can prepend an ampersand to force execution, so I could have typed
    “&7za”. I forgot that when I created the alias and am now used to
    using zip, so I’m not going to change it. But I thought you should
    know.
-   I have an ever-changing set of aliases, depending on my needs.
    Currently, I alias “ipy”, “cpy”, “fsi”, “fsc”, “devenv” and “chiron”
    to their fully path-qualified equivalents, so I can run them from
    anywhere without having to add their respective folders to the path.

I don’t set vsvars in the \$profile script, but I do have a copy of [the
one Chris Tavares
wrote](http://www.tavaresstudios.com/Blog/post/The-last-vsvars32ps1-Ill-ever-need.aspx)
in my scripts folder, so I can set up a VS environment in a moments’
notice.

Also, I put PowerShell on the Vista quick launch bar, so I can bring it
up by typing Win-2.
