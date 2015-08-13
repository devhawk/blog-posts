We had a good crowd for today’s webcast – including [my
dad](http://halpierson.blogspot.com/) as it turns out. The session was
on packaging design and architecture guidance for Visual Studio. In the
session, [Tom](http://blogs.msdn.com/tomholl/) and Wojtek announced the
newest p&p deliverable – the Guidance Automation Toolkit. Frankly, I’m
very excited about this project so it was very cool that I got to guest
host today’s webcast.

The on-demand version of the webcast will be up soon, and there is no
other info available on GAT as of yet, so let me summarize the purpose
of GAT. Everyone is very familiar with the template solutions, projects
and items that are in Visual Studio today. You select New Project from
the menu and you get a choice selecting between things like Class
Library, Windows App and Web App. Within one of these application, you
get some contextual guidance – if you create a windows app, you get item
template choices like Add Windows Form and Add Windows User Control but
not Add Web Form or Add Web Service. GAT takes this templating
capability to the next level while also making it much easier to develop
the contextual guidance.

In the demo we saw today, Wojtek executed a solution template for a
distributed application – similar to ones that come in the enterprise
templates feature of VS today. However, the solution template Wojtek
demoed has the ability to create the contextual features described
above. For example, the solution template created an empty project for
the data access layer. From that empty project, you could invoke a
project template to create the data access layer. The reason it’s
important to separate out the step of creating the solution from
creating the DAL is that you can ask further questions at this time. For
example, you could collect info about what database the DAL connects to.
You might even want multiple DALs – one for each DB you’re speaking to
OK, maybe that’s not the best architectural model, but bear with me. The
point is that it becomes very difficult to ask all those questions
during the initial solution creation step. Breaking it out into separate
steps makes it much easier for the developer to tailor the solution as
he goes along.

In addition to having contextual templates that can be executed, GAT
projects also have the concept of recipes that can be attached to any
node the the solution explorer tree (folders, files, etc). These recipes
can gather information from the user in a wizard and then carry out a
set of arbitrary actions. In the demo, Wojtek created an entity object
within his created DAL project. In the wizard, he pointed it to a table
in a database. The recipe then retrieved the schema of the table,
executed a template that read that schema, and placed the resulting file
into the project. What’s really cool is that you can create files that
themselves have recipes attached to them. So you could have one recipe
that created a baseline entity class from the schema – simply writing
out fields and properties for the columns in the table. The create
entity class could then have additional recipes attached to it to do
things like create insert/update/delete methods or to create finder
methods. Of course, often times you want to create multiple finder
methods, so you’d want to be able to run that recipe multiple times.
Note, recipes can do all sorts of actions – anything that can be
automated in VS – so you’re not limited to simply creating new files.
The create finder method example would need to modify an existing file.
You could also delete or move around files as you needed to. It’s quite
powerful.

Of course, all this power is useless if it isn’t easy to leverage. GAT
provides a strong guidance package authoring environment in addition to
the guidance usage experience described above. It has several default
recipe actions for common scenarios (execute template, add file to
solution, etc) plus you can build your own. We didn’t get into it in the
demos today, but send us feedback and we’ll see about scheduling further
webcasts to get more info. Additionally, the GAT will be available in a
few weeks so I encourage you to get it and play with it when it ships.

As I said, I’m very excited about this toolkit. It’s another small step
towards Software Factories. Still have a long way to go, but it’s
awesome to see tangible progress.

BTW, there will be both a GAT breakout and hands-on lab at TechEd. We
didn’t publish the titles yet since the project hadn’t been announced.
The breakout is being presented by [Daniel
Cazzulino](http://weblogs.asp.net/cazzu/archive) who has been [working
on the
GAT](http://weblogs.asp.net/cazzu/archive/2005/04/20/GATAnnouncement.aspx)
for some time now. He’s also written the GAT hands-on lab. Watch Daniel
and Tom’s blogs for more breaking news on GAT.

Major congrats to Tom, Wojtek and Daniel and everyone else involved on
GAT. I can’t wait to get my hands on it and start playing around.

**Update**: Looks like the [on-demand
version](http://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?EventID=1032271518&Culture=en-US)
of the GAT webcast is live.

**Another Update**: I fixed the on-demand link and removed the live
link (since the event’s over, what’s the point of linking to the live
webcast site?)
