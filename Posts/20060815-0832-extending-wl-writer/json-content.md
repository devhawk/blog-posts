So I downloaded [the
SDK](http://download.microsoft.com/download/f/9/a/f9a19f2d-cec4-4a25-9b0b-eb9655ea7561/Windows%20Live%20Writer%20SDK%20(Beta).msi)
for [WL
Writer](http://download.microsoft.com/download/f/9/a/f9a19f2d-cec4-4a25-9b0b-eb9655ea7561/Writer.msi)
and took a quick look. Basically, there’s two types of extensions you
can build:

-   App Launcher – so you can add a “Blog It” button to some other app
    to remotely launch WL Writer. I assume this is how the WL Toolbar
    intergration works.
-   Content Source – so you can add some type of custom content to a
    post. Typical examples would be
    [Technorati](http://www.technorati.com/) tags or [Currently
    Listening
    To](http://www.microsoft.com/windowsxp/downloads/powertoys/wm_create.mspx)
    info.

Given that they are trying to support “every blogging service out
there”, I’m surprised there’s not a way to build a plugable blogging
service. WL Writer only allows you to customize the content of the post
via plugins. Customizing the metadata (i.e. categories) is right out. I
realize it’s the hip thing to put Technorati tags right in your post
content, but Technorati also picks up category information which dasBlog
already has great support for. What I’d *really* like is something that
acts like del.icio.us’ new post form, where you can free type in your
categories, it highlights words as you type and it shows you a list of
all your tags so you can click on them.

One other minor note – WL Writer does a good job for inserting
hyperlinks. When you select a word, often the whitespace that follows it
is also selected. Some HTML editors will insert the hyperlink over the
whole selection – inlcuding the whitespace which makes no sense. WL
Writer gets it right and excludes any trailing whitespace from the
hyperlink. Cool!
