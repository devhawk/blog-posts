In my [last
installment](http://devhawk.net/2009/10/09/Hybrid+App+Debugging+Ndash+Threading.aspx),
I added support for a separate debug window on a separate thread from
the main window thread. That way, I can pause the execution of the main
window while the debug window stays responsive to user input. Now, let’s
add some functionality to the debug window. I’m going to start by
showing the source code of the python file being executed.

``` csharp
private void OnTraceback(TraceBackFrame frame, string result, object payload)
{
    FunctionCode code = (FunctionCode)frame.f_code;
    if (_curCode == null || _curCode.co_filename != code.co_filename)
    {
        _source.Inlines.Clear();
        foreach (var line in System.IO.File.ReadAllLines(code.co_filename))
        {
            _source.Inlines.Add(new Run(line + "rn"));
        }
    }
```

The TraceBackFrame instance has a property f\_code that represents the
FunctionCode object being executed in this frame. We have to explicitly
cast to FunctionCode type because currently we’re exposing all
properties that hang off TraceBackFrame as object type. Since Python is
a dynamic language, we’re going to use reflection against the instance
itself anyway so it doesn’t really matter what the return type is.
However, I’ve asked Dino to change the TraceBackFrame type to use
explicit types in order to make it easier to use SetTrace from
statically typed languages like C\#. Look for that in RC2.

After we cast the code object so it can be used from C\#, we check to
see if the currently loaded file matches the file currently loaded into
the UI. I’ve [ranted
recently](http://devhawk.net/2009/07/09/Syntax+Highlighting+TextBoxes+In+WPF+Ndash+A+Sad+Story.aspx)
about the limitations of WPF’s TextBox but I didn’t want to get hung up
syntax highlighting for this sample so I just went ahead and used the
[RichTextBox](http://msdn.microsoft.com/en-us/library/system.windows.controls.richtextbox.aspx).
In the DebugWindow Loaded event handler, I create \_source as a WPF
[Paragraph](http://msdn.microsoft.com/en-us/library/system.windows.documents.paragraph.aspx)
and then wrap it in a FlowDocument and use it as the RichTextBox’s
Document. I set the FlowDocument to be extremely wide, so as to avoid
word wrapping. Then when I need to load a new source file, I clear
\_source of it’s current contents and add a single line run for every
line of code in the file. This convention becomes useful later when I go
to highlight the current line of code.

Once I load the current file, I save the current frame, code, result and
payload in instance fields and then switch on result to determine what
to do next. Currently, I’m just highlighting the relevant line of code
and setting a TextBlock control in the menu bar.

``` csharp
private void TracebackCall()
{
    dbgStatus.Text = string.Format("Call {0}", _curCode.co_name);
    HighlightLine((int)_curFrame.f_lineno,
        Brushes.LightGreen, Brushes.Black);
}

private void TracebackReturn()
{
    dbgStatus.Text = string.Format("Return {0}", _curCode.co_name);
    HighlightLine(_curCode.co_firstlineno,
        Brushes.LightPink, Brushes.Black);
}

private void TracebackLine()
{
    dbgStatus.Text = string.Format("Line {0}", _curFrame.f_lineno);
    HighlightLine((int)_curFrame.f_lineno,
        Brushes.Yellow, Brushes.Black);
}
```

In Visual Studio, we typically highlight the current line of code in
yellow. However, that doesn’t work as great in a language like Python
that delineates code blocks with whitespace. In ipydbg, I [indicated
function
return](http://devhawk.net/2009/03/19/Writing+An+IronPython+Debugger+Colorful+Console.aspx)
with three carets. But I didn’t want to be modifying the text in the
RichTextBox here so instead I used different colors for the different
traceback event types: light green for call, light pink for return and
yellow for line. The frame object contains the current line number,
which I use for call and line, while the code object has the first line
of the current code object, which I use for return. HighlightLine
highlights the line in question with the colors provided and also
scrolls that line into view if it isn’t already visible.

So now when a traceback is handled, it shows the text for the file being
executed and highlights the appropriate line, based on the type of
traceback event that happened. Now all we need is to have some way be
able to continue execution. In the code, you’ll see I’ve [defined a
series](http://github.com/devhawk/LightweightDebuggerDemo/blob/deac85aaf14b37352ce4248917fd857c173d8997/LightweightDebuggerDemo/DebugWindow.xaml.cs#L21)
of RoutedUICommands for common debugger commands. I’ve got the StepIn
command wired up in the [DebugWindow
XAML](http://github.com/devhawk/LightweightDebuggerDemo/blob/deac85aaf14b37352ce4248917fd857c173d8997/LightweightDebuggerDemo/DebugWindow.xaml)
to a menu item and the “S” keystroke. All that remains is to define
StepInExecuted.

``` csharp
private void StepInExecuted(object sender, ExecutedRoutedEventArgs e)
{
    dbgStatus.Text = "Running";

    foreach (var i in _source.Inlines)
    {
        i.Background = rtbSource.Background;
        i.Foreground = rtbSource.Foreground;
    }

    _dbgContinue.Set();
}
```

This function does three basic things: changes the dbgStatus text,
resets all the text in the RichTextBox back to the default coloring, and
sets the \_dbgContinue AutoResetEvent which signals the main window
thread that’s been blocked in OnTracebackReceived to continue.

With this post, I’m about even with the code that’s [up on
GitHub](http://github.com/devhawk/LightweightDebuggerDemo). That code
has a few other capabilities – notably it will stop tracing if you close
the debug window and it supports StepOut command which disables
traceback for the current scope by returning null in
OnTracebackReceived. But I haven’t implemented things like:

-   Set Next Statement
-   Viewing and changing variables
-   Debugger REPL
-   Breakpoint Management

Any suggestions on which of those would you like to see next?
