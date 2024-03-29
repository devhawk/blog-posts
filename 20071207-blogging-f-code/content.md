I’m going to start posting about my F\# parsing code soon. Obviously,
I’ll make the code directly available, but I’m also going to be writing
about it quite a bit. Since I’ll be posting lots of F\# code snippets, I
took the time to build an F\# language syntax definition for
[CodeHTMLer](http://puzzleware.net/CodeHtmler/default.aspx). Of all the
[various WL Writer Insert Code
plug-ins](http://gallery.live.com/results.aspx?bt=9&q=insert%20code),
CodeHTMLer is my favorite because it can be configured not to use
\<pre\> tags, which many RSS readers handle poorly (in my experience).

In case anyone else wants it, I’ve stuck the CodeHTMLer F\# language
definition up on [my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/F%7C3%20CodeHTMLer%20Language%20Definition.xml).
If you using the [CodeHTMLer WL Writer
Plug-in](http://puzzleware.net/download.aspx?file=/codehtmler/codehtmler.livewriterplugin.zip),
you can easily add this to your machine. Once you’ve installed
CodeHTMLer and run it once, go to the command line and type ``cd
%appdata%WindowsLiveWriter`` and you’ll find the LanguageDefinitions.xml
file. Edit that file to insert the add the contents of [my F\# language
definition](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/F%7C3%20CodeHTMLer%20Language%20Definition.xml)
after the ``<CodeLanguages>`` tag and you’re all set.

BTW, the first language in the file will be the default language in the
plug-in, so if you’re an occasional F\# user, you might want to add the
F\# definition to the end rather than the beginning of the file. If you
don’t want to further edit the XML file manually, you can select “Edit
Languages” in the plug-in and edit the order of the languages to your
heart’s content.
