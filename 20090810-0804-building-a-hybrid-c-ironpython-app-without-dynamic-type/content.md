Arguably, the biggest feature of C\# 4.0 is the new [dynamic
type](http://msdn.microsoft.com/en-us/library/dd264736(VS.100).aspx).
And it’ll be great…when it ships. In the meantime, some of us what to
build hybrid C\# and IronPython applications today, such as my [Pygments
for Windows Live Writer
plugin](http://devhawk.net/2009/08/07/pygments-for-windows-live-writer-v1-0-2/).

::: image-right
![pygments\_logo](http://hawkblogstorage.blob.core.windows.net/blog-content/20090810-0804-building-a-hybrid-c-ironpython-app-without-dynamic-type/pygments_logo.png "pygments_logo")
:::

[Pygments](http://pygments.org/) is a syntax highlighter, written in
Python, with support for [over one hundred
languages](http://pygments.org/languages/). With the exception of a
couple of bugs in our importer ([discussed
here](http://devhawk.net/2009/08/07/pygments-for-windows-live-writer-v1-0-2/))
it works great with IronPython. It’s also extensible, so I was able to
easily build a custom formatter to output exactly the HTML I want
inserted in my blog posts. So it made perfect sense to use Pygments as
the basis of a Windows Live Writer plugin.

::: image-left
[![](http://hawkblogstorage.blob.core.windows.net/blog-content/20090810-0804-building-a-hybrid-c-ironpython-app-without-dynamic-type/WLW_pygments_layers_thumb.png)](http://hawkblogstorage.blob.core.windows.net/blog-content/20090810-0804-building-a-hybrid-c-ironpython-app-without-dynamic-type/WLW_pygments_layers.png)
:::

As great a tool as Windows Live Writer is, it’s developers haven’t
exactly seen the light when it comes to dynamic languages. If you want
to [create a custom Content
Source](http://msdn.microsoft.com/en-us/library/aa702851.aspx) for
Windows Live Writer, you have to generate a compiled on-disk assembly
with a static type and custom attributes. Not exactly IronPython’s
forte, if you know what I mean. I did try and build a pure IronPython
solution, but eventually gave up. So I ended up building a hybrid
solution. The front end of the plugin as well as the UI elements are
written in C\# while the syntax highlighter engine is written in
IronPython. And since this is running on the current .NET framework, I
didn’t have the new fangled C\# 4.0 dynamic type to help me.

Over the next couple of blog posts, I want to highlight a few aspects
how I built this plugin, including compiling Python packages into
assemblies and invoking Python code from C\# 3.0 and earlier. If you
want to look for your self, [the
source](http://github.com/devhawk/pygments.wlwriter/tree/master) is up
on GitHub.
