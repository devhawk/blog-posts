I [wrote this
morning](http://devhawk.net/2007/02/06/morning-coffee-25/) that I’ve
shifted my new language focus from F\# to PowerShell. I did this for a
variety of reasons, but primarily because PowerShell is the future of
Microsoft administration while F\# is a research project. The thing that
interests me most about F\# is its support for hybrid OO/functional
programing. Turns out, PS uses a different approach, but accomplishes
much of the same goal.

In OO, most of the focus is on objects, naturally. However,
administrators (i.e. the target audience of PS) tend to be much more
task or action focused than object focused. Most OO languages don’t have
actions as a first class citizens within the language. C\# and Java
don’t even allow stand alone functions – they always have to be at least
static members of a class.

I’m fairly sure there are many reasons why strongly typed OO languages
aren’t popular among administrators. I’m not going to go down the
static/dynamic typing rat hole here, but I would guess the object/action
language tradeoff is almost as important as the typing tradeoff. What’s
nice about PowerShell is that while it has strong object support, it
also has strong action support as well. In PS, actions are called
Cmdlets. While I’m not a big fan of the name, having first class support
for them in PS is one of the things I find most interesting.

PS is designed to be extended. And while there is support for defining
functions in PS directly, for the most part PS is designed to be
extended in a .NET OO language like C\#. I have mixed feeling on this.
Languages like F\# and Ruby allow for these sorts of extensions to be
built within the language itself. On the other hand, having a strong
separation between scripting the shell and extending the shell
simplifies the scripting experience without sacrificing capability of
building extensions.

Here’s a simple cmdlet I wrote called Get-SQLServer. SQL Server already
comes with a [robust object oriented administration
library](http://msdn2.microsoft.com/en-us/library/ms162169.aspx), but no
support for PS (no surprise, since PS just shipped). I imagine future
versions of SQL will have PS support, but to me this represents a great
opportunity to get deep understanding of PS as well as focus on PS
cmdlet design without having to do much of the grunt work.

``` csharp
using System;
using System.Management.Automation;
using Microsoft.SqlServer.Management.Smo.Wmi;
using Microsoft.SqlServer.Management.Smo;

[Cmdlet(VerbsCommon.Get, "SQLServer")]
public class GetSqlServerCommand : Cmdlet
{
  private string _Name;
  [Parameter]
  public string Name
  {
    get { return _Name; }
    set { _Name = value; }
  }

  private string _MachineName;
  [Parameter]
  public string MachineName
  {
    get { return _MachineName; }
    set { _MachineName = value; }
  }

  private SwitchParameter _Default;
  [Parameter]
  public SwitchParameter Default
  {
    get { return _Default; }
    set { _Default = value; }
  }

  protected override void ProcessRecord()
  {
    string machine = string.IsNullOrEmpty(_MachineName) ? "." : _MachineName;

    if (string.IsNullOrEmpty(_Name) && !_Default.IsPresent)
    {
      //write all server instances on specified machine
      //if _machineName is null or empty, the local machine is used
      ManagedComputer mc =  new ManagedComputer(machine);

      foreach (ServerInstance si in mc.ServerInstances)
      {
        if (si.Name == "MSSQLSERVER")
          WriteObject(new Server(machine));
        else
          WriteObject(new Server(machine + "\\" + si.Name));
      }

      return;
    }

    if (!string.IsNullOrEmpty(_Name) && _Default.IsPresent)
    {
      WriteError(
        new ErrorRecord(
          new ArgumentException("Default and Name parameters can't both be specified"),
          "DefaultAndName",
          ErrorCategory.InvalidArgument,
          null));

      return;
    }

    if (_Default.IsPresent)
      WriteObject(new Server(machine));
    else
      WriteObject(new Server(machine + "-" + _Name));
  }
}
```

As you can see, it’s fairly simple. The cmdlet takes three parameters –
Name, MachineName and Default. MachineName represents the windows server
machine the SQL server instance is running on. Name is a common PS
parameter, and here is used to specify the SQL instance name you’re
interested in. However, since the default instance of SQL on a given
server doesn’t have a name, I had to add a Default flag. Since the
cmdlet can return a collection of SMO Server objects, I needed a way to
distinguish between “Give me the default instance on a machine” and
“Give me all instances on a machine”. I couldn’t use a null or empty
Name parameter to mean both. If neither Name or Default are specified,
it means the user wants a collection. If both are specified, it’s an
error. Otherwise, the cmdlet returns a single Server object – either the
default or a named instance as specified.

Using the cmdlet is fairly straight forward. If you simply specify
“Get-SQLServer”, it gives you a collection of all the SQL Server
instances on the local machine. If you specify “Get-SQLServer -Default”,
it gives you just the default SQL Server instance on the local machine.
And if you specify “Get-SQLServer -Name sqlexpress”, it gives you just
the SQL Express instance on the local machine. Using the -MachineName
parameter allows you to connect to a remote SQL server box, but is
otherwise the same.

Of course, this is a very simple cmdlet. It doesn’t even change the
current state of the system. But now that we have a reference to a SQL
Server instance, we can call methods on that instance. In the next post
(whenever that is), I’ll build some cmdlets to let me create and drop
databases on that instance.
