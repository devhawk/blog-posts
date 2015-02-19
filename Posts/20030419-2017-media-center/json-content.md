As was reported on [Sells
Bros.](http://www.sellsbrothers.com/news/showTopic.aspx?ixTopic=477),
[Windows XP Media Center
Edition](http://www.microsoft.com/windowsxp/mediacenter/) (MCE) is
available to MSDN Universal subscribers for download. I had an older PC
lying around, so I thought I’d give it a whirl. So far, pretty cool.
But, of course, it doesn’t matter if you can’t write code for it.
![:)](http://devhawk.net/wp-includes/images/smilies/icon_smile.gif)
Luckily, I found the [Media Center Extensibility
Guide](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnwmt/html/extensibility_guide.asp)
as well as information about [programming the remote
control](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnwmt/html/remote_control.asp).
According to the remote control article, any XP Pro machine should
support the remote control. So even if you don’t have MCE, you can still
buy the remote control and use it (I got mine from
[NewEgg.com](http://www.newegg.com/app/viewproduct.asp?description=80-100-201)).
Only bummer – remote control messages are mapped to a variety of windows
messages – WM\_INPUT, WM\_APPCOMMAND, WM\_KEYDOWN, etc. No convenient
CLR Windows Forms mapping, even though
[MCE](http://msdn.microsoft.com/netframework/productinfo/overview/default.asp#section3)[ships](http://msdn.microsoft.com/chats/vstudio/vstudio_121802.asp)
with the .NET Framework.

Update – the remote control does, in fact, work with XP Pro. Tried it
out w/ WMP to mute, change volume, move to next track, etc.
