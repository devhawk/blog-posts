One of the cool things about using VPC to host my dev environment(s) is
that I can easily dogfood and experiment. For example, I can run my VPC
in “undo” mode so that when I shut down, I can choose to merge, keep or
throw away all the changes I made to that VPC. This is a great safety
net when dogfooding a bunch of different stuff. I’ve got a VPC with
Whidbey and Indigo. Instead of creating a separate VPC for Yukon, I can
install it into the Whidbey/Indigo VPC and see how well they play
together. It does mean I have a long merge cycle when I shut down
(assuming I don’t want to rollback the changes) and the VPC is runs
slightly slower. But it’s a heck of a lot easier than finding out after
the fact that build of this doesn’t work with this build of that.

Even for my “production” dev environments (I have two – client and
server), I can make a back up of the entire system as easily as copying
the multi-GB virtual hard drive file to a safe location. Of course, it
helps that I have 1GB of RAM and nearly 85GB of HD space in my laptop.

The only downside is that actually dogfooding [Virtual
PC](http://www.microsoft.com/windowsxp/virtualpc/) is a bit of a pain.
We have prebuilt XP and WS03 images available internally. But since I’m
on a later build of VPC, the additions aren’t always compatible with my
build. Our website lists “late in calendar year 2004″ for the
availability of Virtual PC 2004. So I guess there’s a light at the end
of that dogfood tunnel.
