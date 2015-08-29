I spent a couple of hours chatting with [Neal
Ford](http://memeagora.blogspot.com/) from
[ThoughtWorks](http://www.thoughtworks.com/) yesterday. [Ted
Neward](http://blogs.tedneward.com/) had virtually introduced us a few
months ago and he was in town for
[MTS](http://timheuer.com/blog/archive/2006/04/11/9596.aspx), so he
arranged a meeting. I had asked Ted to introduce me to some dynamic
language folks for some research and public debate purposes, and Neal
was one of the people he hooked me up with. Unfortunately, this was
right before I [changed
roles](http://devhawk.net/2006/01/24/architect-on-the-edge/) and got
real busy. Of course, dynamic languages in general and
[Ruby](http://www.ruby-lang.org/en/) in particular plays a large role in
Edge Architecture, so I’m thankful Neal took the time to drop me a line
and meet with me.

Above all else, talking to Neal made me realize that I just don’t know
enough about dynamic languages, which limits my ability to discuss them.
To date, I’ve flirted with them, but haven’t made a real commitment. For
example, I’ve played around with [Instant
Rails](http://instantrails.rubyforge.org/), but hadn’t actually
[installed Ruby](http://rubyforge.org/projects/rubyinstaller/) yet. It
was time to re-image my dev partition anyway, so I’m going to try using
Ruby exclusively for a while.

Here’s a brain dump of some of what we talked about. Not sure what it
all means yet, so I’ll try and refrain from making commentary.

-   Hungarian notation for interfaces (i.e. ISomething) is a big [code
    smell](http://en.wikipedia.org/wiki/Code_smell). This has nothing
    really to do with Ruby or dynamic languages, but it’s an important
    point that I wanted to include here. Neal’s point is that the
    interface defines the semantics of the type and the concrete class
    is an “implementation detail”. In other words, contract-first isn’t
    just for web services. Apparently, ThoughtWorks doesn’t use ADO.NET
    directly primarily because the interfaces “aren’t pervasive enough”
    and are difficult to mock out. Also, they’re using [Rhino
    Mocks](http://www.ayende.com/projects/rhino-mocks.aspx) which I
    wasn’t previously aware of.
-   For all the debate about static vs. dynamic languages, it seems like
    the value Ruby brings is in meta-programming rather than dynamic
    typing. Certainly, that’s one of the big differentiators for Ruby
    vs. other dynamic languages like Python. While
    [Rails](http://www.rubyonrails.com/) has pushed the popularity of
    Ruby thru the roof recently, Neal seems much more enamored with Ruby
    than Rails.
-   There is an even bigger gulf between dynamic and static typing
    proponents than I had thought. I brought up
    [Singularity](http://research.microsoft.com/os/singularity/), which
    uses static typing exclusively to deliver a provably dependable
    system. Neal disagreed with that approach, pointing out that “tests
    are the best way of encoding the specification of the system” rather
    than compile time checking. Given my lack of expertise in this
    space, I’m withholding comment (for now) but I’m guessing the truth
    is somewhere in the middle.
-   However, while the dynamic vs. static typing gulf is big,
    meta-programming is potentially the bridge. I don’t believe
    meta-programming is exclusive to dynamic languages. Certainly, some
    of the new features in the “Orcas” versions of C\# and VB bring more
    expressiveness to the languages while still remaining type safe.
-   All this meta-programming leads to domain specific languages. Ruby
    has strong support what [Martin Fowler](http://martinfowler.com/)
    called “[internal
    DSLs](http://martinfowler.com/articles/languageWorkbench.html#InternalDsl)”,
    but Neal thought over time the focus would shift to [external
    DSLs](http://martinfowler.com/articles/languageWorkbench.html#ExternalDsl)
    as they are more expressive and not constrained by the semantics of
    an existing language. Obviously, we’re pretty [heavily
    focused](http://msdn.microsoft.com/vstudio/dsltools/) on DSLs.
    However, Neal did think our focus on graphical DSLs is misplaced. He
    called them a “hangover” from CASE/UML tools. He rightfully pointed
    out that “business analysis speak English”.

All in all, it was time well spent. Neal, I hope we can pick up the
conversation again sometime.
