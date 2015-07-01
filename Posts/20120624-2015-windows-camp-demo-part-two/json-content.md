In my [previous
post](http://devhawk.net/2012/06/19/windows-camp-demo-part-one/), we set
up a C++ WinRT component project and a C\# Metro style XAML app to use
the component. The code was dinky Hello, world type stuff. Now, let’s do
something a little more interesting.

In preparing for this demo, I found a [C++ bitmap
library](http://bitmap.codeplex.com/) on CodePlex that includes a plasma
texture generation function. This sounded like a good demo for both
language interop and using existing code. It builds on the code from [my
previous
post](http://devhawk.net/2012/06/19/windows-camp-demo-part-one/), so
either start there or [clone from
GitHub](https://github.com/devhawk/WindowsCampDemo) and checkout the
part1 tag.

First step is to add the bitmap\_image.hpp file from [Arash
Partow’s](http://www.partow.net/index.html) [C++ Bitmap
Library](http://bitmap.codeplex.com/) to the C++ component project.
Download the [latest
commit](http://bitmap.codeplex.com/SourceControl/list/changesets) from
CodePlex as a zip and extract the bitmap\_image.hpp file into your C++
component project directory. Switch over to VS, right click on the
component project node, select Add -\> Existing Item… and select the
bitmap\_image.hpp file.

Now that we have included the library code, we need to write the wrapper
code to expose that library functionality to other languages via WinRT.
We’ll start by adding the following namespace declarations to the top of
the Class1.h header file:

``` cpp
using namespace Windows::Foundation;
using namespace Windows::Storage::Streams;
```

And then we’ll add the declaration for our GetPlasmaImageAsync method to
Class1’s header file underneath the SayHello method. Note, in my
original presentation I called this method GetPlasmaImage, neglecting to
follow the naming convention of appending “Async” to name of all
asynchronous methods.

``` cpp
IAsyncOperation<IRandomAccessStream^>^ GetPlasmaImageAsync(
    unsigned int width, unsigned int height);
```

We’re using two WinRT types in this method declaration.

-   [IRandomAccessStream](http://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.streams.irandomaccessstream.aspx)
    represents a stream of binary data that supports random access.
    We’re going to return our plasma image as an IRandomAccessStream and
    then wrap it in a XAML bitmap image for use in our UI.
-   [IAsyncOperation\<T\>](http://msdn.microsoft.com/en-us/library/windows/apps/br206598.aspx)
    represents an asynchronous operation that returns a value.
    Generating the image takes a significant amount of time (especially
    given the shortcut I used as you’ll see in a bit) so we need to make
    it async. Async is a *big* topic and we’re just touching on it in
    this walkthrough. For more on async in WinRT, check out my teammate
    [Jason Olson’s
    post](http://blogs.msdn.com/b/windowsappdev/archive/2012/03/20/keeping-apps-fast-and-fluid-with-asynchrony-in-the-windows-runtime.aspx)
    on the [Win8 app developer
    blog](http://blogs.msdn.com/b/windowsappdev/).

Now that we have the declaration, let’s switch over to the Class1.cpp
file to add the method implementation. This isn’t a one line method like
SayHello, so I decided to separate declaration from implementation as is
traditional C++ best practice.

Before we do anything else, we need to \#include the bitmap\_image.hpp
file. However, this bitmap library uses an unchecked destination STL
copy function that [Microsoft considers
unsafe](http://msdn.microsoft.com/en-us/library/aa985872(v=vs.110).aspx).
I *really* should be updating the code to used [checked
iterators](http://msdn.microsoft.com/en-us/library/aa985965(v=vs.110)),
but since this is demo code, we’re going to turn off the warning
instead. We do that by \#defining \_SCL\_SECURE\_NO\_WARNINGS. While
we’re doing that, let’s add the additional \#includes and using
namespace statements we’re going to need.

``` cpp
#include "pch.h"
#include "Class1.h"

#define _SCL_SECURE_NO_WARNINGS
#include "bitmap_image.hpp"
#include <string>
#include <ppltasks.h>

using namespace WindowsCampComponent;
using namespace std;
using namespace concurrency;
using namespace Windows::Storage;
```

In addition to the bitmap image library, we’re going to need the STL
string library and the Parallel Patterns Library, so I’ve gone ahead and
\#included those header files and used those namespaces. We’re also
going to use some types from the Windows::Storage namespace, so I’ve
used that namespace as well.

The implementation of the GetPlasmaImageAsync method is going to happen
in several steps:

1.  Generate the plasma image using the C++ Bitmap library
2.  Save the plasma image to a temporary file
3.  Reopen the temporary file as an IRandomAcessStream with WinRT’s file
    system APIs

Saving and reopening the file is the shortcut I alluded to earlier. The
image library includes a save\_image method that uses STL streams to
write the image out to a file. A better solution would be to factor the
save\_image method to support saving a bitmap to a stream and then
implementing an STL -\> WinRT stream adapter, but this is a simple demo
so I’ll leave that as an exercise to the reader. (Please send me a pull
request if you do this!)

First, we’re going to generate the file path we’ll be saving the image
to. Turns out this somewhat difficult because WinRT uses wide character
strings while the bitmap library expects ASCII STL strings.

``` cpp
//get the temp filename
auto tempFolder = ApplicationData::Current->TemporaryFolder;

wstring tempFolderPath(tempFolder->Path->Data());
string folderPath(begin(tempFolderPath), end(tempFolderPath));

auto filePath = folderPath.append("\\plasma.bmp");
```

I’m not proud of this code. It’s the kind of code you write when you’re
rushing to get a demo for your talk done. But lets look at it anyway.

First, I get the path to the temporary folder via the
[current](http://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.applicationdata.current.aspx)
[ApplicationData](http://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.applicationdata.aspx)
object. Then I converted it first to a std::wstring and then to a
std::string. I probably could have created the std::string directly from
the tempFolder variable, but using the begin and end iterators of the
wstring is a clever hack I read somewhere online. Finally, I append the
file name to the folder path to get the final file path name.

Next, we generate and save the plasma image. This code is lifted almost
verbatim from the bitmap\_test.cpp file that comes with the C++ image
library. The only difference is that we’re using the width and height
arguments as parameters to the bitmap\_image constructor rather than
hardcoded values.

``` cpp
//create the image object
bitmap_image image(width, height);
image.clear();

double c1 = 0.9;
double c2 = 0.5;
double c3 = 0.3;
double c4 = 0.7;

::srand(0xA5AA5AA5);

//generate plasma image
plasma(image, 0, 0, image.width(), image.height(),
    c1, c2, c3, c4, 3.0, jet_colormap);

//Save the image to the file
image.save_image(filePath);
```

Finally, we open the image file from the temporary folder using WinRT
APIs. File access APIs in WinRT are exclusively async, so I’m using [PPL
tasks](http://msdn.microsoft.com/en-us/library/hh750113(v=vs.110)) to
simplify the async code. Note, I’ve reworked this code from what I did
in the video to make it easier to understand. I’ve also added explicit
type declarations that I didn’t need to make it clear what each type is.
If I replaced those all with the new auto keyword from C++11, the code
would work the same.

``` cpp
//reopen the image file using WinRT
IAsyncOperation<StorageFile^>^ getFileAsyncOp =
    tempFolder->GetFileAsync(ref new String(L"plasma.bmp"));

task<StorageFile^> getFileTask(getFileAsyncOp);

task<IRandomAccessStream^> openFileTask =
    getFileTask.then([](StorageFile^ storageFile) {
       return storageFile->OpenAsync(FileAccessMode::Read);
    });

return create_async(
    [openFileTask]() { return openFileTask; });
```

First, we call GetFileAsync to get the file from the temp folder which
returns an IAsyncOperation\<StorageFolder\^\> object. We then convert
the IAsyncOperation to a PPL task via the task constructor. Note, these
two steps could be easily combined into a single step if you not being
extra verbose for education purposes.

Once we have a PPL task to get the file, we specify the operation to do
when the task completes by passing a lambda to the [task’s then
method](http://msdn.microsoft.com/en-us/library/windows/apps/hh750044.aspx).
In this case, we’re going to open the file after we get it. The then
method is nice because we can chain together as many async operations as
we want in a nearly-synchronous coding style.

Finally, once we have built up the PPL task that represents the entire
asynchronous operation, we use the
[create\_async](http://msdn.microsoft.com/en-us/library/hh750102(v=vs.110).aspx)
method to convert the PPL task back to an IAsyncOperation which we
return from the function.

Now that we have written the component side, lets update the client
side. Async operations are very succinct in CLR because of the [new
await
keywords](http://msdn.microsoft.com/en-us/library/hh191443(v=VS.110).aspx).
Much nicer than the .then model used by PPL (which is probably why Herb
Sutter [wants to see await added to
C++](http://herbsutter.com/2012/04/06/we-want-await-a-c-talk-thats-applicable-to-c/)).

``` csharp
private async void Button_Click_1(object sender, RoutedEventArgs e)
{
    var wcc = new WindowsCampComponent.Class1();
    myText.Text = wcc.SayHello("Herb Sutter");

    var stm = await wcc.GetPlasmaImageAsync(800, 600);

    var bitmap = new BitmapImage();
    bitmap.SetSource(stm);
    myImage.Source = bitmap;
}
```

And it works!

[![](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/WCDemo2-RunningApp-300x187.png "WCDemo2-RunningApp")](https://raw.githubusercontent.com/devhawk/devhawk.github.io/master/images/blog/WCDemo2-RunningApp.png)

And that’s the entire demo. About 20 lines of code to wrap a
 pre-existing library function and make it available to other languages
via the Windows Runtime. I showed calling my WinRT component from C\#
here, but I could have called it from JavaScript just as easily.
