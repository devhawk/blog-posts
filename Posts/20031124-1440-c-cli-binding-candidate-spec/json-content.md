I [blogged](http://devhawk.net/2003/10/06/2-great-technologies-that-taste-great-together/) on
the new ECMA working group for [standardizing the C++ binding for
CLI](http://www.ecma-international.org/news/ecma-TG5-PR.htm) last month.
Last week, [Herb Sutter](http://blogs.gotdotnet.com/hsutter/) 
[blogged](http://blogs.gotdotnet.com/hsutter/permalink.aspx/44e3520b-b8ca-4961-8930-59346e721a9b)
the [candidate
specification](http://download.microsoft.com/download/9/9/c/99c65bcd-ac66-482e-8dc1-0e14cd1670cd/C++%20CLI%20Candidate%20Base%20Draft.pdf).
And to answer the question I posed, it does appear that the double
underscore syntax has been removed. Instead of “\_\_gc class {…}”, it’s
just “ref class”. For \_\_value and \_\_property, you just lose the
double underscore. Cool, though it does mean any MC++ code will
eventually need to be migrated to the new syntax. Also. the
specification is forward looking, including support for CLI generics.

Herb also blogged in depth on the [new
keywords](http://blogs.gotdotnet.com/hsutter/permalink.aspx/9a9b7f1a-652e-4f18-b431-bfea2fd554d7)
as well as the [gcnew
operator](http://blogs.gotdotnet.com/hsutter/permalink.aspx/bc7a98db-6b1f-40d3-b9ce-14b3708c400d).
