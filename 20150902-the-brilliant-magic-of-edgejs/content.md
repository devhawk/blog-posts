In my [post relaunching DevHawk](/blog/2015/8/31/go-ahead-call-it-a-comeback), I mentioned that
the site is written entirely in C# except for about 30 lines of JavaScript. Like
many modern web content systems, Hawk uses [Markdown](https://en.wikipedia.org/wiki/Markdown).
I write blog posts in Markdown and then my publishing "tool" (frankly little more than
duct tape and bailing wire at this point) coverts the Markdown to HTML and
uploads it to Azure.
   
However, as I went thru and converted all my old content to Markdown, I 
discovered that I needed some features that aren't supported by either the [original
implementation](http://daringfireball.net/projects/markdown/) or the new 
[CommonMark](http://commonmark.org/) project. Luckily, I discovered the 
[markdown-it](https://github.com/markdown-it/markdown-it) project which implements
the CommonMark spec but also supports [syntax extensions](https://github.com/markdown-it/markdown-it#syntax-extensions).
Markdown-it already had extensions for all of the extra features I needed - things like
[syntax highlighting](https://github.com/markdown-it/markdown-it#syntax-highlighting),
[footnotes](https://github.com/markdown-it/markdown-it-footnote) and 
[custom containers](https://github.com/markdown-it/markdown-it-container).

The only problem with using markdown-it in Hawk is that it's written in JavaScript. 
JavaScript ~~is a fine language~~ has lots of great libraries, but I 
find it a chore to write significant amounts of code in JavaScript - especially async code. 
I did try and rewrite my blog post upload tool in JavaScript. 
It was much more difficult than the equivalent C# code. 
Maybe once [promises](https://github.com/lukehoban/es6features#promises) 
become more widely used and [async/await](https://github.com/tc39/ecmascript-asyncawait)
is available, JavaScript will feel like it has a reasonable developer experience to me. 
Until then, C# remains my weapon of choice. 

I wasn't willing to use JavaScript for the entire publishing tool, but I still needed 
to use markdown-it [^1]. So I started looking for a way to integrate the small amount of 
JavaScript code that renders Markdown into HTML in with the rest of my C# code base. 
I was expecting to have to setup some kind of local web service with Node.js to host
the markdown-it code in and call out to it from C# with HttpClient. 

But then I discovered [Edge.js](http://tjanczuk.github.io/edge/). Holy frak, Edge.js blew my mind. 

Edge.js provides nearly seamless interop between .NET and Node.js. 
I was able to drop the 30 lines of JavaScript code into my C# app and call it directly. 
It took all of about 15 minutes to prototype and it's less than 5 lines of C# code. 

Seriously, I think [Tomasz Janczuk](http://tomasz.janczuk.org/) must be some kind of a wizard.

To demonstrate how simple Edge.js is to use, let me show you how I integrated markdown-it 
into my publishing tool. Here is a somewhat simplified version of the JavaScript code
I use to render markdown in my tool using markdown-it, including syntax highlighting 
and some other extensions.     

```js
// highlight.js integration lifted unchanged from 
// https://github.com/markdown-it/markdown-it#syntax-highlighting
var hljs  = require('highlight.js');
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try { 
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; 
  }
});

// I use a few more extensions in my publishing tool, but you get the idea
md.use(require('markdown-it-footnote'));
md.use(require('markdown-it-sup'));

var html = return md.render(markdown);
```

As you can see, most of the code is just setting up markdown-it and its extensions.
Actually rendering the markdown is just a single line of code.

In order to call this code from C#, we need to wrap the call to ```md.render``` with a 
JavaScript function that follows the [Node.js callback style](http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks).
We pass this wrapper function back to Edge.js by returning it from the JavaScript code.

```js
// Ain't first order functions grand? 
return function (markdown, callback) {
    var html = md.render(markdown);
    callback(null, html);
}
```

Note, I have to use the callback style in this case even though my code is syncronous. 
I suspect I'm the outlier here. There's a lot more async Node.js code
out in the wild than syncronous.

To make this code available to C#, all you have to do is pass the JavaScript code into the 
Edge.js ```Func``` function. Edge.js includes a embedded copy of Node.js as a DLL. 
The ```Func``` function executes the JavaScript and wraps the returned Node.js callback 
function in a .NET async delegate. The .NET delegate takes an ```object``` input 
parameter and returns a ```Task<object>```. The delegate input parameter is passed in
as the first parameter to the JavaScript function. The second parameter passed to the 
callback function becomes the return value from the delegate (wrapped in a Task of course).
I haven't tested, but I assume Edge.js will convert the callback function's first
parameter to a C# exception if you pass a value other than null.

It sounds complex, but it's a trivial amount of code: 

```csharp
// markdown-it setup code omitted for brevity
Func<object, Task<object>> _markdownItFunc = EdgeJs.Edge.Func(@"
var md = require('markdown-it')() 

return function (markdown, callback) {
    var html = md.render(markdown);
    callback(null, html);
}");
  
async Task<string> MarkdownItAsync(string markdown)
{
    return (string)await _markdownItFunc(markdown);
}
```

To make it easier to use from the rest of my C# code, I wrapped the Edge.js delegate
with a statically typed C# function. This handles type checking and casting as well as
provides intellisense for the rest of my app.

The only remotely negative thing I can say about Edge.js is that it
[doesn't support](https://github.com/tjanczuk/edge/issues/279) 
[.NET Core](http://dotnet.github.io/core/) yet. I had to build my markdown rendering 
tool as a "traditional" C# console app instead of a 
[DNX Custom Command](http://jameschambers.com/2015/08/writing-custom-commands-for-dnx-with-asp-net-5-0/)
like the rest of Hawk's command line utilities. 
However, [Luke Stratman](https://github.com/lstratman)
is [working on](https://github.com/medicomp/edge) .NET Core support for Edge.js. So maybe I'll be able to migrate my 
markdown rendering tool to DNX sooner rather than later.  

Rarely have I ever discovered such an elegant solution to a problem I was having. Edge.js 
simply rocks. As I [said on Twitter](https://twitter.com/DevHawk/status/637359972091752448), 
I owe Tomasz a beer or five. Drop me a line Tomasz and let me know when you want to collect. 

[^1]: I also investigated what it would take to update an existing .NET Markdown implementation
like [CommonMark.NET](https://github.com/Knagis/CommonMark.NET) or 
[F# Formatting](http://tpetricek.github.io/FSharp.Formatting/) to support custom syntax extensions. 
That would have been dramatically more code than simply biting the bullet and rewriting the post upload
tool in JavaScript.