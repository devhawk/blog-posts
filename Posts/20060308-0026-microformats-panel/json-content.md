I still haven’t seen a good general session on
[microformats](http://microformats.org/). I’m thinking it’s because any
one given microformat is so simple that you can’t really fill more than
about ten minutes talking about it. So this panel was about six or seven
different microformats. The format of the panel stunk – I lost track of
what was being discussed pretty quickly so I spent the time surfing the
microformats website.

The idea of microformats is to adorn visual markup (i.e. xhtml) with
semantic information about the data underneath. Probably the best
example of this is [hCard](http://microformats.org/wiki/hcard), the
microformat version of vCard. Here’s my hCard (as produced by the [hCard
Creator](http://microformats.org/code/hcard/creator))

> <div class="vcard">
>
> [Harry Pierson](http://devhawk.net/)
>
> </div>
>
> <div class="org">
>
> Microsoft
>
> </div>
>
> <div class="adr">
>
> <div class="street-address">
>
> One Microsoft Way, 18/2194
>
> </div>
>
> <span class="locality">Redmond</span>, <span
> class="region">WA</span><span class="postal-code">98052</span>
>
> </div>
>
> <div class="tel">
>
> 425/705-6045
>
> </div>

And here’s the markup:

``` {.brush:xml}
<div class="vcard">
    <a class="url fn" href="harry/'>http://devhawk.net">Harry Pierson</a>
    <div class="org">Microsoft</div>
    <div class="adr">
        <div class="street-address">One Microsoft Way, 18/2194</div>
        <span class="locality">Redmond</span>, 
        <span class="region">WA</span>
        <span class="postal-code">98052</span>
    </div>
    <div class="tel">425/705-6045</div>
</div>
```

See how the class attributes provide the semantics for the underlying
text? Cool.

I’m beginning to get microformats. At first, I was bothered because I
thought they were hijacking the semantics of the class attribute. But I
didn’t realize the [class
attribute](http://www.w3.org/TR/html4/struct/global.html#adef-class)
could be used for “general purpose processing by user agents”. And the
link microformats like [XFN](http://gmpg.org/xfn/) and
[rel-tag](http://www.microformats.com/wiki/rel-tag) are even simpler
than hCard.

So again, bad session but cool concept. I really see potential for
mashing up [Ray Ozzie’s Live
Clipboard](http://devhawk.net/2006/03/08/Ray+Ozzie+On+Simple+Bridge+Building.aspx)
with microformats.
