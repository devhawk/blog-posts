For those of you reading this via the syndication feed, I rolled out a
new site design last night. I figured that after [three
years](http://devhawk.net/2006/01/28/Happy+Belated+Birthday+To+DevHawk.aspx) it
was high time for a new site design. Not being much of a designer, I
started with the [Rounded design
template](http://download.microsoft.com/download/7/8/0/7802dbf0-d500-41a7-b635-5bd3131229be/Rounded%20VS%20Design%20Templates.msi)
from the [ASP.NET Design Template
Gallery](http://msdn.microsoft.com/asp.net/reference/design/templates/).
It’s much cleaner and more readable than my old deisgn, as I’ve removed
all my blogrolls and fixed the width for 1024×768 screens. 

As part of the switch, I moved from using a table-based layout to a
CSS-based layout. I even wrote custom dasBlog macros that render my
naviagation menu and date archive as unordered lists. The default
dasBlog macros for those are rendered using tables. (Note, I didn’t
rewrite the category list, so I’m not completely table free). If there’s
interest from the dasBlog community, I’ll post the code.

I gotta say, I’m not sure I see what the big deal about CSS over tables
is. I mean, I’m as impressed as the next guy with [CSS Zen
Garden](http://www.csszengarden.com/), but honestly I don’t get it.
Maybe it’s because I’m a developer, not a designer at heart. But CSS
seems like hard-coded voodoo to me. This site has a simple fixed-width
two-column layout, but it took a great deal of experimentation to get
the floats coded correctly to render in both IE and FireFox. In fact,
there’s a small issue with the new deisgn in IE that I didn’t bother to
fix. But if I had just used tables, it would have taken five minutes.

Please let me know what you think of the new design.
