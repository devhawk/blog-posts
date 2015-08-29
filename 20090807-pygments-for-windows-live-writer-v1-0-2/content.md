I just uploaded a new version of my [Pygments for WL Writer
plugin](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Pygments%20for%20WL%20Writer/Pygments.WLWriter.msi)
to my skydrive. Nothing major here – some minor UI cleanup + an upgrade
to [IronPython 2.6 beta
2](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=27350).
Installing over the old version worked on my machine, but that’s as far
as my testing has gone. I also pushed the [latest
source](http://github.com/devhawk/pygments.wlwriter/tree/v1.0.2) out to
GitHub. 

I’m still waiting on a fix for what
[Dino](http://blogs.msdn.com/dinoviehland/default.aspx) has taken to
calling “Harry’s Pygments Import Bug” – which actually turned out to be
*three* importer bugs. The Pygments lexers package is customized so as
to abstract away the specific modules the individual lexers are defined
in. I don’t use that functionality – I’m using
[get\_all\_lexers](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/pygments/lexers/__init__.py#L41)
and
[get\_lexer\_by\_name](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/pygments/lexers/__init__.py#L69)
instead – but the bugs caused importing the package to fail so in the
mean time I commented out the [lines that don’t work under
IronPython](http://github.com/devhawk/pygments.wlwriter/blob/5684d8e936921e9f79ab3e3f08bd1570e48a8a51/pygments_package/pygments/lexers/__init__.py#L202).
I think Dino’s got the fixes for this checked in, but I probably won’t
update Pygments for WL Writer again until IronPython 2.6 RC.
