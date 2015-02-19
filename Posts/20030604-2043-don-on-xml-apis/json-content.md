I watched [Don’s](http://www.gotdotnet.com/team/dbox/)[MSDN TV
talk](http://msdn.microsoft.com/msdntv/episode.aspx?xml=episodes/en/20030603XMLDB/manifest.xml)
on passing XML around within a managed application. The value of
XPathNavigaor has been [discussed in
blogsphere](http://www.gotdotnet.com/team/dbox/default.aspx?key=2003-05-13T06:47:59Z),
but it was nice to see it explained by the master.

\<nostalgicMusic action=”cue”\>

It reminded my of one of my first encounters with Don. I was a recent
addition to [MCS](http://www.microsoft.com/business/services/mcs.asp) in
SoCal and we were having a team meeting / training at
[DevelopMentor](http://www.develop.com/). Among other speakers, Don was
scheduled to discuss the then-brand-new SOAP spec. As is expected with
Don, the presentation started with thirty minutes of “look what cool
code I whipped up at 3am this morning”. In this case, the code was a COM
based [SAX](http://www.saxproject.org/) parser based on
[expat](http://www.jclark.com/xml/expat.html). In his implementation,
Don had mirrored the SAX API exactly, including providing the
setXxxHandler methods. I asked him why he hadn’t used [COM
Events](http://msdn.microsoft.com/library/?url=/library/en-us/com/htm/events_27cd.asp?frame=true).
He commented that I had really drunk the kool-aid and that was the end
of it.

Personally, I hate registration API’s like SAX’s setXxxHandler methods.
While COM Events has a lot of plumbing overhead to get nailed up, but
the benefit was that it provided a late bound mechanism for locating
event sources. Using registration API’s like setXxxHandler means having
to redefine your interface to support new event types. Of course, CLR
delegates, the pull model XmlReader and XPathNavigator have made the
registration API vs. COM events discussion moot.

Interesting follow up to this story: I ran into Don at an internal event
last November. He couldn’t remember my name, but he remembered the event
at DM and that I was the one who asked about that COM events stuff.

\</nostalgicMusic\>
