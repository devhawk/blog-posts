Now that I have [functions to access the parse
buffer](http://devhawk.net/2007/12/11/practical-f-parsing-the-parse-buffer/),
I better write some tests for them. Yes, I realize I should have written
the tests first, but the articles flow better this way.

I’ve written before that one of the benefits to side-effect free
functional programming is that it makes unit testing a breeze. But I
still need some type of [xUnit testing
framework](http://en.wikipedia.org/wiki/XUnit). I could write my own
native F\# xUnit framework, but given the availability of mature xUnit
frameworks on .NET, I’d really rather just use one of them.

Traditionally, I’ve used [NUnit](http://nunit.com) or [Visual Studio’s
unit testing
framework](http://msdn2.microsoft.com/library/ms243147.aspx), but
they’re designed to work with OO languages like C\#. In order to use
them from F\#, we have to use the OO features of F\#. Here’s an example
of some F\# unit tests using NUnit.

``` fsharp
type [<TestFixture>] parser_tests =
    class
        new () = {}

        [<Test>]
        member this.test_NC() =
            let Some(c,text) = NC !!"test"  
            Assert.Equal(c, 't')
            Assert.Equal(text, !!"est")

        [<Test>]
        member this.test_NC_empty_string() =
            let ret = NC !!""  
            Assert.Equal(None, ret)
    end
```

While this works, there’s an awful lot of extraneous text needed to make
this work. Test functions need to be methods on a Test Fixture class
(note, F\# uses [\< \>] to indicate attributes) and that class needs a
default constructor. F\# doesn’t add one by default, so we have to do so
manually. And every test function needs to be marked with “member this”.

I’d really rather write tests that looks like this:

``` fsharp
[<Test>]
let test_NC =
    let Some(c,text) = NC !!"test"  
    Assert.Equal(c, 't')
    Assert.Equal(text, !!"est")

[<Test>]
let test_NC_empty_string =
    let ret = NC !!""  
    Assert.Equal(None, ret)
```

That’s a lot more straightforward. If only I could write my test code
like that…

It turns out there’s a new kid on the .NET unit testing block.
[xUnit.net](http://www.codeplex.com/xunit) is the brainchild of [Jim
Newkirk](http://jamesnewkirk.typepad.com/posts/) (one of the original
NUnit developers) and [Brad
Wilson](http://www.agileprogrammer.com/dotnetguy/) (aka the .NET Guy).
Among other things, xUnit.net does away with the TestFixture attribute.
All public methods in all public classes are checked for tests in
xUnit.net.

Since we don’t need the TestFixture, does that mean I can write the
tests as F\# functions if I use xUnit.net? Not quite. xUnit.net only
checks for public *instance* methods on the public classes in a test
assembly. But F\# functions get compiled as *static* methods. Luckily,
xUnit.net is simple enough to change. I submitted a patch to xUnit.net
that enables it to find both static and instance test methods (and to
skip creating and disposing an object instance for static test methods).
I’m hoping it will be accepted and ship as part of their next release.
Until then, I’m running my own private build with those changes
included.

Now that I’ve settled on a unit test framework, let’s look at some
tests. For my parser solution, I have two projects: PegParser and
PegParser.Tests. The tests project depends both on the PegParser
assembly as well as xunit.dll, so I need to set a reference to both in
my project. F\# projects in VS don’t have the References node in the
project tree, you have to either add the references on the project
property page or directly within the code. Not sure which is better, but
it’s easier to show the code syntax:

``` fsharp
#R @"....xUnit.netMainxunitbinDebugxunit.dll"
#R @"..PegParserpegparser.dll"

open Xunit
open Parser
```

The \#R compiler directive is used to reference an external assembly.
F\#’s open statement acts like C\#’s using statement, so I can reference
types without specifying their full namespace. You’ll notice that the
parser is implemented in a dll called pegparser.dll while the namespace
is simply Parser. Actually, it’s not really a namespace. If you open
PegParser.dll in Reflector, you’ll notice that Parser is actually a
type, and the functions are all implemented as static methods. F\# hides
that from you, though you’d have to know that if you wanted to invoke
the parser from C\# or VB.net. By default, F\# uses the filename as the
namespace/class name and I haven’t changed that default in my parser
code (though I probably should).

Once we’ve referenced the correct assemblies, I need to write the tests.
Here are two tests for NC (aka Next Char) function I wrote in the [last
post](http://devhawk.net/2007/12/11/practical-f-parsing-the-parse-buffer/).

``` fsharp
[<Fact>]
let test_NC_empty_string () =
    let ret = NC !!""
    Assert.Equal(None, ret)  

[<Fact>]
let test_NC_simple_string () =
    let Some(c,text) = NC !!"test"
    Assert.Equal(c, 't')
    Assert.Equal(text, !!"est")
```

You’ll notice this code is almost identical to my wish test code above.
Almost. There are a few syntax changes – In xUnit.net, tests are called
facts and Assert.AreEqual is simply Assert.Equal. I’ve also had to add
empty parentheses after each test function name. Remember that functions
in FP are like math functions. If there’s no independent value to pass
in, the result of a math function is is constant. F\# compiles
parameter-less functions as static properties instead of a static
methods. In order to make the test functions compile as static methods,
we have to pass in at least one parameter. In F\#, the unit type is the
equivalent of the void type in C\#. Unit has exactly one valid value –
the empty parens. Adding the empty parens to the parameter list of the
test functions ensures they get compiled into static methods.

Note, it’s really really easy to forget to add those empty parens. If
you don’t add them, the code will still compile, but the tests won’t be
found or run. I’ve been bit by that once already, so if you have a bunch
of tests not running, make sure they have the empty parens!

So each test method feeds a parse buffer (converted from a string with
the custom !! operator) into the NC function and makes assertions about
the result. In the first test, NC should return None if the parse buffer
is empty, so I simply compare the function result to None via
Assert.Equals. In the second test, I use F\#’s pattern matching
capability to assign the result of NC to the value Some(c,text).
Basically, this is doing simple pattern matching to bind the two value
names to the two parts of the tuple returned from NC. Those two values
are then asserted to be a specific values as you would expect.

Note, in the current version of F\#, the line ``let Some(c,text) = NC
!!"test"`` yields two warnings. The first (FS0062) warns that a future
version of the language will require parens around Some(c,text). I sure
hope they change their minds on this, since active patterns are already
so parens-heavy. The second (FS0025) warns that this is an incomplete
pattern match. If NC returns None, the pattern wont match and the
function will throw a MatchFailureException. Of course, since these are
unit tests, that’s exactly the behavior I want! Given the nature of
these warnings, personally, I turn them both off (only in my unit tests,
mind you). This is done via the \#nowarn compiler directives at the top
of the file.

``` fsharp
#nowarn "25" //Turn off Incomplete Pattern Match warning
#nowarn "62" //Turn off Some contruct needs parens warning
```

Obviously, there are more tests than just these (though my total code
coverage is pretty poor, shame on me) but they’re all pretty similar. As
you can see, there’s tests are very straight forward. The nature of FP
functions makes them fairly simple to test, and xUnit.net (with a couple
of minor changes) makes it easy to write your unit tests in F\#.
