At this point, ipydbg support seven commands: Continue, Quit, Show Stack
Trace, Show Locals, Step Over, Step In, and Step Out. All these commands
are invoked by a single keystroke. I’m using
[Console.ReadKey](http://msdn.microsoft.com/en-us/library/system.console.readkey.aspx)
in an attempt to cut down on the number of keystrokes needed for
interacting with the debugger. If I only type ‘s’ instead of ‘s
\<enter\>’ to step, I figure I’ll be twice as productive!
:smile:

If I was writing ipydbg in C\#, I could use switch statement to dispatch
commands in the \_input method based on user keystrokes. However, Python
doesn’t have a switch statement so I’ve been using a cascading set of
if/elif/else statements instead. When you get up to seven if/elif
clauses plus an else clause, the code smell is pretty overwhelming.

``` python
# Only has three if/elif clauses,but it's already a little smelly
val = Console.ReadKey()
if val.Key == 'a':  
  result = 'a'  
elif val.Key == 'b'  
  result = 'b'  
elif val.Key == 'c'  
  result = 'c'  
else:  
  print "unknown key"
```

Python might not have a switch statement, but it does have first-order
functions so you can get the effects of a switch by using a dictionary.

``` python
def do_a():
  return 'a'
def do_b():
  return 'b'
def do_c():
  return 'c'
_switch = {'a':do_a, 'b':do_b, 'c':do_c}

val = Console.ReadKey()
if val in _switch:
  result = _switch[val.Key]()
else:
  print "unknown key"
```

I like this approach much better. Individual if/elif blocks are now
broken out into separate functions, which smells better than embedding
them in one big function. Also, I like that my pseduo-switch statement
is completely separate from the how the \_switch dictionary is
initialized. However, this approach also separates the pseudo-case
statement functions from the \_switch dictionary as well. That’s not a
good thing. You can easily imagine screwing up by adding a new function
but forgetting to manually update the \_switch dictionary.

What I need is a way to declaratively associate the switch function with
the dictionary lookup key that’s associated with it. Luckily, Python
Decorators provides a very clean way to do this.

``` python
_switch = {}

@inputcmd(_switch, 'a')
def do_a():
  return 'a'
@inputcmd(_switch, 'b')
def do_b():
  return 'b'
@inputcmd(_switch, 'c')
def do_c():
  return 'c'

val = Console.ReadKey()
if val in _switch:  
  result = _switch[val.Key]()  
else:  
  print "unknown key"
```

I’ve [blogged about decorators
before](http://devhawk.net/2008/11/19/ironpython-and-wpf-part-4-background-processing/)
when I wanted to automatically invoke operations on the right thread in
my WPF photo viewing app. The @inputcmd decorator is a bit more
complicated than the @BGThread and @UIThread decorators since @inputcmd
decorator accepts arguments. Each of the @input command decorators in
the code above is the equivalent to this code:

``` python
def do_a():
  return 'a'
```

``` python
_tmp = inputcmd(_switch, 'a')
do_a = _tmp(do_a)
```

As you can see, the inputcmd function returns the decorator that wraps
do\_a, rather than being the decorator itself. This function that
returns a function that returns a function is kinda confusing at first.
But this approach allows you to configure the decorator for a specific
purpose via the arguments – in this case, specifying which dictionary
and which console key this function is associated with.

Also unlike @BGThread and @UIThread, I don’t actually want to modify the
behavior of the methods decorated with @inputcmd. I only want to store a
reference to them in the passed in dictionary. So implementing this
decorator is very easy:

``` python
def inputcmd(cmddict, key):
    def deco(f):
        cmddict[key] = f
        return f  
    return deco
```

The decorator simply inserts the function into the passed-in dictionary
using the passed in key. It then returns the function as is, so it’s not
really rebinding the symbol to a new method (technically, it’s rebinding
the symbol to the same function it’s currently bound to). If I wanted
also wrap the passed in function to provide additional functionality, I
could do that with a second locally defined function inside the deco
function.

The [latest version of
ipydbg](http://github.com/devhawk/ipydbg/tree/9dd12dadb79469ceac57b84b8adb1b0b531337c4)
as been refactored to use @inputcmd instead of set of a cascading
if/elif statement blocks. Now that that’s done, I can start working on
multi-key commands.

