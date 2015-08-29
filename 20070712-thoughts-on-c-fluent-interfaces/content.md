Martin Fowler [points
to](http://martinfowler.com/bliki/DslReadings.html) a
[couple](http://andersnoras.com/blogs/anoras/archive/2007/07/04/i-m-coming-down-with-a-serious-case-of-the-dsls.aspx)
of
[articles](http://andersnoras.com/blogs/anoras/archive/2007/07/09/behind-the-scenes-of-the-planning-dsl.aspx)
by Anders Norås on building internal / embedded domain specific
languages in C\#. Anders has built a DSL for creating calendar events
and tasks, like you might expect to do in Outlook. Here’s an example:

``` csharp
ToDoComponent planningTask =
   Plan.ToDo("Plan project X").
      StartingNow.
      MustBeCompletedBy("2007.08.17").
      ClassifyAs("Public");
planningTask.Save();

EventComponent planningMeeting =
   Plan.Event("Project planning meeting").
      RelatedTo(planningTask).
      WithPriority(1).
      At("Head office").
      OrganizedBy("jane@megacorp.com", "Jane Doe").
      StartingAt("12:00").Lasting(45).Minutes.
      Attendants(
         "peter@megacorp.com",
         "paul@megacorp.com",
         "mary@contractor.com").AreRequired.
      Attendant("john@megacorp.com").IsOptional.
      Resource("Projector").IsRequired.
      ClassifyAs("Public").
      CategorizeAs("Businees", "Development").
      Recurring.Until(2008).EverySingle.Week.On(Day.Thursday).
      Except.Each.Year.In(Month.July | Month.August);
planningMeeting.SendInvitations();
```

It may not be as clean as a say a Ruby version might be, but even with
all the parens and periods it’s still pretty readable. Fowler calls this
a [fluent
interface](http://www.martinfowler.com/bliki/FluentInterface.html), a
term I like better than “internal DSL”.

Two things jumped out at me reading Anders’
[entry](http://andersnoras.com/blogs/anoras/archive/2007/07/09/behind-the-scenes-of-the-planning-dsl.aspx)
on how he built this fluent interface. First, there’s a lot of code to
make this work. Anders didn’t publish the code, but he did admit:

> “Believe me, there will be a lot of code when you’re done. I’m almost
> there with this DSL, and at the time of writing it consists of 58
> classes not including the API and tests.”

That’s 58 classes just to implement the fluent interface, not counting
the underlying EventComponent API. That’s a lot of non-business logic
code to write. How many projects are willing to invest that kind of time
and effort to build a fluent interface? (I would guess “not many”)

However, I bet there’s a lot of template-izable code in Anders fluent
interface. When he writes about keeping the language consistent by
“creating branches within our grammar using different descriptor
objects”, I can help but think about parser development with
[YACC](http://en.wikipedia.org/wiki/YACC) and the like. These tools
typically use a DSL like
[BNF](http://en.wikipedia.org/wiki/Backus-Naur_form). Maybe we could
build a DSL for building fluent interfaces?

Second, Anders makes a very interesting point about the structure of the
fluent interface code:

> Writing DSLs is a little different from the regular object oriented
> programming style. You might have noticed that the Plan class has a
> verb for its name rather than the usual noun. This allows us to have a
> natural starting point for writing out the “sentence” explaining our
> intention.

Where have you seen this verb based approach before? Powershell cmdlets.

> Windows PowerShell uses a verb-noun pair format for the names of
> cmdlets and their derived .NET classes. For example, the Get-Command
> cmdlet provided by Windows PowerShell is used to retrieve all commands
> registered in the Windows PowerShell shell. The verb part of the name
> identifies the action that the cmdlet performs. The noun part of the
> name identifies the entity on which the action is performed.\
> [[Cmdlet Verb
> Names](http://msdn2.microsoft.com/en-us/library/ms714428.aspx), MSDN
> Library]

I’ve
[written](http://devhawk.net/2007/02/06/perusing-powershell-part-1-get-sqlserver/)
about this aspect of PowerShell before:

> In OO, most of the focus is on objects, naturally. However,
> administrators (i.e. the target audience of PS) tend to be much more
> task or action focused than object focused. Most OO languages don’t
> have actions as a first class citizens within the language. C\# and
> Java don’t even allow stand alone functions – they always have to be
> at least static members of a class.
>
> I’m fairly sure there are many reasons why strongly typed OO languages
> aren’t popular among administrators. I’m not going to go down the
> static/dynamic typing rat hole here, but I would guess the
> object/action language tradeoff is almost as important as the typing
> tradeoff. What’s nice about PowerShell is that while it has strong
> object support, it also has strong action support as well. In PS,
> actions are called Cmdlets. While I’m not a big fan of the name,
> having first class support for them in PS is one of the things I find
> most interesting.\
> [[Perusing Powershell Part 1:
> Get-SQLServer](http://devhawk.net/2007/02/06/perusing-powershell-part-1-get-sqlserver/),
> DevHawk]

While there is no first-class support for verbs or actions in C\#, it
looks like Anders has essentially rolled his own. For example, his
Plan.Event() method returns a new EventDescriptor object. Subsequent
calls on this object (RelatedTo, WithPriority, OrganizedBy) change the
internal state of this EventDescriptor object. When you reach the end of
the chain of calls, EventDescriptor has an implicit EventComponent cast
operator that creates a new EventComponent with all the data that’s been
collected along the chain by the EventDescriptor.

Again, I can help but think a significant amount of code in this
approach can be generalized and the creation automated. Also, I wonder
if any of the new C\# 3.0 capabilities could be used to improve the
implementation. For example, would [Extension
Methods](http://weblogs.asp.net/scottgu/archive/2007/03/13/new-orcas-language-feature-extension-methods.aspx)
make it easier to build the fluent interface? Maybe / Maybe not.
Regardless, Anders has given me a lot to noodle on.
