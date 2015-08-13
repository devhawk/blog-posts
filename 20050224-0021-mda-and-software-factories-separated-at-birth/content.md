Tonight I went to the monthly meeting of the local chapter of
[IASA](http://www.iasarchitects.org/). I should have also blogged
this before the meeting, but I forgot. Sorry about that if you live near
the Microsoft campus and wanted to go. Next meeting is on 3/30, so mark
your calendars.

Anyway, tonight’s topic was an MDA workshop featuring
[AndroMDA](http://www.andromda.org/). AndroMDA is an open source tool
for generating primarily J2EE code for \*nix boxes using UML and MDA.
(To be fair, the speaker – local chapter president Chris Sterling –
demonstrated generating C\# code as well. Of course, he ran it under
Mono on a Linux box.) This provided a great launching point for a
general modeling discussion that helped me get a few things straight in
my head. Typically, the UML vs. DSL discussion turns religious pretty
quickly. However, I believe that people – like those a the meeting
tonight – who are achieving practical success with MDA in the real world
are doing so by using a [Software
Factories](http://www.softwarefactories.com) style approach.

First off, if you look at how most people use UML for MDA, the class
diagram appears to be the most dominant model used. When I say “UML for
MDA”, what I mean is people using UML as a
[blueprint](http://www.martinfowler.com/bliki/UmlAsBlueprint.html) or as
a [programming
language](http://www.martinfowler.com/bliki/UmlAsProgrammingLanguage.html). While
UML has 12 different [model
types](http://www.omg.org/gettingstarted/what_is_uml.htm#12DiagramTypes),
class diagrams make up the bulk of the modeling effort. (The bulk of
AndroMDA code generation works off the [UML class
diagram](http://www.andromda.org/modeling.html), though the BPM4Struts
cartridge uses Use Case & State models as well) The other 11 diagrams
are primarily used for [sketching
purposes](http://www.martinfowler.com/bliki/UmlAsSketch.html). That
means you’re only blueprinting the structural aspect of your system –
which in turn means that all the system’s behavior has to be implemented
by hand. Now, this is not to say that factories suggests you should only
model the structural aspect of your system. However, I think this
indicates that most pragmatic users have realized MDA doesn’t live up to
the hype.

Secondly, the class diagram that are used have to be heavily adorned
with custom metadata – typically in the form of stereotypes – in order
to be useful for code generation (i.e. blueprint) purposes. AndroMDA has
a set of “cartridges” (essentially, target code generators) such as
[EJB](http://www.andromda.org/andromda-ejb-cartridge/index.html),
[Hibernate](http://www.andromda.org/andromda-hibernate-cartridge/index.html)
and
[POJOs](http://www.andromda.org/andromda-java-cartridge/modeling.html).
Each of these cartridges has a supported set of stereotypes. While there
is some overlap (for example, EJB and Hibernate cartridges both define
the Entity stereotype). These stereotypes assign brand new semantics to
the elements being modeled. In short, they turn the the generic class
modeler into a domain specific modeler!

It appears to me that the pragmatic MDA crowd is using the class diagram
as a generic “ball and stick” editor. Model elements that aren’t needed
are ignored and elements that are needed are added via stereotypes. For
example, you can use a class diagram to model a database. Certain
elements of the model are ignored (Can a column have protected
visibility? Can one table inherit from another?) while other elements
specific to the domain being modeled are added (primary and foreign
keys, indexes, etc). The problem with this approach is that all of the
knowledge of how to build a valid model is in the user’s head, rather
than the tool. Typically, that means a lot of training as well as a lot
of in depth understanding of the framework underlying the model in order
to capture the right amount of information. Since all that domain
specific information is trapped in the users head, they have to do a ton
of menial drudge work. It’s different drudge work from things like
writing tons of data access code, but it’s drudgery nonetheless.

If you’re going to need a tool specifically designed for your problem
domain, why use a generic tool and a bunch of handwritten rules, when
you can codify those rules into a domain specific language of your own?
(I mean, other than the obvious “because the [DSL
Toolkit](http://lab.msdn.microsoft.com/teamsystem/Workshop/DSLTools/default.aspx)
hasn’t shipped yet”)
