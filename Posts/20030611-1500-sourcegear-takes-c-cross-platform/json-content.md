> [SourceGear is]
> [announcing](http://www.ximian.com/about_us/press_center/press_releases/index.html?pr=sourcegear)
> a deal with [Ximian](http://www.ximian.com/) today. We need Unix
> clients for [SourceGear Vault](http://www.sourcegear.com/vault/), but
> alas, C\# has no real cross-platform story. So we’ve agreed to give
> Ximian a bag of money and they’ve agreed to hack
> [Mono](http://www.go-mono.com/) and make it speak .NET XML Web
> Services to ASP.NET. Vault users will be able to run our command-line
> client on Linux, speaking to the Vault server, which will continue to
> be Windows-only.
>
> (Note that we are punting the cross-platform GUI issues for now. The
> Vault GUI client uses Windows Forms. We’ll tackle non-Windows GUI
> clients after we get the basic stuff working well.)
>
> It’s easy to feel good about this kind of deal, and not just because
> it’s an honor to work with Miguel de Icaza. Everybody gets something.
> Vault users get more flexibility. Ximian gets revenue. All Mono users
> get interop with .NET XML Web Services. The world is a [slightly]
> better place.
>
> [[Eric.Weblog()](http://software.ericsink.com/20030611.html#10102)]

Very interesting. Initial thoughts:

-   Miguel de Icaza does, in fact, rock. But I’ve [said that
    before](http://devhawk.net/2003/01/30/dinner-weblogs-code/).
-   Apparently, C\# does have a cross platform story. C\# and CLI is an
    [open standard](http://msdn.microsoft.com/net/ecma/). Hopefully,
    Mono’s success will spur others into building production
    implementations of C\# and CLI on still further platforms.
-   I’m very surprised that Mono didn’t already have XML web service
    interop support. It’s true that Web Services support is not part of
    the ECMA/ISO standard. But then again, neither is ASP.NET, ADO.NET
    or VB and Mono has implementations of those.
-   They aren’t “.NET XML Web Services”, they’re just XML Web Services.
    There are
    [standards](http://www.ws-i.org/Profiles/Basic/2003-05/BasicProfile-1.0-WGAD.htm)
    ([in](http://www.w3.org/TR/wsdl12/)[progress](http://www.w3.org/TR/soap12-part0/))
    for this as well.
-   Since Web Services are a supported on many platforms, SourceGear
    could have built a Unix/Linux specific version of their command-line
    tool in any language, especially Java which has several [Web
    Service](http://www.themindelectric.com/glue/index.html)[implementations](http://ws.apache.org/axis/)[available](http://java.sun.com/xml/downloads/javaxmlpack.html).
    But for SourceGear, it appears that staying with C\# and CLI was
    very important. Eric is already [on
    record](http://software.ericsink.com/Abstraction_Pile.html) saying
    that his company “made a great choice when we decided to build Vault
    using .NET.” I don’t know how much “a bag of money” is, but I think
    it’s telling they were willing to pay Ximian to add features to
    their CLI implementation rather than to rewrite the command-line
    client in Java and use freely available web service tools.
-   I wonder how they will eventually address cross-platform GUI issue.
    Will they use Mono’s Win32/Wine emulator library or will they
    rewrite with GTK\#?

**UPDATE:** It was pointed out to me that the term used in the ECMA/ISO
spec is CLI, common language infrastructure, not CLR, common language
runtime. I’ve updated this post accordingly. Also, this post disappeared
for some period of time. Not sure why. But it’s back now.
