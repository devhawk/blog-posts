I’ve been following the ongoing discussion about typing systems in
programming languages between [Ted Neward](http://blogs.tedneward.com/)
and [Stu Halloway](http://relevancellc.com/blogs/index.php) with great
interest. Given that I believe [Code is
Model](http://devhawk.net/2005/10/05/code-is-model/), I’m eager to
mine knowledge from successful tools to apply at higher levels of
abstraction. And as an employee of a language vendor, I’m also very
interested in what Stu describes as vendor-oriented vs.
developer-oriented languages.

> So why has the static/dynamic debate staggered on for so long? I think
> we could get closer to some answers with better choice of terms.
> “Static” vs. “dynamic” is highly misleading. I propose we use a new
> set of names: vendor-oriented vs. developer-oriented programming…So
> who do you trust most: vendors or developers?\
> [[What’s new in C\#, or who do you trust
> most?](http://www.relevancellc.com/blogs/?p=65)]
>
> With a vendor-oriented language like C\#, core abstractions are much
> more firmly controlled by the language vendor. Conversely,
> developer-oriented languages like Python leave more of these choices
> to the developer (although they tend to provide reasonable
> defaults)…Competency and trustworthiness are sprinkled all over our
> industry, both among language vendors and application developers. My
> concern is who controls the abstractions. Developer-oriented languages
> (like Scheme) give a lot of control (and responsibility) to
> developers. Vendor-oriented languages (like Java) leave that control
> more firmly in the hands of the vendor.\
> [[Developer oriented
> languages](http://www.relevancellc.com/blogs/?p=69 "Permanent Link to Developer oriented languages")]

Personally, I think calling them static and dynamic language is far less
misleading than vendor and developer oriented languages. Further, I
think Stu is making somewhat absurd statements to garner attention.
However, I believe he’s certainly onto something with regard to the
language abstractions. The abstractions I and my team care about on our
project are almost assuredly going to be different from the abstractions
you and your team care about on your project. Having a programming
environment that enables the abstractions you need on a given project is
very very important.

The problem with Stu’s argument is that he’s focused on low level
language abstractions. Abstractions like “inheritance, encapsulation,
delegation, how symbols are interpreted, etc.” Are you kidding me?
Projects don’t fail because developers can’t change the language’s
concept of inheritance. They fail because the gap between the
abstractions provided by the language and the abstractions needed by the
solution are enormous. Modern software development is like building
skyscrapers with Lego blocks. Furthermore, projects fail because
business and IT don’t speak the same language. Business people don’t
care about concepts like encapsulation and symbol interpretation. They
care about concepts like ROI, business plans and regulatory compliance.
Geeks may not feel comfortable talking about those concepts, but they
are what keep a business in business

Imagine your CFO listening to Stu and Ted discuss these language
abstractions. They would be thinking “What the hell are they talking
about?” To Ted’s credit, he bluntly states that he [doesn’t trust
developers](http://blogs.tedneward.com/PermaLink,guid,eb41bdd9-decc-44ba-916c-9346a959fff6.aspx)
which would likely put him in well with the CFO:

> I see the same concern every time a developer starts talking about
> doing bytecode manipulation at load-time–just because you *can*
> doesn’t mean you *should*. In this respect, I trust the guys who’ve
> been down this road before much more so than developers who are just
> coming to this and are starting to flex their new-found freedom and
> will (undoubtedly) start building systems that exercise this power.\
> [[Dynamic languages, type systems and self-modifying
> systems](http://blogs.tedneward.com/PermaLink,guid,eb41bdd9-decc-44ba-916c-9346a959fff6.aspx)]

I wouldn’t go so far as to say I don’t trust developers, but Ted’s point
about *can* and *should* is spot on. I’m sure there are scenarios where
bytecode manipulation is critical to the success of the project. Hell,
in the project I’m currently heads down on (hence the lack o’ posts in
the past two weeks) I’m using much more reflection and late-binding than
I ever have before. Not because I can – frankly, I like static typing –
but because that’s the best way to solve the problem at hand.

It’s important to keep the big picture in mind when discussing minutia
such as a given programming language’s core abstractions. IT exists to
serve the business, not the other way around.
