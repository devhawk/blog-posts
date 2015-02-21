I know we shipped the [Tech Preview of WSE
2.0](http://microsoft.com/downloads/details.aspx?familyid=21fb9b9a-c5f6-4c95-87b7-fc7ab49b3edd&displaylang=en)
two weeks ago, but I was really busy those two weeks so I’m just now
getting around to checking it out. Specifically I was checking out the
[article](http://msdn.microsoft.com/webservices/default.aspx?pull=/library/en-us/dnwebsrv/html/programwse2.asp)
on programming with WSE 2.0. The “Rock, Paper, Scissors” demo app from
the article reminded me of something I thought of last week.

As I [blogged](http://devhawk.net/2003/07/16/where-ive-been/)
two weeks ago, I went to a presentation on enterprise architecture by
[John Zachman](http://www.zifa.com/). It was pretty good (though he
could have cut his justification section – he was talking to a room full
of architect evangelists!). One of the key things I took away from it
was that Architecture is the “thing” we do in order to build objects
that are so complicated that we can’t keep all the details in our head
at once. As an analogy, building a dog house doesn’t require much
architecture. It’s a very simple one story, one room, no moving parts,
no electricity, no plumbing, zero aesthetics since my dog just wants to
get in out of the rain kind of structure. Building a skyscraper, on the
other hand, requires a great deal of architecture. Besides the fact that
it’s all the things the doghouse isn’t, it also is going to be built by
multiple people. It’s very very important to get all those people on the
same page. You can’t afford to let each person make their own
assumptions about how the skyscraper is going to be built. In order to
keep people from making assumptions, you build very very detailed
blueprints and models of the building, and you refer back to them often
as you build.

(BTW, John has a very weird way of talking about avoiding assumptions.
He says that these models exist even if you don’t build them. But the
fact is, models and blueprints don’t build themselves. If you don’t
build explicit models, the builder are forced to make assumptions. For
example, if you say a building is going to be “tall”, different people
have different assumptions as to the number of floors a “tall” building
has. In the end, John’s way and my way are saying the same thing – you
need to build explicit models in order to avoid assumptions. But I feel
my way is more easily understood.)

In the case of demoware, one of the key requirements for the target
audience to be able to understand all of the details of the demo,
usually in a very short amount of time. This means that demos are
typically not applications that need to be architected.

So how do you demo architecture? If the app is simple enough to be
understood, it doesn’t need architecture. If the app is complex enough
to need architecture, it won’t be understood.
