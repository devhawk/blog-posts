Last night, after the Turing Lecture, we hosted a FlashBoF on “DSL’s in
Visual Studio”. [Stuart](http://blogs.msdn.com/stuart_kent) answered a
bunch of questions and gave a much more detailed demonstration of the
new DSL Toolkit than we could show during the keynote. Here’s what I
learned from the session:

-   Models are stored in XML files. The language designer outputs an
    object model and will eventually also output an XSD. For example,
    here’s a screenshot of the language designer from the DSL Toolkit
    we’re releasing. Inside the designer, I’ve got a sample UIP DSL (I
    hacked this up on my own, this is not exactly the same one we demoed
    yesterday). As you can see, there’s a PageCollection concept which
    contains Page concepts that have Name and Kind values. Page concepts
    also has a collection of Transfer concepts, which in turn have Label
    values. Generating an object model makes it easier to write tools
    that manipulate models. Typically, I’m anti-XML-Serialization but in
    this case – where we have a relative simple XSD – it works fine. I
    could also manipulate the model by accessing the underlying XML if I
    want to.
-   Code generation uses templates and looks a lot like
    [CodeSmith](http://www.ericjsmith.net/codesmith/) or old-school ASP.
    You interleave the static elements of the generated code with blocks
    of code that access the model (via the object model described above)
    and generate the dynamic model-specific elements of the code. So I’m
    guessing that people using the codegen tools like CodeSmith will
    feel right at home with this toolkit.
-   In the current builds (which is to say later than the build that
    we’re releasing first – the first build doesn’t include any of the
    code generation support) we’re generating a single code file from a
    model. Eventually we’ll be able to manipulate multiple files from a
    single model. This is similar to how the Class Diagram works – add a
    new class onto the diagram and a new file gets added to the project,
    delete the class from the diagram and the file gets removed from the
    solution.
-   Not all models are used to generate code. For example, in VSTS the
    Logical Data Center and Virtual Deployment models don’t generate
    code. They are useful  because I can use them to validate the
    Distributed System Model which does generate code.
-   Someone asked about the implications of code coverage, profiling and
    test-driven development on a DSL-based process. Frankly, I don’t
    know but it certainly got me thinking. The general consensus was
    that we’re still in the bootstrap phase of making DSL-based
    development a reality and these are issues we’ll have to deal with
    as we move forward.

