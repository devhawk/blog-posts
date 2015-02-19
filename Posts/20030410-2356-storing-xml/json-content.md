Randomly jumping around on the web (waiting for the [final Matrix
trailer](http://whatisthematrix.warnerbros.com/rl_cmp/trailer_final_frames.html)
to download) I discovered [Apache
Xindice](http://xml.apache.org/xindice/), a native XML database written
in Java. It’s very read focused – getting XML documents into the system
is pretty easy, querying them with XPath is pretty easy, updating them
with
[XUpdate](http://xml.apache.org/xindice/guide-developer.html#N1025F) is
not. I’m not sure I’m a big fan of XML based command grammars like this.
DOM’s interface is ugly enough, XUpdate appears to be DOM’s interface
cast in XML, so you end up with something like this:

> `<xupdate:modifications version="1.0" xmlns:xupdate="http://www.xmldb.org/xupdate"> <xupdate:insert-after select="/addresses/address[1]" >`
>
> \<xupdate:element name="address"\>\
>  \<xupdate:attribute name="id"\>2\</xupdate:attribute\>\
>  \<fullname\>John Smith\</fullname\>\
>  \<born day='2' month='12' year='1974'/\>\
>  \<country\>Germany\</country\>\
>  \</xupdate:element\>
>
> \</xupdate:insert-after\>\
>  \</xupdate:modifications\>\
>  [[Xindice Developers
> Guide](http://xml.apache.org/xindice/guide-developer.html#N1025F)]

As I said, not very pretty.

Other Notes:

-   Just watched the Final Matrix Trailer – wow. Also check out the
    “[I’m
    In](http://whatisthematrix.warnerbros.com/rl_cmp/tv_spot_im_in_frames.html)”
    and
    “[Prophecy](http://whatisthematrix.warnerbros.com/rl_cmp/tv_spot_prophecy_frames.html)”
    TV spots and the [Enter the
    Matrix](http://www.enterthematrixgame.com/html/trailer_index.html)
    game trailer. Only disappointment: graphics on the game don’t look
    that great. I guess that what happens when you have to support
    [sub](http://www.nintendogamecube.com/home.jsp)[standard](http://www.playstation.com/)
    game consoles – you can’t take advantage of [true
    power](http://www.xbox.com/).
-   Seven of the lower seeded teams in the [NHL
    Playoffs](http://sports.espn.go.com/nhl/playoffs2003/index) won
    their opening game. Only [New
    Jersey](http://sports.espn.go.com/nhl/playoffs2003/series?series=bosnjd)
    came out on top of the top seeds.
-   As there is no hockey team in Seattle, I still root for teams from
    my previous home towns: Washington Capitals and Los Angeles Kings.
    Caps were [3-0
    winners](http://sports.espn.go.com/nhl/recap?gameId=230410020) on
    the road in Tampa Bay tonight.
-   In further hockey news, Microsoft announced “[NHL Rivals
    2004](http://www.teamxbox.com/news.php?id=4271)” for XBOX today. I
    wonder if it will feature the [Microsoft Hockey
    Challenge](http://www.mshockeychallenge.com)?

