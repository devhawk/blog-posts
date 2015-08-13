Two weeks ago, I posted a
[roadmap](http://devhawk.net/2008/07/16/ironpython-post-2-0-roadmap/)
for where IPy is heading after we get 2.0 out the door later this year.
I got two questions in [the
comments](http://devhawk.net/CommentView,guid,663bc86a-8185-4c5b-8a5b-c01634a1b1bc.aspx#commentstart)
that I wanted to address.

-   [Michael Foord](http://www.ironpythoninaction.com) wants to know
    “will you actively maintain IronPython 2 and IronPython 3 in
    parallel?”
-   [francois](http://francois.schnell.free.fr) wants to know for the VS
    integration “Will it be necessary to buy VS standard/Pro to benefit
    from it?”

As to the first question, Curt Hagenlocher (aka [Iron
Curt](http://blogs.msdn.com/curth/)) from the IPy dev team [wrote the
following](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-July/007728.html)
on the IPy mailing list:

> “I think it’s fair to say that this will be driven mostly by the needs
> of our community and of the larger Python community. By the time
> IronPython 3.0 ships, it’s likely that CPython 3.0 will have been out
> for a year or even longer, and we’ll have a much better idea of what
> the uptake is like in the community.”

Let me second Curt’s comment. I used to think getting to 3.0 as quickly
as possible was one of our highest priorities. However, it looks like
the CPy 3.0 uptake rate is a real open question right now. If the Python
community takes 3-4 years to fully embrace 3.0 (as [Michael
suggested](http://lists.ironpython.com/pipermail/users-ironpython.com/2008-July/007729.html))
then I don’t see how we will have any choice but to maintain both in
parallel. It also suggests that better 2.6 support may be more important
than 3.0 support, at least for the next 18-24 months.

Francois’s question is much easier: No, we will not require you to buy
any version of VS in order to get IPy VS integration. It will work with
the [Visual Studio
Shell](http://msdn.microsoft.com/en-us/vstudio/bb510103.aspx), much like
the current IronPythonStudio VSX sample does today.

For out first release, we are focusing on the integrated mode scenario.
This means that if you own a copy of VS (other than express), the IPy
tools will snap into your existing VS installation. If you don’t own a
copy of VS, you’ll be able to download and install the integrated shell
for free and our IPy tools will snap into that. Down the road, we might
investigate an “IronPython Express” version that leverages the isolated
shell, but that’s not a priority right now.

The VS shell [includes
support](http://msdn.microsoft.com/en-us/vstudio/bb856491.aspx) for the
WinForms and WPF designers and we expect to support both eventually. WPF
support is fairly straightforward since the designer works with XAML
files rather than code files. WinForms support is harder, since it wants
to emit statically typed code into code files – a neat trick for a
dynamically typed language like Python. The current implementation that
the IronPythonStudio sample uses requires us to inject a bunch of custom
type hints disguised as python @decorators in order to round trip
between the designer and code views. However, we’re not bringing those
custom type hints forward in the 2.0 release so we’ll need to find a
better way to integrate with the WinForms designer.

As for web apps, ASP.NET support is currently on the back burner while
Jimmy and David [drink coffee and expensive
juice](http://blog.jimmy.schementi.com/2008/07/aspnet-and-dynamic-languages.html)
while they figure out the ASP.NET / dynamic language story. We also want
to support Silverlight development for IronPython in VS, but I’m exactly
sure how we get Silverlight designer support yet. [Silverlight Tools for
VS08](http://go.microsoft.com/fwlink/?LinkId=120319) today require VS
Standard, so I’m guessing there’s some leg work to do if we want to
support the SL designer in VS Shell.

As always, feel free to ask here or on [the mailing
list](http://lists.ironpython.com/listinfo.cgi/users-ironpython.com) if
you’ve got any questions or feedback on our plans.
