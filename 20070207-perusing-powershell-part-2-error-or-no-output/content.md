In [yesterday’s post on
PS](http://devhawk.net/2007/02/06/perusing-powershell-part-1-get-sqlserver/),
I provided the source for my implementation of Get-SQLServer. I realized
after I made the post that there was a significant bug in the
ProcessRecord method. If you specify a service instance (default or
named), the cmdlet makes no effort to actually validate that such a SQL
server instance exists. So if you ask for a instance that doesn’t exist,
Get-SQLServer will happily write an invalid Server object to the
pipeline. So I changed it to actually validate that the specified
instance exists. I connect to the specified machine (local machine if
not specified) using
[ManagedComputer](http://msdn2.microsoft.com/library/microsoft.sqlserver.management.smo.wmi.managedcomputer.aspx)
and look in it’s ServerInstances collection for the specified SQL
instance.

The question is, what should you do if the specified SQL instance
*doesn’t* exist on the specified machine? One the one hand, you could
[write an
error](http://msdn2.microsoft.com/library/system.management.automation.cmdlet.writeerror.aspx)
indicating that the SQL instance doesn’t exist. Or, you could simply
write nothing to the output pipeline, which may cause an error down the
line.

Which is the right approach?

At first, I wrote an error when I couldn’t find the instance, but
decided that wasn’t the right approach. It isn’t really an error unless
you attempt to act on that instance, right? So I thought the more PS
friendly approach would be to write nothing and let the down stream
cmdlets deal with it. I do [write a debug
message](http://msdn2.microsoft.com/library/system.management.automation.cmdlet.writedebug.aspx)
if the specified instance doesn’t exist, so the scripter isn’t
completely in the dark.

So here’s the new and improved ProcessRecord method of my Get-SQLServer
cmdlet:

 

``` csharp
protected override void ProcessRecord()
{
    //Make sure both -Name and -Default aren’t specified
    if (!string.IsNullOrEmpty(_Name) && _Default.IsPresent)
    {
        WriteError(new ErrorRecord(
            new ArgumentException(
                “Default and Name parameters can’t both be specified”),
            “DefaultAndName”,
            ErrorCategory.InvalidArgument,
            null));
        return;
    }

    //If the machine name is not specified, assume the local machine
    //(via the “.” value)
    string machine = string.IsNullOrEmpty(_MachineName) ? “.” : _MachineName;

    //Connect to the specified machine via the SMO WMI ManagedComputer object
    SmoWmi.ManagedComputer mc = new SmoWmi.ManagedComputer(machine);

    if (string.IsNullOrEmpty(_Name) && !_Default.IsPresent)
    {
        //If neither Name or Default are specified, write all the
        //server instances on specified machine
        foreach (SmoWmi.ServerInstance si in mc.ServerInstances)
            WriteServerObject(si);

        return;
    }

    string instanceName = _Default.IsPresent ? “MSSQLSERVER” : _Name;

    if (mc.ServerInstances.Contains(instanceName))
        WriteServerObject(mc.ServerInstances[instanceName]);
    else
        WriteDebug(“The specified SQL instance does not exist”);
}

//Helper method to create a SMO Server object from a
//SMO WMI ServerInstance object and write it to the pipeline
private void WriteServerObject(SmoWmi.ServerInstance si)
{
    if (si.Name == “MSSQLSERVER”)
        WriteObject(new Smo.Server(si.Parent.Name));
    else
        WriteObject(new Smo.Server(si.Parent.Name + “\” + si.Name));
}
```
