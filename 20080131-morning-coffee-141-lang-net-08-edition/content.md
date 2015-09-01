::: image-right
[![header](http://image.devhawk.net/blog-content/20080131-1025-morning-coffee-141-lang-net-08-edition/header_thumb.jpg)](http://image.devhawk.net/blog-content/20080131-1025-morning-coffee-141-lang-net-08-edition/header_2.jpg)
:::

I was hoping to blog my thoughts on Lang.NET as the event went along.
Obviously, that didn’t happen, though I was pretty good about dumping
links into [my del.icio.us feed](http://del.icio.us/harrypierson). The
talks were all recorded, and should be up on the
[website](http://langnetsymposium.com) in a week or two. Rather than
provide a detailed summary of everything that happened, here are my
highlights:

-   The coolest thing about conferences like this is what John Rose
    called “N3″ aka “Nerd-to-Nerd Networking”. It was great to meet in
    person, drink with and geek out with folks who’s blogs I read like
    [Tomas Petricek](http://tomasp.net/), [Wesner
    Moise](http://wesnerm.blogs.com/net_undocumented/) and [Larry
    O’Brien](http://knowing.net/). Plus, I got to meet a bunch of other
    cool folks like [Gilad Bracha](http://gbracha.blogspot.com/),
    [Stefan Wenig](http://www.re-motion.org/blogs/) and [Wez
    Furlong](http://netevil.org/). That’s worth the price of admission
    (which was admittedly nothing) right there.
-   Coolest MSFT talk: [Martin
    Maly](http://blogs.msdn.com/mmaly/default.aspx) “Targeting DLR”. I
    was wholly unaware that the DLR includes an entire compiler back
    end. Martin [summarized the idea of DLR
    trees](http://blogs.msdn.com/mmaly/archive/2008/01/14/building-a-dlr-language-trees.aspx)
    on his blog, but the short version is “you parse the language, DLR
    generates the code”. That’s pretty cool, and should dramatically
    lower the bar for language development. Of course, I want to write
    my parser in F\#, so I’m going to port the [DLR ToyScript
    sample](http://blogs.msdn.com/mmaly/archive/2008/01/08/building-a-dlr-language-toyscript.aspx)
    to F\#.
-   Runner-up, Coolest MSFT talk: [Erik
    Meijer](http://research.microsoft.com/~emeijer/) “Democratizing the
    Cloud with Volta”. Erik is a great speaker and he really set the
    tone of his session with the comment “Division by zero is the goal,
    not an error”. He was referring to an idea from [The Change
    Function](http://www.amazon.com/Change-Function-Technologies-Others-Crash/dp/1591841321)
    that user’s measure of success is a function of perceived crisis
    divided by perceived pain of adoption. Erik wants to drive that
    adoption pain to zero. It’s a laudable goal, but I remain
    unconvinced on Volta.
-   Coolest Non-MSFT talk: [Gilad Bracha](http://www.bracha.org/)
    “Newspeak”. Newspeak is a new language from one of the co-authors of
    Java. It’s heavily smalltalk influenced, and runs on Squeak. He
    showed developing [PEGs](http://pdos.csail.mit.edu/~baford/packrat/)
    in Newspeak, and they were very compact and easy to read, easier
    even than F\#. He calls them Executable grammar, and you can read
    his [research paper](http://bracha.org/executableGrammars.pdf) or
    [review his slides](http://bracha.org/newspeak-parsers.pdf) on the
    topic. Unfortunately, Newspeak isn’t generally available at this
    time.
-   Runner-up, Coolest Non-MSFT talk: [Miguel de
    Icaza](http://www.tirania.org/blog/) “Moonlight and Mono”. The talk
    was kinda all-over-the-place, but It’s great to see how far Mono has
    come. Second Life [just
    started](http://tirania.org/blog/archive/2008/Jan-29.html) beta
    testing a Mono-based script runner for their [LSL
    language](http://en.wikipedia.org/wiki/Linden_Scripting_Language)
    (apparently, Mono breaks many LSL scripts because it runs them so
    fast). He also showed off [Unity](http://unity3d.com/), a 3D game
    development tool, also running on Mono.
-   [Resolver
    One](http://www.resolversystems.com/products/resolver-one.php) is a
    product that bridges the gap between spreadsheets and applications,
    entirely written in [IronPython](http://www.codeplex.com/IronPython)
    (around 30,000 lines of app code and 110,000 lines of test code, all
    in IPy). Creating a spread-sheet based app development environment
    is one of those ideas that seems obvious in retrospect, at least to
    me. If you do any kind of complicated spreadsheet based analysis,
    you should check out [their
    product](http://www.resolversystems.com/get-it/).
-   If you’re a [PowerShell](http://www.microsoft.com/powershell) user,
    you should check out [PowerShell+](http://powershellplus.com/). It’s
    a free console environment designed for PowerShell and a damn sight
    better than CMD.exe. If you’re not a PowerShell user, what the heck
    is wrong with you?
-   Other projects to take a deeper look at: [C\#
    Mixins](http://www.re-motion.org/) and [Cobra
    Language](http://cobra-language.com).
-   I thought my talk went pretty well. It’s was a 15 minute version of
    my [Practical Parsing in F\#
    series](http://devhawk.net/2007/12/10/practical-parsing-in-f/).
    Several folks were surprised I’ve been coding F\# for less than a
    year.
