A couple of weeks ago, [David Chappell](http://www.davidchappell.com)
posted a great article on [SOA and the Reality of
Reuse](http://www.davidchappell.com/HTML_email/Opinari_No16_8_06.html).
When someone mentions the idea of using SOA for reuse, I cringe. David
does a great job blowing the “SOA for Reuse” argument out of the water.
In the future, I will just send that link rather than spending the time
arguing out the point.

But something nagged at the back of my brain about that post. David
starts by talking about object reuse before making the parallel to
services. The problem with that comparison is that object reuse *hasn’t*
been a failure. When was the last time you wrote a String class? A
Linked List? A Button? There’s been support for
[Buttons](http://msdn.microsoft.com/library/en-us/shellcc/platform/commctls/buttons/buttons.asp)
in Windows since at least the 3.x days (probably longer, but that’s
before my time). Whatever your OO language of choice, there’s a big
collection of reusable objects to go with it.

Given his position as “famous technology author”, I’m assuming David is
well aware of successes of object reuse. Furthermore, I doubt it was an
accident that in his article he writes that “reuse of
**business** objects failed” (emphasis added). While there has been
success around object reuse, essentially none of those successes have
been in a business scenario. In fact, there have been some high profile
projects such as [Microsoft’s Business
Framework](http://www.microsoft-watch.com/article2/0,1995,1875024,00.asp)
and [IBM’s San Francisco
Project](http://www.research.ibm.com/journal/sj/373/rubin.html) that
have ~~crashed and burned~~ been significantly less than successful.

So here’s the question: given that general object reuse has seen some
success, what’s so different about business objects that causes reuse to
fail utterly? Since we’re really interested in service reuse, knowing
why some object reuse succeeds and other reuse fails will help us
understand which services are likely to be reusable and which wont. I
would say that success of object reuse hinges on context.

Wikipedia gives this definition of
[context](http://en.wikipedia.org/wiki/Context): “The **context** of an
event, word, paradigm, change or other reality includes the
circumstances and conditions which ***surround*** it.” (emphasis in
original) For example, the word “order” is ambiguous. If you’re using a
procurement system for the military, you could conceivably be given an
order to place an order. (OK, that’s silly. But you get the idea.) The
word “order” has two different meanings. However, the words that
surround the ambiguous term make the meaning clear. An order that you
place is different that an order that you give. That’s context.

A string or a linked list or a button has very little in the way of
contextual needs. That is to say you can use it the exact same way in a
wide variety of environments. A business object on the other hand has
significant contextual requirements, which makes reuse difficult or
impossible. For example, a Purchase Order object from the
above-mentioned military procurement system sounds like it might be
reusable. At least until you take into account the differences between
branches of the military, between ordering tanks and ordering uniforms,
between active units and reserve units, etc. Once the generic Purchase
Order has been specialized to the point of practical usability for a
given scenario, it’s no longer reusable in the general case.

Taking this back to the service realm, likewise I figure the reusable
services will be the ones with little or no contextual needs. A good
example is the identity and directory services such as [Active
Directory](http://www.microsoft.com/windowsserver2003/technologies/directory/activedirectory)
and its competitors. Sure, you use LDAP not SOAP to access it, but AD is
certainly both reusable and a service plus it’s in wide usage. Other
candidates for reusable services my team is looking at are service
directory, management and operations, business activity monitoring and
provisioning.

I actually think there will be *less* reuse in services than there was
with objects. The value of reuse of services has to exceed not only the
contextual issues but also the overhead of distributed access. Calling
across the network is an expensive operation – whatever’s on the other
side better be worth the drive. I’m guessing for services, more often
than not, reuse won’t be worth the trip (if it’s possible at all).

**Update**: David pointed out to me that the last paragraph of his
article begins:

> Object reuse has been successful in some areas. The large class
> libraries in J2EE and the .NET Framework are perhaps the most
> important examples of this.

Doh! I guess my “assumption” that David is aware of successful object
reuse was correct.
