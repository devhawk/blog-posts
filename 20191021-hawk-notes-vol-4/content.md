I rolled out a small update to my blog: It's now reading the blog posts
from a [GitHub repo](https://github.com/devhawk/blog-posts) instead of an
Azure DevOps repo.

Only reason for the swap is to get programmatic public access to the repo.
Azure DevOps
[supports public projects](https://docs.microsoft.com/en-us/azure/devops/organizations/public/about-public-projects?view=azure-devops)
but REST access still appears to
[require authentication](https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/authentication-guidance?view=azure-devops).
Personal Access Tokens work just fine, but they expire which is a pain
in the backside.

Maybe anonymous access to Azure Repos REST services gets enabled in the future,
but I didn't want to wait. It was pretty easy to port the
[Azure DevOps REST Wrapper](https://docs.microsoft.com/en-us/azure/devops/integrate/concepts/dotnet-client-libraries?view=azure-devops)
to [Octokit](https://github.com/octokit/octokit.net). My code was already using
[TPL Dataflow](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/dataflow-task-parallel-library)
to load all the post metadata from the Azure Git repo. All I really needed to do
was change the client initialization code and the URL construction scheme
and I was good to go.
