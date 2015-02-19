> I think one of the reasons that the RPC model still dominates many
> people’s thinking is that we really haven’t gone beyond the HTTP
> binding defined in the first SOAP spec. For better or worse, as long
> as we are focused on a client-initiated request/response model,
> developers are going to think of it as RPC (even though HTTP deals in
> streamed bytes, not callstacks). WS-Addressing opens the door to other
> possibilities – like sending response messages to places other than
> the implicit port at the other end of the HTTP connection.
>
> With a standard way to describe where messages are supposed to go,
> what their intent is, and how they relate to one another, we can start
> building systems that use SOAP messages in other ways (without the
> complexities of WS-Routings message paths). That in turn will start to
> influence WSDL. In short, WS-Addressing may be the forcing function we
> need to really start moving away from the the current RPC-centric view
> of the world into more interesting areas.\
>  [[Tim Ewald’s Spoutlet: Pushing the
> Envelope](http://www.gotdotnet.com/team/tewald/default.aspx?key=2003-03-21T03:23:54Z)]

I’ve [expressed my
frustration](PermaLink.aspx?guid=c2eeb3f8-ca88-4627-bea7-ec49e75f0a1f)
with WSDL’s special treatment of HTTP with regard to the Action
attribute before. If
[WS-Addressing](http://msdn.microsoft.com/webservices/default.aspx?pull=/library/en-us/dnglobspec/html/ws-addressing.asp)
can help move WSDL in the right direction, I’m all for it.

My only concern is that there seems to be a lot of overlap with
[WS-Routing](http://msdn.microsoft.com/webservices/understanding/specs/default.aspx?pull=/library/en-us/dnglobspec/html/ws-routing.asp).
Both specs define an Action element that corresponds to the WSDL
soapAction attribute. Both specs define Message ID and RelatesTo
elements. Both specs define from and to addresses, though WS-Routing’s
message paths are much more flexible (and complex). Does WS-Addressing
imply WS-Routing is in for a major change?
