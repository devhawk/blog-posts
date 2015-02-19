[Larry O’Brien](http://www.knowing.net/) clued me into the fact that the
new DevHawk theme didn’t render correctly in FireFox. When I redid my
theme, I tried to be good and use all div and span tags, but apparently
building a three column layout with a dynamically sized middle column
that works on IE and FireFox is beyond my CSS skills. So I went back to
using tables. Maybe the folks at [CSS Zen
Garden](http://www.csszengarden.com/) would freak out, but the table
works just fine.

Larry also pointed me to [ActiveSWF](http://activeswf.com/), a server
side COM component for generating dynamic flash movies. You munge up an
XML file describing the movie, hand it to ActiveSWF and it does the
rest. Sweet. Only thing missing is a .NET version (I realize I can
interop to COM, but that’s a pain to deploy).

Thanks Larry!
