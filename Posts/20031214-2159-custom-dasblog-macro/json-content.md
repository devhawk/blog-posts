I’m back from vacation and I just *had* to deploy a small dasBlog update
that I hacked up while I was on the plane and my wife and son were
sleeping.
[Clemens](http://staff.newtelligence.net/clemensv/) [posted](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=170388)
on the GDN workspace about registering your own macro classes. The theme
that my wife wanted for [her weblog](http://techiewife.com/) comes with
a variety of different sayings for the top of the page (My Journal,
Welcome, Listen To My Cheery Chirpings, etc). I thought it would be cool
if the image rotated or changed every time you came to the site. So I
built my own custom macro class that overrides the radio.macros.imageUrl
macro. Now, if you pass in a series of images seperated by vertical
pipes (i.e. “image1.gif|image2.gif|image3.gif”), it will split out into
an array of image urls and pick one at random. Pretty cool. Anyone want
to see the code?
