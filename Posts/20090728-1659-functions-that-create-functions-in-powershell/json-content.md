Since I started using Powershell, I’m very picky about what I let on my
path. I feel it’s much cleaner to create aliases or functions rather
than letting all kinds of crud creep into my path.

Recently, I installed the latest [IronRuby
release](http://www.ironruby.com/Download) and discovered there’s a
whole bunch of little batch file wrappers around common Ruby commands
like gem and rake. While being able to simply type “igem” or “irake” is
much easier than typing “ir “C:Program Filesironruby-0.6.0binigem””, I
didn’t want to pollute my path – even with a product from my team.
Instead, I wanted to create a Powershell function for each of those
IronRuby-fied commands. Furthermore, I wanted to avoid manually creating
a function for each Ruby command – these batchfiles are literally
identical except for their name, so I figured it would be possible
automate the function creation in Powershell. Here’s what I came up
with:

``` powershell
$iralias = get-alias ir -EA SilentlyContinue
if ($iralias -eq $null) {return}

$irbindir = split-path $iralias.Definition

function make-rubyfunction($cmd)
{
  $cmdpath = join-path $irbindir $cmd
  set-item function:global:$cmd -Value {ir $cmdpath $args}.GetNewClosure()
  write-host "Added IronRuby $_ command"
}

("igem","iirb","irackup","irails","irake","irdoc","iri") |
  %{make-rubyfunction $_}
```

I start by getting the ir alias, which I’m [setting in my traditional
fashion](http://devhawk.net/2008/12/17/powershell-find-to-set-alias/).
The Ruby command files are in the same directory as ir.exe, which is
what ir is aliased to. If the ir alias isn’t set, I quit out of the
script without setting anything.

The make-rubyfunction function is the primary workhorse of this script.
You pass in a command name as a string, and it uses
[set-item](http://technet.microsoft.com/en-us/library/dd347590.aspx) on
the [function
provider](http://technet.microsoft.com/en-us/library/dd347741.aspx) to
create a new function. Note, I had to explicitly create this function in
the global scope since I’m running the set-item cmdlet inside a script.

Getting the value for the function took a bit of head banging to figure
out. I’m used to Python, which automatically closes over variables, so
my first attempt was to set the function value to something like { ir
\$cmdpath \$args }. But Powershell doesn’t close automatically, so that
fails since \$cmd isn’t defined inside the function. I asked around on
the internal Powershell alias, and someone pointed me to the new
[GetNewClosure](http://blogs.msdn.com/powershell/archive/2009/03/27/get-closure-with-getnewclosure.aspx)
function in Powershell v2. In other words, Powershell only supports
manual closures, which is kind of wonky, but works OK for this scenario.
I create a new script block that references in-scope variable \$cmdpath
and GetNewClosure automatically creates a new script block where that
value is captured and embedded. More info on GetNewClosure [in the
docs](http://msdn.microsoft.com/en-us/library/system.management.automation.scriptblock.getnewclosure(VS.85).aspx).

Now, I’m using Win7 exclusively at this point, so depending on a v2
feature didn’t bother me. However, if you’re using Powershell v1, you
could still accomplish something similar using text substitution. Here’s
my original (i.e. pre-GetNewClosure) version of make-rubyfunction

``` powershell
function make-rubyfunction($cmd)
{
  $cmdpath = join-path $irbindir $cmd
  $p = "ir `"$cmdpath`" `$args"
  set-item function:global:$cmd -Value $p
  write-host "Added IronRuby $_ command"
}
```

I’m using Powershell’s standard text substitution mechanism to create
the function value as a string. Note that I’m escaping the dollar sign
in \$args, so that does not get substituted the way \$cmdpath does.
GetNewClosure feels cleaner, so that’s how I ended up doing it, but both
ways seem to work fine.

Finally, I pass an array of IronRuby commands down the pipe to
make-rubyfunction. I love the pipe command, though it feels strange to
use parentheses instead of square brackets for list comprehensions like
Python and F\#!

Anyway, the script – as usual – is [up on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/ironruby%7C_aliases.ps1).
At some point, I want to do something similar for common IronPython
scripts like
[pyc](http://ironpython.codeplex.com/SourceControl/changeset/view/57298#758946)
and [ipydbg](http://github.com/devhawk/ipydbg/tree/master). Until then,
hopefully someone out there will find it useful (like maybe the IronRuby
team?).
