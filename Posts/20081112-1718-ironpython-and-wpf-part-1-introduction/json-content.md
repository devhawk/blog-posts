I decided to start my IronPython and “[veritable universe of cool
technologies](http://devhawk.net/2008/11/12/ironpython-and-insert-msft-technology-here/)”
examples with WPF. I figured that since we already have Silverlight
support, there might be some overlap (there was). Futhermore, after
seeing [BabySmash on
Surface](http://www.hanselman.com/blog/PDC2008BabySmashPreparations.aspx)
I’m jonesing to build a
[Surface](http://www.microsoft.com/surface/index.html) app of my own.
Getting vanilla WPF working with IPy seems like a smart step before
trying to build a Surface WPF app with IPy.

WPF is all about cool graphics, so I decided to build a photo viewing
app. Kinda boring, I know. But it turns out my wife has posted [hundreds
of photos](http://techiewife.spaces.live.com/photos/) to her [WL
Space](http://techiewife.spaces.live.com/), and WL Spaces provides
convenient RSS feeds of both [photo
albums](http://techiewife.spaces.live.com/photos/feed.rss) as well as
[photos in specific
albums](http://techiewife.spaces.live.com/photos/cns!3DAECC033B88329C!2885/feed.rss).
So I built out a simple WPF based photo viewer for my wife’s WL Space
photos in IronPython.

[![TechieWife Photo Viewer screenshot](http://hawkblogstorage.blob.core.windows.net/blog-content/20081112-1718-ironpython-and-wpf-part-1-introduction/ipywpf_thumb.png "TechieWife Photo Viewer screenshot")](http://hawkblogstorage.blob.core.windows.net/blog-content/20081112-1718-ironpython-and-wpf-part-1-introduction/ipywpf.png)

As you can see, I’m not quitting my job to go pursue a career in design
anytime soon. But hey, the point is demonstrate building a WPF app in
IPy, not to be a great designer. Plus, don’t those cute kids make up for
the ugliness of the app?

Turns out building this app in IPy was fairly straightforward, with a
few pitfalls. I wasted half a day digging thru data binding before
realized that data binding against IPy objects works out of the box –
but only if you type the case of the property correctly (Title !=
title). Also, I couldn’t make TypeConverters work the way I wanted, but
python list comprehensions made it enough to transform the feed data
before binding it to the UI. That approach worked great for this
scenario but maybe not so much for others. (I’ve got feelers out to the
WPF data binding wonks, so maybe there’s still hope for type converters)

Over the next several posts, I’m going to show you all the code for this
app. It’s pretty small, only about 50 lines of app-specific python
code + 50 lines of XAML to describe the window. There’s also some
reusable code – 50 lines of WPF module code (mostly stolen from
avalon.py in the IPy tutorial), 200 lines of xml2py code [which I’ve
discussed
before](http://devhawk.net/2008/05/06/deserializing-xml-with-ironpython/)
and a very small C\# based assembly to make accessing WPF elements by
name very pythonic.
