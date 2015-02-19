It sure has been quiet around here. I spent last week on the road in
Washington DC and Orlando at the federal and eastern region architect
forums. Since my parents live in DC, [Julie](http://techiewife.com/) and
Patrick came too. Nine days on the road with the family is hard, but it
was worth it. Lots of fun, including Patrick’s first [hockey
game](http://sports.espn.go.com/nhl/recap?gameId=240320023) (even though
the officiating was awful).

I spent a lot of time with customers talking about SOA and architecture
frameworks. The frameworks talks were most interesting given Microsoft’s
view on [modeling
languages](http://msdn.microsoft.com/architecture/application/default.aspx?pull=/library/en-us/dnvsent/html/vsent_modelinglangs.asp)
in general, Whidbey’s [design
tools](http://msdn.microsoft.com/vstudio/productinfo/enterprise/enterpriseroadmap/default.aspx?pull=/library/en-us/dnvsent/html/vsent_soadover.asp)
and our work on [domain-specific
models](http://www.microsoft.com/windowsserversystem/dsi/sdm.mspx) for
distributed applications. To me, the most interesting thing is not the
modeling tools shipping in the box with Whidbey, rather the modeling
infrastructure. Accepting the idea of domain specific modeling means
accepting that there are a vast number of different modeling languages –
more than Microsoft could ever create on our own. In his solution
[architecture strategy
series](http://msdn.microsoft.com/architecture/overview/series/)
presentation, [Keith Short](http://blogs.msdn.com/keith_short/) talked
about the need for a designer infrastructure and tool extensibility. He
also confirmed that the Whidbey modeling tools are themselves built on a
general modeling engine and framework. This modeling infrastructure
enables the definition of new meta-models, extensions to existing
meta-models and transforms between meta-models. It also has a
synchronization engine for keeping artifacts at different levels of
abstraction in sync (e.g. updating the model updates the code and visa
versa). I’m not sure how much of this infrastructure will surface
publicly in Whidbey, but Keith specifically said the modeling engine is
a “piece of work that, over time, we hope to be able to offer both to
our partners and customers so that you can build [modeling] tools
yourself.”

This idea of building domain-specific modeling languages and tools feels
pretty powerful to me. Besides the ones included in Whidbey (and the the
previously discussed [service-oriented
language](http://devhawk.net/PermaLink.aspx?guid=feb67165-4f08-4342-97f9-8ce830fa1575))
what other languages would you like to see / use / design?
