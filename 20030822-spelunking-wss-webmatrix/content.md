I’ve been doing a little spelunking the last few days. Unfortunately,
much of it has been to no end, but I thought I’d share anyway.

-   The deeper I dig into [Windows SharePoint
    Services](http://www.microsoft.com/windowsserver2003/technologies/sharepoint/default.mspx),
    the more impressed I am. While it’s well known you can customize at
    the data level (custom lists) and the web part level, it turns out
    you can do a lot of customization at the page layout level. Don’t
    like the default page layout of WSS? Go ahead and change it. You can
    customize the pages within a specific site using Front Page 2003, or
    at the server level by hacking files in the web server
    extensions60template1033 directory. I was able to add my own custom
    site templates, use my own custom default.aspx page, define my own
    custom list types, etc.
-   One WSS downer – as far as I can tell, you can only have one
    instance running on a given machine. Which means if you go hack on
    the templates at the file level, everyone running on that server
    gets the changes. Which means I’m guessing most WSS hosting
    providers won’t let you hack on the templates.
-   I’ve also been playing around with custom designers and
    [WebMatrix](http://www.asp.net/webmatrix/default.aspx?tabIndex=4&tabId=46).
    One of the cool things about WebMatrix is it’s ability to render
    UserControls in the pages where they are used – something VS.NET
    can’t do. I wanted to know how WebMatrix did it since I want similar
    functionality in my custom designer. However, it appears that this
    capability is specifically tied to WebMatrix as a designer host. If
    you look in Microsoft.Matrix.Packages.Web.dll, there’s a
    Microsoft.Matrix.Packages.Web.Designers.MxUserControlDesigner class.
    I’m guessing WebMatrix silently substitutes this designer for the
    default UserControlDesigner provided by the framework. In the
    [GetDesignTimeHtml](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemWebUIDesignControlDesignerClassGetDesignTimeHtmlTopic.asp)
    method (part of the designer infrastructure), the designer is able
    to walk the project hierarchy in order to find the file the control
    instance refers to. This project hierarchy is all written in managed
    code and is provided to the designer via the standard designer
    services infrastructure
    ([ControlDesigner.GetService](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfsystemcomponentmodeldesigncomponentdesignerclassgetservicetopic.asp)).
    VS.NET project hierarchy is accessed as part of the old COM-based
    DTE (design time environment) object model. Furthermore, there
    doesn’t appear to be a consistent way to retrieve that DTE base
    object unless it is explicitly passed to you (as in the case of an
    add-in). According to the docs, you should be able to [get a DTE
    reference](http://msdn.microsoft.com/library/en-us/vsintro7/html/vxconreferencingdteobject.asp)
    to the currently running instance of VS.NET by calling
    System.Runtime.InteropServices.Marshal.GetActiveObject(“VisualStudio.DTE.7.1″).
    However, if there are multiple instances of VS.NET running, that
    call to GetActiveObject actually retireves the DTE reference to the
    *first* instance of VS.NET, not the current instance. Woops.
-   The upshot of the above spelunking is that in WebMatrix, a designer
    can easily find, open and read the contents of another file in the
    project (or should I say directory since WebMatrix doesn’t use
    projects per se). In VS.NET, it can’t. Seems odd that the free
    product has features the non-free product doesn’t. Of course, some
    of that probably comes from the fact WebMatrix is simpler and built
    with managed code. Here’s to future versions of VS.NET being built
    using more (or better yet exclusively) managed code.

