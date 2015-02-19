One of the big new features in [VS
2010](http://www.microsoft.com/visualstudio/en-us/products/2010/default.mspx)
is the [WPF based
editor](http://msdn.microsoft.com/en-us/library/dd885242(VS.100).aspx).
With it, you can build all sorts of cool stuff like [control the
visualization of XML doc
comments](http://blogs.msdn.com/vseditor/archive/2009/05/13/visualizing-xml-doc-comments.aspx),
[change how intellisense
looks](http://editorsamples.codeplex.com/Wiki/View.aspx?title=IntelliSense%20Presenter),
even [scale the size of text based on the location of the
caret](http://code.msdn.microsoft.com/caretfisheye). Huzzah for the WPF
Visual Studio editor!

However, as wicked awesome as the new editor is, AFAIK it’s not going to
be released as a separate component. So while the
[PowerShell](http://blogs.msdn.com/powershell/archive/2008/10/31/powershell-ise-and-visual-studio.aspx),
[Intellipad](http://blogs.msdn.com/intellipad/archive/2009/03/25/font-sizes-in-intellipad.aspx)
and other teams inside Microsoft can reuse the VS editor bits, nobody
else can. So if you want to do something like [embed a colorizing REPL
in your WPF
app](http://www.iunknown.com/2009/05/dynamic-languages-at-teched-2009.html),
you’ll have to use something else.

I’ve [thought
about](http://devhawk.net/2009/02/27/Writing+An+IronPython+Debugger+MDbg+101.aspx)
putting a WPF based UI on top of ipydbg (though now I’d probably use the
new [lightweight
debugger](http://devhawk.net/2009/07/08/MicrosoftScriptingDebugging.aspx)
instead). So I downloaded [John’s repl-lib
code](http://github.com/jflam/repl-lib/tree/master) to see how he was
doing it. Turns out his [REPL
control](http://github.com/jflam/repl-lib/blob/5b597ab4b92a6d85f3e7f22d3ae9af271444b1d4/Core/Repl.xaml)
is essentially a wrapper around WPF’s [RichTextBox
control](http://msdn.microsoft.com/en-us/library/system.windows.controls.richtextbox.aspx).
It works, but it seems kinda kludgy. For example, the RichTextBox
supports bold, italics and underline hotkeys, so John’s REPL does too.
Though it is possible to [turn off these formatting
commands](http://blogs.msdn.com/prajakta/archive/2006/10/12/customize-richtextbox-to-allow-only-plain-text-input.aspx),
I decided to take a look at modifying how the plain-old TextBox renders.
After all, WPF controls are supposed to be
[lookless](http://www.drwpf.com/blog/Home/tabid/36/EntryID/53/Default.aspx),
right?

Well, apparently not all the WPF controls are lookless. In particular to
this post, the TextBox is definitely NOT lookless. It looks like the
text editing capabilities of TextBox are provided by the
Sys.Win.Documents.TextEditor class while the text rendering is provided
by the Sys.Win.Controls.TextBoxView class. Both of those classes are
internal, so don’t even think about trying to customize or reuse them.

The best (and I use that term loosely) way I found for customizing the
TextBox rendering was a
[couple](http://www.codeproject.com/KB/WPF/CodeBox.aspx) of
[articles](http://www.codeproject.com/KB/WPF/CodeBox2.aspx) on
CodeProject by [Ken
Johnson](http://www.codeproject.com/Members/KenJohnson). Ken’s CodeBox
control inherits from TextBox and sets the Foreground and Background to
transparent (to hide the result of TextBoxView) and then overloads
OnRender to render the text with colorization. Rendering the text twice
– once transparently and once correctly – seems like a better solution
than using the RichTextBox, but it’s still pretty kludgy. (Note, I’m
calling the TextBox design kludgy – Ken’s code is a pretty good work
around).

So if you want a colorized text box in WPF, your choices are:

-   Build your own class that inherits from RichTextBox, disabling all
    the formatting commands and handling the TextChanged event to do
    colorization
-   Build your own class that inherits from TextBox, but set Foreground
    an Background colors to transparent and overload OnRender to do the
    visible text rendering.
-   Use a 3rd party control. The only one I found was the [AqiStar
    TextBox](http://www.aqistar.com). No idea how good it is, but [they
    claim](http://www.aqistar.com/FeaturesVisualization.aspx) to be a
    true lookless control. Any other syntax highlighting WPF controls
    around that I don’t know about?

