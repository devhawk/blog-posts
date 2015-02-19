Wikipedia has two definitions of
[mashup](http://en.wikipedia.org/wiki/Mashup):

-   [Mashup (music)](http://en.wikipedia.org/wiki/Mashup_(music)): a
    musical genre consisting of the combination of the parts of more
    than one song
-   [Mashup (web application
    hybrid)](http://en.wikipedia.org/wiki/Mashup_(web_application_hybrid)):
    a website or web application that combines content from more than
    one source

I was originally introduced to the term mashup in the musical sense by
[Daily Source Code](http://www.dailysourcecode.com/). In this usage,
mashup implies mixing songs together. Given that songs are typically
stand along entities designed to be enjoyed as is, mashup means (to me
anyway) combining stuff *that was never meant to be combined in the
first place*. Even Wikipedia includes musical mashup under the general
heading of [Bastard Pop](http://en.wikipedia.org/wiki/BastardPop).

So given that, by definition, mashups combine stuff that wasn’t designed
to be combined, I don’t understand why an application like
[Zvents](http://www.zvents.com/) or [Virtual
Places](http://apps.nikhilk.net/VirtualPlaces) is considered a mashup.
Apps like these use browser based components
([Scoble](http://scobleizer.wordpress.com/) calls them [Internet
Connected
Components](http://scobleizer.wordpress.com/2005/11/07/what-do-you-call-things-like-flickr-microsoft-gadgets-google-maps-amazon-affiliate-parts/))
that are well defined, have public APIs and are designed to be used
together. Not exactly “bastard pop” now is it?

In reality, a site like Zvents could have used a server side mapping
component and provided a similar experience. Of course, a client side
mapping solution is both sexier and more practical (no need for
dedicated map data files or assemblies on your own machines) but
semantically they provide the same information. Same thing goes for
Virtual Places, except that Virtual Places is also pulling both
functionality (i.e. the mapping component) as well as data (i.e. blogs
and photos) from other sites across the Internet. Could that be done on
the server side? You betcha. Would it be as cool or functional? No. Does
that make it a completely different type of application that deserves a
new name. IMO, no. These are component based apps – they just use the
browser as the platform and the components are coming across the web (as
you would expect when you use the browser as a platform).

The higher order bit for me is who controls the experience. For apps
like Zvents and VirtualPlaces, it’s the application developer. For
something like [Live.com](http://live.com/), it’s me. I decide what to
put on my Live page. Not that one is more important than the other or
that they aren’t compatible experiences – I could easily imagine a
Zvents [gadget](http://microsoftgadgets.com/) that lived in Live.com. Or
consuming the RSS feed from Zvents in Live.com. Or a generic iCal gadget
that could consume a Zvents iCal feed. But the point is that there are
large differences between browser component based application like
Zvents and a user managed composite browser application like Live.com.

To me, composite apps like Live.com fit better to the original
definition of mashup than something like Zvents or Virtual Places. They
both have their place and their value, but I like to call things that
are different by different names in order to reduce confusion.

Of course, composite apps aren’t limited to the browser.
[p&p](http://msdn.microsoft.com/practices/) just shipped their
[Composite UI Application
Block](http://www.gotdotnet.com/codegallery/codegallery.aspx?id=22f72167-af95-44ce-a6ca-f2eafbf2653c)
last week. I dug into it a bit last week and it’s awesome. More on that
later.
