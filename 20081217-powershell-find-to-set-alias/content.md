I use Live Mesh to keep my PowerShell scripts folder synced between
multiple machine. Some of those machines have different things installed
on them or have things installed in different locations. For example, my
laptop is x86 while my desktop is x64 so many things on the desktop get
installed into c:\\Program Files (x86) instead of the plain-old
c:\\Program Files folder. I wanted my shared profile script to be able
to search a set of folders for a given executable to alias, and I came
up with the following function.

``` powershell
function find-to-set-alias($foldersearch, $file, $alias)
{
  dir $foldersearch |
    %{dir $_ -Recurse -Filter $file} |
    %{set-alias $alias $_.FullName -scope Global; break}
}
```

It’s pretty simple to use. You pass in a folder search criteria – it
must have a wildcard, or the function won’t work – the file you’re
looking for and the alias you want to set. The function finds all the
folders matching the \$foldersearch criteria, then searches them
recursively looking for the \$file you specified. Set-alias is called
for the first matching \$file found – pipeline processing is halted via
the break statement.

Here are the find-to-set-aliases I have in my profile:

``` powershell
find-to-set-alias 'c:\program files*\IronPython*' ipy.exe ipy
find-to-set-alias 'c:\program files*\IronPython*' chiron.exe chiron

find-to-set-alias 'c:\Python*' python.exe cpy

find-to-set-alias
    'c:program files*\Microsoft Visual Studio 9.0\Common7' devenv.exe vs
find-to-set-alias
    'c:program files*\Microsoft Visual Studio 9.0\Common7' tf.exe tf

find-to-set-alias 'c:\program files*\FSharp*' fsi.exe fsi
find-to-set-alias
    'c:\program files*\Microsoft Repository SDK*' ipad.exe ipad
find-to-set-alias
    'c:\program files*\Microsoft Virtual PC*' 'Virtual pc.exe' vpc
```

Python, IronPython and F\# aliases, no surprise there. Chiron is the
REPL server for dynamic language Silverlight development. Typically, I
use [Chris Tavares’ vsvars
script](http://www.tavaresstudios.com/Blog/post/The-last-vsvars32ps1-Ill-ever-need.aspx)
to configure the command shell for development purposes, but I find it’s
nice to have aliases for TF and DevEnv handy at all times.
