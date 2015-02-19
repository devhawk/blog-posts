A lot has been made of
[InfoPath](http://www.microsoft.com/office/preview/infopath/default.asp)
and its impact on [XML
development](http://gotdotnet.com/team/dbox/spoutletex.aspx?key=2003-02-28T07:38:50Z).
But the other [Office
11](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnofftalk/html/office01022003.asp)
apps have great XML support as well. InfoPath might be great as a web
service front end, but it would be a poor choice for a long XML
document. For example, [Martin Fowler](http://www.martinfowler.com)
wrote his [latest
book](http://www.martinfowler.com/books.html#eaa)[using
XML](http://www.martinfowler.com/articles/writingInXml.html), providing
him a way to use the same XML source to generate [web
pages](http://www.martinfowler.com/eaaCatalog/) and printed pages.
Martin uses XEmacs, but he could use Word 11. Word docs can have XML
schemas associated with them. When you save these docs as XML, the
custom schema information is embedded in the Word XML format (called
WordML). Alternatively, you can choose to “save data only” which
eliminates all the WordML leaving just the pure XML in the custom
schema. You can even apply an XSL Transform during the saving process.
Looks like Excel 11 has similar features. And there’s an app named
MSOXMLED.exe installed into the Program FilesCommon FilesMicrosoft
SharedOFFICE11 directory. According to the version info, its description
is “XML Editor”. However, it doesn’t seem to launch, at least in my
configuration (Office 11 beta running on [Windows Server 2003
RC2](http://www.microsoft.com/windowsserver2003/default.mspx) inside a
[Virtual
PC](http://www.microsoft.com/windowsxp/pro/evaluation/news/windowsvpc.asp)).
