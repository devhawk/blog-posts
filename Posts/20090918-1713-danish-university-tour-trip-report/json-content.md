I’ve been back from Denmark for a week – it took me that long to get
back on Pacific time zone and dig out from the mountain of email that
collected while I was gone. But I [got
word](http://twitter.com/martinesmann/status/4074900218) from my
esteemed host [Martin Esmann](http://twitter.com/martinesmann) that the
[video of my
TechTalk](http://channel9.msdn.com/posts/martinesmann/Pumping-Iron-Dynamic-Languages-on-NET/)
had been posted to Channel 9, so it seems as good a time as any for my
trip report.

At each of these universities, I did two talks. The first was Pumping
Iron: The State of Dynamic Languages on the .NET Framework. That’s the
one in the Channel 9 video. The other talk was [Developing with the
DLR](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Presentations/Developing%20on%20the%20DLR.pptx),
which I’ve posted to my Skydrive. That talk was more focused on the CLR
and DLR as a platform for language development. If there’s interest
(leave a comment), I’ll record audio for that presentation and post it
up on SlideShare or something like that.

::: image-right
[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/IronPython_DK_trip_on_a_map_thumb.png "IronPython_DK_trip_on_a_map")](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/DanishUniversityTourTripReport_9595/IronPython_DK_trip_on_a_map_2.png)
:::

### [Aalborg University](http://en.aau.dk/)

First stop of the University Tour was Aalborg University – about a four
hour drive from Copenhagen (or as the Danish spell it København). As you
can see on the map, we started with the furthest university away then
worked our way back to Copenhagen. Martin picked me up at the airport
and we hit the road. I was horribly jet lagged, but we spent most of the
drive geeking out about programming languages (when I wasn’t napping).

Each of the universities had a different focus that I was interested in.
At Aalborg, it was in teaching programming. Given the popularity of
[Python in education](http://www.python.org/community/sigs/current/edu-sig/), we
had lots to talk about. My host at Aalborg was [Bent
Thomsen](http://www.cs.aau.dk/~bt/) who has done [significant
research](http://www.springerlink.com/content/u481122hk38w4j32/) on this
topic, as has [his wife
Lone](http://www.springerlink.com/content/2267261t17202k77/). One of the
areas we discussing in particular was about teaching classes vs. objects
first. Apparently, these days there’s significant momentum behind
teaching class first, but the folks at Aalborg – as I understand it –
have seen that approach has been ineffective. That squared with a talk I
saw on teaching OOP with Python that I saw [last year at
PyCon](http://us.pycon.org/2008/conference/talks/?search=Goldwasser) by
[Dr. Goldwasser](http://euler.slu.edu/~goldwasser/publications/).

The other area we discussed was teaching [compiler
design](https://intranet.cs.aau.dk/education/courses/2009/spo). Clearly,
this is an area I thought the DLR could be a big help in. Bent primarily
uses [Programming Language Processors in
Java](http://www.amazon.com/Programming-Language-Processors-Java-Interpreters/dp/0130257869)
to teach this course, but he finds that it’s a little out of date + he’s
much more interested in the compiler aspect than the interpreter aspect
of that book. The idea of generating DLR Expression Trees which can be
compiled into IL with a simple call to
[LambdaExpression.Compile](http://dlr.codeplex.com/SourceControl/changeset/view/27854#580545)
and can then run directly on the CLR seemed to sound appealing to him.

### [Aarhus University](http://www.au.dk/en)

Next up was Aarhus University. I didn’t get to spend as much time with
the folks from Aarhus, though our host [Olivier
Danvy](http://www.brics.dk/~danvy/) did help me find a “uniquely Danish”
gift for my wife (though I also brought her Danish bread & chocolate).
We spent some time talking about F\# and compiler design, and Olivier
made this great comment over lunch that “OCaml is a domain specific
language for compiler writers”. That is very true.

Olivier had to leave for a previous engagement, so [Jan
Midtgaard](http://www.brics.dk/~jmi/) – who teaches Aarhus’ [Compilation
class](https://www.daimi.au.dk/dOvs/) – hosted me for the actual talks.
In that class, they implement a subset of Java known as Joos in AspectJ.
One of the cool things about this class is how they grade the compilers
– you upload your complier code to a web site and they run it against an
existing test framework. They couldn’t give the students the test
framework directly because it would be too easy to reverse engineer the
tests from the compiled Java code (I assume the Java world has the
equivalent of [Reflector](http://www.red-gate.com/products/reflector/)?)
Like Aalborg, I spent significant time discussing the idea of targeting
the DLR in their compiler class.

### [University of Southern Denmark](http://www.sdu.dk/?sc_lang=en)

Of the four universities I visited, this was probably the poorest fit
for the content I was delivering. On the other hand, it was awesome –
USD has a strong focus on Robotics. They even have a [RoboDays Robot
Festival](http://www.robodays.com/activities/robodays-robot-festival-in-odense.aspx)
in Odense. Unfortunately, the festival was the weekend after I visited,
so many of the robots were out in preparation for the festival. However,
our host [Ulrik Schultz](http://www.mip.sdu.dk/people/Staff/ups.html)
did bring us to to visit the [Modular Robotics Research
Lab](http://modular.mmmi.sdu.dk/wiki/Main_Page) so I got to see these
guys in action:

[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/videod9804c33b78e.jpg)](http://www.youtube.com/watch?v=SYizuooEs7s)

Real transforming robots! Not quite Optimus Prime mind you, but you
gotta start somewhere. These robots are call
[ATRON](http://modular.mmmi.sdu.dk/wiki/ATRON) and they’re pretty
impressive to see in action. However, they are kinda weak
computationally – they only have 128k of flash memory + 4k of ROM. 4K!
However, the next generation of these bots is supposed to have like 64MB
of memory and a FPGA – more than enough power to use the the [Micro
Framework](http://www.microsoft.com/netmf).

### [University of Copenhagen](http://www.ku.dk/english/)

The final stop on my university tour was University of Copenhagen, where
I was hosted by [Fritz
Henglein](http://www.diku.dk/hjemmesider/ansatte/henglein/) of the
[Algorithms and Programming Languages
Group](http://www.diku.dk/Forskning/algorithmsandprogramminlanguages/).
He’s done some [research on dynamic
languages](http://www.diku.dk/hjemmesider/ansatte/henglein//publications//henglein94b.html),
but these days he and his team are doing some fascinating research on
the intersection of business and programming languages. He leads a
project called [3gERP](http://www.3gerp.org/) in partnership with
[Microsoft Development Center
Copenhagen](http://www.microsoft.com/danmark/mdcc/default.mspx) to
“develop a standardized, yet highly configurable and flexible, global
ERP system for SME’s based on fundamentally new software architecture.”
That topic isn’t as interesting to me in my current role in the VS
Languages team, but was very relevant to my background in services
architecture and MSIT.

### Copenhagen .NET Users Group

While I was in Denmark, I got to speak to the local .NET users group
about IronPython. These are always fun since they are less formal. Also,
this was a much more .NET knowledgeable crowd than I had had all week so
I got some deeper questions about the .NET stack. Among the members of
that user group is [Mads Kristensen](http://madskristensen.net/),
founder of the [BlogEngine.NET](http://www.dotnetblogengine.net/)
project. So I put together a special demo “integrating” IronPython into
BlogEngine.NET. It was kinda silly – I wrote an extension that would
execute any blog post as python that was in the RunPython category. But
it was also mind-numbingly simple:

``` csharp
[Extension("Extend .NET Blog Engine with IronPython")]
public class IPyExtension
{
    static ScriptEngine _engine;

    static IPyExtension()
    {
        _engine = IronPython.Hosting.Python.CreateEngine();
        Post.Serving += new EventHandler<ServingEventArgs>(Post_Serving);
    }


    static void Post_Serving(object sender, ServingEventArgs e)
    {
        Post p = (Post)sender;
        bool runpython = p.Categories.Exists(delegate(Category cat) {
            return string.Compare(cat.Title, "RunPython", true) == 0; });
        if (runpython)
        {
            e.Body = _engine.Execute<string>(e.Body);
        }
    }
}
```

I’d love to see REAL IronPython integration into BlogEngine.NET, but I
needed something I could do in a couple of hours late at night in a code
base I wasn’t familiar with.

::: image-right
[![IMG\_2297](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/IMG_2297_thumb.jpg "IMG_2297")](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/DanishUniversityTourTripReport_9595/IMG_2297_2.jpg)
:::

### Pumping Iron TechTalk

Finally, on Friday I delivered my final talk of the week, which is
available to watch and download from [Channel
9](http://channel9.msdn.com/posts/martinesmann/Pumping-Iron-Dynamic-Languages-on-NET/).
It was a packed house and I was a little nervous about having the talk
recorded, but I think it went well. Certainly, it seemed well received
by the audience.

<iframe src="//channel9.msdn.com/Blogs/martinesmann/Pumping-Iron-Dynamic-Languages-on-NET/player?format=html5" width="560" height="315" allowFullScreen frameBorder="0"></iframe>

I ended the work part of my trip to Denmark with an interview with a
Danish IT newspaper (which I’ll post a link to when it gets published)
and a sit down with the
[Dyanmics:NAV](http://www.microsoft.com/dynamics/en/us/products/nav-overview.aspx)
team. My wife always tells me that she’d love it if I got a 6-12 month
assignment to work overseas, so I tried to convince the NAV team that
they REALLY want to integrate IronPython like the [Dynamics AX
team](http://www.langnetsymposium.com/2009/talks/13-RomanIvantsov-IronPythonMSDynamic.html)
is doing. If you see a post here about me moving to Copenhagen, you’ll
know I was successful!
:smile:

::: image-right
[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/IMG_2276_thumb.jpg)](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/DanishUniversityTourTripReport_9595/IMG_2276_2.jpg)
:::

### Final Thoughts

Other than the jet lag, which seemed tougher on this trip than when I’ve gone
westward to New Zealand, Australia or Malaysia, I had a blast. It was a
real treat seeing so much of Denmark and getting to talk to so many
interesting people. I even got to do some sight seeing in Copenhagen and
Odense. Hans Christian Andersen was born in Odense and so I got to see
the house he was born in as well as get my picture taken with this
statue of him right outside our hotel. Major thanks to Martin Esmann for
inviting me, driving me around – we drove a megameter, aka 1000km, over
the course of the trip – and being an all around amazing host.
