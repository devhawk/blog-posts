I’ve spent the last three hours trying to get my new photo site posted
to no avail. Will have to check with the webmaster tomorrow – any page
with a code behind throws an exception that I can’t seem to catch or
echo to the screen. :frowning: I guess I’ll have to build a simple HTML 
front end in order to post a bunch of new Patrick pictures for my parents.

In other news, [Dare’s](http://www.kuro5hin.org/user/Carnage4Life/diary)
back from his world wide trip. Looking forward to the new builds of [RSS
Bandit](http://www22.brinkster.com/rendelmann/db/200306archive002.asp#1054847834002).
But it [took him a
while](http://www.kuro5hin.org/story/2003/6/7/162431/3970) to make any
sense of [my last
post](http://devhawk.net/2003/05/25/more-on-xml-entities/) in the
objects vs. entities discussion. Apparently, I’m not as lucid at 11pm as
I thought. Given that it’s 11pm as I write this, here’s my single
attempt to make a coherent point.

> XML, even with Infoset/XPath 2.0 Data Model/XSD/etc, has it’s roots in
> a text based format. Attempts to hide this with strongly-typed
> object-oriented mechanisms will always be [leaky
> abstractions](http://www.joelonsoftware.com/articles/LeakyAbstractions.html).
> But that’s OK, since XML actually works for loosely-coupled cross
> platform services while strongly-typed object-oriented mechanisms only
> work for tightly-coupled n-tier applications. And I’m out of the
> application business.
>
> Since I’m going to have to build some XML entities for
> interoperability purposes, it makes sense to build all my entitles
> that way, even the ones that are private to my code. This way I have a
> single architectural model, improve reuse, reduce training, and avoid
> writing any annoying XML \<–\> OOP conversion routines.

