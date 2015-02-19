A few weeks ago, I [put out the call for
advice](http://devhawk.net/2007/06/23/Home+Networking+Question.aspx) on
improving my home network. I got a bunch of responses, both for and
against PowerLine. I ended up upgrading my wireless network because 1) I
was having laptop connectivity issues and 2) wireless equipment is so
fraking cheap. I might still go PowerLine later, though I’m thinking
it’s “good enough” until I really bite the bullet and run Cat5 under my
house.  

Yesterday, I picked up a couple of Buffalo Wireless routers: a
[WHR-HP-G54](http://www.buffalotech.com/products/wireless/wireless-g-mimo-performance/wireless-g-mimo-performance-broadband-router-and-access-point-with-high-gain-antenna)
and a
[WHR-G125](http://www.buffalotech.com/products/wireless/wireless-g-125-high-speed/wireless-g-high-speed-router/).
The first one has a high-powered antenna, so I hoped that would solve my
range problem. Both support [Wireless Distribution
System](http://en.wikipedia.org/wiki/Wireless_Distribution_System) (aka
WDS), so the plan was to use the WHR-G125 as a repeater and/or bridge.
Also, both support 3rd party firmware, a la
[DD-WRT](http://www.dd-wrt.com) and [OpenWrt](http://openwrt.org/). In
fact, I chose these models specifically because they’re listed on
DD-WRT’s [Supported Devices
page](http://www.dd-wrt.com/wiki/index.php/Supported_Devices) as best
range and cheapest, respectively. Best Buy had them both on sale, so
together they cost around \$90 and I didn’t even have to wait for them
to be shipped.

I also moved my cable modem from the loft to the living room. That way,
the Xbox 360 – with all the large demo and video downloads – gets the
best bandwidth, typically around 8Mbit (though SpeedTest.net has clocked
my connection as high as 18Mbit).

Moving the cable modem meant putting my loft desktop machine on the
wireless network. At first, I used the G125 as a bridge. Getting it
setup as a bridge using WDS was fairly straightforward, except that
these routers only support
[WEP](http://en.wikipedia.org/wiki/Wired_Equivalent_Privacy) in that
configuration and WEP [is essentially
broken](http://en.wikipedia.org/wiki/RC4_%28cipher%29#Fluhrer.2C_Mantin_and_Shamir_attack).

At this point, I figured I had to either live with WEP (\*BUZZ\* wrong
answer) or upgrade both routers with [DD-WRT
firmware](http://www.dd-wrt.com). According to [their
wiki](http://www.dd-wrt.com/wiki/index.php/WDS), DD-WRT firmware
supports [WPA](http://en.wikipedia.org/wiki/Wi-Fi_Protected_Access) for
WDS. Then I remembered a third option,
[detailed](http://www.hanselman.com/blog/FlashingTheFirmwareOfAnXboxMN740WirelessAdapterToADLink108AGToSupportWPASecurity.aspx)
by Scott Hanselman a few weeks back. I had been using an [Xbox MN-740
wireless bridge](http://www.xbox.com/en-US/live/connect/msmn740.htm) to
get my Xbox 360 on the wireless network. However, since my Xbox is
hardwired now, I didn’t need it anymore. Scott’s posted about [flashing
the MN-740](http://www.dslreports.com/forum/remark,13360873) with the
firmware from the [D-Link 108AG gaming
adapter](http://games.dlink.com/products/?pid=383) (they’re the same
hardware under the hood) that supports WPA. It took several tries before
it worked, but eventually I was able to flash the device.

So now I am using the WHR-HP-G54 as my main router and access point in
the living room and the flashed MN-740 to put my loft desktop machine on
the wireless WPA-secured network. That desktop has all my media and is
running [Vista
Ultimate](http://www.microsoft.com/windows/products/windowsvista/editions/ultimate/default.mspx),
so I was able to get both [media
sharing](http://www.xbox.com/media/xbox360media.htm) and the [Media
Center
Extender](http://www.xbox.com/hardware/windowsmediacenter.htm) working.
According to the network diagnostics on Vista, the connection is fast
enough to stream SD video, but not HD. So I figure I’ll still need to
run some Cat5. But for now, I’m not trying to stream HD video from the
machine in the loft so I figure I can wait on the Cat5.

Plus, I have the G125 to experiment with. For \$35, it was cheap enough
that I can upgrade it with the [latest DD-WRT
firmware](http://www.dd-wrt.com/dd-wrtv2/down.php?path=downloads%2Fbeta%2FBUFFALO+WHR-G125/)
without worrying about losing my “investment” if I brick the thing. If I
get it upgraded and working, I’ll do the HP-G54 too, and be able to use
the G125 as a repeater and/or bridge. Maybe that will make the network
fast enough to stream HD video, but I doubt it.

Thanks to those who offered me their advice. Any of you want to come
over and help run a little Cat5 under my house, beer & BBQ is on me!
