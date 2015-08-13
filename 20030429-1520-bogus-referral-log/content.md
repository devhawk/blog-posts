I’m on vacation, but still checking my email. Many thanks to Mickey
Williams who pointed out to me that my referral log had been hacked. I’m
not sure hacked was quite the right word for it – I was breaking the
first rule of [Secure
Code](http://msdn.microsoft.com/msdnmag/issues/02/09/SecurityTips/default.aspx)
– Trust User Input at Your Own Peril. The referral HTTP header is a form
of user input, and I was happily echoing it back out to the site without
any sort of check whatsoever. I guess I should consider myself lucky
that I ended up with a page full of porn links rather than something
more serious. Obviously, I’ve taken the page down. When I get back from
vacation, I’ll check the server log to see when this started happening.
Anyone else blindly storing and echoing referrals should keep an eye on
their log.

I asked a while ago about [canonical weblog
names](http://devhawk.net/2003/01/20/tracking-referrers/). At the
time, I wanted unify the entries in my referral log that pointed back to
the same weblog. Now, I want to also eliminate bogus entries as well. Is
[pingback](http://www.hixie.ch/specs/pingback/pingback)/[trackback](http://www.movabletype.org/trackback/)
the answer?
