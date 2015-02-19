As I write various python modules (many of which get blogged about), I
dump them into a special folder on my machine(s). In my powershell
profile script, I set the [IRONPYTHONPATH environment
variable](http://www.ironpython.info/index.php/Using_the_Python_Standard_Library)
so that these modules are available to the IPy interpreter (i.e.
ipy.exe). To date, I’ve been pretty haphazard about this. But I decided
to get a little more structured and put that folder under source control
and make it available as
“[devhawk\_ipy](http://github.com/devhawk/devhawk_ipy/tree)”.

So far, I’ve only got three scripts (plus an empty \_\_init\_\_.py) in
devhawk\_ipy.

-   codedom.py (from [IronPython and CodeDOM: Dynamically Compiling C\#
    Files](http://devhawk.net/2009/01/30/IronPython+And+CodeDOM+Dynamically+Compiling+C+Files.aspx))
-   ipypulldom.py (from [Stream Processing XML in
    IronPython](http://devhawk.net/2008/05/06/Stream+Processing+XML+In+IronPython.aspx))
-   xml2py.py (from [Deserializing XML with
    IronPython](http://devhawk.net/2008/05/07/Deserializing+XML+With+IronPython.aspx))

Eventually I’ll put my code for working with
[WPF](http://devhawk.net/2008/11/13/IronPython+And+WPF+Part+1+Introduction.aspx),
[LiveFX](http://devhawk.net/2008/12/13/IronPython+And+LiveFX+Accessing+Profiles.aspx)
and
[Azure](http://devhawk.net/2009/01/07/Nightly+Builds+Technical+Info.aspx)
into this package, but I’m not happy with where they are yet.

Like ipydbg, devhawk\_ipy is up on [GitHub](http://github.com/). For
those non-Git users, I’m will continue to these files up on [my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/IronPython%20Stuff).
I kind of see SkyDrive as a dumping ground for random content while
devhawk\_ipy is where stuff goes when it’s a little more polished.

Like IronPython, devhawk\_ipy is licensed under the
[MS-PL](http://www.microsoft.com/opensource/licenses.mspx#Ms-PL). If
you’re interested in contributing, feel free to fork and send me
patches.
