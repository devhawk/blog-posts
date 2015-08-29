For the past few months, I’ve been heavily involved in a project but I
wasn’t allowed to blog about it. Last week, it went live on MSDN so
finally the gag is off.

About a year ago, word [started to
surface](http://news.com.com/Microsoft+turns+to+Elixir+for+Office+boost/2100-1012_3-5545640.html)
about something called [Project
Elixir](http://news.com.com/Gates+pours+Elixir+for+Office+developers/2100-1012_3-5563873.html)
which aimed to integrate back end CRM systems with Microsoft Outlook.
Part of that effort resulted in the addition of [Outlook Managed
Add-ins](http://msdn.microsoft.com/office/understanding/vsto/default.aspx?pull=/library/en-us/odc_vsto2005_ta/html/officewhatsnewinvsto2005.asp#officewhatsnewinvsto2005_outlookmanagedaddins)
to [Visual Studio 2005 Tools for
Office](http://msdn.microsoft.com/office/understanding/vsto/default.aspx?pull=/library/en-us/odc_vsto2005_ta/html/officewhatsnewinvsto2005.asp).
However, the VSTO team’s primary deliverable was an add-in loader that
enforced security, enabled shutdown unloading and provided a better
startup/shutdown developer experience that IDTExtensibility2. (Check out
the [VSTO Outlook Architecture
document](http://msdn.microsoft.com/library/en-us/odc_vsto2005_ta/html/Office_VSTOOutlookAdd-inArchitecture.asp)
for more details.) While those are important fundamentals that needed to
be gotten right, VSTO Outlook doesn’t provide much in the way of tools
or guidance for building Outlook add-ins that leverage managed forms and
controls or integrate with your back end systems. That’s where the [CRM
Integration for Outlook
sample](http://www.microsoft.com/downloads/details.aspx?familyid=078124E9-1E88-4F51-8C98-3C1999CFE743&displaylang=en)
comes in.

What we’ve built is a sample application that surfaces CRM style data
inside of Outlook. Outlook is the natural home for your calendar and
your personal contacts. Why not make it the natural home for your
customer contacts, activities and opportunities as well? As part of the
demo project we’ve implemented:

-   Using Windows Forms for editing custom items. Check out this
    [screenshot](http://msdn.microsoft.com/library/en-us/dnbda/html/otlklobcrm10.gif).
    The Activity form is a standard managed Windows Forms form, not an
    Outlook custom form.
-   Using a Windows Forms user control as a folder home page. Here’s a
    [screenshot](http://msdn.microsoft.com/library/en-us/dnbda/html/otlklobcrm09.gif)
    of the “CRM Today” page. Again, that’s a standard managed Windows
    Forms user control.
-   A framework for adding menu items and toolbars. In Outlook, the
    developer has to manage adding the custom toolbars and menu to each
    explorer and inspector window themselves. With our sample, we built
    a framework to handle that for you.
-   Using SQL Express as a local cache of CRM data. It turns out that
    for many scenarios, storing a copy of all the back-end data directly
    in Outlook is a bad idea. First, it increases the size of the users
    mailbox, requiring more storage on the Exchange server. Furthermore,
    any custom data in Outlook has to be synced twice – once from the
    back end system to Outlook on the desktop, then from Outlook back to
    Exchange. By minimizing the amount of back-end data stored in
    Outlook proper, we reduce the mailbox size and sync bandwidth needs.
    In both the above screenshots, the displayed data is coming out of
    the local SQL Express instance, not Outlook.
-   Having two separate storage locations (Outlook & SQL Express) means
    having to sync between them. We’ve built a local sync engine that
    can sync both individual items between Outlook and SQL Express as
    well as a collection of items between SQL Express and a given
    Outlook folder.
-   Finally, there are some utility classes to make it easier to deal
    with Outlook folders and items. Of primary note is the ItemAdapter
    class which provides a pseudo base class for Outlook items
    (appointments, emails, tasks, etc). Those items all have a set of
    similar properties and methods, but don’t have a common base class
    so they can’t be treated polymorphicaly. ItemAdapter uses runtime
    reflection to implement those common operations without needing to
    cast to the concrete Outlook item type.

Check out the [Architecture Design
Guide](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnbda/html/OtlkLOBCRM.asp),
as well as the [Outlook Customization
Guide](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnbda/html/OtlkCustInEntApp.asp)
and the [Local Sync Engine
Guide](http://msdn.microsoft.com/architecture/default.aspx?pull=/library/en-us/dnbda/html/OtlkLDSSynch.asp)
up on the Solution Architecture Center. You can also pick up the [source
code](http://www.microsoft.com/downloads/details.aspx?familyid=078124E9-1E88-4F51-8C98-3C1999CFE743&displaylang=en).
Also, I spun up a [GDN
Workspace](http://workspaces.gotdotnet.com/outlookintegration) so we can
have a [discussion
forum](http://www.gotdotnet.com/workspaces/messageboard/home.aspx?id=ccecaaa6-88a8-43c0-8880-a491fcf7396e)
and to [track bugs and
requests](http://www.gotdotnet.com/workspaces/bugtracker/home.aspx?id=ccecaaa6-88a8-43c0-8880-a491fcf7396e).

Going forward, I’m going to be focusing on the remote data sync story
for this scenario. Among other responsibilities, I “own” the Data pillar
of our [Connected Systems
model](http://blogs.msdn.com/gianpaolo/archive/2005/06/07/426609.aspx)
so this dovetails nicely. You’ll note above that while we have a local
sync engine in the sample, we don’t have any way to move the data back
and forth between the local copy in SQL Express and the remote copy in
the CRM back-end. We are working on some guidance around this right now,
but we didn’t want to hold up publishing the rest of the sample.

Frankly, it’s been nice to be involved with something so technical after
spending time on the marketing team. I’m pretty proud of the project and
I look forward to your feedback.

**Update**: Removed the link to the running demo as it’s been taken off
the download site for reasons I am not aware of. If you want the binary
and you don’t know how to compile it, drop me a mail.
