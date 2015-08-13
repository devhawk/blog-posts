When we [last
left](http://github.com/devhawk/ipydbg/blob/c33cf75c4e9273a21ada00abe2403c392e4ca0a0/ipydbg.py)
ipydbg, it was up to about 200 lines of code. Not bad in terms of
overall length, but I started to detect some [code
smell](http://en.wikipedia.org/wiki/Code_smell). I was relying pretty
heavily on global variables and the structure of my code made it
difficult to control how the debugger was run. I wanted to change ipydbg
so it would automatically spin up an MTA thread if I forgot to add the
–X:MTA command line parameter. But since by debugger and process objects
were global, they’d get created on the main thread of ipydbg, regardless
if it was STA or MTA. So for this
“[release](http://github.com/devhawk/ipydbg/tree/117cdce71a5ee8880e8bc991813534b6fba0a6d5)”
(I’d say I’m almost to version 0.0.0.1), I decided on focusing on
enginering and refactoring rather than new features.

The big new addition is the [IPyDebugProcess
class](http://github.com/devhawk/ipydbg/blob/117cdce71a5ee8880e8bc991813534b6fba0a6d5/ipydbg.py#L90),
which is clearly the workhorse of the application. All of the previously
global variables are now class instance variables on IPyDebugProcess.
Input and run along with all the event handlers as well as
do\_break\_event and get\_location are now class methods, as they need
to access instance variables (setting the break event, accessing the
symbol reader dictionary, etc.). Functions that didn’t need to access
instance variables (get\_sequence\_points, create\_breakpoint,
get\_dynamic\_frames and get\_method\_info\_for\_frame) I left as
top-level functions. If they get more complex, I may break them out into
their own modules, but for now I left them in ipydbg.py.

The conversion process was fairly trivial. I had to add “self.” lots of
places and change the indention level all over but that was pretty much
it. Once I finished the conversion, I was able to add the run\_debugger
function to handle the thread creation, if necessary.

``` python
def run_debugger(py_file):
    if Thread.CurrentThread.GetApartmentState() == ApartmentState.STA:
        t = Thread(ParameterizedThreadStart(run_debugger))
        t.SetApartmentState(ApartmentState.MTA)
        t.Start(py_file)
        t.Join()
    else:
        p = IPyDebugProcess()
        p.run(py_file)

if __name__ == "__main__":
    run_debugger(sys.argv[1])
```

Originally, I tried to put this logic in IPyDebugProcess.run. However,
since I’m [creating the debugger
object](http://github.com/devhawk/ipydbg/blob/117cdce71a5ee8880e8bc991813534b6fba0a6d5/ipydbg.py#L92)
in the \_\_init\_\_ function, that meant it would be created on the
wrong thread. I could have moved the debugger creation to the run method
or move the thread management code to \_\_init\_\_, but I decided to
factor that logic into a separate function completely. Felt cleaner that
way.
