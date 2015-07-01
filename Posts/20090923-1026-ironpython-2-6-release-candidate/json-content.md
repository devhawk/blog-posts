[![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/IronPython2.6ReleaseCandidate_EDEE/image_3.png "image")](http://ironpython.codeplex.com/)

We released the [IronPython 2.6 release
candidate](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=30315)
on CodePlex yesterday. If all goes well, this will be the ONLY RC and
we’ll republish it as the RTW build in about a month. So if you’ve been
holding off on experimenting with the 2.6 release, now’s the time to
jump in with both feet.

As I’ve written before on this blog, this is a HUGE release for us:

-   Python 2.6 features such as [with
    statement](http://docs.python.org/whatsnew/2.6.html#pep-343-the-with-statement),
    [class
    decorators](http://docs.python.org/whatsnew/2.6.html#pep-3129-class-decorators)
    and [byte
    literals](http://docs.python.org/whatsnew/2.6.html#pep-3112-byte-literals)
-   [Adaptive
    Compilation](http://devhawk.net/2009/03/27/ironpython-2-6-alpha-1/)
-   [\_\_clrtype\_\_
    Metaclasses](http://devhawk.net/CategoryView,category,__clrtype__.aspx)
-   [ctypes and Frames
    support](http://devhawk.net/2009/05/20/ironpython-2-6-beta-1/)
-   [Lightweight
    Debugging](http://devhawk.net/2009/07/08/MicrosoftScriptingDebugging.aspx)
-   417 bugs fixed!

Anyway, with 2.6 winding down, the IronPython team finds ourselves in a
unique position that we’ve never been in before: caught up. As far as I
can tell, most of the Python community hasn’t made the move to [Python
3.1](http://www.python.org/download/releases/3.1) and [Python
2.7](http://www.python.org/dev/peps/pep-0373/) is looking like it will
be released [next
summer](http://mail.python.org/pipermail/python-dev/2009-September/092005.html).
So IronPython is caught up with the latest version of Python most of the
Python community appears to be using.

So that begs the question: what do we do now?

Of course, we want to hear from you regarding our next steps, but some
things we are looking at include:

-   **.NET Framework 4.0**\
    We’ve shipped CTP releases of IronPython for each public beta of
    Visual Studio 2010 and  .NET Framework 4.0. You can expect that to
    continue as Visual Studio 2010 winds down and ships.
-   **Fixing Bugs**\
    417 bugs fixed is good, but there are still 839 active work items in
    our issue tracker. In previous releases, we’ve done minor bug fix
    releases every few months so we’ll probably keep up that cadence.
    Make sure you go vote for bugs you think are important.
-   **App Compatibility**\
    One thing we can do is take some of the more popular Python apps
    such as Django and Mercurial and make sure they run well on
    IronPython. In some cases, there may need to be changes to the
    Python apps to get them to run on IronPython (for example, see [Jeff
    Hardy’s
    patch](http://jdhardy.blogspot.com/2008/07/django-on-ironpython.html)
    for running Django on IronPython) which assuredly means more time
    with lawyers for me.
-   **Missing Modules**\
    While IronPython 2.6 is our implementation of Python 2.6, there are
    binary modules we haven’t implemented yet like
    [\_csv](http://docs.python.org/library/csv.html),
    [\_ast](http://docs.python.org/library/ast.html) and
    [pyexpat](http://docs.python.org/library/pyexpat.html). You could
    consider this App Compatibility work, but we have a different
    internal process for bug fixing and implementing new features so I
    broke this out separately.
-   **Documentation**\
    Invariably an area for improvement in all software, our doc story
    today is pretty much “go look at docs.python.org”. Of course, that
    doesn’t cover any IronPython specific functionality. Of course, what
    would be great would be to combine existing Python docs with
    IronPython specific docs in a single reference, which also assuredly
    means more time with lawyers for me.
-   **Tutorials**\
    If you haven’t seen Michael Foord’s [Try
    Python](http://www.trypython.org/), it’s awesome. However, it was
    recently pointed out to me that it doesn’t include any IronPython
    specific behavior (importing and interoperating with .NET types for
    example). The [IronRuby
    Tutorial](http://jimmy.schementi.com/silverlight/Tutorial/) has
    specific IronRuby features and it would be awesome to do the same
    for IronPython. Of course, if we wrote new tutorials in
    [reStructured Text](http://docutils.sourceforge.net/rst.html), then
    I’m guessing it would be easy for Michael to include it in Try
    Python via his [rst2xaml](http://code.google.com/p/rst2xaml/) tool.
-   **“Just Text” in Silverlight**\
    If you haven’t seen MIX Online Labs [Gestalt
    project](http://www.visitmix.com/Labs/gestalt/), browse to [one of
    the
    samples](http://www.visitmix.com/labs/gestalt/samples/getting.started/05_final.html)
    and View Source. Python as “just text” in the browser. Cool, eh?
    [Jimmy](http://blog.jimmy.schementi.com/) is working on
    [implementing the “just text”
    model](http://rubyforge.org/pipermail/ironruby-core/2009-September/005245.html)
    for the Silverlight version of IronPython (and
    [IronRuby](http://www.visitmix.com/labs/gestalt/samples/getting.started/01_ruby.html)).
-   **Visual Studio**\
    There’s no work item for VS Integration in our issue tracker, but
    there have been [112 votes for IronPython
    integration](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=475830)
    (as well as [79 votes for IronRuby
    integration](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=479957))
    in the VS 2010 connect bug database. No promises here, but we are
    acutely aware of how popular this suggestion is.
-   **CodePlex Foundation**\
    The [CodePlex Foundation](http://codeplex.org/) is a new non-profit
    foundation sponsored by Microsoft with the explicit mission “to
    enable the exchange of code and understanding among software
    companies and open source communities.” As one of the oldest open
    source projects at Microsoft, we are very interested in the CodePlex
    Foundation as you might imagine. However, CodePlex Foundation is
    VERY new – everything is tagged “interim” for the first 100 days.
    Once the Foundation elects non-interim board members and establishes
    things like a charter and by-laws, you can be sure we’ll be
    investigating it more thoroughly. In other words, definitely more
    time with lawyers for me.

In case I haven’t said it lately, it’s great working on the IronPython
team with [Dino Viehland](http://blogs.msdn.com/dinoviehland/), [Dave
Fugate](http://knowbody.livejournal.com) and [David
DiCato](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-December/009154.html)
(The IronRuby guys aren’t bad either!). Also, I may whine about the
amount of time I spend with lawyers, but honestly Yong, Kathryn and
Kevin – our main LCA contacts – do a great job helping us figure out how
and where to push the envelope so thanks to them as well.
