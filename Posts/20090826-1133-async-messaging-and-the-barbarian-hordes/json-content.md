At PDC 1996, [Pat Helland](http://blogs.msdn.com/pathelland/) did a six
minute bit where he compared personal computing to the [sacking of
Rome](http://en.wikipedia.org/wiki/Sack_of_Rome_(455)) and [Microsoft
Transaction
Server](http://en.wikipedia.org/wiki/Microsoft_Transaction_Server) to
the [Renaissance](http://en.wikipedia.org/wiki/Renissance). It was
called “[Transaction Processing and the Barbarian
Hordes](http://blogs.msdn.com/pathelland/archive/2009/01/19/transaction-processing-and-the-barbarian-hordes.aspx)”
and in my opinion it should be required viewing for everyone in the tech
industry.

Of course, the tech industry has changed significantly since PDC96. In
particular, personal computing has become the new “Classical Rome” and
web developers are the new barbarians. Just as Microsoft rediscovered
transaction processing in the 90’s, it seems that RESTifarians are on
the verge of rediscovering asynchronous messaging.

> “The internet [has been dead and
> boring](http://blogmaverick.com/2008/02/10/the-internet-is-officially-dead-and-boring-its-the-economy-stupi/)
> for a while now.  It has reached a point of stability where flashes of
> technological creativity are rare, but every now and then some new
> technology can put a spark back in the ole gal (no sexism intended).

> If you haven’t heard of
> [WebHooks](http://www.slideshare.net/progrium/using-web-hooks?src=embed)
> or[PubSubHubBub](http://code.google.com/p/pubsubhubbub/) its about
> time you did. Both are designed to  simplify and optimize the web.”
>
> Mark Cuban, [The Internet is about to
> change](http://blogmaverick.com/2009/08/25/the-internet-is-about-to-change/)

Not to put too fine a point on it, but these “flashes of technological
creativity” that Mark’s going gaga over aren’t new at all. Both Web
Hooks and PubSubHubbub are essentially async messaging, the oldest form
of messaging in the history of networking. But just as personal
computing ignored the importance of transaction processing for a long
time, REST has long ignored the importance of async messaging. Instead,
web development has instead been focused exclusively on request/response
– something [I’ve struggled
with](http://devhawk.net/2007/12/05/Durable+And+RESTful.aspx) for quite
some time. But the rise of Twitter has driven many people to realize
that something I’ve known since 2003: “[In order to truly evolve
syndication…we need to break free of the synchronous polling
model](http://devhawk.net/2003/12/17/Reliable+Syndication.aspx).” [1]

![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheAsyncWeb_13D36/image_8.png "image")I
love the slogan from [this Web Hooks
presentation](http://blog.webhooks.org/2009/04/23/slides-from-pivotal-labs-talk/):
“so simple you’ll think it’s stupid”. Web Hooks aren’t stupid – far from
it – but they certainly are simple. They’re basically
[callbacks](http://en.wikipedia.org/wiki/Callback_(computer_science)) –
which Web Hooks creator [Jeff Lindsay](http://blogrium.com) readily
acknowledges – invoked across the network using standard REST technology
like HTTP and XML or JSON. The canonical webhook examples are [Paypal
Instant Payment Notification](https://www.paypal.com/ipn) and [GitHub
Post-Receive Hooks](http://github.com/guides/post-receive-hooks). In
both cases, you register a custom notification URL with the system in
question. Then, when something specific happens in the system, a message
gets POSTed to the registered URL. In some scenarios, it’s a simple
notification. For example, when GitHub receives a commmit push, it POSTs
a JSON message about the commit to the registered URL. In other
scenarios, the initial message is the start of an async conversation –
the system expects you to POST a message back to them sometime in the
future. For example, when a customer makes a payment, PayPal POSTs a
message to the URL you registered. You then confirm the payment by
posting a message back to a well known PayPal URL.

Note, by the way, that both of these canonical examples depend on async
messaging. GitHub isn’t going to do anything with a response anyway, so
there’s no point in sending them a response. PayPal, on the other hand,
is expecting a response. Yet, they use async messaging instead of an
arguably simpler HTTP request/response operation. They do this for same
reason
[WS-Transaction](https://www.ibm.com/developerworks/webservices/library/ws-transjta/)
is the [Anti-Availability
Protocol](http://blogs.msdn.com/pathelland/archive/2007/05/20/soa-and-newton-s-universe.aspx)
– the last thing you want to do is lock up precious resources in your
system waiting for some nimrod on the other side of the Internet to
respond to a request you sent. Instead you what PayPal does – send an
async message, listen on a separate channel for a response, correlate
the messages explicitly via some kind of conversation identifier and
release your precious resources to do other work while you wait for the
response.

![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheAsyncWeb_13D36/image_7.png "image")
As for [PubSubHubbub](http://code.google.com/p/pubsubhubbub/), it’s
focused on real time delivery of new information. [Dave Winer’s recent
RSS Cloud efforts](http://rsscloud.org) focus on real-time notification
as well. In both cases, instead of subscribers polling a given RSS feed
for changes every X amount of time, they register for notification when
the feed is updated. This is very similar to the way GitHub uses async
messages for commit push notification as described above.

[![image](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheAsyncWeb_13D36/image_thumb_3.png "image")](http://s3.amazonaws.com/devhawk_images/WindowsLiveWriter/TheAsyncWeb_13D36/image_10.png)Both
PubSubHubbub and RSS Cloud include an intermediary that’s responsible
for managing the list of current subscribers and relaying the
notification when the publisher makes a change.  Honestly, I’m not a fan
of the Hub/Cloud intermediary – it feels a little too ESB-like to me.
However, since it’s only relaying notifications it receives without
transformation, I can live with it. Besides, there’s no reason why a
publisher can’t act as it’s own hub. The vast number of blogs and
twitter users have so few subscribers that the extra layer of
abstraction is probably not worth it. On the other hand, if you’re going
to run a notification hub for the largest users, you might as well use
it for smaller ones as well.

While I think Mark’s laid the “new technology” hype on pretty thick, I
do think he hits the nail on the head regarding the major new business
opportunities that can come from adopting the heretofore ignored async
messaging model on the web:

> “This could be an open door for the content business…Using The
> Associated Press as an example, AP could post their stories to a HUB.
> In realtime, the HUB can update member websites so that they will
> always have information first, before any aggregator. It may not take
> long for aggregators to recognize the new data on the member sites,
> but they won’t have it first.
>
> The New York Times could do the same thing. Subscribers could get
> everything first, in realtime. Then after some delay which might be 1
> minute, it might be 30 minutes depending on what the paper thinks is
> the value related to timeliness, it could post on the website and on
> twitter and facebook as updates. Would NY Times online readers pay \$1
> a month to be guaranteed that they get their news first, before anyone
> else ? I dont know.
>
> In the sports world, text based play by play websites could be updated
> in realtime rather than pulling every 30 seconds or requiring the user
> to hit refresh every few seconds.”

Arguably, this opportunity is easier to realize *precisely because async
messaging isn’t new technology*. Getting people to adopt a new
technology is incredibly hard. It’s much easier to get people to adopt a
new pattern for using an existing technology. And async messaging has
been possible as long as the web has been in existence.

Web Hooks and PubSubHubbub are long overdue but very welcome steps
forward in the evolution of the Internet. I wonder what the barbarians
will rediscover next?

------------------------------------------------------------------------

[1] Of course, writing a prediction like this is a far sight from
actually implementing it. If I had actually put some engineering effort
behind this in 2003, maybe I’d be a household name in the tech community
by now. On the other hand, I said some things in that same post that
have turned out to be spectacularly incorrect (“Indigo is going to make
Longhorn a great platform for SOA”) so it probably wouldn’t have made
much of a difference.
