So I’m experimenting with this podcasting stuff. I started by listening
to a few podcasts – primarily [Daily Source Code](http://www.curry.com)
and [Mike’s Manic Minute](http://radio.weblogs.com/0141212/) - and using
Doppler to pull these down to my Zen Micro. But then I started expanding
out a bit – adding [Ron Jacobs](http://www.ronjacobs.com/podcast) and
[Major Nelson](http://www.majornelson.com/wp/index.php?cat=7) – and I
started to hit issues w/ the software. Of course, not everyone tags
their podcasts with the same metadata style. Given the way the Zen Micro
works, I want all the podcasts to have the same genre (i.e. “Podcast”)
and then have either one song per “album” where the album has the date
in the title (preferably in the yyyymmdd format for sort purposes) or
one album per artist where the song has the date in the title. That way
I can see all the shows from a given podcaster on my Zen Micro in a list
and can easily determine the oldest and newest shows. Doppler supports
tag overriding for downloaded podcasts – i.e. so I can set them all to
have the genre “Podcast”. However, their “smarttags” implementation
doesn’t work at all. You’re supposed to use smart tags like %date% and
%album% in the tag overrides, if they worked that is. And even the hard
coded genre override doesn’t work for WMA files. I assume Doppler is
using an MP3 specific library for modifying the metadata tags, rather
than the Windows Media libraries that work with both. I assume these
will get fixed as the tools get better. In the meantime, I’ve subscribed
to the MP3 versions of Ron and Major Nelson’s podcast feeds.

**Update**: Doppler tag overriding doesn’t seem to work for the hardcoded
genre either.
