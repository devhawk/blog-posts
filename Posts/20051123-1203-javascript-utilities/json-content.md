Can you tell it’s a slow day in the office?
:smile:

Speaking of raising the level of abstraction as well as browser based
applications, check out Nikhil’s [JavaScript Utilities
project](http://www.nikhilk.net/Project.JSUtils.aspx):

> The project introduces the notion of .jsx (extended JavaScript) and
> .jsa (JavaScript assembly) files. JSX files provide the ability to
> include conditional code via familiar preprocessor directives such as
> \#if, \#else, \#endif and so on…The tool processes these directives in
> order to produce a standard .js file. JSA files build on top of .jsx
> files. While they can include normal JavaScript and preprocessor
> directives, they are primarily there for including individual .jsx and
> .js files via \#include directives. This allows you to split your
> script into more manageable individual chunks.

Now, that’s not raising the level of abstraction much, but here’s
another example of working in a higher abstracted environment (jsx and
jsa) and then compiling down to something the underlying platform can
execute (js). Nikhil provides three ways of doing this compliation:

1.  A set of standalone tools that output standard .js files that you
    can then deploy to your web site. Command line parameters are used
    to control the behavior of the tools.
2.  A couple of IHttpHandler implementations that allow you to
    dynamically convert your code into standard .js files. This is the
    mode where you can benefit from implementing per-browser code in a
    conditional manner. AppSetting values in configuration are used to
    control the conversion behavior.
3.  As a script project in VS using an msbuild project along with an
    msbuild task that comes along with the project. MSBuild project
    properties are used to control the conversion behavior.

If you’re going to raise the level of abstraction to do implement a
preprocessor, you could also go all the way and implement an entirely
new language that gets compiled down to JavaScript for execution in the
browser. For example, I’m not as familiar or comfortable with
JavaScript’s [prototype based
approach](http://en.wikipedia.org/wiki/Prototype-based_programming). But
I could imagine a more class based language that compiles to JavaScript.
That’s the same way early C++ compilers worked – they were a
preprocessor pass that converted the C++ into C, which could then be
compiled with traditional C compilers.

I wonder what JavaScript++ would look like

