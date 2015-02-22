For the past few years, I’ve used the [CodeHTMLer
plugin](http://codehtmler.codeplex.com/) for Windows Live Writer for the
code snippets in my blog. However, recently I discovered the
[Pygments](http://pygments.org/) Python syntax highlighter package which
supports scores more languages than CodeHTMLer does. It also support
multiple color schemes and was easily extensible so I could build an
HTML formatter that didn’t use \<pre\> tags (which [I’ve found DasBlog
has issues with](http://devhawk.net/2007/12/07/blogging-f-code/) in
the RSS feed, though honestly I’m running three minor releases behind
the latest DasBlog release). IronPython supports Pygments just fine – at
least, the one IPy bug that Pygments exposes has a simple workaround –
so I set about building a Windows Live Writer plugin that uses it.

If you’re simply interested in the plugin itself, you can [get it from
my
skydrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Pygments%20for%20WL%20Writer/Pygments.WLWriter.msi).
The [source is up on
GitHub](http://github.com/devhawk/pygments.wlwriter). For now, if you
find any bugs, please leave a comment on this post. If there’s enough
interest I’ll setup a site somewhere (CodePlex perhaps) where I can
track bugs and feature requests.

Pygments for WL Writer is a [smart content
source](http://msdn.microsoft.com/en-us/library/aa702799.aspx). In WL
Writer’s terminology, that means when you click inserted text in the
editor window, it is treated as an atomic entity which you can then edit
by using the Edit Code button in the Pygments for WL Writer sidebar
editor. I I often found that I would edit my code multiple times –
usually to shorten lines so they’d fit on my blog without wrapping.
CodeHTMLer for WL Writer is a standard content source, so it just spews
the formatted code as HTML onto the page.

From an IronPython perspective, there’s some interesting stuff there. I
decided to compile the pygments library into a DLL for easier
distribution. If you look in the source, there’s a
[folder](http://github.com/devhawk/pygments.wlwriter/tree/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package)
for the Pygments source as well as the [parts of the standard Python
library](http://github.com/devhawk/pygments.wlwriter/tree/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/pygments_dependencies)
that Pygments depends on and my [custom HTML
formatter](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/devhawk_formatter.py).
Those all get compiled [via a custom
script](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/build_pygments.py)
which can be called by the [build.bat
file](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/build.bat)
in the project root.

Some features I’m thinking about adding:

-   An extensibility model so that you can add new languages by dropping
    new [Pygments lexers](http://pygments.org/docs/lexerdevelopment/)
    into the same folder the plugin is installed to. Pygments supports
    lots of languages, but not all of them – notably it’s missing
    Powershell and F\#.
-   Support for new HTML formatters and color schemes using the same
    extensibility mechanism described above.
-   Support for selecting an HTML formatter.
-   Improving the code editor window. Currently, I’m using a standard
    WinForms multi-line TextBox, but that leaves a lot to be desired.
    With the Python work I do, I often need to be able to select a bunch
    of text and change it’s indenting via tab and shift-tab. If anyone
    has a suggestion for a good WinForms text editing control, [let me
    know](mailto:harry@devhawk.net).
-   Being able to specify the font and size of the Pygmented code.
-   Storing user preferences – remembering the most recent syntax and
    color scheme the user used.

Feedback, as always is appreciated. I’ll probably write a few posts
about the project when I get a chance, so let me know if there’s
anything you’re dying to hear about.
