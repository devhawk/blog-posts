Like .NET, Python uses namespaces to avoid name collisions. However, the
semantics are a bit different. If you want to use a type or function
from a a given namespace in Python, you have to import it into your
current scope. For example, if you want to use the Python datetime
built-in module, you would import it into the current scope and use it
like this:

``` python
import datetime
bush_last_day = datetime.date(2009,1,20)
```

Notice that when I import a Python module this way, it’s scoped into
it’s namespace, which forces me to use the entire namespace scoped name
to access the type. Of course, that gets tedious quickly, so Python
provides a way to import a type from a specific namespace into your
current scope like this:

``` python
from datetime import date
bush_last_day = date(2009,1,20)
```

With IronPython, you can do import .NET namespaces as well. Here’s that
same code using the standard .NET [DateTime
class](http://msdn2.microsoft.com/library/System.DateTime).

``` python
from System import DateTime
bush_last_day = DateTime(2009,1,20)
```

What I didn’t know is that you can import static methods & properties
from .NET types into the current scope using the same syntax. Here’s an
example:

``` python
from System.DateTime import Now

if Now >= bush_last_day:
    print 'celebrate'
else:
    print (bush_last_day - Now).Days, 'days left'
```

Being able to import a static method into the current scope is pretty
convenient. Thanks to [my teammate
Jimmy](http://blog.jimmy.schementi.com/) for cluing me into this IPy
feature.

One caveat though: in Python, you can import an entire namespace into
your current scope. You can do that with .NET namespaces, but not with
.NET types

``` python
from datetime import *         # this works
from System import *           # so does this
from System.DateTime import *  # this doesn’t work
```

**<span style="text-decoration: underline;">Update</span>**: [Michael
Foord](http://www.voidspace.org.uk/python/weblog/index.shtml) [pointed
out](http://devhawk.net/2008/04/28/importing-static-methods-with-ipy/)
that if you import Now as I describe above, it places a DateTime object
representing the time you imported it into local scope, rather than
placing the underlying get\_Now static method in local scope. So while
DateTime.Now always returns a new value, Now never changes. Sounds like
an [IPy
bug](http://www.codeplex.com/IronPython/WorkItem/View.aspx?WorkItemId=16323)
to me, but I’ll have to circle back with the team to be sure.
