[Scott Allen](http://www.odetocode.com/blogs/scott/)
[pointed out](http://devhawk.net/CommentView,guid,325fc7b2-6102-435a-ae94-6e2686e6889f.aspx#commentstart)
that if you need to declare top level properties in a XAML only
workflow, you can subclass the root activity class, add the properties
you want, then specify the custom subclass in the XAML workflow. That
doesn’t really solve my problem. I’m trying to limit to activity
vocabulary that the workflow author has access to. If they can specify
their own custom type as the root activity of their workflow, they can
also add whatever execution logic they want, which is what I’m trying to
avoid.

There is an example in the Advanced Authoring chapter of [Essential
WF](http://dharmashukla.com/essential-wf-page/) where they describe
building a root activity class that generate top level properties as
part of the workflow compilation process. The root activity (in the
example, it’s called “SequenceWithVars”) where you can specify the top
level parameters in the XAML. Here’s an example from the book:

``` xml
<SequenceWithVars x:Class="Workflow1" xmlns="..." xmlns:x="...">
```

The SequenceWithVars type includes a custom
[ActivityCodeGenerator](http://msdn2.microsoft.com/en-us/library/system.workflow.componentmodel.compiler.activitycodegenerator.aspx)
that loops thru the VariableDecls collection and adds a top-level
property (via
[CodeDOM](http://msdn2.microsoft.com/en-us/library/system.codedom.aspx))
for each VariableDecl instance. You end up with a workflow class that
looks like this:

``` csharp
public partial class Workflow1 : SequenceWithVars
{
  public static DependencyProperty OrderProcConversationProp =
    DependencyProperty.Register("OrderProcConversation",
      typeof(Guid), typeof(Workflow1));

  public Guid OrderProcConversation
  {
    get
    {
      return (Guid)base.GetValue(Workflow1.OrderProcConversationProp);
    }
    set
    {
      base.SetValue(Workflow1.OrderProcConversationProp, value);
    }
  }

  //Remaining WF type declaration goes here
}
```

In order to use the XAML workflow with the SequenceWithVars activity,
you do need to
[compile](http://msdn2.microsoft.com/en-us/library/ms734733.aspx) the
XAML first using the
[WorkflowCompiler](http://msdn2.microsoft.com/en-us/library/system.workflow.componentmodel.compiler.workflowcompiler.aspx)
class.
[WorkflowCompiler.Compile()](http://msdn2.microsoft.com/en-us/library/system.workflow.componentmodel.compiler.workflowcompiler.compile.aspx)
returns a compiled type which can then be passed to
[CreateWorkflow](http://msdn2.microsoft.com/en-us/library/ms594868.aspx).
But adding the separate compile step is a small price to pay, in my
opinion. This approach lets me limit the workflows to XAML only while
still allowing for top level properties which are needed in many data
binding scenarios.
