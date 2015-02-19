*(Harry is on a secret mission in uncharted space this week, so instead
of the daily Morning Coffee post, you get a series of autoposted essays.
This post combines both some leftover learnings about Ruby from Harry’s
Web 2.0 days with his recent obsession with PowerShell.)*

My first introduction to the idea of internal DSLs was an [article on
Ruby Rake](http://martinfowler.com/articles/rake.html) by Martin Fowler.
Rake is Ruby’s make/build utility. Like most build tools like
[Ant](http://ant.apache.org/) and
[MSBuild](http://msdn2.microsoft.com/en-us/library/ms171452.aspx), Rake
is a dependency management system. Unlike Ant and MSBuild, Rake doesn’t
use an XML based language. It uses Ruby itself, which has huge benefits
when you start doing custom tasks. In Ant or MSBuild, building a custom
task requires you to use a external environment (batch file, script file
or custom compiled task object). In Rake, since it’s just a Ruby file,
you can start writing imperative Ruby code in place.

Here’s the simple Rake sample from Fowler’s article:

``` {.brush:ruby}
task :codeGen do  
  # do the code generation 
end 

task :compile => :codeGen do  
  # do the compilation 
end 

task :dataLoad => :codeGen do  
  # load the test data 
end 

task :test => [:compile, :dataLoad] do  
  # run the tests 
end
```

The task keyword takes three parameters: the task name, an array
containing the task dependencies and a script block containing the code
to execute to complete the task. Ruby’s flexible syntax allows you to
specify task without any dependencies (:codegen), with a single
dependency (:compile =\> :codegen), and with multiple dependencies
(:test =\> [:compile,:dataLoad])

So what would this look like if you used Powershell instead of Ruby? How
about this:

``` {.brush:powershell}
task codeGen {  
  # do the code generation 
}
task compile codeGen { 
  # do the compilation 
}

task dataLoad codeGen {  
  # load the test data 
}

task test compile,dataLoad { 
  # run the tests 
}
```

Not much different. PS uses brackets for script blocks while Ruby uses
do / end, but that’s just syntax. Since it lacks Ruby’s concept of
symbols (strings that start with a colon), PS has to use strings
instead. Otherwise, it’s almost identical. They even both use the \#
symbol to represent a line comment.

There is one significant difference. For tasks with dependencies, Rake
uses a hash table to package the task name and its dependencies. The =\>
syntax in Ruby creates a hash table. Since the hash table has only a
single value, you can leave of the surrounding parenthesis. The key of
this single item hash table is the task name while the value is an array
of task names this task depends on. Again, Ruby’s syntax is flexible, so
if you have only a single dependency, you don’t need to surround it in
square brackets.

In Powershell, the hash table syntax isn’t quite so flexible, you have
to surround it with @( ). So using Rake’s syntax directly would result
in something that looked like “task @(test = compile,dataLoad) {…}”
which is fairly ugly. You don’t need to specify the square brackets on
the array, but you having to add the @( is a non-starter, especially
since you wouldn’t have them on a task with no dependencies.

So instead, I thought a better approach would be to use PS’s variable
parameter support. Since all tasks have a name, the task function is
defined simply as “function task ([string] \$name)”. This basically says
there’s a function called task with *at least* one parameter called
\$name. (All variables in PS start with a dollar sign.) Any parameters
that are passed into the function that aren’t specified in the function
signature are passed into the function in the \$args variable.

This approach does mean having to write logic in the function to
validate the \$args parameters. Originally, I specified all the
parameters, so that it looked like this: “function global:task([string]
\$name, [string[]] \$depends, [scriptblock] \$taskDef)”. That didn’t
work for tasks with no dependencies, since it tried to pass the script
block in as the \$depends parameter.

Here’s a sample task function that implements the task function shown
above. It validates the \$args input and builds a custom object that
represents the task. (Note, the various PS\* objects are in the
System.Management.Automation namespace. I omitted the namespaces to make
the code readable.)

``` {.brush:powershell}
function task([string] $name) {
  if (($args.length -gt 2) -or ([string]::isnullorempty($name))) { 
    throw "task syntax: task name [<dependencies>] [<scriptblock>]"
  }               
  if ($args[0] -is [scriptblock]) {         
    $taskDef = $args[0]       
  }       
  elseif ($args[1] -is [scriptblock]) {         
    $depends = [object[]]$args[0]         
    $taskDef = $args[1]       
  }       
  else {         
    $depends = [object[]]$args[0]     
    #if a script block isn't passed in, use an empty one        
    $taskDef = {}    
  }     

  $task = new-object PSObject       
  $nameProp = new-object PSNoteProperty Name,$name       
  $task.psobject.members.add($nameProp)                
  $dependsProp = new-object PSNoteProperty Dependencies,$depends       
  $task.psobject.members.add($dependsProp)                
  $taskMethod = new-object PSScriptMethod ExecuteTask,$taskDef       
  $task.psobject.members.add($taskMethod)                
  $task     
}
```

Of course, you would need much more than this if you were going to build
a real build system like Rake in PowerShell. For example, you’d need
code to collect the tasks, order them in the correct dependency order,
execute them, etc. Furthermore, Rake supports other types of operations,
like file tasks and utilities that you’d need to build.

However, the point of this post isn’t to rebuild Rake in PS, but to show
how PS rivals Ruby as a language for building internal DSLs. On that
front, I think PowerShell performs beautifully.

I’m looking forward to using PowerShell’s metaprogramming capabilities
often in the future.
