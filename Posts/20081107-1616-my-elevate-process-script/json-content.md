I used to use the [Script Elevation
PowerToys](http://technet.microsoft.com/en-us/magazine/cc162321.aspx) to
provide a simple way to launch an elevated command window from a
Powershell prompt. However, that required installing said PowerToys in
order to work, which I invariably forgot to install when paving my
machine. That got annoying, so I went in search of a pure Powershell
solution, which [Peter Provost conveniently
provided](http://www.peterprovost.org/blog/post/Powershell-Sudo-(sort-of)-for-Vista-UAC-REDUX.aspx)
on his blog.

However, one of the benefits of the Script Elevation PowerToys was the
ability to launch an admin command prompt in a specific directory –
including the current one. I wanted the ability to default to launching
Powershell when the user doesn’t specify a command to run. I thought I
could just set \$psi.WorkingDirectory, but as I’ve [described
previously](http://devhawk.net/2008/07/28/DevHawks+Slightly+Useful+Powershell+Configuration.aspx),
I update \$home in my profile script to D:HPierson.Files (I keep my
important files on my D: drive so I can pave C: with impunity) then set
my current location to \$home. So I can’t set the current location by
using \$psi.WorkingDirectory – it just gets overridden by my profile
script.

However, it turns out you can pass arbitrary script code to Powershell
via the –Command arguments. You also have to pass –NoExit to keep the
command window around. The script passed in via -Command is executed
after the profile script, so I can pass in a little script code to set
the current location to the right location.

I modified Peter’s elevate-process script to launch a new Powershell
command window when zero arguments or one folder argument are passed in.
In those cases, elevate-process sets the location to the specified
directory (current directory as the default when no arguments are
provided) via the –NoExit and –Command arguments.

I’ve [posted the
script](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/elevate-process.ps1)
to my SkyDrive as well as providing it below. Feel free to ~~steal~~ use
it as you need.

``` {.brush: .powershell}
function elevate-process  
{  
  $psi = new-object System.Diagnostics.ProcessStartInfo     
  $psi.Verb = "runas";     

  #if we pass no parameters, then launch PowerShell in the current location
  if ($args.length -eq 0)     
  {     
    $psi.FileName = 'powershell'
    $psi.Arguments =  
      "-NoExit -Command &{set-location '" + (get-location).Path + "'}"
  }     

  #if we pass in a folder location, then launch powershell in that location
  elseif (($args.Length -eq 1) -and  
          (test-path $args[0] -pathType Container))     
  {     
    $psi.FileName = 'powershell'
    $psi.Arguments =  
        "-NoExit -Command &{set-location '" + (resolve-path $args[0]) + "'}"
  }     

  #otherwise, launch the application specified in the arguments
  else
  {     
    $file, [string]$arguments = $args;     
    $psi.FileName = $file   
    $psi.Arguments = $arguments
  }     
     
  [System.Diagnostics.Process]::Start($psi) | out-null
}
```

**Update**: I tried to run my elevate-process script from c:Program
Files and discovered a bug. The set-location scripts need the path
parameter to be encapsulated in single quotes in order to handle paths
with spaces. I’ve updated both the code above as well as the copy on my
SkyDrive.
