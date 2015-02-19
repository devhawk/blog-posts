Not much blogging of late. Trend likely to continue. Details at 11.

However, I did make an interesting discovery about [Windows SharePoint
Services](http://www.microsoft.com/windowsserver2003/technologies/sharepoint/default.mspx)
I wanted to share. Obviously, I’ve been thinking WSS in terms of
blogging (hence the [project](prj_sharepointsynd.aspx) to expose RSS
from WSS). However, I’ve been frustrated by what should be a simple
little thing. WSS includes a rich text editor that enables me to write
content that’s bold, italics, colored, fonted, sized, indented,
bulleted, etc. However, until today, I couldn’t figure out how to do
hyperlinks. WSS will automagically render a url as a hyperlink. But
there was no way to build an anchor tag hyperlink, so your forced to
embed urls directly in the text. I didn’t like that, so I set about
trying to fix it. Turns out to not be a big deal.

It turns out that the
[SPFieldMultiLine](http://msdn.microsoft.com/library/en-us/spptsdk/html/tscSPFieldMultiLineText.asp)
class supports a property named
[AllowHyperlinks](http://msdn.microsoft.com/library/en-us/spptsdk/html/tspSPFieldMultiLineTextAllowHyperlink.asp).
If you can flip this bit, the rich text editor in WSS will suddenly get
a Hyperlink button and enable the creation of anchor tag hyperlinks.
Unfortunately, there doesn’t appear to be any way to flip this bit via
the existing UI as of B2TR (no, even though I work at MSFT, I don’t have
the RTM bits yet). So I built a web app (as per [these
instructions](http://msdn.microsoft.com/library/en-us/spptsdk/html/tsovVSNETIntro.asp))
that programmatically flipped that bit via the WSS object model. I also
could have done it via a console or windows form app, again via the WSS
object model. However, that object model only works on the WSS machine
itself – there’s no concept of remoting via the OM. But WSS does expose
much of its functionality remotely via web services, including a [List
web
service](http://msdn.microsoft.com/library/en-us/spptsdk/html/soapcLists.asp).

The WSS Web Service interface (WSI?) is a little funky, but I munged up
a little utility to flip the AllowHyperlinks property programmatically.
The inputs and outputs of the service are XML (actually an XML grammar
called
[CAML](http://msdn.microsoft.com/library/en-us/spptsdk/html/SPPTWSSCAML.asp))
so the inputs and outputs of the service proxy are XmlNodes. The DOM is
an ugly way to build XML documents, so I used Chris Lovett’s
[XmlNodeWriter](http://gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=8F9DE8A7-FEC9-48E1-91C5-1FC569CDE11C)
utility class to get an XmlWriter interface on my XmlDocument. Other
than that, the code was pretty straight forward. In pseudo-code, it
looks like:

1.  Call
    ListServiceProxy.[GetList](http://msdn.microsoft.com/library/en-us/spptsdk/html/soapmListsGetList.asp)(listName)
    to get the definition of the list in CAML
2.  Use XPath to find the element that represents the field I want to
    change (//sp:Field[@DisplayName='fieldName'])
3.  Create a new XmlDocument that contains a single method block for the
    field I want to change (see docs for
    [UpdateList](http://msdn.microsoft.com/library/en-us/spptsdk/html/soapmListsUpdateList.asp)
    for explanation). Write the CAML representation of the field into
    the method block. This CAML is identical to the CAML from the
    previous step, except that I’ve added AllowHyperlinks=”TRUE’
4.  Call ListServiceProxy.UpdateList, passing in the the constructed
    XmlDocument as the updateFields parameter.
5.  UpdateList returns an XmlNode that contains the result of the
    update. XPath query via method block ID to determine if the update
    succeeded or failed.

I will post the code after I clean it up a bit. However, I don’t know
when that will be.
