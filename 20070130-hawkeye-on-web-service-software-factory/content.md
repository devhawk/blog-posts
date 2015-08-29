As I wrote the other day, I’ve been investigating the [Web Service
Software
Factory](http://msdn2.microsoft.com/en-us/library/aa480534.aspx). The
WSSF includes four guidance packages: Data Access, ASMX, WCF and WCF
Security. The Data Access isn’t service specific (I’m guessing it’s also
included in p&p’s [other
factories](http://msdn2.microsoft.com/en-us/library/aa137950.aspx)) so I
didn’t focus on it much. I also didn’t investigate the ASMX package at
all.

For the WCF and WCF Security packages, I walked through the tutorial in
the documentation. The tutorial contains the usual WCF suspects such as
creating a data contract, creating a service contract and implementing a
service contract. While you can do these things manually, the WSSF
provides wizards for most if not all these operations. This seems like
overkill for some of these operations. For example, filling out the grid
of data contract members was more cumbersome (for me) then just typing
the values in the code file.

Also on the subject of somewhat more complex than necessary, WSSF
provides wizards for building type translators. This is pretty standard
stuff: given an instance of a given type, the translator returns an
instance of a different type. Again, I find it faster to write the code
for this directly than to individually select the matching fields in the
wizard UI. Somewhere on the complexity scale between CRUD stored
procedures and service data contracts is the tipping point where it’s
faster and easier to just write the code than it is to manipulate the
wizard UI which generates the code.

On the plus side, the WSSF includes snippets which are very convenient
to use. For example, WSSF includes the WCFDataMember snippet (short
name: wcfDM). It’s a lot like the standard prop snippet, but with the
automatic addition of the DataMember attribute.

I had much more success with the main WCF package than I did with the
WCF Security package. I wasn’t interested in the anonymous or direct
authentication mechanisms, which left only two security recipes that I
cared about: kerberos and x.509 certificates. Unfortunately, I couldn’t
make either of these tutorials work. For kerberos, the baseline
configuration works (i.e. standard wsHttpBinding with no additional
configuration), but after running the “Secure a Service Using Kerberos”
recipe, I get an exception that “The token provider cannot get tokens
for target”. It wasn’t in me to debug the sample to figure out what that
meant. For x.509 certificates, I can’t even complete the wizard – I
click OK in the certificate selection dialog, but the wizard doesn’t get
updated and won’t let me continue.

I really dig the new [Guidance
Navigator](http://blogs.msdn.com/tomholl/archive/2006/06/07/GuidanceNavigator.aspx)
window, especially the history window, but I do have one problem with
it. Is there a way to mark a recipe so it doesn’t show up in the history
view? The WSSF includes some recipes like “View Service in Browser” and
“Run Client” that don’t change the project state and quickly clutter up
the history view. It would be great if they didn’t show up there in the
first place.

I’m guessing the WSSF is designed primarily new WCF developers, so I’m
not exactly in the target demographic. Many of my issues above stem from
my deeper than average experience with it (though nowhere near the depth
of experience some members of the community have already). But it’s a
good start and I’m sure it will get better with successive releases.
