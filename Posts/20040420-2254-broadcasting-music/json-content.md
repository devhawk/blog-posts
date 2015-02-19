The first thing I need for my DJ idea is to be able to broadcast
content. This means a variety of things, but first and foremost is
music. The  RIAA provides [special webcasting
licenses](http://www.riaa.com/issues/music/webcasting.asp) as long as
the webcaster meets [specific
criteria](http://www.riaa.com/issues/licensing/webcasting_faq.asp#conditions).
(I’m guessing I’ll have to talk to our legal dept. before I actually
broadcast any music). The criteria is pretty acceptable – I could easily
build a bot that streams music 24/7 from my own ripped CD collection in
accordance with the RIAA’s criteria.

Of course, all that ripped music is on my personal home machine and I
have no interest in copying it all up to my media server. What I really
want to do is broadcast from my home machine to the server, which in
turn broadcasts to potential listeners. From what I understand, I need
to use the [Windows Media
Encoder](http://www.microsoft.com/windows/windowsmedia/9series/encoder/default.aspx)
(or an app built with the [WMEncoder
SDK](http://msdn.microsoft.com/library/en-us/wmencode/htm/windowsmediaencoderautomation.asp))
to [push media to the
server](http://www.microsoft.com/resources/documentation/WindowsServ/2003/standard/proddocs/en-us/wmserver/sourcingfromanencoder.asp)
for rebroadcast. No problem – building a bot to do that should be no big
deal. Except that it is a big deal.

WMEncoder can only work with [two sources of
media](http://msdn.microsoft.com/library/en-us/wmencode/htm/workingwithsourcesandsourcegroups.asp)
(not including screen captures, HTML and script which are not applicable
to this post) files and devices. Since I’m mixing together the contents
of multiple files, I can’t use a single file as a source. Which means a
device. The problem lies in the fact that audio apps are designed to
write to audio rendering devices (like the sound card) not to audio
capture devices. What I need is a audio “loopback” device that takes the
audio sent to the virtual audio rendering device and sends it directly
to the virtual audio capture device. Thus, the output of the bot is fed
as input into the encoder. So far, I’ve found [Virtual Audio
Cable](http://www.ntonyx.com/vac.htm) from NTONYX that looks like it
will do the trick (I actually dug out the [windows driver
book](http://www.microsoft.com/MSPress/books/6262.asp) and entertained
very brief thoughts of building my own, but in the end, I’d rather just
spend the \$50 for VAC).

I’m not sure if I’m going to use
[DirectSound](http://msdn.microsoft.com/library/en-us/directx9_m/directx/ref/microsoft.directx.directsound.asp)
or
[DirectShow](http://msdn.microsoft.com/library/en-us/directx9_c/directX/htm/directshow.asp)
to build my broadcast bot. I’m leaning towards DirectShow since it seems
more suited to this sort of problem (even though it is the only piece of
DirectX w/o a managed wrapper). I just wish there was a Windows Media
Broadcast [rendering
filter](http://msdn.microsoft.com/library/en-us/directx9_c/directX/htm/aboutdirectshowfilters.asp)
that didn’t require the use of VAC or the encoder.

Anyone out there have any experience with DirectShow?
