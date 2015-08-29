I found this
[interview](http://www.itnews.com.au/storycontent.asp?ID=8&Art_ID=17952)
with the BEA deputy CTO Benjamin Renaud via a [news
post](http://www.theserverside.net/news/thread.aspx?thread_id=23432) on
[TSS.NET](http://www.theserverside.net/). BEA’s position is summed up in
the following quote:

> “Microsoft will standardise at the protocol level, but they won’t
> standardise at the API level,” he said. “Customers are not that
> gullible. The real level where integration happens is at the
> programming level.”

I like
[Ted’s](http://www.theserverside.net/articles/article.aspx?l=Welcome)
response to this:

> We’re sorry, Mr. Renaud, but integration isn’t necessarily what web
> services are after–interoperability, in the form of loosely coupled
> components that know how to exchange messages of data, are the key to
> truly powerful web services. If you want programmatic integration, you
> have to standabrdize on programming platform and language, and that’s
> not what web services were supposed to be for.
>
> As to his complaint that Microsoft is engaged in a huge
> bait-and-switch, we believe he’s either not putting enough faith in
> the development community to see this conspiracy, or else he’s trying
> to cry foul over the fact that BEA has to compete with others in the
> Java space for the web services dollar, where Microsoft stands
> relatively alone.

However, I’m not sure what Ted’s driving at with his interop vs.
integration argument. To me, they seem to go hand in hand – two great
tastes that taste great together. Web services are important for both.
If I’m not integrating disparate systems, I probably don’t care about
interop that much.

Personally, I care much more about integration than interop. Even if I
was going to build a system-of-systems all using only .NET technology, I
would still use a service-oriented approach and implement those services
using web service technology. The service-oriented approach allows me to
be more flexible in the way I stitch my services together. Using web
service technology allows me to leverage platform technology (ASMX, WSE,
Indigo, etc) so I don’t have to roll the whole stack myself. The fact
that I get interop “for free” by using this approach is an extra bonus
that I don’t really care much about – at first. That built-in interop,
even in this single-platform-which-never-happens-in-the-real-world
scenario, helps make my systems future-resistant (nothing is
future-proof). New customers, new partners, mergers – come what may, I
have a better-than-average chance of being able to integrate it into my
system. That gives me an real advantage (\$\$\$) in the marketplace.

Of course, back in the real-world where you’re creating a
system-of-systems from a series of stand-alone systems that are all
built with different platforms, interop is much more important. But that
doesn’t mean integration is any less important.
