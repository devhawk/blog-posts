Honestly, this post started off as a rant entitled “Is it Me, or is DB
Development a Pain in the Ass?” about the sorry state of database
development tools in Visual Studio. But in searching around on MSDN for
information about the built-in “Database Project” type (which could more
accurately be called “just a bunch of SQL scripts”), I stumbled across
information about the [Database Professionals edition of Visual Studio
Team System](http://msdn2.microsoft.com/en-us/teamsystem/aa718764.aspx).
That’s right, I had forgotten that we shipped this [late last
year](http://blogs.msdn.com/mattnunn/archive/2006/12/04/we-have-rtm-d-visual-studio-2005-team-edition-for-database-professionals-releases-to-manufacturing.aspx).

I short, VSTDB (or whatever the “official” acronym is) is 90% of what I
was looking for in a DB dev tool. Sure, it’s not perfect, but it’s a
massive improvement over the previous state of the art.

The primary feature of VSTDB is the ability to “build” your database the
same way you build your code. You use lots of small scripts that get
compiled together into a model (for lack of a better term) of the
database as you’ve defined it. That model can be deployed to a new
database instance or used to update an existing instance. You can also
compare that model against an existing database in order to determine
what’s changed and automatically build update SQL scripts for the DBA’s
to run in the production environment (since you don’t want your
developers doing that).

It takes a little getting used to, but the “lots of small scripts”
approach has a lot of upside. If you have a table with a primary key,
you’re supposed to define the primary key, indexes, constraints,
triggers, etc. in separate scripts from table creation script. This
makes things much easier when you’re trying to figure out what’s changed
in your source control system.

VSTDB has a variety of other cool looking features like data generation
and unit testing, but I haven’t really dug into them much yet. One thing
that VSTDB supports that I wasn’t expecting was Service Broker! SQL
Management Studio has limited SSB support – if you want to create new
SSB objects you have to write the DDL directly. VSTDB requires you to
write the SSB DDL also (it makes you write DDL for everything, see
below) but it at least has templates for all the SSB object types. Very
Cool!

Of course, there are always things that could be improved. The T-SQL
editor does syntax highlighting but not IntelliSense. It doesn’t support
the existing visual database tools like the [Table
Designer](http://msdn2.microsoft.com/en-us/library/0daykhky(VS.80).aspx).
And while you can build T-SQL stored procs, functions, types, etc, VSTDB
doesn’t support the development of managed SQLCLR stored procs, et.al.
Things to work on for v2, I suppose. 

If you’re using VS Team Suite, you can [download an
add-on](http://www.microsoft.com/downloads/details.aspx?familyid=7de00386-893d-4142-a778-992b69d482ad&displaylang=en)
that adds VSTDB functionality to your existing VSTS installation. It’s
only 8MB, so it’s definitely the way to go for Team Suite users.
