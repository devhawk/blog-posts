Back in November, we published a series of articles about [Software
Factories](http://msdn.microsoft.com/architecture/overview/softwarefactories/).
As excited as I am by the concept, [Chris
Sells](http://www.sellsbrothers.com/) really brought me back to earth
with this post:

> I’ve been reading each of [the Software Factories
> articles](http://msdn.microsoft.com/architecture/overview/softwarefactories/)
> with great interest. Part 1 and part 2 did a particularly good job
> describing the elements of the problem space, I thought. However, when
> I get to [part
> 3](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnbda/html/softfact3.asp),
> I was ready to see a solution. Instead what I got was a long abstract
> piece defining the bits of what makes up a software factory. This is
> the kind of thing I’d be ready to read after I was shown a concrete
> example or two of working, running software factories. Do other people
> like reading these long, abstract articles? I find them tedious unless
> they’re filling in and generalizing the details of something that I’ve
> already got a handle on.\
> [Chris Sells – [Concrete Examples of Software
> Factories?!?](http://www.sellsbrothers.com/news/showTopic.aspx?ixTopic=1577)
> – Nov 7th, 2004]

When we were planning the ARC track for TechEd this year, I sent this
post to [Keith](http://blogs.msdn.com/keith_short/) and
[Jack](http://blogs.msdn.com/jackgr) and told them I wanted to show a
concrete example of a working, running software factory. I wanted to
impress Chris. Today was ARC302 – [Building and Using a Software
Factory](http://www1.msteched.com/content/sessionview.aspx?TopicID=fb0f790d-a7b8-4948-b3a4-21d000074171)
with [Jack](http://blogs.msdn.com/jackgr) and
[Wojtek](http://blogs.msdn.com/wojtek/). I don’t think Chris was here
today, but if he had been, I think he would have been impressed. It’s
one thing to see all the various parts working on their own, but it’s
very different to see everything working together in concert.

The factory scenario they demoed was for building smart client apps.
[p&p](http://msdn.microsoft.com/practices/) already has a bunch of
existing assets like
[EntLib](http://msdn.com/library/en-us/dnpag2/html/entlib.asp) and
[UIP](http://msdn.com/library/en-us/dnpag/html/uipab.asp) that is useful
for building smart clients as well as a ton of [guidance for building
smart client apps](http://msdn.com/library/en-us/dnpag/html/scag.asp).
But long books and source code projects are not the easiest form of
guidance for developers to consume. The factory ties these assets and
guidance together to provide a powerful in-tool experience for building
such applications. For example, they started by instancing a smart
client solution template. This had two projects – the UIP related code
and the main application code. The UIP project had all the boilerplate
code that every UIP project needs to use, but it didn’t have any code
for individual UIP page flows. So they invoked a
[GAT](http://lab.msdn.microsoft.com/teamsystem/workshop/gat/) recipe to
create a UIP page flow. This is one way where factories differ from
traditional wizards – wizards are typically only invoked when creating a
new solution. Factory recopies are invoked after the initial wizard
runs, meaning you can unfold the template incrementally as you go along.
So in this case, you invoke the recipe to create a UIP page flow
multiple times, once per flow you want to create. Running the recipe
created a bunch of files, but of primary note was a
[DSL](http://lab.msdn.microsoft.com/teamsystem/workshop/dsltools) model
file and two code generation templates. The model file was for a cool
little DSL for laying out UIP page flows. The code gen templates
generated all the code for the forms and the flow control as well as the
config needed to implement the page flow as designed in the DSL. Then
they wired up the generated forms to a web service, including usign a
service agent to cache web service call results on the client.

All in all, it was a very full featured app to build in a very very
short amount of time. What was interesting is that there was very little
hand waving when it came to adding code. You know how demos go where
they add literally pages of code? In this demo, they’d swap out the file
with the empty method for one where the method had like ten lines of
code. And on top of being full featured, it followed the best practices
design put forth by out patterns & practices group. So it didn’t fit the
mold of a “quick & dirty” demo – how often does a demo app that you
build on stage conform to best practices?

I gotta get through the end of this week, but then I want to get a video
of the demo up on the web so you can see what I’m talking about, even if
you didn’t go to TechEd or attend the session. I’d love to get the code
too – it’s all running on VS05 Beta 2 – but you know product group
guys…the next version of the demo is going to be even cooler…I think I
can convince Jack to ship the current code and then ship the even cooler
demo code when they get that finished.
