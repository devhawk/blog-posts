We pushed out the [latest
beta](https://www.codeplex.com/Release/ProjectReleases.aspx?ProjectName=IronPython&ReleaseId=11566)
of IronPython 2.0 this morning. From the [release
notes](http://www.codeplex.com/IronPython/Wiki/View.aspx?title=v2.0%20Beta%202%20Release%20Notes&referringTitle=Home):

> We’re pleased to announce the release of IronPython 2.0 Beta 2. In
> addition to the usual bug fixes (\~25 reported on CodePlex and \~50
> reported internally), this release has been partially focused on
> improving the performance of IronPython, in particular startup perf.
> Another focus of this release was improving upon our traceback support
> which had regressed quite a bit in 2.0B1 and had largely been broken
> in the 2.0 Alphas. Our traceback support should now be superior to
> that of IronPython 1.1!
>
> We’ve also made a minor change to our packaging by adding a
> Microsoft.Scripting.Core.dll in addition to the
> Microsoft.Scripting.dll that’s been around since the start of 2.0. We
> are doing this purely as an architectural layering cleanup.
> Microsoft.Scripting.Core contains DLR features that are essential to
> building dynamic languages. Microsoft.Scripting will contain language
> implementation helpers that can either be re-used (e.g., BigInts) or
> copied (possibly e.g., the default binder). This process is all about
> our work to get the DLR architecture right and shouldn’t have any
> noticeable IronPython impact except that there’s now one more DLL to
> include in any package.
>
> As a consequence of the new DLL, the deprecated file
> IronPython2005.sln is broken. This is the last release that will
> include this .sln file in the source zip file. Of course the Visual
> Studio 2008 version of this file, IronPython.sln, still builds.
>
> We’d like to thank everyone in the community who reported these:
> kevgu, oldman, christmas, brucec, scottw, fuzzyman, haibo, Seo
> Sanghyeon, grizlupo, J. Merrill, perhaps, antont, 05031972, Jason
> Ferrara, Matt Beckius, and Davy Mitchell.

The full release notes have details about the bugs we fixed. Congrats to
the team and thanks again to the community members for their assistance.
