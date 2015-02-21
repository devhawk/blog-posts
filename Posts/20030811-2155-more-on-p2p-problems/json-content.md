I discovered a
[FAQ](http://download.microsoft.com/download/2/F/1/2F1A22FD-E838-4BC6-AC40-FBDBCC3A17A4/ANP_FAQ.htm)
for the WinXP Advanced Networking Pack Among other FAQ’s (including
“What is a F.A.Q.?”) are “What is a PNRP seed server?” and “How do I
know if I can contact the Microsoft hosted PNRP seed server?”. A seed
server is a bootstrap for a PNRP “cloud”. PNRP is supposed to be
serverless, but there has to be some way for the system to be
bootstrapped. MSFT runs a seed server at a well known address (well
known to the P2P system, since no one told me). To see if you can reach
said seed server, you can run “netsh p2p pnrp diag ping seed”. If the
number is one or greater, all is good. In my case, that command raises
Error 0x800706d9: “There are no more endpoints available from the
endpoint mapper”. I’m not sure what that means, but I’m guessing that
explains why I can’t [resolve PNRP
names](http://devhawk.net/2003/08/08/problems-with-p2p-sdk/).
