It’s a small update, but I added support for displaying method arguments
along side [the local
variables](http://devhawk.net/2009/03/31/writing-an-ironpython-debugger-displaying-values/).
As I mentioned in that post, breaking out the CorValue extraction and
display code into a shared function was a good idea – adding support for
getting arguments was trivial since I could reuse that code.

Because there’s no hierarchy of scopes to deal with and the names are in
the metadata instead of debug symbols, getting arguments is much easier
than getting local variables.

``` python
def get_arguments(frame):
    mi = frame.GetMethodInfo()
    for pi in mi.GetParameters():
      if pi.Position == 0: continue
      arg = frame.GetArgument(pi.Position - 1)
      yield pi.Name, arg
```

You’ll notice that I’m yielding the arguments as a tuple of the name and
value, the same as get\_locals yields. I did refactor
[get\_locals](http://github.com/devhawk/ipydbg/blob/4495bbcd48e9593dd3a148d0dafb82646cf091c0/ipydbg.py#L146)
a bit – there’s no longer an argument to skip hidden variables anymore
(though get\_locals still [skips dynamic call sites
caches](http://devhawk.net/2009/03/25/writing-an-ironpython-debugger-getting-local-variables/)
as it did before). Now, it’s up to the the caller of get\_arguments and
get\_locals to filter hidden variables as they see fit.

Because get\_locals and get\_arguments yield the same types, I was able
to factor the code to print a value and loop through the collection of
values into separate local functions.

``` python
@inputcmd(_inputcmds, ConsoleKey.L)  
def _input_locals_cmd(self, keyinfo):  
  def print_value(name, value):  
    display, type_name = display_value(extract_value(value))  
    with CC.Magenta: print "  ", name,
    print display,  
    with CC.Green: print type_name  

  def print_all_values(f, show_hidden):  
      count = 0  
      for name,value in f(self.active_thread.ActiveFrame):  
        if name.startswith("$") and not show_hidden:  
          continue  
        print_value(name, value)  
        count+=1
      return count  

  print "nLocals"  
  show_hidden =  
    (keyinfo.Modifiers & ConsoleModifiers.Alt) == ConsoleModifiers.Alt  
  count = print_all_values(get_locals, show_hidden)  
  count += print_all_values(get_arguments, show_hidden)  

  if count == 0:  
      with CC.Magenta: print "  No Locals Found"
```

I really like the local functions feature of Python. In C\#, you can
define an anonymous delegate using the lambda syntax. But for a scenario
like this, I like local functions better. However, I do like C\#’s
support for statement lambdas – Python only supports expression lambdas.
So while I like local functions better in this scenario (because I’m
using the method more than once) in something like an event handler, I
like the statement lambda syntax better.

As usual, the [latest version of
ipydbg](http://github.com/devhawk/ipydbg/commit/4495bbcd48e9593dd3a148d0dafb82646cf091c0)
is up on GitHub.
