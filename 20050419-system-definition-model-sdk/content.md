Thanks to [Pedro
Silva](http://blogs.msdn.com/pedrosilva/archive/2005/04/19/409725.aspx),
I now know about the [DSL Tools
forum](http://forums.microsoft.com/msdn/ShowForum.aspx?ForumID=61) on
MSDN. There are also forums for
[VSTESA](http://forums.microsoft.com/msdn/ShowForum.aspx?ForumID=21),
[MSF](http://forums.microsoft.com/msdn/ShowForum.aspx?ForumID=63) and
[VSTS
Workshop](http://forums.microsoft.com/msdn/ShowForum.aspx?ForumID=62).
Plus, you can subscribe to RSS feeds of all these forums.

Speaking of the VSTS Workshops, the 3rd workshop (after [DSL
Tools](http://lab.msdn.microsoft.com/teamsystem/workshop/dsltools/default.aspx)
and [MSF
Agile](http://lab.msdn.microsoft.com/teamsystem/workshop/msfagile/default.aspx))
just launched for the [System Definition Model
SDK](http://lab.msdn.microsoft.com/teamsystem/workshop/sdm/default.aspx).
[System Definition
Model](http://www.microsoft.com/windowsserversystem/dsi/sdmwp.mspx) – or
SDM – is the underlying model that powers the [VSTESA modeling tools
formerly known as
WhiteHorse](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnvsent/html/vsts-arch.asp).
VSTESA models 2 of SDM 4 levels – the Application Designer, the Logical
Datacenter Designer as well as the Deployment Designer which essentially
models the transformation between the two. These models map directly two
the Application and Application Host layers of the SDM. Currently, we
don’t have modeling tools for the Network/OS and Hardware layers of SDM.

Barry Gervin recently
[complained](http://objectsharp.com/Blogs/barry/archive/2005/04/12/1704.aspx)
that the Logical Datacenter Designer sucked because you can’t model a
web and database server deployed to the same physical machine. But in
the context of SDM’s layers, you model the deployment of multiple
application hosts to a single OS instance one layer lower than we
currently have modeling tools for. Alex Torone, PM for VSTESA (and
presenter for ARC310 – the drilldown on the Logical Datacenter Designer)
penned an [extensive
comment](http://objectsharp.com/Blogs/barry/archive/2005/04/12/1704.aspx#1829)
in response to Barry’s complaints where he explains why SDM is factored
the way it is and confirms that they are working on modelers for the
other DSM layers “in future releases”.

Anyway, back to the SDM SDK. What’s cool about this is that while we
ship some models “in the box” – primarily for our own stuff (SQL, IIS,
WS03, etc) – there’s no reason you couldn’t model any system with SDM
(Oracle, BEA, Linux, Z/OS, etc). The [SDM SDK
download](http://go.microsoft.com/fwlink/?LinkId=46393) is tools,
samples and docs for building your own models and extending the modeling
tools in VSTESA. (Note, the actual SDM SDK is a part of the [VS05
SDK](http://msdn.microsoft.com/vstudio/extend/sdkdownload/) – i.e. what
used to be called the VSIP SDK).

I wonder how long it is before the community models some of Microsoft’s
major competitors in SDM?
