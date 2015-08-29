In case I’m not the last person on the planet to figure this out…

1.  In VS, click on File-\>Open-\>Project/Solution or press Ctl-Shift-O
2.  Select ipy.exe from wherever you put it
3.  Right click ipy.exe in Solution Explorer and select Properties
4.  In the Command Arguments box, type “-D” (to generate debug code) and
    the full path to the script you want to execute. If you want to drop
    into interactive mode after the script executes, also include a “-i”
5.  Open the script you specified in step 4 and place breakpoints as
    usual
6.  Run via Debug-\>Start Debugging or press F5

Thanks [Srivatsn](http://blogs.msdn.com/srivatsn) for helping me out
with this.
