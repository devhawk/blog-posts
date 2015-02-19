So now that I’m back, we’re beginning work in earnest on my project. For
those [not following along at
home](http://devhawk.net/2006/06/15/Moving+On.aspx), my project is to
deliver shared service oriented infrastructure for Microsoft’s internal
IT department. We’ve spent the time since I moved over working on our
business justification, and now we’re moving into specifications and
prototyping. That is, I get to starting getting my hands dirty.

As part of the prototyping efforts, we’re looking to build some sample
business services on top of our prototype infrastructure. The idea being
to both illustrate what we’re building as well as have a playground
where we can experiment with new ideas. During the prototyping, I’ll be
pretty involved with the development. But once we start writing
production code, the dev team will take that over but I will continue to
own the service playground. I’ve been kicking a playground idea like
this around for several years, so I’m pretty excited about it.

The question is, what kind of business scenario should we build? I want
the sample business services to be something interesting and
real-world-esque. But of course, it can’t be too complex since I wasn’t
hired to build a playground as my primary job function.

So far, we have two primary ideas:

-   Enterprise Management System:
    [AdventureWorks](http://msdn2.microsoft.com/en-us/library/ms124659.aspx)
    is the primary sample database that ships with SQL Server. They have
    [business
    scenarios](http://msdn2.microsoft.com/en-us/library/ms124825.aspx)
    around Sales & Marketing, Product Management, Purchasing and
    Manufacturing. This sounds suspiciously like an ERP/CRM/SFA type
    enterprise system. On the plus side, MS is an enterprise so things
    like ERP/CRM/SFA are the types of solutions we need/use/buy/build
    internally. On the negative side, it’s complex to do real-world and
    teams that actually do ERP/CRM/SFA inside Microsoft might dismiss
    the infrastructure if the playground isn’t real-world enough.
-   [Prediction Market](http://en.wikipedia.org/wiki/Prediction_market):
    If you’ve ever seen [Hollywood Stock Exchange
    (HSX)](http://www.hsx.com/) or
    [Tradesports](http://www.tradesports.com/), those are prediction
    markets. The basic idea is that you trade on predictions, rather
    than companies like you would in a stock market. Using HSX as an
    example, you get 2 million “Hollywood Dollars” (i.e. play money) to
    invest in [upcoming
    movies](http://movies.hsx.com/moviestockindex.htm) and / or [movie
    stars](http://movies.hsx.com/starbondindex.htm). Those movies and
    stars pay out based on the money they make at the box office. They
    also have
    [derivatives](http://movies.hsx.com/movies/servlet/SecuritySearch?advancedSearch=yes&securityType=option&name=&tickerSymbol=&priceRange=&tradingStatus=ALL&ipoDate=&submit=submit)
    for opening weekend,
    [blockbusters](http://movies.hsx.com/special/bb2k6/) and the Oscars.
    HSX even sells [forecasting and prediction
    services](http://www.hsxresearch.com/offerings.htm) based on the HSX
    market. Of course, I can’t build something quite so extensive, but
    we could get pretty far with this idea. The upside is that it’s
    relatively simple (compared to enterprise management systems) and
    there’s little conflict with existing systems inside Microsoft. The
    downside also is that it’s relatively simple and not like anything
    we’re building inside Microsoft.

I’m leaning towards the prediction market, as it sounds more fun to
build and experiment with. What do you think?
