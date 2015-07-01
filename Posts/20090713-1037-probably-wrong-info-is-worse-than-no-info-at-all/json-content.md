Like many geeks, I love [Dilbert](http://dilbert.com/). However, I
rarely identify with it as well as I did Sunday.

[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/dt090712.jpg)](http://dilbert.com/strip/2009-07-12)

I kid you not, I’ve had almost exactly this conversation back when I
worked in MS IT. They have this big repository of information about
deployed applications. Technically, you’re not supposed to deploy an
application without listing it in the application repository. Like
Dilbert, I never really understood what people were going to do with
this information, but the projects I was on dutifully collected the
relevant information and put it into the repository.

And never thought of it again. Ever.

And therein lies the problem. Populating the application repository was
an artificial step on the critical path of the deployment process.
Writing the software, acquiring the physical hardware to run it on,
stuff like that really is on the critical path. Populating the
application repository was extra busy work legislated by someone (I
forget if it was the central architecture team or management) that
didn’t benefit the project in the slightest. As such, it was given the
minimal about of attention and effort, meaning there was little quality
or consistency in the data. Worse yet, when the application changed or
was decommissioned , updating the application repository just didn’t
happen. I mean, it was supposed to, but rarely did.

So you ended up with a repository of information that was worse than
useless. I had a colleague who insisted that the repository had some
value because “not all of the data was wrong”. Of course, he couldn’t
tell me with any consistency which data was accurate and therefore
valuable and which was not. Hence, my argument that it was “worse than
useless”.

The only way an application repository is going to be of any value at
all is if you can collect the data automatically. My old teammate Buzz
coined a phrase we used often: “The Truth Is On The Edge”. You should
always regard any central repository of information with a very critical
eye since it’s rarely going to be the truth.

(Ed. Note – Man, it’s been a long time since I’ve written about
Architecture. My last Architecture post was [almost a year
ago](http://devhawk.net/2008/07/25/morning-coffee-171/). I don’t
miss the job but I do miss my old teammates – in particular Buzz, Rick,
Dale and of course [Nick Malik](http://blogs.msdn.com/nickmalik).)
