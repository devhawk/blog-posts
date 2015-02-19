During Lang.NET, I ended up sitting next to Hua Ming, who’s been working
on the [.NET Classbox project](http://www.cs.iastate.edu/~lumpe/CBs/) I
[wrote about
previously](http://devhawk.net/2006/08/02/LangNET+Is+Helping+Game+Developers.aspx).
.NET Classbox introduces a new syntax for “using” to C\# – basically,
you can use individual classes as well as whole namespaces, and you can
extend the individual classes you use. Obviously, that meant having a
custom compiler that was 99% vanilla C\# + the extra classbox syntax.
Rather than building a C\# compiler from scratch, the Classbox project
extended the [Mono Project](http://www.mono-project.com/) C\# compiler.
Hua described the process as taking a “huge amount of time” and he
described the compiler as “a monster”. Now, I’m not trying to knock Mono
here, I imagine our C\# compiler is just as hard to work with.
[SSCLI’s](http://msdn.microsoft.com/net/sscli) C\# compiler directory is
5.5MB of source code alone spread across 126 .h and 68 .cpp files.

Is it just me, or does it seem crazy to have to muck about with such a
large code base in order to add a relatively simple language feature?
What I’d like to see is a more modular way of building compilers, so
that integrating a small language feature like classbox would be a small
amount of effort.

Of course, there is some work that’s been done in this space. MS
Research had a [Research C\#
compiler](http://research.microsoft.com/research/pubs/view.aspx?tr_id=658) paper,
but it’s three years old and
[one](http://research.microsoft.com/%7Etoddpro/) of the two authors has
moved on to a [cool product
group](http://www.microsoft.com/windows/cse/default.mspx) job. I also
discovered [SUIF](http://www-suif.stanford.edu/suif/NCI/suif.html) and
the [National Compiler Infrastructure
Project](http://www-suif.stanford.edu/suif/NCI/), but these don’t look
like they’ve been updated in a while.

I like the model that the Research C\# compiler proposes. Basically, it
looks like this:

1.  Specify the grammar in a modular way. In the paper, the grammar is
    specified in an Excel file, and you can use multiple files in a
    modular fashion. i.e. have one file for the core language and
    another for the extensions.
2.  Late bind a grammar production to an action. Typically, in a
    lex/yacc style scenario, you embed the action code for a given
    production directly into the grammar, which makes it extremely hard
    to extend the existing syntax. In the paper, each production is
    linked with an instance of a type, so swapping out a new type would
    seem to be possible.
3.  Generate an abstract syntax tree, that gets processed by multiple
    visitors. From the paper, the compiler has broken the “traditional”
    compiler steps – bind, typecheck, rewrite and generate binary (in
    this case IL) – into separate visitors. That makes adding extra
    steps or chaning existing steps fairly straightforward.

The only think I don’t like about this specific approach is their Excel
file based parser generator. It’s a huge step beyond the LEX/YACC
approach as it is scanner-less (having separate scanner and parser steps
kills any chance of modularity) but it still has to deal with ambiguous
grammars. Personally, I’ve been looking at [Parsing Expression
Grammars](http://pdos.csail.mit.edu/~baford/packrat/) in part because
they aren’t ambiguous. For programming lanugages, support ambiguity in
the grammar is a bug, not a feature.
