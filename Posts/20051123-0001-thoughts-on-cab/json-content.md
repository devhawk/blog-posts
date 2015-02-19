As I wrote earlier, I’m really impressed with
[p&p](http://msdn.microsoft.com/practices)‘s latest release – the
[Composite UI Application
Block](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnpag2/html/cabctp.asp).
I had to fly to Atlanta for a customer meeting last week and I spent
most of my spare time (flying, in hotel, etc) digging thru CAB. Well,
digging through CAB and reading [State of
Fear](http://www.crichton-official.com/fear/index.html) by [Michael
Crichton](http://www.crichton-official.com/). IMO, it’s his best book in
quite a while, perhaps second best he’s ever written after Jurassic
Park.

Back to CAB. First off, I want more information about ObjectBuilder.
p&p’s dependency injection framework is very impressive. However, with
the exception of the code, the code reference in the help files, the
unit tests, and a single article on how it was designed there just isn’t
much info on it. For example, I *know* I can use it to inject a concrete
type where a class is expecting an abstract type. But I couldn’t figure
out how so I went and asked [Peter](http://www.peterprovost.org/) and
[Brad](http://www.agileprogrammer.com/dotnetguy/). (Short answer – use
TypeMappingPolicy). Do me a favor, go contact
[Peter](http://www.peterprovost.org/contact.aspx) and
[David](http://www.agileprogrammer.com/dotnetguy/contact.aspx) and tell
them you want more info on ObjectBuilder. Sample code especially. Go on,
drop them a line right now while you’re thinking about it. I’ll wait.

Back already? Cool. One thing you can’t help but notice about CAB (and
OB for that matter) is the heavy use of attributes, which I feel is an
extremely elegant solution. Remember the first time you looked at
[NUnit](http://www.nunit.org/)? How *sensible* it seemed to use
attributes like [TestFixture], [Test] and [ExpectedException] compared
to what other xUnit frameworks provide? Get ready to experience that all
over again when you look at OB and CAB. Now you’re looking at attributes
like [CreateNew], [EventPublication] and [CommandHandler]. There’s a
reason why Sun [cloned
attributes](http://java.sun.com/j2se/1.5.0/docs/guide/language/annotations.html)
for J2SE 5.0 – it’s powerful (in the right hands). The attributes both
drive human readability – when you’re looking at a property adorned with
[CreateNew] or [Dependency] it’s obvious that these are injected – as
well as the implementation. Win-win as far as I’m concerned.

CAB does a great job of codifying standard patterns in smart client
design, such as events, commands and controllers, as well as
implementing completely new ideas such as workspaces, work items and
smart parts. And they’ve done it with an eye on the future. I love the
isolation between the windows forms specific parts of CAB and the
underlying infrastructure of CAB. Check out [this
picture](http://msdn.microsoft.com/library/en-us/dnpag2/html/cabcbt_02.png)
of the layers of CAB. By isolating all the WinForms specific stuff in a
separate assembly, they are well set up to support
[WPF](http://msdn.microsoft.com/windowsvista/building/presentation/)
while minimizing redundant effort. I can’t wait to see a
Microsoft.Practices.CompositeUI.Avalon project (because
Microsoft.Practices.CompositeUI.WindowsPresentationFoundation is just to
long a namespace).

However, I can’t shake the feeling of how complex this stuff is. Yeah,
you use CAB for solving complex problems, but there is a significant
learning curve here. I imagine debugging a CAB app will be significantly
non-trivial. Take a look at the final step of the walkthru app. Here’s
the sequence that gets “hello world” painted on the screen:

1.  Main entrypoint creates and runs the ShellApplication.
2.  ShellApplication creates a ShellForm window, which in turn contains
    the tabWorkspace1 workspace.
3.  ShellApplication dynamically loads MyModule because it’s listed in
    the ProfileCatalog.xml file.
4.  CAB creates an instance of the MyModuleInit class from the MyModule
    assembly.
5.  MyModuleInit creates and runs an instance of MyWorkItem.
6.  MyWorkItem creates a MyView and MyPresenter.
7.  MyWorkItem adds the MyView instance to the tabWorkspace1 workspace,
    hosted in the ShellForm
8.  MyPresenter handles the MyView load event and sets the message
    property of MyView to “Hello, World”

Of course, the point of a demo app like the walkthru is comprehension.
You would never use CAB to build this Hello World app. But I worry that
the level of complexity will put CAB beyond the reach or inclination on
many potential users. I imagine this single line of code will scare off
many would-be CAB developers:

<span style="COLOR: #008080">MyWorkItem</span> myWorkItem =
parentWorkItem.WorkItems.AddNew\<<span
style="COLOR: #008080">MyWorkItem</span>\>();

Given that most people are used to writing “<span
style="FONT-FAMILY: courier new"><span
style="COLOR: blue">new</span><span
style="COLOR: #008080">MyWorkItem</span>()</span>“, the line above
represents a significantly rise in complexity. Of course, CAB is trying
to solve a complex problem. I’m sure CAB’s designers would rather the
solution wasn’t so complex, but that’s the reality of the problem space
their dealing with.

If you can’t lower the complexity of your framework, it’s time to raise
the abstraction of your tools.

I wonder what CAB specific tooling would look like? At a minimum, it
would like built in support for the primary concepts in CAB – WorkItem,
SmartPart, Workspace and Service to name a few. Another opportunity
would be to move from embedded strings, used to identify events,
commands, UIExtensionSites and the like to true variable-style names
that could be validated at compile time, sort of like how LINQ is
extending C\# to get rid of embedded database query commands. There’s
lots of possibilities and the more I work w/ CAB the better idea I’ll
have about them.
