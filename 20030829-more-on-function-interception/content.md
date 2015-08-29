I got an email from [Steve
Maine](http://hyperthink.net/blog/default.aspx) who used JavaScript’s
support for function pointers to [extend the Page\_ClientValidate
function](http://hyperthink.net/blog/PermaLink.aspx?guid=70f18e5d-7fc8-4d54-a0c7-4df0e243f739).
Steve’s version calls the built-in version, but then sets the cursor
focus to the first invalid control (assuming there are any). Pretty
cool.

However, Steve goes on to talk about how quickly function interception
can become unmaintainable. Dealing with the ability to override expected
functionality is hard enough in object oriented languages. They call it
the “fragile base class problem” for a reason. In JavaScript, you have
the potential for the “fragile intercepted method problem”. Granted, [my
solution](art_submitfirefixup.aspx) is also “intercepting” a method,
albeit in a lo-tech, code injection, search-and-replace kind of way. But
maintainability needs to be of paramount importance in system design. I
don’t want to have to go mucking about in the plumbing primarily because
plumbing skills are at a premium (I hear
[Don](http://www.gotdotnet.com/team/dbox/) is [trying to hire
them](http://www.eweek.com/print_article/0,3668,a=45363,00.asp) all for
his team).
