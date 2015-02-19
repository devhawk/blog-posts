[Brad Abrams
blogged](http://blogs.gotdotnet.com/BradA/permalink.aspx/cc77c794-a681-415d-8538-e3188129abe9)
on the importance of measuring performance before making design changes.
“Have you measured it?” is a question I ask customers all the time.
Recently, I was meeting with an ISV that had been directed to me
regarding improving the performance of their .NET app. They were using
.NET Remoting between their web and app tiers. They were using the HTTP
channel with the binary data formatter and felt that if they moved to
the TCP channel they would improve their performance dramatically.
However, making this switch would entail writing a non-trivial amount of
“plumbing”. They would need their own service to host the objects
instead of just using IIS. They would also need to build custom code to
support encryption and authentication on the TCP channel (I know there
is
[demo](http://msdn.microsoft.com/msdnmag/issues/03/06/NETRemoting/toc.asp)[code](http://msdn.microsoft.com/library/en-us/dndotnet/html/remsec.asp)
for doing this floating about – but as an ISV, they would need to
support the code as if they had written it which is still non-trival).

It turns out they had not, in fact, measured the impact. And in digging
deeper in their architecture, it turned out that they were making
multiple calls between their web front end and application tier on each
web page request, with the average being about five. While TCP is in
fact faster than HTTP, it’s not going to provide the same level of
improvement that collapsing those five remote calls into one would be. I
explained to them the [Remote
Facade](http://www.martinfowler.com/eaaCatalog/remoteFacade.html) and
[Data Transfer
Object](http://www.martinfowler.com/eaaCatalog/dataTransferObject.html)
patterns as a way to dramatically improve the performance of their
application while avoiding the need to build/maintain a bunch of
plumbing. They liked it and as far as I know, they decided to head in
that direction. I’m waiting to hear exactly how much of a performance
gain they get.

If you don’t measure, you don’t know where the bottle necks are and you
don’t know where to get the greatest impact for the least amount of
effort.
