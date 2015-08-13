Between MVP summit last week, ALT.NET this past weekend and an internal
brown-bag presentation yesterday, my unread email and blog posts have
piled up. Most of the following is old news, but I wanted to get
*something* out. Especially since I feel a case of [Caps Fever coming
on](http://www.nhl.com/nhl/app/?service=page&page=NewsPage&articleid=361256)
that will force – ***force***you understand – me to head home early
today.

DyLang Stuff

-   My teammate Srivatsn
    [demonstrates](http://blogs.msdn.com/srivatsn/archive/2008/04/12/turning-your-net-object-models-dynamic-for-ironpython.aspx)
    how to make your static C\# types act more dynamic in order to
    interop better with DLR languages. For example, by implementing
    GetBoundMember and SetMemberAfter, you can support setting arbitrary
    attributes on a C\# class from Python. Cool.
-   Today’s Michael Foord link: [On Testing: Some Programmers Refuse to
    Get
    it](http://www.voidspace.org.uk/python/weblog/arch_d7_2008_04_12.shtml#e960).
    He’s responding to a comment by Allen Holub suggesting that having
    110k of test code for 30k of production code is “a real indictment
    of the language” (IronPython). I’m with Michael on this, Holub’s
    suggestion is laughable and worse radically uninformed. I like the
    way Larry O’Brien (who passed on Holub’s comment in the first place)
    [describes](http://www.knowing.net/PermaLink,guid,1e1d2066-8a6f-4eb9-aff8-4298736712bc.aspx)
    the views of tests from inside and outside the agile community. I
    also like his description of tests as “quality diodes”.

Other Stuff

-   Werner Vogels
    [posts](http://www.allthingsdistributed.com/2008/04/persistent_storage_for_amazon.html)
    about a new Amazon EC2 feature: Persistent local storage. Basically,
    you can create an empty volume up to a terabyte in size and then
    mount it to your images as a drive. The objective seems to be able
    to run relational databases in the images, rather than being limited
    to S3 and SimpleDB. Kinda interesting, but given [Google’s
    announcement](http://googleappengine.blogspot.com/2008/04/introducing-google-app-engine-our-new.html)
    last week, I think the shine is off EC2 a bit.
-   This past weekend’s Twitter outage has Dave Winer
    [re-thinking](http://www.scripting.com/stories/2008/04/21/ifThisWereANormalDayOnTwit.html)
    the idea of building networks on a single point of failure. While
    obviously I agree with the concept, I don’t agree with his solution
    that “We need some big infrastructure companies to get into this
    game”. While there are some big blog infrastructures out there, most
    of that network was built on a massive number of small
    infrastructures. Why wouldn’t the same thing work for microblogging?

