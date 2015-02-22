Hot on the heels of my post about the [AJAX toolkit
spectrum](http://devhawk.net/2006/02/13/thoughts-on-the-ajax-toolkit-spectrum/)
comes news that Yahoo! has released their own [AJAX
toolkit](http://developer.yahoo.net/yui) as well as a very cool [web
page design pattern
catalog](http://developer.yahoo.net/ypatterns/index.php).

Some non-surprises:

-   The Yahoo! toolkit has it’s own animation library, it’s own drag and
    drop library and it’s own XmlHttpRequest wrapper, just like other
    libraries like Dojo and prototype.
-   The Yahoo! [UI Controls](http://developer.yahoo.net/yui/#elements)
    depend on Yahoo’s [Core
    Utilities](http://developer.yahoo.net/yui/#utilities). The libraries
    are modular, but not polymorphic with other these libraries.
-   The code was released under an open source license (BSD).

All these different implementations of the same core set of capabilities
at best means learning lots of ways of doing the same thing and at worst
means incompatibility between components from different libraries.

BTW, [last week I
wrote](http://devhawk.net/2006/02/02/browser-as-virtual-machine/)
that using a text-based high-level scripting language like Javascript in
the browser “encourages business models where the in-browser code has
little if any value.” This release from Yahoo! supports that point.
While their mapping component is subject a strict [Terms of
Use](http://developer.yahoo.net/maps/mapsTerms.html), their UI
components were released with a liberal open source licence. I doubt
that’s a coincidence.
