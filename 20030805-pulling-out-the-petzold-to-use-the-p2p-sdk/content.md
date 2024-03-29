[Lots of people](http://www.feedster.com/search.php?q=p2p+SDK+XP)
([including
me](http://devhawk.net/2003/07/29/p2p-advanced-network-pack-for-winxp/)) have
pointed out that the WinXP Advanced Networking Pack and P2P SDK [have
been released](http://msdn.microsoft.com/downloads/list/winxppeer.asp).
But I haven’t seen any code besides the samples. And if you look through
the samples, I think you’ll see why. I’ve picked thru the “GraphChat”
sample, which is written in raw pre-MFC Petzold-style C. It took a while
to isolate the relevant parts of the code from all the windows goo that
I thought I had finally seen the end of. I have to go through the code
since [the
docs](http://msdn.microsoft.com/library/en-us/p2psdk/p2p/portal.asp)
aren’t all that fleshed out yet.

One of the trickier parts is integrating with the new Peer Name
Resolution Protocol (PNRP). PNRP is a serverless DNS-esque system
(though there is a “global” PNRP server hosted by Microsoft). It’s
supposed to be independent of the Graphing and Grouping API’s, but the
GraphChat sample gets the IPv6 address from the created graph in order
to register the address with PNRP. Now that I’ve installed the Adv Net
Pack, I have three virtual tunneling psudeo-interfaces. Other than
hardcoding, I’m not sure how to get the address of the right tunneling
psudeo-interface to register w/o creating a graph.

I’m getting the feeling that I should have started with the Grouping
API, rather than the Graphing API. It runs at a higher level of
abstraction, so I figured I should learn the underpinnings first. But I
bet the Grouping API would have been much easier to understand.
