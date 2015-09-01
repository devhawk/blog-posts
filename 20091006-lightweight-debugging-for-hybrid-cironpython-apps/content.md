::: image-right
[![](http://image.devhawk.net/blog-content/20091006-lightweight-debugging-for-hybrid-cironpython-apps/designallCAZM93SM_3.jpg)](http://www.zazzle.com/you_had_me_at_dynamic_shirt-235421109922997983)
:::

One of the IronPython scenarios that I’m hearing more and more about
recently is for
[polyglot](http://en.wikipedia.org/wiki/Polyglot_%28computing%29)
programs. In these scenarios, part of the application is built in
IronPython other parts are build in compiled, statically typed languages
like C\# or Visual Basic. Sometimes, programs are written this way to
allow the C\# app to access a Python library, like my [Pygments for WL
Writer](http://devhawk.net/2009/04/05/pygments-for-windows-live-writer/)
plugin. Other programs want to be customizable by the end user, like
[Intellipad](http://blogs.msdn.com/intellipad/archive/2008/11/11/newbie-experience-writing-a-custom-command.aspx).
Whatever the reason, I think that the number of these hybrid polyglot
programs is going up, which partially explains why the C\# team added
the [new dynamic
type](http://msdn.microsoft.com/en-us/library/dd264741(VS.100).aspx) to
C\# 4.0.

(FYI: the [You had me at
“dynamic”](http://www.zazzle.com/you_had_me_at_dynamic_shirt-235421109922997983)
shirt above is available for sale in my Zazzle store along with my
[Architecture Help
5¢](http://www.zazzle.com/architecture_help_dark_t_shirt-235848130425737882)
shirt)

The thing is that if you’re going to build polyglot apps, you’re
probably going to want the ability to debug polyglot apps as well. I’ve
[written
extensively](http://devhawk.net/2009/02/27/writing-an-ironpython-debugger-introduction/)
about building a debugger for IronPython. However,
[ipydbg](http://github.com/devhawk/ipydbg/) uses the CLR debugger under
the hood which means you have to have the debugger and the code it’s
debugging in separate processes. That’s a huge design burden for
building a debuggable polyglot application. Luckily, as of IronPython
2.6, we support Python’s built-in trace debugging capability (aka
[sys.settrace](http://docs.python.org/library/sys.html#sys.settrace)).
While you can use this in pure Python apps (like
[PDB](http://docs.python.org/library/pdb.html)), you can also use it
polyglot C\# (or VB)/IronPython apps as well. If only someone were to
take the time to build a sample and document what he did along the way…

Hey, that sounds like PM work!

Seriously, let me introduce you to the worlds simplest Twitter
application: GetThings. The app downloads a list of my tweets via the
Twitter API and displays them in a list box. The UI is written in C\#
while the tweet download code is written in Python. Clearly, this is a
pretty brain dead app – but the point isn’t to build a great Twitter app
but rather to show how to use the settrace API from C\#.

I’ve stuck the [code up on
GitHub](http://github.com/devhawk/LightweightDebuggerDemo). If you want
to see the basic app in action sans debugging, start with the [initial
checkin](http://github.com/devhawk/LightweightDebuggerDemo/commit/92bd5fc330e2a48ae84fc185f3e397aefb4be1eb).
As you can see here, basic C\# / IronPython integration is pretty
trivial. I’m simply creating an engine and a scope, adding the list
boxes’ Items property to the scope, and executing the getthings.py file
from the disk.

``` csharp
private void Window_Loaded(object sender, RoutedEventArgs e)
{
    ScriptEngine engine = Python.CreateEngine();
    ScriptScope  scope = engine.CreateScope();
    scope.SetVariable("items", lbThings.Items);
    engine.ExecuteFile("getthings.py", scope);
}
```

Since GetThings.py is just a text file, the user can modify it to get a
list of anything they want – some other user’s timeline, the public
timeline, or even – gasp! – something not from Twitter! In fact, as you
see below, I’ve actually modified it to pull the tweets from a file on
disk so I can avoid hitting the network on every run.

``` python
import clr
clr.AddReference("System.Xml")
from System.Xml import XmlDocument

def get_nodes(xml):
    return xml.SelectNodes("statuses/status/text")

def download_stuff():
    x = XmlDocument()

    #load from disk to save time in development
    #x.Load("http://twitter.com/statuses/user_timeline/devhawk.xml")
    x.Load("devhawk.xml")

    for n in get_nodes(x):
        txt = n.InnerText
        items.Add(txt)

download_stuff()
```

OK, so that’s the basics of the world’s simplest hybrid C\#/IronPython
Twitter application. Next up, I’ll add the settrace basics.
