-   I took the kids to see [Fly Me To The
    Moon](http://www.flymetothemoonthemovie.com/) recently. We had to
    trek to Monroe (about 30 minutes away) because it’s a special 3D
    movie, and it was only playing there and in downtown Seattle. The
    movie’s story is insipid – three flies stow away on Apollo 11 – but
    all the space shots were actually kinda cool. It sure felt like they
    wanted to be scientifically and historically accurate about the the
    actual mission (well, other than the part about the flies). Patrick
    really liked it (he wants to build a rocket in the back yard) and
    Riley sat thru the whole thing with a minimum of fussing.
-   I’m a big fan of Joe Biden, so I’m really happy Obama [picked
    him](http://www.msnbc.msn.com/id/26365828/) to be his running mate.
-   I know it’s old news but what the frak was John Edwards thinking? I
    like his policies, but the arrogance it takes to run for president
    when you know you’ve got that skeleton in your closet is
    mind-boggling.
-   On the other hand, watching the Sean Hannity and guest’s hypocrisy
    on Edwards’ affair, only to watch them [scramble like
    cockroaches](http://www.youtube.com/watch?v=Da4N-CTTRIM) when Colmes
    points out McCain had admitted to having an affair was frakking
    hilarious.

OK, onto geek stuff:

-   My new boss Dave Remy has moved to a [new
    blog](http://blog.remlog.net/). If you’re curious what he was up to
    for the 10 months he was away from Microsoft, he’s [happy to
    share](http://blog.remlog.net/?p=4).
-   IPy and IRuby developer Curt Hagenlocher (aka Iron Curt) is
    [blogging](http://blogs.msdn.com/curth/). Cue the Ozzy…I AM IRON
    CURT. Or don’t. Anyway, he dives in the deep end of the pool – no
    “hello world” lollyblogging for Iron Curt – digging into the [stack
    implications of rethrowing
    exceptions](http://blogs.msdn.com/curth/archive/2008/07/29/stackoverflowexception-and-ironpython.aspx)
    and [debugging emitted
    IL](http://blogs.msdn.com/curth/archive/2008/08/12/viewing-emitted-il.aspx).
-   Srivatsn writes about [static compilation of IPy
    scripts](http://blogs.msdn.com/srivatsn/archive/2008/08/06/static-compilation-of-ironpython-scripts.aspx).
    Note, we’re not talking about static typing – it’s still the same
    good-old dynamically typed IronPython, just packaged up as an
    assembly, rather than as a bunch of .py files. Note, if you’re
    interested in compiling IronPython, you should check out the PYC
    sample we published as part of [Beta
    4](http://www.codeplex.com/IronPython/Release/ProjectReleases.aspx?ReleaseId=14353).
-   Speaking of IPy Beta 4, Shri Borde posts about the [COM dispatch
    support](http://blogs.msdn.com/shrib/archive/2008/07/30/idispatch-support-on-in-ironpython-beta-4.aspx)
    which is enabled by default as of Beta 4. If you’re driving COM
    automation clients (like Office) from IPy, this is a huge
    improvement over the old mechanism.
-   Jeff Hardy has released a new version of NWSGI, a managed version of
    Python’s [Web ~~Service~~ Server Gateway
    Interface](http://www.python.org/dev/peps/pep-0333/). My
    understanding is that this would allow any Python web stack written
    against WSGI to run in IIS with IronPython (subject to IronPython’s
    compatibility with CPython). Jeff’s been
    [documenting](http://jdhardy.blogspot.com/) his efforts getting
    Django running with NWSGI on his blog. Awesome work Jeff! (Thanks
    for the correction Seo!)
-   I [never really bought
    into](http://devhawk.net/2006/03/08/The+SoCalled+Attention+Economy.aspx)
    the “Attention Economy”, but Chris Anderson’s [economic
    analysis](http://www.longtail.com/the_long_tail/2008/08/i-wish-people-w.html)
    of his DIY Drones site traffic was fascinating.
-   Lutz announces “[it is time to move
    on](http://blog.lutzroeder.com/2008/08/future-of-net-reflector.html)”
    from Reflector and there was a collective horrified scream in the
    .NET community. He’s handing it over to Red Gate, who
    [promised](http://www.simple-talk.com/opinion/opinion-pieces/the-future-of-reflector-/)
    they “will continue to offer the tool for free to the community”.
-   I missed this when he posted it in June, but I really liked Nikhil
    Kothari [use of the
    DLR](http://www.nikhilk.net/ViewModel-Pattern-DLR.aspx) in
    Silverlight to cut down on the XAML verbosity in his ViewModel
    action binding.
-   Brian McNamara previews the new [Add
    Reference](http://lorgonblog.spaces.live.com/Blog/cns!701679AD17B6D310!307.entry)
    and [file
    ordering](http://lorgonblog.spaces.live.com/Blog/cns!701679AD17B6D310!347.entry)
    support in the upcoming F\# CTP. I’m really looking forward to the
    project-to-project reference support. I can’t tell you how many
    times I’ve gotten burned because my main project recompiled but my
    test project didn’t. You just get used to hitting Rebuild All
    instead of Build. As for file ordering, it’s a bit of a bummer that
    F\# requires it, but the new experience is hella better than editing
    the project file by hand. I’m *really* looking forward to the new
    CTP.

