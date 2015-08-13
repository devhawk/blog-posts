Yesterday, I posted about [services and
reuse](http://devhawk.net/2006/09/19/a-question-of-context/). More
to the point, I posted why I don’t believe that business services will
be reusable, any more than business objects were reusable. However,
“can’t reuse business services” isn’t the whole story, because I believe
in different kinds of reuse.

The kind of reuse I was writing about yesterday is typically referred to
as “black box reuse”. The idea being that I can reuse the item (object
or service) with little or no understanding of how it works. Thomas Beck
[wrote about colored
boxes](http://www.beckshome.com/PermaLink,guid,7b0aa555-c37a-44e9-baf3-b69f6b1efc30.aspx)
on his blog yesterday. Context impacts reuse – the environments in which
you plan to reuse an item must be compatible with what the item expects.
However, those contextual requirements aren’t written down anywhere – at
least, they’re not encoded anywhere in the item’s interface. Those
contextual requirements are buried in the code – the code you’re not
supposed to look at because we’re striving for black box reuse. Opaque
Requirements == No Possibility of Reuse.

As I wrote yesterday, David Chappell [tears this type of reuse
apart](http://www.davidchappell.com/HTML_email/Opinari_No16_8_06.html)
fairly adeptly. Money quote: “Creating services that can be reused
requires predicting the future”. But black box reuse this isn’t the only
kind of reuse. It’s attractive, since it’s simple. At least it would be,
if it actually worked. So what kind of reuse *doesn’t* require
predicting the future?

Refactoring.

I realize most people probably don’t consider refactoring to be reuse.
But let’s take a look at the official definition from
[refactoring.com](http://refactoring.com/):

> Refactoring is a disciplined technique for restructuring an existing
> body of code, altering its internal structure without changing its
> external behavior. Its heart is a series of small behavior preserving
> transformations. Each transformation (called a ‘refactoring’) does
> little, but a sequence of transformations can produce a significant
> restructuring. Since each refactoring is small, it’s less likely to go
> wrong. The system is also kept fully working after each small
> refactoring, reducing the chances that a system can get seriously
> broken during the restructuring

Two things about this definition imply reuse. First, refactoring is
“restructuring an existing body of code”. It’s not rewriting that
existing body of code. You may be making changes to the code – this
certainly isn’t black box reuse – but you’re not scrapping the code
completely and starting over. Second, refactoring is making changes to
the code “without changing its external behavior”. You care about the
code’s external behavior because somewhere, some other code is calling
the code you’re refactoring. Some other existing piece of code that you
don’t want to change – i.e. that you want to reuse.

When you refactor, you still reuse a significant amount of the code, but
you’re not having to predict the future to do it. Refactoring**is the
kind of reuse I believe in.

In his article, David talks about types of reuse such as business
agility, adaptability and easily changeable orchestration. These look a
lot more like refactoring than black box reuse to me. Unfortunately,
David waves these away, saying  “Still, isn’t this just another form of
reuse?”. Reconfiguration hardly qualifies as “predict the future” style
reuse that he spends the rest of the article arguing against. It’s just
one paragraph in an otherwise splendid article, so I’ll give him a pass
this time. (I’m sure he’s relieved.)
