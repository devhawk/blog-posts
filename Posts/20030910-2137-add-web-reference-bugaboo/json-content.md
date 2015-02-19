While VS.NET’s whole “Add Web Reference” concept is cool, it utterly
falls down in the face of multiple services exposed by the same back
end. WSS exposes a [multitude of web
services](http://msdn.microsoft.com/library/en-us/spptsdk/html/soapnsMicrosoftSharePointSoapServer2.asp).
But VS.NET doesn’t have any way to specify that multiple web services
should all be in the same namespace. So you end up each service in it’s
own namespace like server1, server2, etc.

Luckily, WSDL.exe doesn’t have this problem. And VS.NET 2003 support
custom build steps so it’s pretty easy to execute WSDL.exe as part of a
standard build. So it’s only a minor annoyance.

I wonder if you could build your own custom Add Web Reference system via
[VSIP](http://www.vsipdev.com)? Probably not worth the trouble. But it
does make me curious – is anyone looking at using VSIP on their
shareware/freeware tool to integrate it more tightly into the VS.NET
shell? I see [Scott Hanselman](http://radio.weblogs.com/0106747/) has a
[great list of
potentials](http://radio.weblogs.com/0106747/stories/2003/09/09/scottHanselmansUltimateDeveloperAndPowerUsersToolsList.html).
(He even included my [SccSwitch utility](art_sccswitch.aspx) – I’m
honored!)
