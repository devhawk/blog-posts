Paul Murphy [pointed
out](http://blogs.aspadvice.com/pmurphy/archive/2004/12/09/1978.aspx) a
SSB wrapper class that ships as part of the integrated storefront sample
that ships with SQL 2005. It’s a bit tricky to install, so I refer you
to Paul’s blog for instructions. (you have to install the sample
installer) The wrapper class is in a file called ServiceBroker.cs and
supports the following operations:

-   Get Conversation Group
-   Begin a Dialog
-   Begin a Dialog (with related conversation)
-   Send a Message
-   Receive a Message
-   Receive all messages from a conversation group
-   End a Dialog

If you’re not sure what dialogs and conversation groups are, I’ll be
blogging about them in the coming weeks.
