One of the cool things about the Live Framework is that while there’s a
[convenient .NET library
available](http://msdn.microsoft.com/en-us/library/dd136352.aspx), you
can use the [raw HTTP
interface](http://msdn.microsoft.com/en-us/library/dd199240.aspx) from
any platform. LiveFX data is served up over HTTP and is available in
ATOM, RSS, JSON or POX formats. As I’ve already shown, you can easily
use the .NET library from IronPython, but I wanted to try working with
the raw HTTP interface to get a feel for that as well.

Unfortunately, it was harder than I expected it to be. The big issue is
that the documentation on how to LiveFX authorization tokens via raw
HTTP is fairly sparse and occasionally contradictory. For example,
there’s a whole section on [Authentication and Live
Framework](http://msdn.microsoft.com/en-us/library/dd137185.aspx), but
it doesn’t cover this scenario. Luckily, I was able to figure it out
with the help of [AtomPub Project Manager LiveFX
Sample](http://msdn.microsoft.com/en-us/library/dd135995.aspx), a [post
on Alex Feinman’s
blog](http://blog.opennetcf.com/afeinman/PermaLink,guid,80ea4a1d-fbc0-485d-a088-fb8f30efb6ab.aspx),
a [post on Emmanuel Mesas’
blog](http://blogs.msdn.com/emesas/archive/2008/02/13/windows-live-id-available-options-part-i.aspx)
and a little groveling around with Reflector. It does appear that the
auth docs are in flux –Emmanuel refers to [this MSDN
article](http://msdn.microsoft.com/en-us/library/bb447721.aspx) as being
about RPS Soap requests, but it’s actually about delegated authority.
(Is MSDN reusing URLs? Bad idea.) Also, the sample code has a comment
that reads “to be replaced by delegated authorization” so it looks like
changes are coming. In other words, no promises on how long this code
will work!

If you look at the AtomPub Project Manager sample, there’s a
WindowsLiveIdentity.cs file that implements static GetTicket method that
looks similar to both the code on Alex’s blog as well as the
implementation of
[GetWindowsLiveAuthenticationToken](http://msdn.microsoft.com/en-us/library/dd157462.aspx).
The upshot is that there’s a
[WS-Trust](http://en.wikipedia.org/wiki/WS-Trust) endpoint for Windows
Live at <https://dev.login.live.com/wstlogin.srf>. You send it a
RequestSecurityToken (aka RST) message (with a couple of extra WL
specific extensions) and it responds with the security token you’ll need
for accessing the LiveFx HTTP endpoints.

I ported the GetTicket function over to IronPython. I’m using .NET
classes like WebRequest and XmlReader, but there’s nothing fancy here so
I would expect it to be easy enough to port over to the standard Python
library.

``` {.brush: .python}
def get_WL_ticket(username, password, compactTicket):
    req = WebRequest.Create(_LoginEndPoint)
    req.Method = "POST"
    req.ContentType = "application/soap+xml; charset=UTF-8"
    req.Timeout = 30 * 10000
     
    rst = get_RST_message(username, password, compactTicket)
    rstbytes = Encoding.UTF8.GetBytes(rst)
    with req.GetRequestStream() as reqstm:
      reqstm.Write(rstbytes, 0, rstbytes.Length)
       
    with req.GetResponse() as resp:
      with resp.GetResponseStream() as respstm:
        with XmlReader.Create(respstm) as reader:
          if compactTicket:
            name = "BinarySecurityToken"
            namespace = "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
          else:
            name = "RequestedSecurityToken"
            namespace = "http://schemas.xmlsoap.org/ws/2005/02/trust"

          if not reader.ReadToDescendant(name, namespace):
            raise "couldn't find security token element"
           
          reader.ReadStartElement(name, namespace)
          token = reader.ReadContentAsString()
          reader.ReadEndElement()
           
          return Convert.ToBase64String(Encoding.UTF8.GetBytes(token))
```

This code simply uses a WebRequest object to post the RST message to the
WS-Trust enpoint then parses the result to find the token.
get\_RST\_message uses [standard Python string
formatting](http://www.python.org/doc/2.5.2/lib/typesseq-strings.html)
to generate the RST message that gets posted to the WS-Trust endpoint.
I’m not exactly sure why you need to convert the token value to a byte
array and then Base64 encode it, but that’s what the sample code does so
I did it to.

Once you have the authentication ticket, you need to download root
service endpoint document in order to get the base URL and the profiles
link. Then you can download all the profiles or you can download a
specific one if you know it’s [leet-speak
identifier](http://orand.blogspot.com/2008/11/l1v3-m35h-l337-h4x0rz.html).
LiveFX data can be downloaded in a variety of formats: ATOM, JSON, RSS
or POX. You choose your format by setting the Accept and Content-Type
headers.

I wrote the following functions, the generic boilerplate download
function as well a specific versions for downloading JSON and POX:

``` {.brush: .python}
def download(url, contentType, authToken):
  req = WebRequest.Create(url)
  req.Accept = contentType     
  req.ContentType = contentType     
  req.Headers.Add(HttpRequestHeader.Authorization, authToken)
   
  return req.GetResponse()  
   
def download_json(url, authToken):
  resp = download(url, 'application/json', authToken)
  with StreamReader(resp.GetResponseStream()) as reader:  
      data = reader.ReadToEnd()
      return eval(data)

def download_pox(url, authToken):
  resp = download(url, 'text/xml', authToken)
  return XmlReader.Create(resp.GetResponseStream())
```

Using JSON in Python is really easy, since I can simply eval the
returned string and get back Python dictionary objects, similar to what
you can do in Javascript.

Here’s some code that uses the get\_WL\_ticket and download\_json
functions above to retrieve the the user’s Personal Status Message

``` {.brush: .python}
#Get user's WL ticket
uid = raw_input("enter WL ID: ")    
pwd = raw_input("enter password: ")   

authToken = livefx_http.get_WL_ticket(uid, pwd, True)   

#download root service document 
service = livefx_http.download_json(_LiveFxUri, authToken)   

#download general profile document 
url = service['BaseUri'] + service['ProfilesLink'] + "/G3N3RaL"   

genprofile = livefx_http.download_json(url, authToken)   
print genprofile['ProfileBase']['PersonalStatusMessage']
```

POX is also fairly easy, though a bit more verbose than JSON. The sample
code, which I have [stuck on my
SkyDrive](http://cid-0d9bc809858885a4.skydrive.live.com/self.aspx/DevHawk%20Content/IronPython%20Stuff/LiveFxHttp.zip),
includes both POX and JSON code, so you can compare and contrast the
differences.
