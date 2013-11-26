using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

class Post
{
    public XElement Xml { get; set; }
    public string Slug { get; set; }
    public DateTime Date { get; set; }
}

var original_path = @"D:\dev\DevHawk\Original";
var posts_path = @"D:\dev\DevHawk\Posts";
Directory.CreateDirectory(posts_path);

Func<XElement, string> get_slug = item =>
{
    var post_name = item.Element("{http://wordpress.org/export/1.2/}post_name").Value;
    if (string.IsNullOrEmpty(post_name))
        return item.Element("title").Value;

    return post_name;
};

var posts = Directory.EnumerateFiles(original_path, "*.xml")
    .Select(f => XDocument.Load(f))
    .SelectMany(xdoc => xdoc
        .Root
        .Elements("channel")
        .Elements("item")
        .Select(item => new Post
        {
            Xml = item,
            Slug = get_slug(item),
            Date = DateTime.Parse(item.Element("{http://wordpress.org/export/1.2/}post_date").Value),
        })
    )
    .OrderByDescending(p => p.Date)
    ;
            
foreach (var post in posts)
{
    Console.WriteLine(post.Slug);

    var folder_name= string.Format("{0:yyyyMMdd-HHmm}-{1}",
        post.Date,
        post.Slug);

    var output_path = Path.Combine(
        posts_path, folder_name);

    Directory.CreateDirectory(output_path);

    var filename = Path.Combine(output_path, "post.xml");

    post.Xml.Save(filename);
}
