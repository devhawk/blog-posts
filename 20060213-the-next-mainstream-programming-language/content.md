[Terra Nova](http://terranova.blogs.com/) is not the usual place I go to
get news around programming language improvements. But [they
linked](http://terranova.blogs.com/terra_nova/2006/02/troubles_with_t.html)
to a great presentation from [POPL
2006](http://www.cs.princeton.edu/~dpw/popl/06/) by Tim Sweeney of [Epic
Games](http://epicgames.com/). Tim’s talk is called [The Next Mainstream
Programming Language: A Game Developer’s
Perspective](http://www.cs.princeton.edu/~dpw/popl/06/Tim-POPL.ppt) and
it talks at great length the major issues facing game developers today.
As Nate Combs at Terra Nova remarked, most of these issues are not
specific to the game industry, but will likely be seen there first.

Most interesting (to me) was the issue of concurrency. Tim uses [Gears
of War](http://www.xbox.com/en-US/games/g/gearsofwar/) for all his
examples. Of course, Gears of War is an Xbox 360 exclusive. Xbox 360, as
many of you probably know, has three hyper-threaded CPUs for a total
capactiy of six hardware threads. Herb Sutter talked about this in his
DDJ article [The Free Lunch Is
Over](http://www.gotw.ca/publications/concurrency-ddj.htm). Tim points
out – rightly so – that “C++ is ill-equipped for concurrency”. C\#, Java
and VB aren’t much better. Tim conculdes that we’ll need a combination
of effects-free non-imperative code (which can safely be executed in
parallel) and software transactional memory (to manage parallel
modifications to system state).

Tim also touches on topics of performance, modularity and reliability.
And he has an eye on the practical at all times. For example, he points
out that even a four times performance overhead of software
transactional memory is acceptable, if it allows the code to scale to
many threads.

Anyway, it’s a great read so check it out. Also, MS Research has a
[software transactional memory
project](http://www.cs.brown.edu/~mph/sxm.htm) you can download if
you’re so inclined.
