I just replaced the original v1.0.0 Pygments for WL Writer installer
with a new and improved v1.0.1. The [original
URL](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/Pygments%20for%20WL%20Writer/Pygments.WLWriter.msi)
still works – I archived the old version off with a new name. [Updated
source](http://github.com/devhawk/pygments.wlwriter/tree/v1.0.1) is
available on on GitHub.

The only change is that I now override
[OnSelectedContentChanged](http://msdn.microsoft.com/en-us/library/aa738912.aspx)
in the sidebar control. That way, if I have multiple blocks of pygmented
code in a given post, the sidebar UI updates with the correct language
and color scheme of the currently selected code block.
