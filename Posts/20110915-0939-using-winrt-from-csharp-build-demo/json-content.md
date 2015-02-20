Yesterday at[//build](http://www.buildwindows.com/), Jesse Kaplan and I
delivered the [Using Windows Runtime from C\# and Visual
Basic](http://channel9.msdn.com/Events/BUILD/BUILD2011/TOOL-531T) talk.
In the talk, I demonstrated how natural and familiar it is to use WinRT
from C\# by building a simple Metro style app. This app  takes a picture
with a webcam and implements the share charm contract in less than 15
lines of C\# code.

Instead of making you try and read code off the recorded video stream
that should be published soon, I’ve written this walkthru to explain
exactly what I did in that demo. In addition, I’ve started from scratch
(i.e. File-\>New Project) so that you can follow along at home if you
wish.

First, you need to install the [Windows Developer
Preview](http://msdn.microsoft.com/en-us/windows/apps/br229516). I
recommend the x64 version with tools. Scott Hanselman has a [great write
up](http://www.hanselman.com/blog/GuideToInstallingAndBootingWindows8DeveloperPreviewOffAVHDVirtualHardDisk.aspx)
on using boot to VHD to run the preview. (though I do disagree w/ his
assessment of dual boot. I’ve been dual booting Win7 and Win8 on my
laptop for months and it’s never ended in tears or blood). Also, you’re
going to need a webcam in order to run the app yourself.

Once the Windows Developer Preview is up and running, run the Socialite
app and login with your Facebook credentials. We’re going to use
Socialite to share the picture we take with the webcam. Giving it your
credentials up front makes the demo run smoother!

Next, fire up VS11 (aka Microsoft Visual Studio 11 Express for Windows
Developer Preview). Create a new project and select the Visual C\# -\>
Windows Metro Style -\> Application template.

Once the new project has been created, you should be looking at the
MainPage.xaml file. Update the Grid element to contain a button and an
image.

``` xml
<Grid x:Name="LayoutRoot" Background="#FF0C0C0C">
    <Button x:Name="ClickMe" Click="ClickMe_Click">Click Me</Button>
    <Image x:Name="Photo" Width="800" Height="600"
           HorizontalAlignment="Center" VerticalAlignment="Center"/>
</Grid>
```

Next, hover over the Click=”ClickMe\_Click” attribute of the button,
right click and select “Navigate to Event Handler”. VS11 will take you
to MainPage.xaml.cs and automatically generate a skeleton event handler
for you.

In my //build session, I demonstrated that VS11 can automatically
resolve WinRT namespaces the same way that it resolves managed
namespaces. But for the purposes of this blog post, it’s easier if you
just add the additional using statements we’re going to need at the top
of MainPage.xaml.cs now.

``` csharp
using Windows.Media.Capture;
using Windows.Storage;
using Windows.UI.Xaml.Media.Imaging;
using Windows.ApplicationModel.DataTransfer;
using Windows.Storage.Streams;
```

Now, we add the code for ClickMe\_Click:

``` csharp
private async void ClickMe_Click(object sender, RoutedEventArgs e)
{
    var ui = new CameraCaptureUI();
    ui.PhotoSettings.CroppedAspectRatio = new Size(4, 3);

    var file = await ui.CaptureFileAsync(CameraCaptureUIMode.Photo);

    if (file != null)
    {
        var stream = await file.OpenAsync(FileAccessMode.Read);

        var bitmap = new BitmapImage();
        bitmap.SetSource(stream);
        Photo.Source = bitmap;
    }
}
```

A few things to note about this code:

-   Even though it’s using native WinRT libraries, the C\# feels natural
    and familiar – as if you were calling into traditional managed
    libraries. We’re newing up classes, we’re passing in constructor
    parameters, we’re using primitive numbers and enums, we’re assigning
    properties, etc. That is very much by design.
-   We’re using a couple of async WinRT methods (CaptureFileAsync and
    OpenAsync). C\# 5.0′s new await keyword to make it extremely easy to
    write linear looking code that doesn’t block on async operations.
-   No P/Invoke or COM Interop attributes anywhere to be seen!

Finally, before we can run this code we need to declare our intent to
use the webcam. Double click on the Package.appxmanifest file, click on
the “Capabilites” tab, and then check the Webcam checkbox.

With the capability declared, now we can run the app. Hit F5 and VS11
will compile and deploy the Metro style app you just built. Click the
button, acknowledge that you want to let the program use the webcam,
take a pic, crop it, and there it is in your UI!

For the second part of the demo, I added share contract support. Here’s
how to do that.

First, we need to pull the stream variable into class instance scope so
that we can access it in the share contract event handler. We do that by
adding a private IRandomAccessStream variable named stream and removing
the var declarations from the line where we call OpenAsync. The updated
click event handler looks like this:

``` csharp
//here's the instance scope stream variable
IRandomAccessStream stream;

private async void ClickMe_Click(object sender, RoutedEventArgs e)
{
    var ui = new CameraCaptureUI();
    ui.PhotoSettings.CroppedAspectRatio = new Size(4, 3);

    var file = await ui.CaptureFileAsync(CameraCaptureUIMode.Photo);

    if (file != null)
    {
        //the only change from the code above was to remove
        //the var declaration from the following line
        stream = await file.OpenAsync(FileAccessMode.Read);

        var bitmap = new BitmapImage();
        bitmap.SetSource(stream);
        Photo.Source = bitmap;
    }
}
```

Next, we need to wire up the share event handler in the XAML page’s
constructor. That’s a single line of code and VS11 intellisense writes
most of  it for you

``` csharp
public MainPage()
{
    InitializeComponent();
    DataTransferManager.GetForCurrentView().DataRequested +=
        new TypedEventHandler<DataTransferManager, DataRequestedEventArgs>(MainPage_DataRequested);
}
```

If you’ve ever wired up an event handler in C\# before with VS, you’ll
be familiar with the “Press TAB to insert” the correct event handler
type followed by “TAB to generate handler”. Even though hthis is a WinRT
event, VS11 helps you wire it up just the same as it does for managed
events.

Now we implement the share contract event handler. That’s just a simple
if statement – calling args.Request.Data.SetBitmap if the user has taken
a picture and calling args.Request.FailWithDisplayText with an error
message if they have not.

``` csharp
private void MainPage_DataRequested(DataTransferManager sender,
    DataRequestedEventArgs args)
{
    if (stream == null)
        args.Request.FailWithDisplayText("No picture taken!");
    else
        args.Request.Data.SetBitmap(stream);
}
```

This part of the demo shows off static methods and event
handlers. Again, note how natural and familiar it feels to use WinRT
from C\#.

And we’re done, so hit F5 to build, deploy and run the app again.

I didn’t remember to do this in the //build talk, but first try
selecting the share contract *before* taking a picture. Windows will
display the “No picture taken” text in share contract window since the
user taken a picture to share yet. That’s pretty boring so dismiss the
share contract and take a picture like you did before. Then select the
share contract, select Socalite, write a pithy message and press “Share
in Facebook”.

That’s the entire demo! Taking a picture with the webcam, uploading to
facebook, calling native WinRT APIs from C\# in a natural and familiar
way and all in just under 15 lines of code!

With our talk and demos, Jesse and I wanted to communicate just how
important C\# and VB are in the overall developer story for Windows 8.
This demo shows off the hard work our two teams have done in order to
make sure the managed developer’s experience with Windows 8 was the best
that it could be. As I said in the talk – if you’re a managed developer,
<span style="text-decoration: underline;">you already know how to build
these Metro style apps</span>.

I know I [said it
before](http://devhawk.net/2011/09/15/the-windows-runtime/), but I
really can’t wait to see what you guys build with Windows 8!
