[Jim Newkirk](http://blogs.msdn.com/jamesnewkirk) has
[released](http://blogs.msdn.com/jamesnewkirk/archive/2005/06/24/432485.aspx)
an alpha version of a utility to convert [NUnit](http://nunit.org/)
tests to [VSTS
tests](http://msdn.com/library/en-us/dnvs05/html/vstsunittesting.asp).
What he doesn’t mention in the post is that he’s using
[GAT](http://lab.msdn.microsoft.com/teamsystem/workshop/gat/) to
integrate this conversion functionality into VS05. Basically this
conversion is an “unbounded recipe” which means that any time you right
click on an item in the solution explorer, the NUnit Converter uses
Visual Studio’s [CodeModel
functionality](http://msdn2.microsoft.com/library/ytc6tc9x(en-us,vs.80).aspx)
to analyze the contents of the file. If the file is a C\# file and has
any NUnit test fixtures in it, NUnit Converter adds a “Convert NUnit
Test Code” item to the context menu.

From a cursory glance at the code (which Jim was kind enough to send me)
it doesn’t look like it took very much GAT code to integrate into VS. Of
all the files in the solution, there are only three that relate to GAT –
the Conversion Action (i.e. the code that initiates the NUnit -\> VSTS
conversion when you select the context menu item), the Conversion Recipe
Reference (i.e. the code that determines if the conversion menu item
should be added to the context menu) and the Selected Project Item
Provider (i.e. the code that retrieves the selected file from the
Solution Explorer). There’s also the XML file that defines the recipes.
Everything else as far as I can tell handles the conversion itself and
has nothing to do with GAT.

It’s cool to see a real-world usage of GAT and that using GAT is a
pretty low-impact effort given the VS integration benefits it provides.
