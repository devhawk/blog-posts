I love my [Olympus digital
camera](http://www.olympusamerica.com/cpg_section/cpg_support_product.asp?product=868&l=1&p=16&bc=27),
but it does have one annoying issue. Occasionally, it “forgets” the
current time and date. This leaves me with a bunch of images with a
corrupt “Date Picture Taken” field (here’s an
[example](http://winisp.net/harrypierson/Photos/Raking%20the%20Yard%20(9).JPG)).
Luckily,
[Omar’s](http://www.shahine.com/omar/default.aspx)[PhotoLibrary](http://wiki.shahine.com/default.aspx/MyWiki.PhotoLibrary)
let me hack up a little program to update the date fields in the EXIF
header. I couldn’t use [JPEG
Hammer](http://workspaces.gotdotnet.com.jpeg) out-of-the-box becuase it
doesn’t handle the corrupt date fields. No matter. My app is a total
hack, but since I only need to use it once-in-a-great-while, it’s no big
deal. 
