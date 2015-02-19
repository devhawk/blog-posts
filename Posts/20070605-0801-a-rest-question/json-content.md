Since there appears to be at least a handful of RESTifarians among my
readership, I’m just going to throw this half-formed thought / almost
question out there. Maybe it’s a FAQ, in which case I’d appreciate a
pointer in the right direction.

My observations about REST are:

1.  REST is a an “[architectural style for distributed hypermedia
    systems](http://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)“.
2.  REST “[has been used to guide the design and
    development](http://roy.gbiv.com/pubs/dissertation/evaluation.htm)”
    of HTTP and URI.
3.  Therefore REST as an architectural style is independent of HTTP and
    URI.
4.  Yet, I get the feeling that the REST community would consider a
    solution that uses the REST architectural style but not HTTP and/or
    URI as “not RESTful”.

Am I wrong in observation \#4 above? If you’re addressing resources by
resource identifiers [aka URIs] but transferring those resource
representations over a durable duplex protocol [aka not HTTP], are you
still RESTing?

(Note, such a RESTful durable duplex protocol doesn’t exist to my
knowledge, though I would be very happy to be wrong about that. SSB does
durable duplex, but it doesn’t support URI style resource addressing.
Granted, if I was going to build a durable duplex RESTful protocol, I
would build on SSB – much the same way that HTTP builds on TCP. Though I
am a huge fan of SSB, I’m specifically *not* suggesting that SSB is
RESTful.)
