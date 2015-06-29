As expected, day two of the WSSF customization workshop was much meatier
than [day
one](http://devhawk.net/2007/07/31/service-factory-customization-workshop-day-one/).
If you look at the technologies that power these p&p [software
factories](http://msdn2.microsoft.com/en-us/teamsystem/aa718951.aspx) –
[GAT](http://msdn2.microsoft.com/en-us/teamsystem/aa718948.aspx) and
[DSL](http://msdn2.microsoft.com/en-us/teamsystem/aa718368.aspx) –
you’ll notice that they’re not very well integrated. They share a text
templating engine and there are [some
docs](http://msdn2.microsoft.com/en-us/library/aa905334.aspx), but
that’s pretty much it. WSSF v3 is the first factory from p&p to heavily
use both technologies, and they’ve had to do significant integration
work to make them play nice.

In the new WSSF, there’s a special “model project” where you define data
and service contracts independently of an implementation technology.
This allows you to postpone your implementation decision as long as
possible. For WSSF, this seems pretty pointless – if you’re starting a
new service project from scratch, why would you build on ASMX instead of
WCF? – but conceptually the idea is rock solid. But this requires a
variety of cross-model and cross-project code generation and validation.
The vanilla DSL toolkit doesn’t support that, so the p&p guys had to
build it themselves.

I’d like to see p&p take their GAT/DSL integration work and package it
separately from WSSF. As it currently stands, you’ve got to install GAT
& the [VS SDK](http://msdn2.microsoft.com/en-us/vstudio/aa700819.aspx)
(to get DSLs) plus the integration bits from WSSF. There’s also the [GAX
Extension Library](http://www.codeplex.com/GEL) (aka GEL) plus Clarius’
[Software Factory Toolkit](http://www.softwarefactoriestoolkit.net/).
How about a single install to get all that stuff guys?

BTW, there’s a [new version of
GAT](http://blogs.msdn.com/tomholl/archive/2007/07/03/gax-1-3-for-orcas-announced.aspx)
coming soon that will support both VS05 and VS08 Beta 2. [According to
the VSX
team](http://blogs.msdn.com/vsxteam/archive/2007/07/01/VSX-Community-Letter-for-July-2007.aspx),
VS08 beta 2 SDK should also be available “early August”. So if you’re
moving over to VS08 (I am), you can still get down and dirty with
software factories.

**Update**: VS08 SDK for Beta 2 is 
[now available](http://www.microsoft.com/downloads/details.aspx?FamilyID=d9000e2c-bd3f-4717-a181-723960814e16&displaylang=en).
The new version of GAT is 
[apparently done](http://blogs.msdn.com/agile/archive/2007/07/19/shipping-gax-1-3.aspx),
but isn’t available for download yet.

**Later Update**: GAX/GAT July CTP is 
[now available](http://blogs.msdn.com/agile/archive/2007/08/02/new-gax-gat-july-2007-released.aspx).
