[Sam Gentile
writes](http://codebetter.com/blogs/sam.gentile/archive/2007/01/10/New-and-Notable-134.aspx):

> [Harry finds Indigo
> daunting](http://devhawk.net/2007/01/05/Morning+Coffee+4.aspx). Me, I
> find mastering 8 different stacks (COM+/ES, ASMX, WSE, Remoting, MSMQ,
> etc) to do the same thing and all the strange nuances a hell of a lot
> more daunting but that’s just me, although the number of timeout
> settings and config settings is astronomical.

While mastering many different stacks *is* daunting, the reality is you
don’t have to master all of them to use one of them. Knowing Sam, he
probably has mastered all the different stacks, but MVP’s like Sam are
an edge case. Most developer don’t master *any* of the stacks, they get
comfortable with the one or two stacks they use all the time.

From that perspective, WCF replaces the “legacy” stack a given developer
understands with something much more complex, since WCF replaces legacy
stacks *other* than the one said developer is familiar with. Options
like message exchange patterns and network protocol were typically
implicit to a given technology stack. For example, if you used ASMX, you
could use any network protocol you want, as long as it’s HTTP. Using
WCF, you get to / have to choose which network protocol you want to use.
Multiply that decision making process by the “astronomical” number of
choices WCF provides, and you’ve got to spend a long time making
decisions that the “legacy” stacks handled for you automatically.

To me, it looks like WCF’s primary design goals were to support web
service standards (aka WS-\*) as well as to unify the disparate
communications stacks. And I think WCF was fairly successful at these
two goals. Previously, the capabilities you needed would drive your
communication stack choice. Need web service interop? Use ASMX. Need
low-level control over the message pipeline? Use .NET Remoting. Need to
flow transactions? Use COM+. Need to flow transactions over web services
with low-level control over the message pipeline? Until WCF came along,
you were SOL.

However, if “ease of development” was a goal for WCF, it doesn’t look
like it was high on the list. And frankly, that’s fine. As I’ve [written
before](http://devhawk.net/wcf+karma.aspx), I’d rather have a flexible
if complicated low-level foundation to build higher-abstracted
application infrastrucutre on top of.

Just don’t try and sell me that WCF is making my life easier, because
it’s not. Not yet, anyway.
