Here are some technical details on my [Nightly Builds
solution](http://devhawk.net/2009/01/07/ironpython-nightly-builds/).
I broke them into a separate post because I figured most people are more
interested in the actual service than how it’s built.

As you might expect, I built most of the solution in IronPython. All of
the download, build, compress and Azure upload code was written in IPy.
The one part I didn’t write in IPy was the Azure cloud web app, which I
wrote in C\#. Jon Udell’s been investigating [getting IPy to run in
Azure](http://blog.jonudell.net/2008/12/22/azure-calendar-aggregator-part-1/),
but I just wanted something quick and dirty (as you can see from the
[utter lack of formatting](http://nightlybuilds.cloudapp.net/)) so I
decided to use C\# instead. Man, were my ASP.NET skills rusty.

As for the IronPython parts, for the most part I’m using external tools
for downloading, building and compressing. I use the [Source Control RSS
Feed](http://www.codeplex.com/IronPython/Project/ProjectRss.aspx?ProjectRSSFeed=codeplex%3a%2f%2fsourcecontrol%2fIronPython)
to discover recent source code changesets, [CodePlex
Client](http://www.codeplex.com/CodePlexClient) to download source from
CodePlex,
[MSBuild](http://msdn.microsoft.com/en-us/library/wea2sca5.aspx) to
build the binaries, [7-zip](http://www.7-zip.org/) to compress the
binaries and the [StorageClient library
sample](http://msdn.microsoft.com/en-us/library/dd135716.aspx) to upload
the compressed binaries up to Azure blob storage.

For building and compressing, I’m literally shelling out to MSBuild and
7-Zip via
[os.system](http://www.python.org/doc/2.5.2/lib/os-process.html). I
looked at [programmatically
building](http://www.ironpython.info/index.php/Automating_MSBuild) via
the MSBuild API, but I ran into an [assembly binding
bug](http://blogs.microsoft.co.il/blogs/idof/archive/2008/11/24/what-does-entity-framework-has-to-do-with-msbuild.aspx)
that I wasn’t motivated enough to work around. As for creating zip files
programmatically, IronPython doesn’t have a [zlib
module](http://www.python.org/doc/2.5.2/lib/module-zlib.html)
implementation yet so I just used 7-Zip’s command line utility instead.

For downloading form CodePlex, I originally started by shelling out to
CodePlex Client. However, I wanted the ability to cloak folders – for
example Tutorial and SrcTests – that weren’t required to build. CodePlex
Client has a very useful TFS library embedded in it – the build process
combines all the libraries into a single executable via
[ILMerge](http://www.microsoft.com/downloads/details.aspx?FamilyID=22914587-b4ad-4eae-87cf-b14ae6a939b0&displaylang=en).
I could have compiled my own version of the TFS library, but instead I
just load cpc.exe as an assembly reference via
clr.AddReferenceToFileAndPath. It’s a nifty trick [Jim
Hugunin](http://blogs.msdn.com/hugunin/) showed me once.

Uploading to Azure was very straightforward because of the StorageClient
library. Here’s the code to create a blob container object (creating the
actual blob container if it doesn’t already exist) and to upload a file
to a container.

``` python
def get_blob_container(prj):
  azure_account = StorageAccountInfo(endpoint, None, azure_name, azure_key)
  storage = BlobStorage.Create(azure_account)
  container = storage.GetBlobContainer(prj.lower())
  if not container.DoesContainerExist():
    print "Creating", prj, "Azure Blob Storage Container"
    container.CreateContainer(None, ContainerAccessControl.Public)
  return container

def upload_to_azure(container, upload_filepath, azure_filename, metadata):
    print "Uploading", azure_filename, "to Azure"
    prop = BlobProperties(azure_filename)
    nv = NameValueCollection()
    for key in metadata:
      nv[key] = metadata[key]
    prop.Metadata = nv

    with File.OpenRead(upload_filepath) as stream:
      contents = BlobContents(stream)
      if not container.CreateBlob(prop, contents, True):
        raise "Uploading " + azure_filename + " to Azure failed"
```

I’ve been working on some pure IronPython code to access the [blob
storage REST API](http://msdn.microsoft.com/en-us/library/dd179355.aspx)
directly, but that’s primarily to familiarize myself with the service.
At some point, I’m going to want to leverage [Table
Storage](http://msdn.microsoft.com/en-us/library/dd179423.aspx) but my
brief experimentation with the StorageClient Table Storage interface
makes me think that it depends on static typing too much to be useful
for IPy. If that turns out to be true, the Table Storage REST API will
be my only option.

As you can see in the code above, these Azure blob containers are set to
be publically accessible (via ContainerAccessControl<span
style="color: blue">.</span>Public argument passed to CreateContainer).
So for my C\# app, I’m simply using calling XDocument.Load with the
[List Blobs operation
url](http://msdn.microsoft.com/en-us/library/dd135734.aspx), shaping the
results via LINQ to XML and binding them to nested ASP.NET Repeater
controls.

Assuming people find this useful, I’m thinking of some additional
improvements, in order of what I’m likely to get to first:

-   Caching Project Info in the cloud app\
    Currently, I’m hitting getting and processing the list of binary
    releases on every request. I’m sure caching that data to make it
    more efficient.
-   Virtual Build Environment\
    Currently, I’m just building on my laptop. It would be nice to have
    a clean environment dedicated to running the build script.
-   Auto-Build\
    My script uses the RSS feed to find the recent checkins, but I have
    to manually kick off the process. I’d like it to set it up as a
    service that periodically checks the source code RSS feed
    automatically and downloads and builds any new releases that it
    finds.
-   Table Storage for Build Metadata\
    Today, I am simply grabbing the list of all uploaded compressed
    binaries for a given project, parsing their names, and displaying
    that as a hierarchical list on the [project
    page](http://nightlybuilds.cloudapp.net/Project.aspx?project=ironpython).
    If I used Table Storage, I could add additional metadata including
    social software features like ratings and comments.
-   Amazon EC2 Virtual Build Environment\
    If I’m creating a virtual machine for my build environment, I could
    look at hosting it on [Amazon EC2](http://aws.amazon.com/ec2/). They
    [support Windows now](http://aws.amazon.com/windows/) after all.
    Ideally, I’d use an [Azure worker
    role](http://msdn.microsoft.com/en-us/library/dd179341.aspx) for
    compiling and compressing builds, but our build tools need access to
    the file system.
