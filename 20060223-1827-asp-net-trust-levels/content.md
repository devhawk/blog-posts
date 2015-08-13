For reasons to be named later, I’m experimenting with the various trust
levels of ASP.NET. While “most things” work fine when you ratchet down
the security, if finding that the things that break aren’t well
documented. For example, at anything other than Full Trust you can’t use
the Response.OutputStream.Write() method to write binary information to
the response buffer. So that means that using [ASHX Handlers for
images](http://devhawk.net/art_imagehandler.aspx) doesn’t work. That
means that, among others, the [Personal Web Site starter
kit](http://msdn.microsoft.com/vstudio/express/vwd/starterkit/#personal)
breaks on any photo related features.

Also, does anyone know what happened to
[permview](http://msdn2.microsoft.com/en-us/library/06251f13.aspx) in
.NET 2.0?
