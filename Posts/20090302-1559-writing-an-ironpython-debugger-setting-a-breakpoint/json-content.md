Now that we have a debugger process [up and
running](http://devhawk.net/2009/02/28/Writing+An+IronPython+Debugger+Hello+Debugger.aspx),
let start adding some actual features. First up, we want to be able to
set breakpoints. One of the nice things MDbg does is auto-set a
breakpoint on the entrypoint function. For ipydbg, we’re going to
auto-set a breakpoint on the first line of the python file being
debugged.

In order to set a breakpoint, we need debugger symbols. They allow us to
translate between “line one of simpletest.py” and the actual location in
the code and back. We’re all used to seeing the PDB files that are
produced when we compile a C\# assembly. Unsurprisingly, the [symbol
store binder](http://msdn.microsoft.com/en-us/library/ms232451.aspx)
provides a method to [load these PDB files from
disk](http://msdn.microsoft.com/en-us/library/ms230866.aspx). But where
do IronPython debug symbols come from? I know from my extensive reading
of the ipy.exe command line parameters that you pass –D to enable
application debugging, but since all the IL is being generated in
memory, how does the debugger get access to the PDB files?

It turns out the debugger API includes a [UpdateModuleSymbols callback
method](http://msdn.microsoft.com/en-us/library/ms230148.aspx) that the
runtime uses to notify the debugger when the symbols change. The
debugger symbols are provided in an IStream, and then you [use the
symbol binder](http://msdn.microsoft.com/en-us/library/ms232101.aspx) to
get a [symbol
reader](http://msdn.microsoft.com/en-us/library/system.diagnostics.symbolstore.isymbolreader.aspx).
The .NET Framework already provides a [managed
API](http://msdn.microsoft.com/en-us/library/system.diagnostics.symbolstore.aspx)
for reading and writing debug symbols. However, that API doesn’t support
loading symbols from a stream, so the MDbg code includes it’s own
[wrapper](http://github.com/devhawk/ipydbg/blob/5858695ff85ed4740ad06466d4f54394e7f00f9b/CorDebug/CorSymbolStore/symbinder.cs)
around the symbol binder API to include that functionality. Here’s some
code to get the debug symbol reader for an updated module and iterate
through the associated files:

``` {.brush: .python}
sym_binder = SymbolBinder()   
     
def OnUpdateModuleSymbols(s,e):   
  print "OnUpdateModuleSymbols"   
     
  metadata_import = e.Module.GetMetaDataInterface[IMetadataImport]()   
  reader = sym_binder.GetReaderFromStream(metadata_import, e.Stream)   

  for doc in reader.GetDocuments():    
    print "t", doc.URL     

process.OnUpdateModuleSymbols += OnUpdateModuleSymbols
```

If we run [this version of
ipydbg](http://github.com/devhawk/ipydbg/blob/965e2fbf4834177cb7aa7816dd5d0d729672dec6/ipydbg.py)
on simpletest.py with the [IPy 2.0.1
release](http://ironpython.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=12481)
and the Python standard library installed, OnUpdatedModuleSymbols gets
called six times, once for each python file that gets loaded when
simpletest runs. (site.py, os.py, ntpath.py, stat.py, UserDict.py and
simpletest.py). BTW, I tried running this code on the [latest build of
IPy](http://nbs.blob.core.windows.net/ironpython/IronPython.47624.release.zip)
([changeset
47624](http://www.codeplex.com/IronPython/SourceControl/changeset/view/47624))
and I’m getting a COM Interop exception. So for now, stick with 2.0.1.

Now that we can get these dynamically generated debug symbols, we can
use them to create a breakpoint on the first line of the script being
debugged. Everytime OnUpdateModuleSympols is called, I try to bind the
initial breakpoint (unless it’s already been bound of course) by calling
the following create\_breakpoint function.

``` {.brush: .python}
def create_breakpoint(doc, line, module, reader):     
  line = doc.FindClosestLine(line)     
  method = reader.GetMethodFromDocumentPosition(doc, line, 0)     
  function = module.GetFunctionFromToken(method.Token.GetToken())     
   
  for sp in get_sequence_points(method):     
    if sp.doc.URL == doc.URL and sp.start_line == line:     
      bp = function.ILCode.CreateBreakpoint(sp.offset)     
      bp.Activate(True)     
      return bp     
       
  bp = function.CreateBreakpoint()     
  bp.Activate(True)     
  return bp
```

This code translates a given document/line into a function/offset where
we can set a breakpoint. To do this, we use sequence points which [as
per Rick
Byers](http://blogs.msdn.com/rmbyers/archive/2005/09/08/debuggingmodes-ignoresymbolstoresequencepoints.aspx)
are “used to mark a spot in the IL code that corresponds to a specific
location in the original source”. So once we find the function that
corresponds to a given line of code, we iterate over the sequence points
until we find the one that matches the line we want to break on. If we
find a matching sequence point, we set the breakpoint there. If we
don’t, we set the breakpoint on the function itself.
get\_sequence\_points is a simple wrapper around [ISymbolMethod
GetSequencePoints](http://msdn.microsoft.com/en-us/library/system.diagnostics.symbolstore.isymbolmethod.getsequencepoints.aspx).
The original API is pretty ugly to use – managing six separate arrays of
information – so get\_sequence\_points turns it into a generator
function you can iterate over.

Now that the breakpoint is set, we want to trap the breakpoint event as
well. That’s easy enough, we create an event handler for
process.OnBreakpoint similar to the OnUpdateModuleSymbols event above.
Eventually, we’ll have the ability to step when we break, but for now
I’m just going to print out the current location when the breakpoint is
hit. This is kind of the reverse of the operation above. Setting a
breakpoint means going from a source location to an IL offset within a
function. Printing the current location means going from an IL offset in
a function back to the source location. Here’s the function to do that:

``` {.brush: .python}
def get_location(reader, thread):  
  frame = thread.ActiveFrame  
  function = frame.Function  
    
  offset, mapping_result = frame.GetIP()  
  method = reader.GetMethod(SymbolToken(frame.Function.Token))  
    
  real_sp = None  
  for sp in get_sequence_points(method):  
    if sp.offset > offset:   
      break  
    if sp.start_line != 0xfeefee:   
      real_sp = sp  
        
  if real_sp == None:  
    return "Location (offset %d)" % (offset)  
    
  return "Location %s:%d (offset %d)" % (  
    Path.GetFileName(real_sp.doc.URL), real_sp.start_line, offset)  

def OnBreakpoint(s,e):     
  print "OnBreakpoint", get_location(     
    symbol_readers[e.Thread.ActiveFrame.Function.Module], e.Thread)
```

Given a symbol reader and a debug thread, get\_location returns a
location string. It loops thru the sequence points, similar to
create\_breakpoint, in order to find the closest corresponding line of
python code to the current offset (check out Mike Stall’s blog as for
[why I’m checking for
0xfeefee](http://blogs.msdn.com/jmstall/archive/2005/06/19/FeeFee_SequencePoints.aspx)).
In order to make this work, I need the symbol reader for the module that
I retrieved in OnUpdateModuleSymbols. For now, I’m stashing the reader
in a global dictionary keyed by the module named symbol\_readers where
OnBreakpoint can access it.

Ipydbg isn’t interactive yet, but it is now running, setting a
breakpoint and successfully breaking at that breakpoint. As usual, the
[latest version of
ipydbg](http://github.com/devhawk/ipydbg/commit/92521a59c3d6a4679a30bb019bda26a4eff8c894#diff-0)
is up on GitHub.
