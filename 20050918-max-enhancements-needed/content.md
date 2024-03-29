So I had a little time to play on a recently reimaged partition so I
decided to install [Max](http://www.microsoft.com/max) to play with.
Very cool stuff. Sort of PhotoStory-esque. For someone with little kids
and tons of pictures, it’s a great tool. However, I see two immediate
issues that need to be rectified.

-   No Save or Export Capability. I’ve got Max running on a clean image,
    but I know I’ll want to reimage it again soon when there’s a later
    drop of WinFX or VS or LINQ that I want to play with. However, Max
    doesn’t have any way to save a picture list to the hard drive.
    Everything (and I mean everything) is stored in an XML file in the
    C:Documents and Settings\<userName\>Local SettingsApplication
    DataMicrosoftMicrosoft Codename Max directory. Spelunking the code
    with Reflector, I see a locally defined namespace called
    System.Storage. I’m guessing this is a stub WinFS library with the
    intention of migrating to the real deal at some point in the future.
    But since it’s just a stub, there’s no simple way to get stuff in
    and out of that file. I tried cutting and pasting of the XML, but
    Max told me the store was corrupted and I had to rebuild my photo
    list. Please add some way to save photo lists outside of Max!
-   No Downlevel experience. I showed my wife the photo list I built and
    her first response was “can you send me that?” Sadly, no I can’t. I
    realize that Max is supposed to be an example of the new-fangled
    WinFX stuff, but my wife, her best friend, my mother, my
    mother-in-law, etc. are NOT going to install the Sept. CTP of WinFX
    in order to run Max. Most of the cool Avalon stuff is in the
    authoring experience. Couldn’t you export a photo list to DHTML or
    something?

