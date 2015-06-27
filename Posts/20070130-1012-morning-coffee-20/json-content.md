-   [Jim Gray](http://research.microsoft.com/~Gray/) has been [missing
    at
    sea](http://sfgate.com/cgi-bin/article.cgi?f=/c/a/2007/01/30/BAGGTNR93G1.DTL)
    since Sunday. My thoughts are with him. (via [Werner
    Vogels](http://www.allthingsdistributed.com/2007/01/jim_gray_missing_at_sea.html))
-   We [launched](http://microsoftwowlaunch.com/) [Windows
    Vista](http://www.microsoft.com/windows/products/windowsvista) and
    [Office 2007](http://office.microsoft.com/2007) yesterday. There
    were parties on campus, but [my
    office](http://devhawk.net/2006/09/29/working-from-home-as-the-office-moves/)
    is a little off the beaten path, so we didn’t get a party.
-   [WF Activity
    Validation](http://msdn2.microsoft.com/en-us/library/ms734773.aspx)
    is very cool, but make sure you put your activities into a separate
    project from your workflows. It took me a few minutes yesterday to
    figure this out, but the validators are invoked not only for the
    activities in workflows, but for the actual activity implementation
    itself. My validation logic is checking to ensure properties are
    specified and that given activities are or are not inside a
    [transaction
    scope](http://msdn2.microsoft.com/en-us/library/system.workflow.componentmodel.transactionscopeactivity.aspx).
    Obviously, the activity implementation is invalid according to these
    rules. Also, you need to remove the Workflow.Targets import from
    your activity project file, as that is what invokes the activity
    validation.
-   A quick follow-up to yesterday’s [compiling workflows
    post](http://devhawk.net/2007/01/29/compiling-workflows/): WF
    appears to be fairly short on out of the box functionality, but more
    than makes up for it with an expansive extensibility model. It makes
    the learning curve longer, but it’s well worth it the trip.
-   I’m demoing the result of the proof of concept work we’ve done over
    the last few months today. It’s been a while since I’ve presented to
    any kind of audience so we’ll see how it goes.

