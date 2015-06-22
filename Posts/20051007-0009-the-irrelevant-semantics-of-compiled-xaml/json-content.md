From newly converted ARC MVP [Sam Gentile](http://samgentile.com/blog),
I found [this interesting
post](http://blog.hackedbrain.com/archive/2005/10/06/3193.aspx) from
[Drew Marsh](http://blog.hackedbrain.com/) about how XAML is compiled:

> XAML is indeed a language, but it is never compiled into C\# or IL…
> The truth is, it’s not “compiled” at all. If anything you can say it
> is “compacted” and that only happens in scenarios where it is turned
> into a BAML stream. That, however, is an optimization and not a
> necessity for XAML to work. XAML can be interpreted purely in it’s raw
> XML text form, using
> [Parser::LoadXml](http://winfx.msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/O_T_System_Windows_Serialization_Parser_LoadXml.asp).
> Even BAML is interpreted, it’s just a far more compact and efficient
> representation of the object graph than raw XML text.\
> [Drew Marsh – [The XAML
> Experience](http://blog.hackedbrain.com/archive/2005/10/06/3193.aspx)]

Given that I just [wrote about
compiling](http://devhawk.net/2005/10/05/code-is-model/), I wanted
to weigh with a couple of points:

-   <div>

    First, by definition compilation is a translation from one format to
    another. Therefore, converting XAML to BAML is a compilation step.
    The [SDM
    folks](http://lab.msdn.microsoft.com/teamsystem/workshop/sdm/default.aspx)
    have a [command line
    tool](http://msdn2.microsoft.com/en-us/library/ms151031) for
    compiling deployment reports from the models in the [Architect
    edition of
    VSTS](http://lab.msdn.microsoft.com/teamsystem/teamcenters/architect/).
    However, I assume what Drew meant here was that XAML isn’t compiled
    into a directly executable format, so in reality I’m just being
    picky about the use of the word “compiled”.

    </div>

-   <div>

    Second, the fact that the XAML is compiled into an efficient binary
    representation and then embedded as a resource ([as per Rob
    Relyea](http://www.longhornblogs.com/rrelyea/archive/2004/01/31/2306.aspx))
    is fascinating from an implementation perspective, but somewhat
    irrelevant semantically. Drew points out that the BAML is
    interpreted. With VM environments like CLR, the line between
    interpreted and compiled blurs considerably. [Rob’s
    post](http://pluralsight.com/blogs/dbox/archive/2005/09/30/15100.aspx)
    referenced above is based on the PDC 03 XAML bits, and at the time,
    XAML could be compiled into BAML *or* IL. However, at the time (20
    months ago) Rob guessed that the IL compilation would be cut because
    the BAML perf was just as good or better, the file size was smaller
    and localization is easier. In the end, the XAML file is converted
    into a format the machine can execute – the specific choice of
    compilers and transformations isn’t particularly interesting from a
    modeling perspective since it happens automatically.

    </div>

XAML isn’t the only place where the traditional compiling to executable
model is being stretched. In [Windows Workflow
Foundation](http://msdn.microsoft.com/windowsvista/building/workflow/default.aspx),
though your workflow is defined as a type, you can actually [modify
running
instances](http://blogs.msdn.com/markhsch/archive/2005/09/23/473373.aspx)
of the workflow. Given that WF supports declaring workflows as C\# or
XOML (soon to be XAML), I wonder if they are going to go the same route
as WPF and eliminate the C\#/IL way of declaring workflows. Another
interesting example is
[LINQ](http://msdn.microsoft.com/netframework/future/linq/default.aspx)
and C\# 3.0. This is interesting because you can use LINQ directly on in
memory data, but when you apply it to database (via
[DLinq](http://download.microsoft.com/download/c/f/b/cfbbc093-f3b3-4fdb-a170-604db2e29e99/DLinq%20Overview.doc))
the LINQ statements are parsed into expression trees then converted into
SQL. (Check out [this
post](http://www.interact-sw.co.uk/iangblog/2005/09/30/expressiontrees)
from [Ian Griffiths](http://www.interact-sw.co.uk/iangblog) for deeper
coverage of expression trees).

Anyway, it’s late and I realize I’ve written quite a bit to basically
say that the definition of “compiled” is pretty blurry at this point and
getting blurrier going forward. In the end, it’s much more interesting
IMO to focus on the model environment you’re working in (XAML in this
case) rather than the details of how that model is translated into the
execution environment, unless you’re the one building those translation
tools.

**UPDATE** – I had one other thought on all this. It’s interesting that
computing power (CPU + IO bandwidth) have improved to a point where the
performance of interpreting BAML at runtime is as fast than executing
XAML compiled to IL directly. I certainly wouldn’t have assumed that.
