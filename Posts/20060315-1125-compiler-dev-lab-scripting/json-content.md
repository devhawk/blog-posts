Day Two of the Compiler Dev Lab was all about scripting. [Iron
Python](http://www.gotdotnet.com/workspaces/workspace.aspx?id=ad7acff7-ab1e-4bcb-99c0-57ac5a3a9742)
was the primary focus of the day, but they also had
[Phalanger](http://www.php-compiler.net/) (Managed
[PHP](http://www.php.net/)) and [Monad](http://blogs.msdn.com/monad/)
folks there as well.

-   I hadn’t realized just how performant these dynamic languages are on
    the CLR when compared to their native versions. The [original
    version](http://www.ironpython.com/) of Iron Python was 1.7x faster
    than the standard C implementation back in the summer of ’04. Now
    with CLR 2.0, that version is now 2x faster with out any code
    changes. The Phalanger folks said they are 2.5x faster than the
    native version of PHP (1.7x faster than PHP + the [Zend
    Optimizer](http://www.zend.com/products/zend_optimizer)). That’s
    pretty impressive performance.
-   The IronPython folks are heavy users of the new [DynamicMethod
    class](http://msdn2.microsoft.com/en-us/library/system.reflection.emit.dynamicmethod(VS.80).aspx)
    from .NET 2.0. Otherwise known as Lightweight Code Generation,
    DynamicMethod allows you emit a static function but have it get
    garbage collected when it’s no longer needed. IP almost never
    generates new classes, since new types can’t be garbage collected.
    The only times they generate actual classes are when you inherit
    from an existing .NET class or when you generate a new delegate
    type.
-   It’s really hard to serve the dual masters of both the existing
    language community and the .NET community. [Jim
    Hugunin](http://blogs.msdn.com/hugunin/default.aspx) used the
    example of String.Trim(). A .NET developer would expect
    String.Trim() to “just work”. A Python developer would expect that
    to throw an AttributeError exception (the Python equivalent of Trim
    is strip). How do you handle this? In IP, it defaults to pure Python
    mode, but if you enter “import clr”, you move into .NET hybrid mode.
-   One of the typical features of dynamic languages is the ability to
    change the base class of an object on the fly. Jim demoed this with
    WPF. He created a class that inherited from one type of panel and
    then set the \_\_class\_\_ property of the object to a different
    panel and the display changed immediately. Freaky, but cool.
-   Jim showed a demo of a WPF app that hosted Python for extensibility.
    One of the scripts in turn hosted Python to create an interactive
    console for the app. Having a scripting engine that can host itself
    is awesome.
-   The [VSIP SDK
    CTP](http://affiliate.vsipmembers.com/affiliate/downloadfiles.aspx) (reg
    required) includes an sample lanugage integration project for Iron
    Python. So you can get both the source into IP language itself as
    well as the source to the integration into Visual Studio.
-   I got an email yesterday from someone asking about the possibility
    of Visual Ruby.NET. I haven’t heard anything about it, but it would
    be cool to see [Ruby on Rails](http://www.rubyonrails.com/) runing
    under CLR. [John Lam](http://www.iunknown.com/) is working on
    [RubyCLR](http://www.iunknown.com/articles/2006/02/20/second-drop-of-rubyclr),
    but my understanding is that is a bridge between the CLR and the
    Ruby runtime, not a CLR implemenation of the Ruby runtime. (IP is a
    CLR implementation of the Python runtime.) I’m thinking that there
    are some similarities between Ruby and Python, so having the source
    of IronPython would be a huge help in building a Visual Ruby
    implementation. For example, both Ruby and Python have
    [closures](http://martinfowler.com/bliki/Closure.html). IP has a
    FunctionEnvironment class which is used to lift stack variables onto
    the heap in a variety of scenarios, including closures. So if I was
    building Visual Ruby, having access to the FunctionEnvironment class
    would be a good start.
-   I said yesterday that I need to learn more about F\#. They showed a
    video of an internal F\# presentation, but I spent most of my time
    cracking jokes with [Sam
    Gentile](http://codebetter.com/blogs/sam.gentile/default.aspx) who’s
    in town for an
    [SC-BAT](http://www.gotdotnet.com/codegallery/codegallery.aspx?id=941d2228-3bb5-42fd-8004-c08595821170)
    workshop.
-   I didn’t pay enough attention to the Monad presentation.
    ![:(](http://devhawk.net/wp-includes/images/smilies/icon_sad.gif)

