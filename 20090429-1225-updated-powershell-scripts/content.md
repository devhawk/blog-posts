For those who are interested, I just uploaded a bunch of changes to the
[PowerShell Scripts
folder](http://cid-0d9bc809858885a4.skydrive.live.com/browse.aspx/DevHawk%20Content/Powershell)
on my SkyDrive. Feel free to download them and use them as you need.

-   [find-to-set-alias](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/find-to-set-alias.ps1)
    – Brad Wilson [enhanced this function
    significantly](http://bradwilson.typepad.com/blog/2008/12/find-to-set-aliasps1.html)
    and broke it out into it’s own script. I had a small issue with his
    version where the folder search may only return a single value, so
    you can’t treat it like collection. My version wraps that command in
    @(…) so that you can always treat it like a collection.
-   [find-in-path](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/find-in-path.ps1)
    – searches all the folders in your path for a given file name
    (wildcards supported. Very useful for “where is this app actually
    installed” kind of debugging.
-   [get-git-branch](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/get-git-branch.ps1)
    – returns the current git branch of a given folder. Got the idea for
    this originally from [Ivan Porto
    Carrero](http://flanders.co.nz/2009/03/19/pimp-your-command-line-for-git/).
-   [prompt](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/prompt.ps1)
    – my powershell prompt. Pretty basic, but it now shows current git
    branch.
-   [elevate-process](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/elevate-process.ps1)
    – create a new PowerShell window or run an app as an administrator.
    I alias this to su on my machine. I recently reworked the “run an
    app” part of this script, so it will search the current folder and
    then the path to run the app you specify.
-   [\_profile](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Powershell/%7C_profile.ps1)
    – this is my main profile script, which I share across multiple
    machines via Mesh. I reworked all my alias setting to use the new
    find-to-set-alias and moved setting the color of the command window
    to the top of the script.

**Update**: I just updated elevate-process again, adding a special
clause to handle .bat and .cmd files. cmd.exe seems to ignore the
working directory setting, so if your batch file relies on being run
from the folder it’s in, it’ll break with elevate-process. That’s
annoying. So if you elevate a batch file, the script runs cmd.exe
directly and executes the specified batch file after first changing to
the current directory. Ugly, but it seems to work.
