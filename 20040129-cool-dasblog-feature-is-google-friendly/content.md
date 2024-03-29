I was reading [Steve’s](http://hyperthink.net/blog/) blog with my
browser earlier today when I noticed his odd permalink url’s. Instead of
a url like
“http://devhawk.net/PermaLink.aspx?guid=9abbd5ea-3a10-44d8-8872-877033b7349c”,
his look like
“http://hyperthink.net/blog/PermaLink,guid,fc99ce5e-b748-44f0-853d-0a261632b885.aspx”.
Turns out it’s a standard feature of dasBlog! Just check “Enable URL
rewriting” in the config page and you’re set. Now my permalink url’s
look like Steve’s.

Since Google doesn’t index pages based on query string, this feature
should make my site more easily crawled and googled.

**Update**: This feature breaks sub category specific feeds, like “[Blogging
| dasBlog](CategoryView.aspx?category=Blogging%7CdasBlog)“, so I’m
turning it back off until someone can fix the bug.
