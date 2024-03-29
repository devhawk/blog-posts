-   My parents are coming into town tomorrow so I’m off for the
    remaining week or so of the year. Blogging will likely be
    non-existent, unless I blog something I come up with while geeking
    out with my dad.
-   Juergen van Gael
    [demonstrates](http://mlg.eng.cam.ac.uk/jurgen/blog/?p=6) how to use
    [TPL](http://blogs.msdn.com/dsyme/archive/2007/12/18/using-parallel-extensions-from-f.aspx)
    from F\#. He wrote this [once
    before](http://cs.hubfs.net/blogs/f_team/archive/2007/10/18/3774.aspx)
    using F\#’s async workflows feature. I like the TPL version, though
    the ``new Action<int>(RowTask)`` is a little wordy. I’m guessing the
    eventual F\# syntax will probably become something compact like
    ``action RowTask``. (via [Don
    Syme](http://blogs.msdn.com/dsyme/archive/2007/12/18/using-parallel-extensions-from-f.aspx))
-   Andrew Peter ported RoR’s [Haml view
    engine](http://haml.hamptoncatlin.com/) to ASP.NET MVC, calling the
    result
    [NHaml](http://andrewpeters.net/2007/12/19/introducing-nhaml-an-aspnet-mvc-view-engine/).
    I haven’t played around with the new MVC stuff much, but I’m
    guessing ASP.NET’s control-based approach doesn’t work well when you
    separate out the controller code. If I’m manually authoring view
    templates, I’d much rather type NHaml’s syntax than the standard
    ASP.NET \<% …%\> syntax. On the other hand, there aren’t any design
    tools out there today handle the NHaml syntax. Also, I wonder if
    Andrew is working on a
    [Sass](http://haml.hamptoncatlin.com/docs/sass) port. (via
    [DNK](http://www.dotnetkicks.com/aspnet/Introducing_NHaml_An_ASP_NET_MVC_View_Engine))

