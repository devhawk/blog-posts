Piyush Pant
[wonders](http://unhandledx.blogspot.com/2006/08/modelling-overload.html)
if SML solves a problem that nobody has? He also points out
[SysML](http://www.sysml.org/) project, which recently got folded into
the [OMG](http://omg.org/). Well, that explains why we called it
“Service” instead of “System” modeling language.

Now that I work in IT, I can definitely say that SML will *eventually*
solve a problem that I have. Most people agree that operations today is
way to dependent on manual processes to scale effectively. Now SML
doesn’t solve that issue directly – as Piyush pointed out SML is a
meta-modeling specification. However, SML is the foundation for the next
generation of operational modeling tools like what we see in [Visual
Studio Team System for
Architects](http://msdn.microsoft.com/vstudio/teamsystem/architect/). As
I [wrote several years
ago](http://devhawk.net/2004/02/03/Being+A+Model+Citizen.aspx), VSTS:A
solves a very common problem – developers lack of understanding about
the deployment environment. Piyush, haven’t you ever had a long weekend
going back to the drawing board because the solution you had built was
undeployable and you didn’t discover that fact until the operations team
attempted to deploy it? If you haven’t, I envy you.

On the surface, I agree with Piyush when he says that “history of
software is littered with unsuccessful attempts to impose monolithic
modeling constructs”. However, the fact that it keeps happening
indicates the problem hasn’t been solved. Wanting to solve a problem and
being able to solve a problem are two different things. Furthermore, the
history of software is also littered with very successful attempts to
raise the level of abstraction by the introduction of new programming
languages: C, C++, VB and Ruby are all examples of this. Given that
[Code is Model](http://devhawk.net/2005/10/05/Code+Is+Model.aspx), what
we have is a history of software littered with some successful and some
unsuccessful modeling constructs. I would argue that the successful
modeling constructs have taken a bottom up approach – build a language a
small abstraction step above something that actually runs and compile
down. These unsuccessful modeling constructs (\*cough\* UML \*cough\*)
take a top down approach – build a language way above anything that
actually runs and hope a miracle happens to keep it in sync with the
stuff you actually build.

The question is whether SML will be top-down (i.e. a failure) or
bottoms-up (i.e. a success). So far, it’s to early to tell, but I have
high hopes.
