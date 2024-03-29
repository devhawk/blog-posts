I’ve gotten some great feedback on my [Code is
Model](http://devhawk.net/2005/10/05/code-is-model/) post. But
before I get to those comments, I wanted to talk a little bit about the
role of tools. Tools are important in every industry, but in no industry
are they as important or central as they are to information technology.

One of the fascinating differences between IT architecture and “real
world” architecture is the feasibly of automated transformation. If I
have a blueprint of a house, there is no tool to automatically transform
it into a house – someone has to do the actual work of putting up the
walls, running the plumbing, etc. But in IT architecture, I can
transform blueprints – i.e. the code – into the finished application
automatically. That speaks volumes about the importance of tools in
information technology.

Without the tools to automate the transformation, all IT models – code
or otherwise – are nothing more than documentation.

So if we are to include models as part of our development process, we
need tools to execute the transformations between levels of abstraction.
But where do those tools come from? In the case of abstractions with
widespread horizontal appeal, they are likely to come from language
vendors such as Microsoft. For example, abstractions like
[generics](http://msdn2.microsoft.com/en-us/library/512aeb7t) and [query
expressions](http://msdn.microsoft.com/netframework/future/linq) are
useful in almost nearly every project, so it makes sense to include them
in mainstream languages like C\#. However, one of the key points of
[Software
Factories](http://lab.msdn.microsoft.com/teamsystem/workshop/sf) is that
in order to continue raising the level of abstraction, we are going to
need narrow the domain to which those abstractions apply.

> Developing language-based tools is currently quite expensive, and
> therefore makes economic sense only in broad horizontal domains, such
> as user interface construction and data access, where the necessary
> investments can be amortized over a large customer base. For this
> reason, commercial implementations of the [Language Framework
> pattern](http://st-www.cs.uiuc.edu/users/droberts/evolve.html) are
> supplied almost exclusively by platform vendors.
>
> This economic model is threatened by the trade off between scope and
> value for abstractions. As [Jackson puts
> it](http://www.aw-bc.com/catalog/academic/product/0,1144,020159627X,00.html),
> the value of an abstraction increases with its specificity to the
> problem domain. The higher the level of an abstraction, the narrower
> the domain to which it applies, but the more value it provides in
> solving problems in that domain.
>
> We are now at a point in the evolution of the software industry where
> frameworks and tools must become more vertically focused, in order to
> realize further productivity gains. They must provide more value for
> smaller classes of problems. This breaks the current economic model
> because markets for vertically focused frameworks and tools are too
> small to support platform plays, and because the domain knowledge
> required to develop them is housed mainly in end user organizations
> that have not traditionally been software suppliers.\
> [[Problems and
> Innovations](http://msdn.microsoft.com/library/en-us/dnbda/html/softwarefactwo.asp)
> by [Jack Greenfield](http://blogs.msdn.com/jackgr)]

In other words, these domain focused languages, frameworks and tools are
*not* going to come from traditional language vendors like Microsoft.
They are going to come from organizations that have deep experience in
the given domain, many of whom will not be traditional software vendors.
I think SIs and ISVs will adopt this approach before many end user
organizations do, but eventually any organization that invests in
building reusable frameworks is going to want to invest in building
languages and tools to automate the usage of those frameworks.

I think the best way to start developing these tools is to incorporate
their construction directly into the software development lifecycle. I
liken this to Test Driven Development. If you use a TDD approach, at the
end of your project you end up with two outputs – the project and the
unit tests. Assuming the code you’re building now (with their associated
unit tests) is designed to meet current requirements, you shouldn’t need
to refactor it significantly until those requirements change sometime in
the future. The tests you build today become a tool to help you improve
your code in the future when the requirements change. From a tool
development perspective, Test Driven Development is a specific instance
of the more generic concept of Tool Driven Development, as tests are a
specific type of tool.

What if, instead of building code test first, you thought about building
tools first?

The problem with tests is that hey are tightly bound to the current
project. They may help you improve this project’s code in the future,
but they won’t help you develop other applications. I think we should
also focus on building tools that make it easier to build the existing
project. The goal would be to be able to use these tools not only on
future iterations of the current project, but on other similar projects
as well. 

Of course, we don’t really have the infrastructure to do this
effectively today. We need to be able to make it easier to build tools,
compose tools and evolve tools over time. Supporting evolution will be
key since these tools will likely need to be refined as they are applied
to different projects. Test Driven Development has xUnit style
frameworks, Tool Driven Development needs the equivalent. The [DSL
Tools](http://lab.msdn.microsoft.com/teamsystem/workshop/dsltools/default.aspx)
and [Guidance Automation
Toolkit](http://lab.msdn.microsoft.com/teamsystem/workshop/gat/default.aspx)
are a good start, but aren’t enough to enable Tool Driven Development on
their own.

Do you believe this Tool Driven approach can work? What do you think
Tool Driven Development tools would look like? Please [let me
know](http://devhawk.net/CommentView,guid,52d0c3b9-65e3-43dd-af6d-54aca306e61f.aspx).
