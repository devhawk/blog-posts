**Introduction**

While Harry is out of the office on a well deserved vacation with his
family I will be acting as a guest blogger for his website.

My name is Dale Churchward and I have been working at in Microsoft IT as
an application architect since June 2006. Prior to coming to MS I worked
in operations in both the telecommunications and healthcare industries.
As Harry pointed out I tend to be very operations focused. While I love
working on new technologies I am keenly interested in how a design will
work in production, and try to ensure we have considered support
considerations as part of our designs. Each member of our team comes in
with a different background. This helps us as we are each strong in
different areas. I also write to my own blog which can be found
[here](http://halfmybrain.spaces.live.com/). In my own blog I tend to
write on a wide array of subjects, depending on my mood at the time.
While Harry is away though, I will be posting on technology areas I am
interested in, and staying true to his morning coffee vision, albeit
with a slightly different take.

**The Doughnuts**

-   [The Build Master](http://www.amazon.com/Build-Master-Microsofts-Configuration-Addison-Wesley/dp/0321332059)
    by [Vincent Maraia](http://blogs.msdn.com/vincem/) is an excellent
    book if you are interested in the build process and how to make it
    as efficient as possible.
-   We had a great meeting with the [Patterns &
    Practices](http://msdn.microsoft.com/practices/) team the other day.
    Since I am still new to Microsoft it is still a bit overwhelming to
    meet the authors of documents you have read and used over the years.
-   I recently have been spending some cycles working with [System
    Center Operations Manager
    2007](http://www.microsoft.com/systemcenter/opsmgr/default.mspx). I
    believe that it provides some excellent tools to monitor and repair
    a system plus it’s designed to be service focused.
-   [Francis Stokes](http://www.francisstokes.com/) has produced 6
    episodes showing what would happen if heaven was being run like a
    company named God Inc. There are currently 6 episodes. No matter
    what your belief or lack thereof in a supreme being the videos are
    hilarious.
    -   [Episode 1](http://www.youtube.com/watch?v=b2f4heaG288)
    -   [Episode 2](http://www.youtube.com/watch?v=ySqceK4SUi0)
    -   [Episode 3](http://www.youtube.com/watch?v=8Gx_EYv8JYI)
    -   [Episode 4](http://www.youtube.com/watch?v=Taf3KI09WFM)
    -   [Episode 5](http://www.youtube.com/watch?v=il8XWIi-WPE)
    -   [Episode 6](http://www.youtube.com/watch?v=Wpfv1APJsz8) 
-   I have been spending a lot of time thinking about how heartbeat
    transactions between multiple services should operate. In the
    drawing below you can see 3 web services and a monitoring one. In
    the original design the monitoring service was sending heartbeats
    out to each of the web services to see if they were available. This
    seem inefficient to me as we really don’t care if the monitoring
    service can reach the web service. What we need to know is if any
    dependent web services are able to connect. In the drawing we have a
    web service residing in the extranet (Web Service 1) that sends data
    to a web service in the corporate network (Web Service 2). We really
    don’t care if the monitoring service can talk with web service 2,
    but we definitely want to know that web service 1 can get there.
    Once web service 1 realizes that is can’t connect to 2 we then
    notify the monitoring system so that the owner of web service 2 can
    take action. Web service 1 still continues sending heartbeats though
    so that it is aware of when the second web service becomes available
    again.

[![](http://image.devhawk.net/blog-content/20070216-0816-morning-doughnuts-1/heartbeat_services_thumb.png)](http://image.devhawk.net/blog-content/20070216-0816-morning-doughnuts-1/heartbeat_services.png)
