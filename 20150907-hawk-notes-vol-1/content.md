This is the first in a series of blog posts about [Hawk](https://github.com/devhawk/Hawk), the engine that powers this site.
My plan is to make a post like this for every significant update to the site. We'll see well that plan works. 

 * I just pushed out a new version of Hawk on my website. The primary feature of this release is support for 
   [ASP.NET 5 Beta 7](http://blogs.msdn.com/b/webdev/archive/2015/09/02/announcing-availability-of-asp-net-5-beta7.aspx). 
   I also published the [source code](https://github.com/devhawk/Hawk) up on GitHub. Feedback welcome! 
 * As I mentioned in [my post on Edge.js](/blog/2015/09/02/the-brilliant-magic-of-edgejs), the publishing tools
   for Hawk is little more than duct tape and bailing wire at this point. Eventually, I'd like to have a
   dedicated tool, but for now it's a manual three step process:
     1. Run the [PublishDraft](https://github.com/devhawk/Hawk/tree/master/src/PublishDraft) to publish a post from 
        my draft directory to a local git repo of all my content. As part of this, I update some of the metadata and 
        render the markdown to HTML.
     2. Run my [WritePostsToAzure Custom Command](https://github.com/devhawk/Hawk/blob/master/src/Hawk/CustomCommands.cs#L79)
        to publish posts from my local git repo to Azure. I have a blog post on my custom command 
        infrastructure in the works.
     3. Trigger a content refresh via an [unpublished URL](https://github.com/devhawk/Hawk/blob/ae0431ffc0a816a218f00e4c1815adbe95e445f1/src/Hawk/Controllers/HomeController.cs#L50).
 * I need to trigger a content refresh because Hawk loads all of the post metadata from Azure on startup. 
   The combined metadata for all my posts is pretty small - about 2/3 of a megabyte stored on disk as JSON. 
   Having the data in memory makes it easy to query as well as support multiple post repositories (
   [Azure storage](https://github.com/devhawk/Hawk/blob/master/src/Hawk/Services/AzureRepo.cs) and the 
   [file system](https://github.com/devhawk/Hawk/blob/master/src/Hawk/Services/FileSystemRepo.cs)). 
 * I felt comfortable publishing the Hawk source code now because I added a secret key
   to the data refresh URL. Previously, the refresh URL was unsecured. I didn't think giving 
   random, anonymous people on the Interet the ability to kick off a data refresh was a 
   good idea, so I held off publishing source until I secured that endpoint.   
 * Hawk caches blog post content and legacy comments [in memory](https://github.com/aspnet/Caching/tree/dev/src/Microsoft.Framework.Caching.Memory).
   This release also adds cache invalidation logic so that everything gets reloaded
   from storage on data refresh, not just the blog post metadata. 
 * I don't understand what the ASP.NET team is doing with the BufferedHtmlContent class. 
   In beta 7 it's [been moved](https://github.com/aspnet/Common/blob/dev/src/Microsoft.Framework.BufferedHtmlContent.Sources/BufferedHtmlContent.cs)
   to the Common repo and [published as source](https://www.myget.org/F/aspnetmaster/api/v2/package/Microsoft.Framework.BufferedHtmlContent.Sources/1.0.0-beta7).
   However, I couldn't get it to compile because it depends on an [internal ```[NotNull]``` 
   attribute](https://github.com/aspnet/Common/blob/dev/src/Microsoft.Framework.BufferedHtmlContent.Sources/BufferedHtmlContent.cs#L119). 
   I decided to scrap my use of BufferedHtmlContent and built out several classes that 
   implement ```IHtmlContent``` directly instead. For example, the links at the bottom
   of my master layout are rendered by the [SocialLink class](https://github.com/devhawk/Hawk/blob/master/src/Hawk/Views/Shared/_Layout.cshtml#L7).
   Frankly, I'm not sure if rolling your own  ```IHtmlContent``` class for snippet
   of HTML code you want to automate is a best practice. It seems like it's harder than
   it should be. It feels like ASP.NET needs a built-in class like BufferedHtmlContent,
   so I'm not sure why it's been removed. 
    