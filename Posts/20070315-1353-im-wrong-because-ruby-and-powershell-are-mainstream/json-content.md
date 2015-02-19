[Brad Wilson](http://www.agileprogrammer.com/dotnetguy) and [Scott
Hanselman](http://www.hanselman.com/blog/ "Scott Hanselman") took me to
task for my
[comment](http://devhawk.net/2007/03/13/Morning+Coffee+44.aspx) the
other day that no “mainstream” language had implemented [extension
methods](http://weblogs.asp.net/scottgu/archive/2007/03/13/new-orcas-language-feature-extension-methods.aspx):

> How mainstream is Ruby on Rails for you? Ruby is a full fledged
> dynamic language. No hacks for “extension methods” (Brad)
>
> Ya, I kind of blanched at that statement too…method\_missing is pretty
> mainstream… (Scott)

They’re right, Ruby does support the addition (and redefinition I think)
of methods on a class at any time. There’s a sample of this in the
[Classes and
Objects](http://www.ruby-doc.org/docs/ProgrammingRuby/html/classes.html)
chapter of [Programming
Ruby](http://www.ruby-doc.org/docs/ProgrammingRuby/) (aka the pick-axe
book) where they add a basic documentation facility “available to any
module or class” in Ruby by adding a doc instance method to the Module
class.

 

``` {.brush:ruby}
class Module 
  @@docs = Hash.new(nil) 
  def doc(str) 
    @@docs[self.name] = str 
  end
  def Module::doc(aClass) 
    # If we’re passed a class or module, convert to string
    # (‘<=’ for classes checks for same class or subtype)
    aClass = aClass.name if aClass.type <= Module 
    @@docs[aClass] || “No documentation for #{aClass}”
  end
end
```

Given how Ruby classes are defined, I think the newly added methods have
access to the private data of the class. Extension methods in C\#3/VB9
only have access the public interface of the object. But that’s a fairly
minor difference.

 

FYI, Powershell can do this as well, though not as succinctly as Ruby.
Scott has [an
example](http://www.hanselman.com/blog/AccessingEXIFPhotoDataFromJPEGsWithPowerShell.aspx)
how you can add a DatePhotoTaken property to System.IO.FileInfo using
[Omar
Shahine’s](http://www.shahine.com/omar)[PhotoLibrary](http://wiki.shahine.com/default.aspx/MyWiki.PhotoLibrary)
project.

Chalk this up to my continuing ignorance of dynamic languages. I’m
working on it, albeit slowly.
