I [blogged](http://devhawk.net/2004/03/09/learning-in-the-hell-of-content-repurposing/)
yesterday about the issues I’m having with manually repurposing content.
One of the specific issues has to do with the [Architecture Strategy
Series](http://msdn.microsoft.com/architecture/overview/series/). We
provide that content via three channels – DVD, online seminars and
(soon) download. We use
[Producer](http://www.microsoft.com/office/powerpoint/producer/prodinfo/default.mspx)
to create the DVD and download files. However, online seminar system
doesn’t support Producer. The primary issue is that Producer uses the
Save as HTML version of the PPT, but the online seminar system only
supports static images. This means having to manually strip out the
animations, which is a pain in the ass. Since I don’t ever want to have
to do that again, I wrote a PowerPoint add-in to do it for me.

When you invoke the [Build Slide Export
add-in](http://cid-0d9bc809858885a4.office.live.com/self.aspx/DevHawk%20Content/BlogFiles/BuildSlideExport.msi)
, it will step thru your presentation and screen capture each slide
build to disk. It’s very similar to the built in Save as JPEG/GIF/PNG
feature, except that it creates an image per build, not per slide. So
those complex build slides turn out multiple image files. It’s sort that
you can’t use the machine for anything else while it’s processing, but
it was really easy to write the code. I tested it on a long complex PPT
file with lots of builds (i.e. the one that took me hours to repurpose
on Monday) and it took about 10 minutes.

I’m also providing the
[source](http://cid-0d9bc809858885a4.office.live.com/self.aspx/DevHawk%20Content/BlogFiles/BuildSlideExport%20Source.zip)
to the add-in. It’s not much code: maybe 150 lines of relevant code at
most. I grabbed the screen capture code from [Perry Lee on C\#
Corner](http://www.c-sharpcorner.com/Code/2003/Dec/ScreenCapture.asp).

There were a couple of gotchas involved with this add-in. For example,
the add-in project type uses version 7.0 of the office.dll that comes
with VS.NET. However, Office 2003 comes with version 11.0 of that DLL
and not 7.0, so the first time I went to deploy on my production
machine, it didn’t work. I had to grab the right version of office.dll
out of the GAC in order to reference it, so it’s included in the lib
directory of the source archive (it looks like
[Simon](http://www.simonguest.com/) did something similar with
[Niobe](http://workspaces.gotdotnet.com/niobe)). Also, PowerPoint’s
object model is a little funky. Specifically, SlideShowView.Next() has
to be called differently depending on the types of builds in the slides.
I handle four different scenarios in the code: no builds, only auto
trigger builds, and manual trigger builds, optionally with a set of auto
trigger builds before the first manual trigger build.

I’m sure there’s other enhancements that could be made – for example,
the directory the images are saved isn’t selectable nor is the image
format. If there’s any interest, I’ll spin up a GDN workspace.

**Update**: I just noticed a bug, albiet a cut-and-paste bug on my part.
Turns out the [screen capture
code](http://www.c-sharpcorner.com/Code/2003/Dec/ScreenCapture.asp) that
I used is creating four image objects for each screen capture. To make
matters worse, three of them are never assigned to a variable, so you
can’t call Dispose() on them. So for any real-sized presenation, memory
usage goes thru the roof. It’s relatively easy to fix. Take the code
that looks like this:


```csharp
Bitmap image = new Bitmap(
    Image.FromHbitmap(new IntPtr(hBitmap)),
    Image.FromHbitmap(new IntPtr(hBitmap)).Width,
    Image.FromHbitmap(new IntPtr(hBitmap)).Height);
image.Save(fileName,imageFormat);
```

And replace it with this:

```csharp
Bitmap image = Image.FromHbitmap(new IntPtr(hBitmap));
image.Save(fileName,imageFormat);image.Dispose();
```

With the improved code, only one bitmap per screen capture is made, and
it’s explicitly disposed. That keeps memory usage under control.

**Another Update**: I’ve updated the binary and the code links above
with the new v1.0.1 version that fixes the memory hogging problem.
