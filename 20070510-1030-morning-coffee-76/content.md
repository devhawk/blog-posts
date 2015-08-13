-   Dare Obasanjo sez [Cool URIs Don’t
    Change](http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=25e5009e-0889-4883-8d03-58e7775882ac).
    He’s got other versioning advice, but that’s the main takeaway. Good
    advice that dovetails nicely with “[It’s the URI,
    Stupid](http://hyperthink.net/blog/PermaLink,guid,40c0cf83-27b1-49e7-8086-c57d1b5007cd.aspx)“.
-   I usually agree with [Jack van Hoof’s](http://soa-eda.blogspot.com/)
    stuff, but I don’t agree with [his
    thoughts](http://soa-eda.blogspot.com/2007/05/how-to-implement-loosely-coupled.html)
    on loosely coupled transaction processing. It’s much better than
    suggesting the use of 2PC system
    like [WS-AT](http://specs.xmlsoap.org/ws/2004/10/wsat/wsat.pdf), but
    when he writes that “by design every action has a compensating
    action to undo the original action” I am reminded of Pat’s old post
    [Why I hate the phrase “Long Running
    Transactions”](http://blogs.msdn.com/pathelland/archive/2004/08/12/213552.aspx).
    Personally, I’m a fan of using the Tentative Operation or
    Reservation pattern,
    [described](http://msdn2.microsoft.com/en-us/library/ms954638.aspx#soade_topic3)
    by [John Evdemon](http://blogs.msdn.com/jevdemon/). Note the lack of
    a transaction coordinator in that pattern.
-   Speaking of service anti-patterns, I wonder how we rationalize the
    following two statements, both from Microsoft, in documents
    published by my old team:
    -   “CRUD operations are the wrong level of factoring for a Web
        service. CRUD operations may be implemented within or across
        services, but should not be exposed to consumers in such a
        fashion. This is an example of a service that allowed internal
        (private) capabilities to bleed into the service’s public
        interface.” [John
        Evdemon](http://blogs.msdn.com/jevdemon/), [Principles of
        Service Design: Service Patterns and
        Anti-Patterns](http://msdn2.microsoft.com/en-us/library/ms954638.aspx),
        [Readings in Service
        Orientation](http://msdn2.microsoft.com/en-us/architecture/aa479349.aspx)
    -   “It is very common for Entity Services to support a create,
        read, update and delete (CRUD) interface at the entity level,
        and add additional domain-speciic operations needed to address
        the problem-domain and support the application’s features and
        use cases.” [Shy Cohen](http://blogs.msdn.com/shycohen/),
        Ontology and Taxonomy of Services in a Service-Oriented
        Architecture, [Journal
        11](http://download.microsoft.com/download/e/8/b/e8b39fdb-0a4c-4f52-a5bc-9af66b9fa7df/AJ11_EN.zip)
-   Ian Thomas wonders [Does ERP
    suck](http://itblagger.wordpress.com/2007/05/04/does-erp-suck/)? In
    a word: Yes!
    :smile:
    Seriously, I’m a strong believer in what Ian alternatively calls
    “unbundling” and “disaggregation” of monolithic enterprise systems –
    ERP is the most glaring example of such systems.
-   Jamie Cansdale is [figuring
    out](http://weblogs.asp.net/nunitaddin/archive/2007/05/10/silverlight-console-applications.aspx)
    how to host Silverlight’s CLR outside of the browser. He’s already
    got a console runner up and running. He’s working of adding
    “Test With Silverlight” option to
    [TestDriven.NET](http://www.testdriven.net/). You go Jamie.


