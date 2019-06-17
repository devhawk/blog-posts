I just rolled out a new feature for my blog: [Series](/blog/series).

Back when I was working for the IronPython team, I would write series of posts on a single topic, such as [writing an IronPython debugger](/blog/2009/2/27/writing-an-ironpython-debugger-introduction) or [using IronPython's \_\_clrtype\_\_ metaclass feature](/blog/2009/4/20/introducing-__clrtype__-metaclasses). I've also written series on [building parsers in F#](/blog/2007/12/10/practical-parsing-in-f), [a step-by-step guide to brokered WinRT components](/blog/2014/4/25/brokered-winrt-components-step-by-step) and the [home grown engine I use for this blog](/2015/9/8/hawk-notes-vol-1). And with the [new job](/blog/2019/6/2/my-next-adventure), I suspect I'll be writing even more. 

So I decided to make series a first class construct in my blog. You can go to a top level page to see [all my series](/blog/series). Or you can go to a specific series page, such as the one for [Hawk Notes](/blog/series/hawk-notes). One thing I really like about Series is that they display in chronological order. That makes reading a series like the [IronPython Debugger](/blog/series/writing-an-ironpython-debugger) much easier to follow. 

Implementing Series was fairly straightforward...or at least it would have been if I hadn't decided to significantly refactor the service code. I didn't like how I was handling configuration - too much direct config reading that was better handled by [options](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options). I made some poor service design decisions that limited the use of [dependency injection](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection). Most of all, I wanted to change the way [memory caching](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory) worked so that more data loaded on demand instead of ahead of time. I also took the opportunity to use newer language constructs like [value tuples](https://docs.microsoft.com/en-us/dotnet/api/system.valuetuple) and [local functions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions).

I still have two different sources for posts - the local file system and an [Azure Repo](https://azure.microsoft.com/en-us/services/devops/repos/). I used to use [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/) but I got rid of that source as part of this refactoring. I have a simple interface PostLoader[^1] which the AzureGitLoader and FileSystemLoader classes implement. In order to select between them at run time, I have a third PostLoader implementation named PostLoaderSelector. PostLoaderSelector chooses between the sources based on configuration and uses [IServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.iserviceprovider) to activate the specified type from the DI container. PostLoaderSelector gets the IServiceProvider instance via constructor injection. I couldn't find a good example of how to manually activate types from ASP.NET's DI container, so for future reference it looks like this:

``` csharp
public Task<IEnumerable<Post>> LoadPostsAsync()
{
    // Look Ma, a Local Function!
    PostLoader GetLoader()
    {
        switch (options.PostStorage)
        {
            case BlogOptions.PostStorageType.FileSystem:
                return serviceProvider.GetService<FileSystemLoader>();
            case BlogOptions.PostStorageType.AzureGit:
                return serviceProvider.GetService<AzureGitLoader>();
            default:
                throw new NotImplementedException();
        }
    };

    var loader = GetLoader();
    return loader.LoadPostsAsync();
}
```

[^1]: Note the lack of the "I" prefix for my interface type names. Death to this final vestigal Hungarian notation! 
