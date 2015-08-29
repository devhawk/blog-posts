If you like C++ and CLI, you’re going to love
[ECMA](http://www.ecma-international.org) TG5 of TC39. Task Group 5 of
Technical Committee 39 is going to tackle [C++ bindings for
CLI](http://www.ecma-international.org/news/ecma-TG5-PR.htm). Since it’s
starting from a draft to be submitted by Microsoft, I assume they will
be using all the existing keywords like \_\_gc, \_\_value and
\_\_property. I wonder if they’ll strip out the double underscore
prefix?

BTW, if you think the C++ / CLI combination is a waste of time, I say
don’t knock it ’till you try it. If you’re wrapping an existing codebase
with a C or C++ API, it’s much easier to expose a managed interface with
MC++ than C\#. Don’t believe me? Go take a complicated C structure like
[WSAQUERYSET](http://msdn.microsoft.com/library/en-us/winsock/winsock/wsaqueryset_2.asp)
and implement it via C\#.
