I’ve been doing a little CPython coding lately. Even though I [left the
IronPython team](http://devhawk.net/2009/10/26/joining-windows/) a
while ago (and IronPython is now [under new
management](http://blogs.msdn.com/b/jasonz/archive/2010/10/21/new-components-and-contributors-for-ironpython-and-ironruby.aspx))
I’m still still a big fan of the Python language and it’s great for
prototyping.

However, one thing I don’t like about Python is how it uses the
[PYTHONPATH environment
variable](http://docs.python.org/using/cmdline.html#envvar-PYTHONPATH).
I like to keep any non-standard library dependencies in my project
folder, but then you have to set the PYTHONPATH environment variable in
order for the Python interpreter to resolve those packages. Personally,
I wish there was a command line parameter for specifying PYTHONPATH – I
hate having to modify the environment in order to execute my prototype.
Yes, I realize I don’t have to modify the machine-wide environment – but
I would much prefer a stateless approach to an approach that requires
modification of local shell state.

I decided to build a [Powershell
script](http://cid-0d9bc809858885a4.office.live.com/self.aspx/DevHawk%20Content/Powershell/cpy.ps1)
that takes allows the caller to invoke Python while specifying the
PYTHONPATH as a parameter. The script saves off the current PYTHONPATH,
sets it to the passed in value, invokes the Python interpreter with the
remaining script parameters, then sets PYTHONPATH back to its original
value. While I was at it, I added the ability to let the user optionally
specify which version of Python to use (defaulting to the most recent)
as well as a switch to let the caller chose between invoking [python.exe
or
pythonw.exe](http://docs.python.org/using/windows.html#executing-scripts).

The details of the script are fairly mundane. However, building a
Powershell script that supported optional named parameters and collected
all the unnamed arguments together in a single parameter took a little
un-obvious Powershell voodoo that I thought was worth blogging about.

I started with the following param declaration for my function

``` powershell
param (
    [string] $LibPath="",
    [switch] $WinApp,
    [string] $PyVersion=""
)
```

These three named parameters control the various features of my Python
Powershell script. Powershell has an [automatic
variable](http://technet.microsoft.com/en-us/library/dd347675.aspx)
named \$args that holds the arguments that don’t get bound to a named
argument. My plan was to pass the contents of the \$args parameter to
the Python interpreter. And that plan works fine…so long as none of the
non-switch parameters are omitted.

I mistakenly (and in retrospect, stupidly) thought that since I had
provided default values for the named parameters, they would only bind
to passed-in arguments by name. However, Powershell binds non-switch
parameters by position if the names aren’t specified . For example, this
is the command line I use to execute tests from the root of my prototype
project:

```
cpy -LibPath .Libsite-packages .Scriptsunit2.py discover -s .src
```

Obviously, the \$LibPath parameter gets bound to the “.Libsite-package”
argument. However, since \$PyVersion isn’t specified by name, it gets
bound by position and picks up the “.Scriptsunit2.py” argument. Clearly,
that’s not what I intended – I want “.Scriptsunit2.py” along with the
remaining arguments to be passed to the Python interpreter while the
PyVersion parameter gets bound to its default value.

What I needed was more control over how incoming arguments are bound to
parameters. Luckily, Powershell 2 introduced [Advanced Function
Parameters](http://technet.microsoft.com/en-us/library/dd347600.aspx)
which gives script authors exactly that kind of control over parameters
binding. In particular, there are two custom attributes for parameters
that allowed me to get the behavior I wanted:

-   Position – allows the script author to specify what positional
    argument should be bound to the parameter. If this argument isn’t
    specified, parameters are bound in the order they appear in the
    param declaration
-   ValueFromRemainingArguments – allows the script author to specify
    that all remaining arguments that haven’t been bound should be bound
    to this parameter. This is kind of like the Powershell equivalent of
    [params in
    C\#](http://msdn.microsoft.com/en-us/library/w5zay9db.aspx) or the
    [ellipsis in
    C/C++](http://en.wikipedia.org/wiki/Stdarg.h#Declaring_variadic_functions).

A little experimentation with these attributes yielded the following
solution:

``` powershell
param (
    [string] $LibPath="",
    [switch] $WinApp,
    [string] $PyVersion="",
    [parameter(Position=0, ValueFromRemainingArguments=$true)] $args
)
```

Note, the first three parameters are unchanged. However, I added an
explicit \$args parameter (I could have named it anything, but I had
already written the rest of my script against \$args) with the
Position=0 and ValueFromRemainingArguments=\$true parameter attribute
values.The combination of these two attribute values means that the
\$args parameter is bound to an array of all the positional (aka
unnamed) incoming arguments, starting with the first position. In other
words – exactly the behavior I wanted.

Not sure how many people need a Powershell script that sets PYTHONPATH
and auto-selects the latest version of Python, but maybe someone will
find it useful. Also, I would think this approach to variadic functions
with optional named parameters could be useful in other scenarios where
you are wrapping an existing tool or utility in PowerShell, but need the
ability to pass arbitrary parameters thru to the tool/utility being
wrapped.
