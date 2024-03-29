Usually, my [PowerShell
posts](http://devhawk.net/CategoryView,category,PowerShell.aspx) are
effusive in their praise. However, who thought up this “feature” gets no
praise from me:

```
PS»Resolve-Path ~missing.file
Resolve-Path : Cannot find path 'C:Usershpiersonmissing.file' because it does not exist.
```

In my opinion, this is a bad design. Resolve-Path assumes that if the
filename being resolved doesn’t exist, then it must be an error. But in
the script I’m building, I’m resolving the path of a file that I’m going
to create. In other words, I know a priori that the file doesn’t exist.
Yet Resolve-Path insists on throwing an error. I would have expected
there to be some switch you could pass to Resolve-Path telling it to
skip path validation, but there’s not.

And the worst thing is, I can see that Resolve-Path came up with the
“right” answer – it’s right there in the error message!

Searching around, I found [a
thread](http://www.vistax64.com/powershell/24603-resolve-path-non-existing-file.html)
where someone else was having the same problem. Jeffrey Snover – aka
Distinguished Engineer, inventor of Powershell and [target of Erik
Meijer’s Lang.NET coin throwing
stunt](http://www.langnetsymposium.com/2009/talks/23-ErikMeijer-LiveLabsReactiveFramework.html)
– suggested using [–ErrorAction and
–ErrorVariable](http://blogs.msdn.com/powershell/archive/2006/11/03/erroraction-and-errorvariable.aspx)
to ignore the error and retrieve the resolved path from the TargetObject
property error variable. Like Maximilian from the thread, using this
approach feels fragile and frankly kinda messy, but I needed a solution.
So I wrote the following function that wraps up access to the error
variable so at least I don’t have fragile messy code sprinkled through
out my script.

``` powershell
function force-resolve-path($filename)
{
  $filename = Resolve-Path $filename -ErrorAction SilentlyContinue
                                     -ErrorVariable _frperror
  if (!$filename)
  {
    return $_frperror[0].TargetObject
  }
  return $filename
}
```

The script is pretty straightforward. –ErrorAction SilentlyContinue is
PowerShell’s version of [On Error Resume
Next](http://msdn.microsoft.com/en-us/library/5hsw66as.aspx) in Visual
Basic. If the cmdlet encounters an error, it gets stashed away in the
variable specified by ErrorVariable (it’s also added to \$Error so you
can still retrieve the error object if ErrorVariable isn’t specified)
and continues processing. Then I manually check to see if resolve-path
succeeded – i.e. did it return a value – and return the TargetObject of
the Error object if it didn’t.

As I said, fragile and kinda messy. But it works.
