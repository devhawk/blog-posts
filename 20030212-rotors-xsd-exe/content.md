Among the other coolness of
[Rotor](http://msdn.microsoft.com/net/sscli), it includes an
implementation of the [XML Schema Definition
tool](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cptools/html/cpconxmlschemadefinitiontoolxsdexe.asp)
(XSD.exe) from the .NET SDK. It’s somewhat limited compared to the
production version (no support for generating DataSets, schema
inference, XDR or Visual Basic) but it does provide the primary goal of
generating classes from XSD and generating XSD from classes. Spelunking
around just the build process of Rotor’s XSD.exe yielded interesting
discoveries.

-   The Rotor build process uses the C++ compiler to generate
    AssemblyAttributes.cs and AssemblyRefs.cs. AssemblyAttributes has
    all the assembly level attributes (similar to the AssemblyInfo file
    that is generated by all the VS.NET project wizards). AsseblyRefs
    has a class named ThisAssembly with much of the same info available
    programmatically plus a variety of other assembly reference strings
    and public key information. The C++ compiler is being used as a
    preprocessor to insert concrete values into a generic files
    (AssemblyAttributes.cspp and AssemblyRefs.cspp in the
    ssclirotorenvbin directory).
-   There’s a really useful perl script named gensr in the
    ssclirotorenvbin directory. It reads a text resource file and
    creates string constants for every resource name. It also provides
    useful utility methods including type-safe and culture aware
    GetBoolean, GetChar, GetByte, GetShort, GetInt, GetLong, GetFloat
    and GetDouble. It also overloads GetString to support format strings
    (like string.Format).

I haven’t done much with localization, but I should, so the discovery of
the gensr script is particularly useful for me. Of course, I want a
compiled utility version of it.
:smile: The
question is rewrite in C\# or use the [ActiveState Perl Dev
Kit](http://www.activestate.com/Products/Perl_Dev_Kit/) which includes
their [PerlNET
compiler](http://aspn.activestate.com/ASPN/Perl/Reference/Products/ASPNTOC-PERLDEVKIT-000-009).
I’ll probably go C\# due to my severe lack of perl skills. In the
meantime, I used [Perl2exe](http://www.indigostar.com/perl2exe.htm).
Works OK, except that the resulting exe is almost 700kb while the
original script is 9kb. That’s a lot of bloat, but I guess that’s the
price of convenience.

