In experimenting with [NWSGI](http://www.codeplex.com/NWSGI) yesterday,
I found I wanted the ability to launch the development web server that
ships with Visual Studio (WebDev.WebServer.exe) from the command line. I
hacked up the following PowerShell function and dropped it into my
\$profile so I can easily launch the web server in any directory any
time I need. Thought I’d share:

``` powershell
function webdev($path,$port=8080,$vpath='/')
{
    $spath = 'C:\Program Files\Common Files\microsoft shared\DevServer9.0\WebDev.WebServer.EXE'
    $rpath = resolve-path $path  
    $params = "/path:`"$rpath`" /port:$port /vpath:$vpath"  

    $ignore = [System.Diagnostics.Process]::Start($spath, $params)  
    "Started WebDev Server for '$path' directory on port $port"  
}
```

There’s probably an easier way to launch an exe with parameters than
Sys.Diags.Process.Start, but it works. Using resolve-path is the key,
that lets me pass in a relative path on the command line, but the script
converts it to an absolute path in order to pass it to the webdev
server. Also, I’m not sure I should have hard coded the path to the exe,
but again it works and it’s not like it’s tough to change.

Enjoy.

**Update**: Tomas
Restrepo pointed out an easier way to start the process:

``` powershell
&'C:\Program Files\Common Files\microsoft shared\DevServer9.0\WebDev.WebServer.EXE' "/path:$rpath" "/port:$port" "/vpath:$vpath"
```

I couldn’t figure out how to correctly launch the exe when the physical
path to serve has a space in it. Thanks Tomas.
