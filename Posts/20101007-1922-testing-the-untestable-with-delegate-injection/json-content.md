My ASP.NET skills may be a bit rusty, but that’s not stopping me from
working on a side project in ASP.NET MVC. While it has made significant
strides in the 4.0 release, code like this demonstrates that ASP.NET
still has a long way to go to improve testability.

``` csharp
public class AccountController : Controller
{
    ITwitterService _twitter;

    //constructor dependency injection
    public AccountController(ITwitterService twitterService)
    {
        _twitter = twitterService;
    }

    public ActionResult SignInWithTwitter()
    {
        //check for GetRedirectUrl and sets cookie
        Response.SetCookie(new HttpCookie("RedirectUrl",
            FormsAuthentication.GetRedirectUrl(string.Empty, false)));

        //build callback URL
        var callback_url_builder = new UriBuilder()
        {
            Host = Request.ServerVariables["SERVER_NAME"],
            Port = int.Parse(Request.ServerVariables["SERVER_PORT"]),
            Path = Url.Action("SignInWithTwitterCallback"),
        };

        //Helper funciton to invoke Twitter’s oauth/request_token REST endpoint
        var url = _twitter.GetRequestToken(callback_url_builder.ToString());

        //redirect to the URL returned from _twitter.GetRequestToken
        return Redirect(url);
    }
```

This code has several dependencies that are hard or impossible to test:
FormsAuthentication, Request, Response and Url. Testing this code is a
real pain in the ass. When I originally wrote this code, I bit the
bullet and wrote said the PITA test code. But I couldn’t help thinking
there must be a better way.

Clearly, in order to be able to test this code, I need to introduce
points of abstraction that can be filled with mock implementations
during unit test runs. I already have one such abstraction point – the
\_twitter field of AccountController is an ITwitterService instance that
gets injected on construction. I have a “real” implementation that gets
injected in production and a mock implementation that I manually inject
in my tests.

In order to test the code above, I’ll need to wrap the calls into the
untestable objects in some sort of injectable dependency that can be
mocked out for tests.

C\# being an OO language, typically we think of Dependency Injection in
terms interfaces and classes. However, wrapping the untestables in
interfaces and then implementing those interfaces is a lot of additional
code. Instead of one injected dependency, the code above would need five
injected dependencies. Furthermore, since objects are both the unit of
dependency injection as well as the typical way the URL namespace is
segmented, I also have to consider the dependencies of any other action
methods on AccountController. That gets ugly fast.

Instead of thinking in terms of objects and interfaces, I wondered what
DI might look like if we thought about dependencies in terms of
delegates and anonymous lambdas? You know, [functional
programming](http://devhawk.net/2007/12/04/functional-understanding/)? 
It might look something like this:

``` csharp
Func<string> @GetRedirectUrl;
Action<HttpCookie> @SetCookie;
Func<NameValueCollection> @ServerVariables;
Func<string, string> @ActionUrl;

public ActionResult SignInWithTwitter()
{
    //check for GetRedirectUrl and sets cookie
    @SetCookie(new HttpCookie("RedirectUrl", @GetRedirectUrl()));

    //build callback URL
    var callback_url_builder = new UriBuilder
    {
        Host = @ServerVariables()["SERVER_NAME"],
        Port = int.Parse(@ServerVariables()["SERVER_PORT"]),
        Path = @ActionUrl("SignInWithTwitterCallback"),
    };

    //Call twitter.GetRequestToken
    var url = _twitter.GetRequestToken(callback_url_builder.ToString());

    //redirect to the URL returned from Twitter.GetRequestToken
    return Redirect(url);
}
```

(Note, I’m using the @ symbol as a prefix for injected delegates, in
order to make it easier to pick them out of the code. Looks kinda odd,
but it is valid C\#.)

This is better in that it’s actually testable without requiring a metric
crapload of test code to mock the ASP.NET intrinsics. However, this
approach don’t have enough information to inject dependencies based on
type alone. For example, the @GetRedirectUrl is a Func\<string\> (i.e. a
function that takes no parameters and returns a string). However,
FormsAuth FormsCookieName and DefaultUrl properties would also be
represented as Func\<string\> delegates as well.

Most DI containers have support resolving dependencies by name and type,
but that makes declaring dependencies much tougher and more fragile in
my opinion. If you’re going to ~~limit yourself to static typing~~ write
compiled code, you might as well let the compiler do as much heavy
lifting as possible, right?

Also, wrapping each untestable method call in a delegate has made the
explosion of dependencies problem even worse. SignInWithTwitter declares
four new dependencies, the callback action (not shown) adds seven new
delegate dependencies and the sign out action adds one, making a total
of thirteen dependencies! (including the original ITwitterService).
However, none of these twelve delegate dependencies are shared across
action methods. So they aren’t really controller dependencies so much as
action dependencies. So what if I went ahead and declared them as action
dependencies directly?

``` csharp
public Func<ActionResult> SignInWithTwitter(
    Func<string> @GetRedirectUrl,
    Action<HttpCookie> @SetCookie,
    Func<NameValueCollection> @ServerVariables,
    Func<string, string> @ActionUrl)
{
    return () =>
    {
        //check for GetRedirectUrl and sets cookie
        SetCookie(new HttpCookie("RedirectUrl", GetRedirectUrl()));

        //build callback URL
        var callback_url_builder = new UriBuilder
        {
            Host = ServerVariables()["SERVER_NAME"],
            Port = int.Parse(ServerVariables()["SERVER_PORT"]),
            Path = ActionUrl("LogOnCallback"),
        };

        //Call twitter.GetRequestToken
        var url = _twitter.GetRequestToken(
            callback_url_builder.ToString());

        //redirect to the URL returned from Twitter.GetRequestToken
        return Redirect(url);
    };
}
```

SignInWithTwitter is now a function that takes four delegates and
returns a delegate – we’re really down the functional programming rabbit
hole now!

The benefit of this approach is that I can make tradeoffs as I see fit
between controller and action dependencies. ITwitterService is still
injected via the AccountController constructor since it is used by two
of the three Account actions. Dependencies only used by a single action
can be scoped to that specific action so that only tests for a given
action method have to mock them out. And testing this is a breeze
compared to [having to mock out intrinsic ASP.NET
objects](http://www.hanselman.com/blog/ASPNETMVCSessionAtMix08TDDAndMvcMockHelpers.aspx).

``` csharp
[Fact]
public void returns_redirect_result_with_getrequesttoken_url()
{
    //inject controller dependencies
    var twitter = new Mock<Models.ITwitterService>(MockBehavior.Strict);
    twitter.Setup(t => t.GetRequestToken(It.IsAny<string>()))
        .Returns("http://fake.twittertest.local");
    var controller = new AccountController(twitter.Object);

    //inject action dependencies
    Func<string> @getRedirectUrl = () => "/fake/redirect/url";
    Action<HttpCookie> @setCookie = c => { };
    Func<NameValueCollection> @serverVariables =
        () => new NameValueCollection()
        {
            {"SERVER_NAME", "testapp.local"},
            {"SERVER_PORT", "8888"}
        };
    Func<string, string> @actionUrl = url => "/fake/url/action/result";
    var action = controller.SignInWithTwitter(@getRedirectUrl,
        @setCookie, @serverVariables, @actionUrl);

    //Invoke action
    var result = action();

    //Validate
    var redirectResult = Assert.IsType<RedirectResult>(result);
    Assert.Equal("http://fake.twittertest.local", redirectResult.Url);
}
```

I could make this code even smaller by moving the action dependencies
out to be test fixture class fields. Assuming you write multiple tests
for each action method, this allows you to reuse the mock action
delegates across multiple methods. If I want to do negative testing, I
can easily define test-specific delegates that throw exceptions or
return unexpected values.

Of course, the down side to this approach is that MVC has \*no\* idea
what to do with an action method that returns Func\<ActionResult\>. I
could envision support for this pattern in MVC someday, though we’d need
a robust solution to the type+name dependency issue I described above.
For now, I will simply wrap the delegate injection version (aka the
testable version) of the action in a non-testable but MVC compatible
version that injects the right delegate dependencies.

``` csharp
public ActionResult SignInWithTwitter()
{
    return SignInWithTwitter(
        () => FormsAuthentication.GetRedirectUrl(string.Empty, false),
        Response.SetCookie,
        () => Request.ServerVariables,
        Url.Action)();
}
```

Since I’m using the untestable intrinsics, I can’t write any tests for
this method. However, it’s nearly declarative because the anonymous
delegates I’m injecting are closing over the untestable intrinsics.
Personally, I’m willing to make the tradeoff of having an declarative
yet untestable wrapper action method in order to get the delegate
injected easy-to-test version of SignInWithTwitter that has the real
implementation.
