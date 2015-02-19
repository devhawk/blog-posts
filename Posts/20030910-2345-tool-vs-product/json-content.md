One of the things that makes ASP.NET great is it’s “no black box”
approach. Rob Howard describes the approach this way: “Provide customers
with the ability to replace/customize/extend the core product” [[ASP.NET
Overview](http://www.gotdotnet.com/team/rhoward/ASP.NET%20Overview%20v0219.ppt),
Slide 25]. You can see this approach all over ASP.NET. For example,
ASP.NET ships with three built-in authentication modules: Windows, Forms
and Passport. Don’t like those? Want something custom? Fine, write a
module that handles the
[AuthenticateRequest](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemWebHttpApplicationClassAuthenticateRequestTopic.asp)
event and handle authentication however you want. Heck, if you’re doing
a one-off solution, you can even skip the module and stick the code in
Global.asax.

As is probably apparent to anyone reading this weblog, I’ve been playing
around with Windows SharePoint Services quite a bit recently. WSS seems
to be made up of three distinct layers:

-   [Low-level
    services](http://msdn.microsoft.com/library/en-us/spptsdk/html/SPPTWSSSection.asp)
    for DB management of pages and lists
-   [Web Part Pages
    Infrastructure](http://msdn.microsoft.com/library/en-us/spptsdk/html/SPPTWPFWPPInf.asp)
-   Site templates, List templates and web parts that ship with WSS by
    default

You would think these would be mostly independent, but they’re not. For
example, the WSS docs describe how you can [add a new field
type](http://msdn.microsoft.com/library/en-us/spptsdk/html/tsptAddingFieldType.asp)
to the default templates that ship with WSS. However, there’s a [field
type
enumeration](http://msdn.microsoft.com/library/en-us/spptsdk/html/tsenSPFieldType.asp)
that’s part of the WSS object model. Obviously, adding a custom field to
the template does not change the enumeration. What’s interesting is that
if you follow the instructions to add a new field type and then add that
field to a list template, you can create a list instance from that
template that features the field type you defined. But if you want to
modify the column with the custom field type, the WSS site admin pages
(i.e. under the \_layout vdir) has no idea about the new field type.
Likewise, you can’t add your new field type to an existing or custom
list since the WSS site admin pages are coded against the object model
and the default enumeration of field types. This makes it very hard to
black box replace/customize/extend the core WSS product due to it’s
tightly coupled nature.

Of course, one of the reasons that ASP.NET has been more successful at
extensibility is because it is a tool and WSS is a product. There is no
out-of-the-box experience with ASP.NET for end users the way that WSS
has. Is shipping a product harder that shipping a tool? Is targeting end
users harder than targeting developers? I would think the answer to both
of these questions is yes. In the end, the WSS team had to ship
something that works OOB, even if that means building something that’s
more tightly coupled and thus harder to extend. I hope that over future
releases, WSS continues to improve (certainly v2 is a huge improvement
over v1) and that it becomes easier to replace/customize/extend the core
product.

UPDATE – Of course, it’s [Rob Howard](http://weblogs.asp.net/RHoward/)
not [Ron Howard](http://www.imdb.com/name/nm0000165/). Rob – Great job
on ASP.NET. Ron – Great job on [Apollo
13](http://www.imdb.com/title/tt0112384/).
