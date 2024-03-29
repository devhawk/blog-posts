It’s a little late, but we just pushed out the [RC for IronPython
1.1.2](http://www.codeplex.com/Release/ProjectReleases.aspx?ProjectName=IronPython&ReleaseId=15198).
This is a minor release with a bunch of bug fixes we’ve backported from
our 2.0 work.

However, there are two minor breaking changes I wanted to highlight:

1.  Work Item
    [\#16348](http://www.codeplex.com/IronPython/WorkItem/View.aspx?WorkItemId=16348)
    – We’ve changed the nt.unlink method so that it raises an exception
    if the file doesn’t exist. This brings nt.unlink in line with
    CPython’s behavior, but does change the public behavior of the
    method.
2.  Work Item
    [\#16735](http://www.codeplex.com/IronPython/WorkItem/View.aspx?WorkItemId=16735)
    – We’ve changed the return type of
    IronPython.Runtime.Operations.Ops.Id() from long to object. We
    return a boxed 32-bit integer for Ops.Id(), unless you’ve allocated
    over 2\^32 objects in which case we roll over to our arbitrary
    precision IronMath.BigInteger type. Note, this only would affect
    statically typed languages compiled against the IronPython assembly.
    It wouldn’t affect python  code in any way.

We think these are fairly minor (hence the reason we green-lit them) and
furthermore these changes mirrors the eventual behavior of 2.0. Please
let me know if either of the changes is a problem for you or your
project.
