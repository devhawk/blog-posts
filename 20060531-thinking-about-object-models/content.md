I’m doing some experiments with Amazon’s S3 Service. Very cool service,
I might add. Anyway, the sample C\# REST code basically wraps the
network requests with a single connection class that has individual
methods for each type of service interaction (list all my buckets, list
all objects in a bucket, create a bucket, create an object, you get the
idea).

However, S3′s service is a natural hierarchy. The Service contains many
Buckets, which in turn contain many Objects. So another way to wrap the
service interaction is with a series of objects that are related to one
another and only implement the service interactions relevant to that
class. (Service would implement List My Buckets and perhaps Create
Bucket. Bucket would implement List Objects and Delete Bucket. Again,
you get the idea.)

For an interface as relatively simple as S3 (the SOAP interface has a
grand total of 13 operations) it probably doesn’t matter one way or the
other. Furthermore, it’s probably a question of personal preference. My
question: What’s *your* personal preference? A single object with many
methods or a hierarchy of objects each with fewer methods?
