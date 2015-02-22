I was reading thru the [ADO.NET Data Services
Quickstart](http://quickstarts.asp.net/3-5-extensions/adonetdataservice/default.aspx),
because I wanted to understand how it support data updates. The
quickstart uses the [Customers
table](http://msdn2.microsoft.com/en-us/library/aa276837(SQL.80).aspx)
from the [Northwind sample
database](http://msdn2.microsoft.com/en-us/library/aa276825(SQL.80).aspx),
which unlike most of the other tables uses an nchar(5) value as the
primary key.
[Categories](http://msdn2.microsoft.com/en-us/library/aa276832(SQL.80).aspx),
[Employees](http://msdn2.microsoft.com/en-us/library/aa276833(SQL.80).aspx),
[Orders](http://msdn2.microsoft.com/en-us/library/aa276828(SQL.80).aspx),
[Products](http://msdn2.microsoft.com/en-us/library/aa276824(SQL.80).aspx),
[Shippers](http://msdn2.microsoft.com/en-us/library/aa276831(SQL.80).aspx)
and
[Suppliers](http://msdn2.microsoft.com/en-us/library/aa276826(SQL.80).aspx)
all use an auto-increment integer field for their primary keys.

I only point this out because inserting into Customers is idempotent,
while inserting into those other listed tables is not. Is it a
coincidence that the ADO.NET data services team chose the Customers
table for their quickstart? Maybe, but I doubt it. Regardless, making a
non-idempotent
[insert](http://quickstarts.asp.net/3-5-extensions/reference/adoref/M_Sys_Data_DataService_insert.aspx)
call from the browser is a bad idea, if you care about [Exactly
Once](http://devhawk.net/2007/11/09/the-importance-of-idempotence/).
