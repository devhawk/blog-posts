I love me some CardSpace, but I sure wish there was better documentation
on how to use it, especially from WCF. The [current
documentation](http://msdn2.microsoft.com/en-us/library/ms733090.aspx)
is very conceptual so you really only have the
[samples](http://msdn2.microsoft.com/en-us/library/aa347820.aspx) to go
on, which sucks not to put too fine a point on it.

One example shows how to use [WCS with WCF’s
wsHttpBinding](http://msdn2.microsoft.com/en-us/library/ms751504.aspx).
However, it turns out you can also use [WCS with WCF’s
wsFederationHttpBinding](http://msdn2.microsoft.com/en-us/library/ms752259.aspx).
I’ve been experimenting with that binding talking to an STS, and it’s
never invoked the WCS UI before. Why does this example invoke WCS? I’m
guessing because it doesn’t specify an
[issuer](http://msdn2.microsoft.com/en-us/library/aa347735.aspx) in the
config file, but I’d need to see documentation to be sure.

Also, using the federation binding appears to be the only way to
request/demand additional claims beyond the private personal identifier
(aka the PPID). If you want the client’s email address, name, address,
etc, you need to specify that via the
[claimTypeRequirements](http://msdn2.microsoft.com/en-us/library/aa749850.aspx) of
the binding’s
[message](http://msdn2.microsoft.com/en-us/library/ms731376.aspx)[security](http://msdn2.microsoft.com/en-us/library/ms731381.aspx)
element. But that configuration isn’t valid for the wsHttp binding. Why?

Finally, the two bindings produce different results on the security
token. Using wsHttp, you get three claims: RSA Identity, RDA Possess
Property and PPID Possess Property. When using wsFederationHttp, you get
Hash Possess Property and PPID Possess Property (plus the claims you
request). What happened to the RSA claims? If you attempt to add RSA to
the claimTypeRequirements, CardSpace throws an error as an invalid
request. Again, why? [Keith
Brown](http://www.pluralsight.com/keith.aspx) recently
[wrote](http://msdn.microsoft.com/msdnmag/issues/06/10/SecurityBriefs/)
about how to use the RSA claim, so it sounds like a valuable piece of
information to have. How come the federation binding doesn’t send it?
