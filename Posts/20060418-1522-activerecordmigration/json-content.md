When I wrote about the [Dual
Schema](http://devhawk.net/2006/03/28/the-dual-schema-problem/)
problem a few weeks ago, I specifically wrote that the
[Rails](http://www.rubyonrails.com) model is backwards because it
derives the in-memory schema from the database schema. While I still
believe that, Rails’
[ActiveRecord::Migration](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html) library
does make it significantly easier to manage the database from Ruby code.
For those not familiar, ActiveRecord::Migration is a series of Ruby
script files that define the database schema. Inside each migration
script is an up and down method, so you can migrate forward and backward
in the history of your project. And it provides easy to use abstractions
such as create\_table and add\_column so you don’t have to geek out on
SQL syntax (unless you want to). Once you have a collection of these
scripts, simply calling ``rake migrate`` will bring your database instance
up to the current schema
([rake](http://martinfowler.com/articles/rake.html) is Ruby’s equivalent
of make). Or, you can set your database to a specific version of the
schema by running ``rake migrate VERSION=X``.

I wonder why the [Rolling on
Rails](http://www.onlamp.com/pub/a/onlamp/2005/01/20/rails.html)
tutorial uses the database tools directly instead of
ActiveRecord::Migrate? I’m thinking it wasn’t available when the
tutorial was written. Whatever the reason, they really should update the
tutorial to reflect the current state of Rails.
