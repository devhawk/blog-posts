-   My [Binding Across
    States](http://devhawk.net/2007/01/25/Binding+Across+States+In+WF.aspx)
    post made it to the home page of DotNetKicks, so at last six other
    people liked it. I wonder if I’ll be able to detect and traffic
    increase from that.
-   I wrote yesterday that I had ordered a PCMCIA Smart Card reader for
    my laptop. I ordered it around 11:30pm on Wednesday and it arrived
    yesterday around 2pm.That’s good service! And so much more
    convenient than the USB smart card reader.
-   I also mentioned yesterday that I had moved my laptop over to Vista.
    I’m not sure why, but my battery life has gotten significantly
    better. Maybe it’s because these days I’m primarily using my laptop
    to remote into my desktop so I’m not exercising the local system
    much.
-   I was checking out [Windows PowerShell Quick
    Reference](http://www.oreilly.com/catalog/windowspowershell/) from
    O’Reilly (on [Safari](http://www.oreillynet.com/whatis/safari.csp))
    and discovered this PS offers the numeric constants of `gb`, `mb`,
    and `kb` to represent gigabytes, megabytes, and kilobytes. Example:
    `$downloadTime = (1gb + 250mb) / 120kb`. That’s pretty cool.
-   Speaking of PS, I stumbled across
    [PowerSMO!](http://pluralsight.com/blogs/dan/archive/2006/11/07/41936.aspx)
    from [Dan Sullivan](http://pluralsight.com/blogs/dan/). Instead of
    building native PS support for SQL administration, PowerSMO! makes
    it easy to access SMO objects in PS. Instead of having to call
    “new-object Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer”,
    you call “Get-SMO\_ManagedComputer”. Even more interestingly,
    PowerSMO! uses metaprograming techniques to generate all the
    Get\_SMO\* methods. It iterates over all the SMO types – about 1000
    types in total – and generates the associated Get-SMO functions into
    a temp script file. Once the temp file is created, it can be invoked
    like any other script. Must noodle on this approach further.
