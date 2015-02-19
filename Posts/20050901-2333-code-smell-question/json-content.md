So as a quick break from all this architecture talk, I’ve got a code
smell question. Here’s a scenario, I’m interested in feedback on the
best way to solve the issue.

I’m writing some VSTO code for Word using VS05. I want to be able to add
and update custom properties on the document. You do this via the
CustomDocumentProperties property off the document object. This
DocumentProperties collection supports the standard collection type
operations such as Add and an indexer. However, it’s a little exception
happy. If you attempt to access a property that doesn’t exist, it throws
an exception. And if you attempt to add a property that already exists,
it throws an exception. So the first time you set a custom property you
use the Add method and then after that you use the indexer to access the
existing item in the collection and update it’s value.

Of course, the way my code is written, I want to hide this ugliness
behind a method so that the rest of my code can simply set custom
properties with ease. However, I want to use the same method regardless
if the item already exists in the collection. So what’s the best way to
implement the method? I can think of two primary ways.

1.  Attempt to access the custom property via the indexer. If it throws
    an exception, trap it and call Add instead.
2.  Manually iterate through the existing custom properties. If the
    property exists, update it directly. If it doesn’t, call Add
    instead.

Neither of these is particularly fragrant from a code smell perspective,
but which is less odorous? The first one is more direct to write, but
since this is all COM interop code, the COM exception is pretty generic.
Theoretically, if something else caused an exception to be thrown, I’d
still assume the custom property was just missing and swallow the
exception, potentially causing an error somewhere else. However, writing
the code to manually iterate through the collection just seems
excessive.

In the end, I went with \#2 as I was more worried about swallowing
exceptions than manual iterating though the collection. What do you
think? Was that the right choice?
