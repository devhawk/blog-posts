This post is a combination of Rod’s short keynote and his breakout
session I went to right after lunch. Rod’s meta point is that lots of
enterprise applications don’t get built because they aren’t affordable
to write. [Chris Anderson](http://www.thelongtail.com/) would call this
the [long tail of
software](http://bnoopy.typepad.com/bnoopy/2005/03/the_long_tail_o.html).
Rod introduced the idea of “situational applications” – something you
build for a specific situation then you throw it away. I actually prefer
the term “disposable application” since it focuses on the fact you will
throw it away.

He demoed a proof of concept called QEDWiki. QED == Quick and Easily
Done. It seems a lot like [JotSpot](http://www.jot.com/). You have a
palette of components that you can drag onto the page and wire together
quickly. They built a slightly interesting application to mashup store
locations with weather data in under five minutes.

In the breakout, they got into much more detail on QEDWiki. There’s a
wiki programming language – I’m guessing conceptually similar to
[WikiTalk](http://www.flexwiki.com/default.aspx/FlexWiki/WikiTalk.html) -and
a AJAX-y drag and drop authoring environment that sits on top of it.
Pretty cool, but as he got under the hood it seemed pretty complex. The
amount of wiki code the visual authoring environment spits out is
significant and the implementation of one of the reusable components is
massive. Building a wrapper component for the [Yahoo
Traffic](http://developer.yahoo.com/traffic/index.html) service took
“around a day”. That seem large to you?
