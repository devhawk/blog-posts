I’m doing a bunch of database / XML stuff @ work, so I decided to use to
[VS08 beta 2](http://msdn2.microsoft.com/en-us/vstudio/aa700831.aspx) so
I can use LINQ. For reasons I don’t want to get into, I needed a way to
convert arbitrary database rows, read using a SqlDataReader, into XML.
LINQ to SQL was out, since the code has to work against arbitrary tables
(i.e. I have no compile time schema knowledge). But <span
style="text-decoration: line-through;">XLinq</span> LINQ to XML helped
me out a ton. Check out this example:

``` csharp
const string ns = "{http://some.sample.namespace.schema}";

while (dr.Read())
{
    XElement rowXml = new XElement(ns + tableName,
        from i in GetRange(0, dr.FieldCount)
        select new XElement(ns + dr.GetName(i), dr.GetValue(i)));
}
```

That’s pretty cool. The only strange thing in there is the GetRange
method. I needed an easy way to build a range of integers from zero to
the number of fields in the data reader. I wasn’t sure of any standard
way, so I wrote this little two line function:

``` csharp
IEnumerable<int> GetRange(int min, int max)
{
    for (int i = min; i < max; i++)
        yield return i;
}
```

It’s simple enough, but I found it strange that I couldn’t find a
standard way to generate a range with a more elegant syntax. Ruby has
standard range syntax that looks like (1..10), but I couldn’t find the
equivalent C\#. Did I miss something, or am I really on my own to write
a GetRange function?

<span style="text-decoration: underline;">Update</span> – As expected, I
missed something. John Lewicki pointed me to the static
[Enumerable.Range](http://msdn2.microsoft.com/en-us/library/system.linq.enumerable.range(VS.90).aspx)
method that does exactly what I needed.
