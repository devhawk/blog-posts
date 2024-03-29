I’m working on v0.3 of the SharePoint RSS Feed Generator (from now on
I’m calling in WSS RSS). The big feature of v0.3 will be OPML support.
However, I’ve also made a structural change as well. Instead of using
HTTP Handlers, which requires me either modify a web.config file or
create a vDir off the main WSS web server, I’ll be using empty WebForms.
These files have nothin but the \<%@ Page header in the .aspx file, and
I’m manually writing out the RSS/OPML from inside the Page\_Load event.
It seems sloppy, but since WSS remaps the HTTP Handlers to do away with
everything but .aspx/System.Web.UI.PageHandlerFactory mapping, it’s the
best approach. Now I can drop rss.aspx/opml.aspx into the \_layouts vDir
and the compiled DLL into the bin subdirectory and I’m ready to go.

Other than import/export, what kind of OPML support is available in news
aggregators? With WSS RSS, you’ll be able to pull down an OPML directory
of a WSS site. It would be nice to have an interface to pick and choose
which feeds you care about, rather than importing all of them and then
deleting the ones you don’t want.

Also, is there any list of standard OPML outline attributes? I’m using:
title, description, type, xmlUrl, htmlUrl and SharePointID. The last one
is my own creation, and I put it in its own namespace. The others were
the attributes of the OPML export of my subscribed news feeds in
SharpReader.
