I just realized that I had Morning Coffee 9 both [last
Friday](http://devhawk.net/2007/01/12/Late+Morning+Coffee+9.aspx) and
[last Monday](http://devhawk.net/2007/01/15/Morning+Coffee+9.aspx).
Woops. Rather than changing the titles of four posts, I’m just skipping
\#13 instead. Just like a hotel.

-   The folks behing the [Optimus concept
    keyboard](http://www.artlebedev.com/everything/optimus/) are
    shipping a [mini 3-key
    keyboard](http://www.artlebedev.com/everything/optimus-mini/). The
    basic idea of both keyboards is that the keyface is a little LED
    screen. Apparently, they’re planning on releasing a production
    version of the full keyboard [this
    year](http://www.artlebedev.com/everything/optimus/answers/). The
    3-key keyboard is
    [\$160](http://store.artlebedev.com/catalog/computer_add-ons/optimus-mini-three/),
    so I’m guessing the full keyboard will cost quite a bit. (via [Scott
    Hanselman](http://www.hanselman.com/blog/OptimusMiniThreeKeyboardAndWindowsVistaSideShow.aspx))
-   [Some](http://www.456bereastreet.com/archive/200701/new_w3c_html_working_group_chaired_by_microsoft/)[people](http://glazman.org/weblog/dotclear/index.php?2007/01/11/2420-future-of-the-html-wg-3)
    are up in arms that the chair of the [new W3C HTML Working
    Group](http://www.w3.org/2006/11/HTML-WG-charter.html) is [Chris
    Wilson from
    Microsoft](http://blogs.msdn.com/cwilso/archive/2007/01/10/you-me-and-the-w3c-aka-reinventing-html.aspx).
    I’m guessing these are people who don’t understand much about how
    such working groups work. As Chris writes, most of his time as chair
    will be herding cats. (via [reddit](http://programming.reddit.com/))
-   I am interested to see what this new working group produces. The \#1
    [deliverable](http://www.w3.org/2006/11/HTML-WG-charter.html#deliverables) for
    this group is “A language evolved from HTML4 for describing the
    semantics of documents **and applications**on the World Wide Web”
    (emphasis added). Given the already existing [Web API
    WG](http://www.w3.org/2006/webapi/), it would be nice to see an
    application model as a formalized part of HTML.
-   Again [via
    Scott](http://www.hanselman.com/blog/ImprovingOutlookTodayWithJelloDashboard.aspx),
    [Jello.Dashboard](http://jello.wordpress.com/) is a replacement for
    Outlook Today with a [GTD](http://www.davidco.com/what_is_gtd.php)
    bent. However, as Scott points out, it is *slow*. Scott blames the
    Outlook Automation APIs, but I think the scripting engine is also to
    blame. In the [CRM Integration for
    Outlook](http://devhawk.net/2006/01/10/Outlook+Integration+Sample.aspx)
    sample, I used a [WinForms UserControl as a folder
    homepage](http://msdn2.microsoft.com/en-us/library/aa479345.aspx#otlkcustinentapp_topic9)
    and didn’t notice any perf issues. If you expose a WinForms
    UserControl as a COM control (via Guid and ComVisible attributes),
    you can then host that control within an HTML file which is set as
    the folder home page. The sample includes a helper function to
    generate the HTML folder home page to host the UserControl. If
    there’s interest, I can post a small sample. Not only is this
    approach faster than a script based one, it’s easier to design and
    debug.

