This morning was Rick Rashid’s keynote with “[the big
announcement](http://www.microsoft.com/presspass/press/2004/oct04/10-26oopslaecosystempr.asp)“:
a framework and tools for developing Domain Specific Languages in VSTS.
Essentially, this is a toolkit for building your own modeling tools on
top of the infrastructure that powers the [VSTS Distributed System
Designers (aka
WhiteHorse)](http://msdn.microsoft.com/library/en-us/dnvsent/html/vsent_ModelingLangs.asp).
Personally, I think this is pretty exciting stuff and I can’t wait to
play with it more in the coming months.

::: image-right
[![](http://hawkblogstorage.blob.core.windows.net/blog-content/20041026-1719-oopsla-day-1-2/UIPDSLthumb.JPG)](http://hawkblogstorage.blob.core.windows.net/blog-content/20041026-1719-oopsla-day-1-2/UIPDSL.JPG)
:::

As part of the announcement, they demoed the toolkit with a DSL for
programming the flow of pages in a web application. Typically, you would
use a framework like [User Interface
Process](http://msdn.microsoft.com/library/en-us/dnpag/html/uipab.asp) for
this. However, the UIP comes with 130 pages of documentation and a
variety of classes and configuration settings. By building a DSL on top
of the framework, we can make the developers significantly more
productive. I’ve posted a screen shot of the designer – it’s essentially
a box-and-stick modeling environment – boxes are pages and sticks are
transitions. Dragging a new page onto the design surface from the
toolbar generates a new web page in the solution. Dragging a transition
onto the design surface changes the config file. That’s much more
productive than mucking around in source and config files to accomplish
the same task.

Of course, the standard question when we announce stuff like this is
“when can I get my hands on it?” We’re going to release a tech preview
version of the DSL Toolkit “real soon now”. You’ll be able to download
it from the newly minted [VSTS
Workshop](http://lab.msdn.microsoft.com/vs2005/teamsystem/workshop/default.aspx)
page. I hear that this project, now that it’s public, is going to be
very transparent to the community, so keep an eye out for more info (of
course, I’ll blog it when the toolkit is released). Honestly, the
version we’re shipping “real soon” is much rougher than what we
previewed in the keynote this morning, but we’ll be updating it
periodically as it marches towards release.

I’ve had several good conversations in the booth with people wanting
more info about VSTS and the DSL toolkit as well as Software Factories
in general. As is typical, I learn as much as I teach in these sorts of
discussions. For example, I met Gan Deng from Vanderbilt who showed me
GME – the [Generic Modeling
Environment](http://www.isis.vanderbilt.edu/Projects/gme) – which is DSL
modeling environment similar conceptually to what we announced today for
VSTS. Not sure when I’m going to get to play with it, but it’s nice to
see academia support for DSLs.

The only downer is that some of the OOPSLA crowd was put-off by a
product demo during the keynote. Stuart [described
it](http://blogs.msdn.com/stuart_kent/archive/2004/10/27/248260.aspx) as
a “commercial break”. Several people gave me “brutal feedback” that
brazen marketing displays like product demos don’t work in OOPSLA
keynotes. But others thought it was cool. Good to keep in mind for next
year.

**Update**: Alan Kay, in his [Turing Award
Lecture](http://www.oopsla.org/2004/ShowEvent.do?id=421), made a joke
about about our product announcement this morning and everyone laughed,
including me.

**Update 2**: After making a joke about our morning’s product demo (and
several other assorted jabs), Alan Kay ended his Turing Award Lecture
with…wait for it…a product demo. Two product demos, actually.
[Squeak](http://www.squeak.org/) is educational programming environment,
based on Smalltalk. It is [freely
downloadable](http://www.squeak.org/download/index.html) and has an
associated [community](http://www.squeakland.org/) and
[wiki](http://minnow.cc.gatech.edu/squeak). Alan did a simple little
demo where he drew a car and a steering wheel and was able to steer the
car as it moved by rotating the steering wheel. Cool. Alan’s other demo,
[Croquet](http://www.opencroquet.org/) is a “massively multi-user
virtual learning environment” which is built on top of Squeak. While I
liked Squeak, I don’t know many people who spend significant time in a
virtual 3D space who aren’t gaming. Frankly, Croquet doesn’t seem
particularly practical or useful – check out this
[screenshot](http://www.opencroquet.org/About_Croquet/screenshots/slideshow9.html)
of document collaboration in Croquet. In this example, the 3D space is
more of a distraction than an enabler. The only place Croquet seems
useful to me is for dynamic 3D simulations, such as this
[screenshot](http://www.opencroquet.org/About_Croquet/screenshots/slideshow12.html)
demonstrating the Coriolis effect.
