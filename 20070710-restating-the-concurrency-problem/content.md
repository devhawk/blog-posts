I’ll be honest, I recommended Herb Sutter’s concurrency series in
[today’s Morning
Coffee](http://devhawk.net/2007/07/10/morning-coffee-99/) because it
a series on concurrency by Herb Sutter. In other words, I hadn’t
actually read it yet, but I know how good Sutter’s stuff is. Now I have
read it and I wanted to re-issue my recommendation, even more strongly.
[Go read it](http://www.ddj.com/dept/architect/200001985).

Interestingly enough, I like the article because it doesn’t provide an
“answer” to the problem of concurrency. Rather, by providing a mental
model, it essentially is a concise and precise restatement of the
*problem*. Often, in the rush to find a solution to a problem, this step
is skipped and it isn’t until the end that you realize that you
misunderstood the original problem and what you built doesn’t match what
you need.

I’ve often argued that this is also the key to selling in the
enterprise. In my experience, whatever solution you’re selling is
usually way too complicated to be understood by the people who have the
purchasing power to buy it. So explaining how your solution works or how
your solution solves the problem isn’t going to get you very far.
However, the buyer does understand the problem at hand. Being able to
demonstrate that you understand the fundamental nature of the problem
and can communicate it back to them garners you a great deal of trust in
the selling process. If you can show that you understand their problem,
then you probably know how to fix it – even if the buyer doesn’t
understand how your solution works.

One other quick thought on Sutter’s article. In discussing the use of
concurrency to keep a GUI responsive (aka Pillar 1), he wrote the
following:

> Today, we typically express Pillar 1 by running the background work on
> its own thread or as a work item on a thread pool; the foreground task
> that wants to stay responsive is typically long-running and is usually
> a thread; and communication happens through message queues and
> message-like abstractions like futures (Java *Future*, .NET
> *IAsyncResult*). In coming years, we’ll get new tools and abstractions
> in this pillar, where potential candidates include active
> objects/services (objects that conceptually run on their own thread,
> and calling a method is an asynchronous message); channels of
> communication between two or more tasks; and 
> **contracts that
> let us explicitly express, enforce, and validate the expected order of
> messages**. [emphasis added]

If we’re going to provide the ability to express, enforce and validate
the expected order of messages between concurrent blocks of code, can we
also do it for services across the network? WSDL is wholly deficient in
this area. [SSDL’s](http://ssdl.org) [Communicating Sequential
Processes](http://ssdl.org/docs/v1.3/html/CSP%20SSDL%20Protocol%20Framework%20v1.3.html)
(CSP) and
[Rules-based](http://ssdl.org/docs/v1.3/html/Rules%20SSDL%20Protocol%20Framework%20v1.3.html)
Protocol Frameworks are a good start.
