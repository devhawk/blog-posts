Last month, I
[lamented](http://devhawk.net/2009/07/09/Syntax+Highlighting+TextBoxes+In+WPF+Ndash+A+Sad+Story.aspx)
the lack of extensibility of the WPF text box. While there are
[several](http://www.actiprosoftware.com/Products/DotNet/WindowsForms/SyntaxEditor/Default.aspx)[vendors](http://www.aqistar.com/)
and at least one [open
source](http://wiki.sharpdevelop.net/AvalonEdit.ashx) custom syntax
highlighting text box, it still really bothers me how inextensible the
basic WPF text box is. I just want to do a simple colorizing REPL – why
is that so hard?

So instead of using any of those syntax highlighting text boxes, I
decided to build my own using the approach Ken Johnson [wrote
about](http://www.codeproject.com/KB/WPF/CodeBox.aspx) on Code Project.
As I wrote before, it’s a hack – you set the text box’s foreground and
background brushes to transparent so that you can override OnRender –
but it works.

The big change I made from Ken’s code was to use DLR TokenCategorizer
instead of regular expressions to tokenize the code.
[TokenCategorizer](http://dlr.codeplex.com/SourceControl/changeset/view/26964#581527)
is a service provided by the DLR hosting API, which will tokenize a
given script source for you. Here’s the code that colorizes the text in
the text box.

``` {.brush: .csharp}
var source = Engine.CreateScriptSourceFromString(this.Text);
var tokenizer = Engine.GetService<TokenCategorizer>();
tokenizer.Initialize(null, source, SourceLocation.MinValue);

var t = tokenizer.ReadToken();
while (t.Category != TokenCategory.EndOfStream)
{
    if (SyntaxMap.ContainsKey(t.Category))
    {
        ft.SetForegroundBrush(_syntaxMap[t.Category], 
             t.SourceSpan.Start.Index, t.SourceSpan.Length);
    }

    t = tokenizer.ReadToken();
}
```

As you can see, I ask the engine for a TokenCategorizer, initialize it
with the text box’s current contents, then iterate thru the tokens,
looking for ones in my SyntaxMap. If the token category is in the syntax
map, we change the foreground brush for that span of formatted text (ft
is a WPF FormattedText instance I created earlier in the method.

Of course, this approach isn’t very efficient – it re-colorizes the
entire file on every change. It turns out that some DLR TokenCategorizer
are restartable so you can cache the tokenizer state at any point and
then return later with a new TokenCategorizer instance and pick up
tokenizing where you left off. With this approach, you could say
tokenize a line at a time, allowing you to only need to retokenize the
line where the change occurred rather than the entire file. But only
IronPython supports tokenizer restarting today, so I decided to take the
easy way and simple re-colorize on every change.

I named the project HawkCodeBox and I’ve [published the
source](http://github.com/devhawk/HawkCodeBox/tree/master) up on GitHub.
It’s fairly simple, but of course the goal wasn’t to build the
be-all-end-all text editor – other [people in the VS
team](http://blogs.msdn.com/vseditor/) already have that job.
