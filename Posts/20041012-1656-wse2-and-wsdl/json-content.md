I may be at Strategic Architect Forum, but I’ve actually been coding off
and on today - using WSE2 to expose web services. I hadn’t realized that
[SoapService](http://msdn.microsoft.com/library/en-us/wseref/html/T_Microsoft_Web_Services2_Messaging_SoapService.asp) supports
auto generation of WSDL – pretty cool. I dug around with Reflector to
figure out how it works. Turns out that
[SoapReceiver](http://msdn.microsoft.com/library/en-us/wseref/html/T_Microsoft_Web_Services2_Messaging_SoapReceiver.asp)
(parent of SoapService) exposes a method called
[GetDescription](http://msdn.microsoft.com/library/en-us/wseref/html/M_Microsoft_Web_Services2_Messaging_SoapReceiver_GetDescription_1_19f87a31.asp)
that returns the WSDL as an XmlDocument. The SoapReceiver version of
GetDescription returns null, but the SoapService implementation uses an
internal class called WsdlCreator to generate construct a
[ServiceDescription](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemWebServicesDescriptionServiceDescriptionClassTopic.asp)
from SoapService type that you write. Pretty cool.

The only downside is that if you use raw
[SoapEnvelope](http://msdn.microsoft.com/library/en-us/wseref/html/T_Microsoft_Web_Services2_SoapEnvelope.asp)s
as the input and output parameter of the SoapService methods, the
WsdlCreator has no way to know what schema to use for the corrisponding
SOAP messages. So, it punts and represents a SoapEnvelope as sequence of
xsd:any tags.
:frowning: If you
use XML serializable types for parameters, then the WsdlCreator
generates the associated schema in the WSDL. Only issue, I gave up on
XML serialization [a while
ago](http://devhawk.net/PermaLink.aspx?guid=5643b052-f1f2-4c53-ac33-e33d0910f917).

I wish there was a way to adorn the SoapService methods with an
attribute indicating the associated message schemas (with the ability
to validate those messages automatically).

