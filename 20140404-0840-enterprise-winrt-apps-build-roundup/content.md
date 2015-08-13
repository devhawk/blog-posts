Wow, it’s been a whirlwind couple of days down here in San Francisco @
[Build 2014](http://www.buildwindows.com/). It has certainly been a huge
thrill for me, getting a chance to be a part of the day one keynote and
[getting 15 minutes of
fame](http://devhawk.net/2014/04/02/blood-sweat-code/). However, as the
conference winds down I wanted to pull together a summary of the stuff
Microsoft announced that relates to enterprise app development and
Windows 8.1 Update. I mean, it wasn’t all about my wardrobe choices…

The Windows for Business blog as a [good summary
post](http://blogs.windows.com/windows/b/business/archive/2014/04/02/building-the-mobile-workplace-with-windows-and-windows-phone.aspx)
that hits the highlights. The stuff I wanted to specifically call out
is:

-   We’ve changed the policy to allow side loaded apps to communicate
    with desktop apps. Literally every single enterprise customer,
    Microsoft dev consultant and enterprise technical sales rep I’ve
    spoken to in the last year has asked for this.
-   We’ve added a feature in Windows 8.1 Update to enable side loaded
    apps to run code outside of the App Container. This opens up side
    loaded apps to access the full power of Windows as well as all the
    existing code the enterprise may have in its portfolio
-   We’ve made it significantly easier to get side load rights. I’d go
    thru the specifics here, but Rocky Lhotka (who has been *very*
    vocal about the issues in this space) had a [great
    summary](http://www.lhotka.net/weblog/Windows8SideLoadingImprovements.aspx):
    “For a maximum of around \$100 virtually every organization (small
    to huge) can get a side loading unlock key for all their devices.”

If you want more information on how to take advantage of these new
features for side loaded apps, here are some resources for you:

-   In addition to my 5 minutes in the keynote, I did a [whole
    session](http://channel9.msdn.com/Events/Build/2014/2-515) where I
    drilled into more details on that demo. I also demos that used
    network loopback for interprocess communication.
-   John Vintzel and Cliff Strom had a session on [deploying enterprise
    apps](http://channel9.msdn.com/Events/Build/2014/2-524). As of this
    writing, the video isn’t online yet but it will be within a day or
    two at that URL.
-   We have published whitepapers on both [Brokered WinRT
    Components](http://msdn.microsoft.com/en-us/library/windows/apps/dn630195.aspx)
    and [using network loopback in WinRT
    apps](http://msdn.microsoft.com/en-us/library/windows/apps/dn640582.aspx) that
    go into more details on how to build solutions with this technology
-   Last but not least, we have a set of [samples of sideloaded WinRT
    apps](http://code.msdn.microsoft.com/site/search?f%5B0%5D.Type=Topic&f%5B0%5D.Value=Sideloading&f%5B0%5D.Text=Sideloading).
    This includes the keynote demo, another brokered component demo and
    the WCF & ASP.NET network loopback demos I did in my session. Note,
    the [keynote demo
    sample](http://code.msdn.microsoft.com/Northwind-Brokered-WinRTC-5143a67c)
    is packaged oddly because of the way MSDN’s sample repo handles (or
    in this case doesn’t handle) VS solutions with multiple projects.
    When I get back to Redmond, I’m  going to see if there’s a better
    way to get this sample hosted.

I heard many times over the past two days from folks in person at the
conference and via email, twitter, facebook, carrier pigeon, etc just
how excited they are about these changes & features. As an engineer who
spends most of his days in his office and or in meetings building this
stuff, it is amazingly gratifying to hear directly from our users how
much our work can help them.
