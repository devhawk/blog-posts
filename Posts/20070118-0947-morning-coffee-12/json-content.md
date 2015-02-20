-   According to [Chris “Long Tail”
    Anderson](http://www.longtail.com/the_long_tail/2007/01/how_to_make_a_l.html)
    (as opposed to [Chris “Avalon Architect”
    Anderson](http://www.simplegeek.com/)), “Combined with the new
    low-cost distribution channels, from DVD to digital downloads, all
    you now need to be a filmmaker is talent.” Really? Based on the
    dreck Hollywood churns out, I thought talent was optional!
    :smile:
    Seriously, check out his post and the sites he points to ([Four Eyed
    Monsters](http://foureyedmonsters.com) and [DV Rebel’s Guide review
    on Cool Tools](http://www.kk.org/cooltools/archives/001547.php)).
-   Speaking of Chris “Avalon” Anderson, he’s got a couple of WPF/E
    tests up on his blog. I wanted to see how it worked under the hood,
    so I checked out the HTML source for [this
    page](http://www.simplegeek.com/PermaLink.aspx/5516e540-156a-4672-a804-54c21bedf5b7).
    It includes around 115kb of XAML! We’ve seen ViewState and
    JavaScript page bloat, is XAML bloat next?
-   [Larry
    O’Brien](http://www.knowing.net/PermaLink,guid,db319518-094a-4d77-b365-2b1b28b2aa38.aspx)
    and [Alan
    Zeichick](http://ztrek.blogspot.com/2007/01/presenting-threading-maturity-model.html)
    are talking about a Threading Maturity Model. Good ideas there, but
    frankly I think we need a language that recognizes concurrency as a
    first-order abstraction if we’re going to make much progress up the
    maturity model.
-   Dare
    [recommends](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=3e16e16a-fa4e-4cbf-b18f-ccd8d34eeba4)[programming.reddit.com](http://programming.reddit.com/).
    Definitely worthy of a closer look.
-   The BTS training I’m in yesterday and today is being held on
    Microsoft’s [Red West
    campus](http://blogs.msdn.com/jobsblog/archive/2005/07/12/438157.aspx),
    home of MSN & Windows Live. It’s very nice looking and is a good
    size – five buildings – without being as huge as main campus. It
    even has a “ski-lodge” cafeteria, though given the slim pickings in
    my building’s cafe anything would be an improvement.
-   One thing I don’t miss about working on campus is the commute.
    Getting to my office takes 20-30 minutes, depending on the traffic
    lights. Getting to campus, even though it’s physically closer, takes
    45-60 minutes, most of it spent sitting still. Every time I wish
    we’d move to campus, I remember the traffic and decide I like where
    I am just fine.
-   Two big learnings from BTS training yesterday:
    -   Conceptually, BTS hasn’t changed much since the 2000/2002
        releases that I was more familiar with. In practice, it has
        heavily embraced .NET which is a good thing. I didn’t realize
        how much of a difference having tools like the pipeline and map
        editor inside VS would make, but it does. (I realize the
        orchestration editor is inside VS as well, but we get to that
        module of the class today).
    -   The MessageBox is a bigger deal than I remember or realized.
        [Matt](http://pluralsight.com/blogs/matt/) called it the “heart
        of BizTalk”. I know BTS has had a SQL based message store since
        day one, but I don’t remember it being called out explicitly.
-   I’ve [said
    before](http://devhawk.net/CommentView,guid,e7b99068-8f9b-47cd-b5d2-e09d5d250ccc.aspx#commentstart)
    that MessageBox is roughly analogous to SSB queues, though BTS wonks
    (like my teammates) typically jump down my throat when I do.
    MessageBox has a pub/sub design philosophy which SSB does not.
    However, I’m guessing pub/sub is used much more in messaging
    scenarios rather than orchestration scenarios. My efforts around SSB
    & WF are much more focused on orchestration scenarios, so I’m
    guessing SSB’s lack of pub/sub infrastructure is not a big deal.


