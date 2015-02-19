I got an email from [Phil Weber](http://www.philweber.com/net/) who had
an [interesting
solution](http://www.philweber.com/net/stories/2002/11/20/aTaleOfTabbedPages.htm)
to the [\_\_doPostBack
problem](PermaLink.aspx?guid=47d1ff39-9789-41bf-8c76-68bf1316aa33). He
used JavaScript’s [function pointer
support](http://www.insidedhtml.com/tips/functions/ts18/page1.asp) to
redirect \_\_doPostBack to a function of his own creation. In this
function, he can add whatever functionality he wants, including a call
to the original \_\_doPostBack method. And what’s funny, like me he was
having an issue with a rich text editor. What is it about rich text
editors? (They’re non standard, that’s probably what it is).

This is a pretty elegant solution. Especially since his solution can be
enabled on a single page as needed. My solution processes every page
output from the site. The primary benefit of my solution is that it can
add the additional code directly into the \_\_doPostBack function, which
means I don’t have to replicate the code to get the “theform” instance.
Also, since it automatically fixes up every page in the web app, I don’t
have to remember to turn it on in every page.

If you ask Phil nicely, he might send you his code. If we all ask him
nicely, maybe he’ll post it.
