*Note: this is the first in a series of Web 2.0 entries. I know I’m [on
record as hating the term Web
2.0](http://devhawk.net/2006/01/26/Hating+The+Term+Web+20.aspx), but as
I wrote in that post, I do belief there is a fundamental shift underway
in computing. The industry is calling this Web 2.0, and I can either
spit in the wind or go with the flow. Furthermore, for the more Web 2.0
savvy among my readership, much of what I write about in this series may
be old news. But I want to blog what I learn as I learn it, so bear with
me.*

Just as the dumb terminal was eventually replaced with more
sophisticated personal computers, the dumb browser has been replaced on
the modern desktop by something significantly more versatile. When the
ability to process arbitrary script code was added to the browser, it
became a virtual machine in its own right. Perhaps unique and
special-purpose when compared to environments such as the .NET CLR, but
a VM all the same. And while its unique nature makes the browser
unusable for entire genres of applications – you’d never use the browser
to build a server application for example – it makes it well tailored
for user-centric, software as a service style applications that have
become commonplace. While the browser’s scripting capabilities have been
around since the mid 90s, the industry has only recently started to
leverage those capabilities to build applications that run on the client
inside the browser. Jesse James Garrett
[coined](http://www.adaptivepath.com/publications/essays/archives/000385.php)
the term “AJAX” – Asynchronous JavaScript and XML – to describe this
style of application.

If the browser is a virtual machine, that makes JavaScript the “assembly
language” of the browser. That is, JavaScript is the lowest level of
abstraction you can program the browser with.  This has pretty dramatic
implications on the applications you build for the browser VM. For one,
JavaScript is at a sufficiently high level of abstraction that you can
use it directly and be productive. Writing an entire application in IL
or Java byte code is unthinkable, but isn’t really a big deal for
JavaScript. Furthermore, Because JavaScript is a text-based scripting
language, protecting your code as intellectual property is extremely
difficult. While obfuscators exist, in the end they can only delay the
reverse engineering of your code, not prevent it. This encourages
business models where the in-browser code has little if any value.

For example, the big mashup functionality these days is mapping. There
are three big mapping services out there: [Google
Maps](http://www.google.com/apis/maps/), [Microsoft Virtual
Earth](http://viavirtualearth.com/) and [Yahoo!
Maps](http://developer.yahoo.net/maps/). 266 of the 368 mashups listed
on [ProgrammableWeb](http://www.programmableweb.com/) as I write this
include mapping functionality from one of those services. That’s nearly
three out of four. Mapping is interesting because of the sheer amount of
data involved. In fact, the code is pretty useless without the back-end
data. So while I can get the code for Google Maps, it does me no good
without access to the data for which I need the API key. Contrast this
with the complete lack of market for browser-based rich text editors.
Sure, there are various open-source script libraries like
[Dojo](http://dojotoolkit.org/docs/rich_text.html), [Web Wiz
RTE](http://www.richtexteditor.org/) and [Kevin Roth’s
RTE](http://www.kevinroth.com/rte/demo.htm). But no companies offering a
rich text editor service like they offer map services. Why is that? I
would think the value of rich text editing would be even more widely
applicable than mapping. The problem is that, unlike the map service,
there’s no back end associated with a rich text editor. There’s no way
to protect a client-side-only solution such as these rich text editors.
The only people who do sell rich text editor components are ones who
have integrated into some back-end programming environment such as
Richer Components’ [RichTextBox for
ASP.NET](http://www.richercomponents.com/asp-net-components/rich-text-box-wysiwyg-editor.html).

The browser as a VM also has broad implications with regard to
extensibility. Similar capabilities are delivered by the four major
browsers (IE, Firefox, Opera and Safari) across the major operating
systems (Windows, MacOS, Linux, FreeBSD). So the question is, how will
new capability evolve in the browser? Will the growing number of [Web
2.0 companies](http://www.techcrunch.com/company-index/) looking to
provide compelling features and differentiate themselves in the
marketplace demand new functionality in the browser VM? Will one of the
browser vendors be willing to take the heat of building proprietary
extensions to their browser? I realize that many people have a dim view
of proprietary extensions, but many features we take for granted today
are de facto standards that arose from Microsoft’s proprietary
extensions to IE. Most notable of these of course is XMLHttpRequest,
without which “AJAX” would just be “J”. And JavaScript itself started
life as a proprietary extension to Netscape before eventually being
turned over to ECMA for standardization.
