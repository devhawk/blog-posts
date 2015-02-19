Hello again! If you can read this, my new .NET based weblog system is
working and my new site design is visible. I guess that’s a good start…

My name’s Harry Pierson, a Senior Architect Evangelist on Microsoft’s
National Architecture Team (yes, another ‘softie blogger). This is my
personal site where I post my opinions and my code, in that order of
regularity I suspect. I found out a few months ago that [MSDN
Magazine](http://msdn.microsoft.com/msdnmag) is going to publish an
article of mine on ASP.NET in their March issue. Since I’ll be
supplementing the article with info on this site, I figured I had to get
it all spiffy. Not being a designer myself, I lifted the
[design](http://theme3.weblogger.com/) and spent most of my time on the
ASP .NET implementation. So far, I’m pretty happy with it. Menus are
driven from an XML file, making them easy to manage. The weblog itself
is stored in a [SQL 2000](http://microsoft.com/sql) database. That’s
overkill I know, but I tend to subscribe to the
[Dilbert](http://dilbert.com/) philosophy of “We always build a
database”. I built a multi-user weblog system on top of SQL, so I just
used a stripped down version for this site.

I realized very quickly that I wanted to enforce a consistent look and
feel across all my web pages. As my site provider doesn’t provide
[Content Management Server](http://microsoft.com/cmserver/), I had to
build my own tools. I created a templated PageLayout user control that
has all the base page content, and provides three templated areas to put
the content in (left, center and right). So my individual page code
looks something like:

`<uc1:PageLayout id="PageLayout1" runat="server"> <LeftLayout><uc1:LinkBox runat="server" id="LinkBox1"/></LeftLayout>  <CenterLayout>Some HTML Content Here</CenterLayout>  <RightLayout></RightLayout> </us1:PageLayout> `

I lose the visual designer, plus the ability to access embedded WebForm
controls within page (they are children of the user control, not the
page). But I encapsulate all the large modules of functionality (Weblog
Entries, Weblog Calendar, Link Box, etc) in their own user controls
anyway. Thus, the layout sections of the PageLayout control is simply a
container for other user controls and simple HTML content. I even have
multiple page layouts, one for the root and one for the
[Projects](projects.aspx) section of the site. So far, so good. I’ll
post some of the sample code in the project section soon.
