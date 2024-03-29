A few months ago, Ted Neward wrote a [great
article](http://msdn.microsoft.com/library/en-us/dndotnet/html/linqcomparisons.asp)
about the history of the Object Relational Impedance Mismatch problem
and how [LINQ](http://msdn.microsoft.com/netframework/future/linq) is
addressing it in a new way. Basically, LINQ is introducing new language
abstractions and complementary libraries to enable queries as a first
class concept within the language. However, I don’t believe that O/R
Impedance Mismatch is the whole problem. More specifically, it’s a
follow-on problem to what I would call the Dual Schema problem.

In a nutshell, the Dual Schema problem is that you have to design and
implement two separate versions of your persistent entities. There’s the
in memory version, typically written in an OO language like C\# or Java.
Then there’s the on disk version, typically written in SQL. Regardless
of the difficulties translating between the two versions (i.e. the
aforementioned impedance mismatch), you have to first deal with the
complexity of keeping the two versions in sync. While LINQ does a great
job eliminating much of the friction translating between on disk and in
memory formats, it could go much farther by eliminating the need for
translation in the first place.

A variety of solutions to the Dual Schema problem have evolved,
primarily outside the hallowed halls of enterprise vendors (i.e. MS and
others like us). One such solution is [Ruby on
Rails](http://www.rubyonrails.com/). In a Rails environment, I simply
declare the existence of a given persistent entity:

``` ruby
class Person < ActiveRecord::Base
end
```

The ActiveRecord base class (a standard part of Rails) will dynamically
create methods and attributes on the Person object at runtime, based on
the schema of the People table in the database. (Rails is smart enough
to understand English plurals, hence the automatic connection of Person
and People.) So technically there are still two schemas, but the
in-memory version is automatically derived of the on-disk version.

(Note, DLinq provides a conceptually similar tool – SqlMetal – that can
generate the static types from a given database schema. However, as
static types they have to be defined at compile time. So while SqlMetal
reduces the effort to keep schemas in sync, it doesn’t eliminate it the
way Rails does.)

By slaving the object schema to the database schema, Rails essentially
solves the Dual Schema problem. The problem with the Rails approach is
that defining a database schema requires a significant amount of skill
and effort. Defining classes is typically trivial in comparison.The fact
Rails allows you to implement a persistent entity with almost no code
doesn’t help you much if you have to write and maintain a ton of SQL
code to define your database schema.

I believe the Rails model is actually backwards. It would be much better
for the developer if they could define their persistent entity in code
and slave the database schema to the object model instead of the other
way around.

Of course, this approach isn’t exactly news. In his article, Ted writes
of the rise and fall of OO database management systems, which were
supposed to solve the Dual Schema and Impedance Mismatch problems. I’m
certainly not suggesting a return to the heyday of OODBMS. However, one
of the reasons Ted points out OODBMS failed was because big companies
were already wedded to RDBMS. But those big companies are the short
head. As you move down the [long tail of
software](http://bnoopy.typepad.com/bnoopy/2005/03/the_long_tail_o.html),
relational database as the primary storage paradigm makes less and less
sense. For the vast majority of applications, relational databases are
overkill.

Ted’s other point about OODBMS is that loose coupling between the data
store and the in memory representation is a feature, not a flaw. He’s
totally right. But can’t we advance the state of the art in database
typing to the level of modern day OO languages? How about eliminating
anachronisms like fixed length strings? What if we derive the database
schema from the object model – Rails in reverse if you will – but is
still loosely coupled enough to allow for schema evolution?

An example of this code-centric model for data storage is
[Consus](http://www.garret.ru/~knizhnik/consus.html). It’s written by
Konstantin Knizhnik, who has written a bunch of [open source,
object-oriented and object-relational
databases](http://www.garret.ru/~knizhnik/databases.html) across a wide
variety of languages and execution environments, including CLR. Consus
is actually written in Java, but he provides version compiled for .NET
using [Visual J\#](http://msdn.microsoft.com/vjsharp/). Consus lets you
to define your data either as tables or objects. So you can do this:

``` java
Statement st = db.createStatement();
st.executeUpdate("create table Person (name string, address string, salary bigint)");
st.executeUpdate("insert into Person values ('John Smith', '1 Guildhall St.', 75000)");
ResultSet rs = st.executeQuery(
    "select name, address, salary from Person where salary > 100000");
```

Or you can do this:

``` java
class Person {
    String name;
    String address;
    long salary;
    Person(String aName, long aSalary, String aAddress) {
        name = aName;
        salary = aSalary;
        address = aAddress;
    }
};

Person p = new Person("John Smith", 75000, "1 Guildhall St.");
ConsusStatement st = db.createStatement();
stmt.insert(p);
ConsusResultSet cursor = (ConsusResultSet)st.executeQuery(
    "select from Person where salary > 100000");
```

Consus also handles OO concepts like derivation and containment. Of
course, the embedded queries are ugly, but you could imagine DLinq style
support for Consus. In fact, one of the primary issues with Consus is
that it supports both object and tuple style queries. When you
explicitly request tables (i.e. “select name, address salary from
Person”), you’ve got a tuple style query. When you don’t (i.e. “select
from Person”) you’ve got an object style query. Of course, the issues
with tuple style queries are well documented in Ted’s article and is
exactly the problem that LINQ is designed to solve.

(Konstantin, if you’re reading this, [drop me a
line](mailto:harry.pierson@microsoft.com) and I’ll look into getting you
hooked up with the LINQ folks if you’re interested in adding LINQ
support to Consus.NET.)

The tradeoff between the Rails approach and the Consus approach is one
of performance. I have a ton of respect for Konstantin and the work he’s
done on Consus and other OO and OR databases available from his site.
However, I sure the combined developer forces at major database vendors
like Microsoft (and other DB companies) means SQL Server (and the like)
will out perform Consus by a significant margin, especially on large
scale databases. So if execution performance is your primary criteria,
the Ruby on Rails approach is better (leaving aside discussion of the
Ruby runtime itself). However, in the long run execution performance is
much less important than developer productivity. So I believe that  for
all the current interest in Rails, I think a Consus-style model will
become dominant.
