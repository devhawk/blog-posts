So now that my new weblog is up, I just need a way to post to it with
ease. I started with a hidden page (since removed) that had an
[ActiveUp](http://www.activeup.com/)[Html
TextBox](http://www.activeup.com/products/components/htmltextbox/)
control on it. But I wanted more. I wanted to work offline. I wanted a
better HTML editing experience. I wanted a rich HTML editor! Luckily, I
have Front Page. I hacked up a macro to throw up a dialog to grab the
entry title & description, then insert that info + the currently
selected text as the weblog entry content into the database. Of course,
the true bummer is that I had to do it all with ADO.
:cry: Talk
about spoiled. ADO.NET does a much better job handling parameters. What
I need is [Office
11](http://www.microsoft.com/office/developer/preview/default.asp), with
the [Visual Studio Tools for
Office](http://msdn.microsoft.com/library/en-us/dnofftalk/html/office01022003.asp)!
Unfortunately, it appears that only Word and Excel are supported in
VS.NET 2003, but I could use Word to blog instead of Front Page…

