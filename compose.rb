#!/usr/bin/ruby
#
# my first ruby script!
# (could surely be better, but it gets the job done well enough)
#
# Walks through creating a new post rather than reading everything
# in the "Guide to New Posts" topic and rather than typing the filename
# and all by hand, like jekyll-compose, but specific to this repo.
#

Gem.win_platform? ? (system "cls") : (system "clear")

# for getting the name of your editor and extension
require 'yaml'
cfgfile = YAML.load_file('_config.yml')

# getting the default author (first in authors file if exist)
authfile = "./_data/authors.yml"
if (File.exist?(authfile))
  author = YAML.load_file(authfile).keys[0]
end

# for print stmt buffers
STDOUT.sync = true

#
# interview
#

puts <<-eoh

This script helps you create a post. It adds it to the _drafts folder.
(Hit Ctrl-C at any time to cancel. Default values are shown in brackets;
to accept the default you can just hit return.)

This site has two types of posts:
- Topics: blog posts
- Works: portfolio entries

eoh
print "Is this a (t)opic or (w)ork? [t]: "
type = ''
while true
  type = gets
  type.strip!
  unless (type == '' or /^[tw]$/.match(type)) then redo end
  if type=='' then type = 't' end
  break
end

categories = Array.new
if type=='w'
  categories << 'works'
  puts <<-eoh

Higher priority works are listed first and also get the same priority value
for the site map. 1.0 is the highest possible value, and you probably don't
want it to have a priority under 0.5. What priority should it have?
  eoh
  priority = ''
  while true
    print "(0 - 1.0) [0.7]: "
    priority = gets
    priority.strip!
    unless (priority == '' or (priority.to_f >= 0.0 and priority.to_f <= 1.0)) then redo end
    if priority == '' then priority = '0.7' end
    break
  end
else
  categories << 'topics'
  puts <<-eoh

The first 10 featured posts are listed on the front page and get a higher
priority in the site map. Is this a featured post?
  eoh
  featured = ''
  while true
    print "(y or [n]): "
    featured = gets
    featured.strip!
    unless (featured == '' or /^[yn]$/.match(featured)) then redo end
    if (featured=='' or featured=='n') then featured = nil end
    break
  end
  puts <<-eoh

If this is a part of a series of posts that you want to be displayed with
back/next links, you can specify a sub-category name. Note that only the
first topic in the sub-category is listed in the topics index. Also note
that categories should probably have alphanumeric, underscores, hyphens,
and space characters only. Tip: I title my first topic in the sub-category
with the same name as the sub-category so that the breadcrumb looks nice.

  eoh
  print "So, is this part of a sub-category grouping? (y or [n]): "
  isgroup = gets
  isgroup.strip!
  if isgroup == 'y'
    trapped = true
    subcat = ''
    while trapped do
      catch :trapped do
        print "\nSub-category name: "
        subcat = gets
        subcat.strip!
        if subcat == '' then throw :trapped end
        subcat.each_char do |c|
          unless (/[0-9A-Za-z_\- ]/.match(c))
            puts "Use ASCII alphanumerics, underscores, hyphens, and spaces only."
            throw :trapped
          end
        end
        trapped = false
      end
    end
    categories << subcat
    isfirst = ''
    while true
      print "\nIs this your first topic in the sub-category? (y or [n]): "
      isfirst = gets
      isfirst.strip!
      unless (isfirst == '' or /^[yn]$/.match(isfirst)) then redo end
      if isfirst == 'y'
        perma = '/' + categories.join('/') + '/'
      end
      break
    end
  end
end

while true
  print "\nPost title: "
  title = gets
  title.strip!
  break unless title == ''
  puts "Well you gotta call it something."
end

print "\nPost excerpt: "
excerpt = gets
excerpt.strip!

if type == 't'
  print "\nPost author [" + author + "]: "
  theauth = gets
  theauth.strip!
  if theauth == '' then theauth = author end
end

puts <<-eoc

If you want an image in the banner, put the image in the /images folder
and type the name here. If it's in another folder, prefix the image with
'/' and the folder name, such as /unique/images/mine.jpg. For no image,
just hit Enter.
eoc
print "background-image: "
back = gets
back = back.strip! == '' ? nil : back

puts <<-eoc

There are a few other options you could add, such as a mini-heading, a
full-width body, and a custom icon for featured posts on the front page.
For a full description of options, see the "Guide for New Posts" topic
when you run jekyll serve --future.

Otherwise, hit Enter to create this starter post.
eoc
letsdothis = gets

#
# a bit of formatting and date
#

tslug = title.dup
# replace illegal characters on Win/Linux filesystems as well as URLs with '-'
[' ','\\','/','<','>',':','"','|','?','*','#','%'].each do |x|
  tslug.gsub!(x,'-')
end
tslug.downcase!

t = Time.new
tstamp = t.strftime("%Y-%m-%d %H:%M:%S")
dstamp = t.strftime("%Y-%m-%d")

ext = cfgfile['compose']['extension'] ? cfgfile['compose']['extension'] : 'md'

fname = dstamp + "-" + tslug + '.' + ext

#
# Done, let's print the post
#

STDOUT.flush

if (File.exist?("./_drafts/" + fname) or File.exist?("./_posts/" + fname))
  puts "Sorry you went through all that trouble, but a file with that name exists!"
else
  File.open("./_drafts/" + fname, 'w') do |f|
    f.puts "---"
    f.puts "title: " + title
    f.puts "excerpt: " + excerpt
    unless (theauth.to_s == '') then f.puts "author: " + theauth end
    if (featured) then f.puts "tags: featured" end
    if (priority) then f.puts "priority: " + priority end
    if (perma) then f.puts "permalink: " + perma end
    f.puts "categories:"
    categories.each do |cat|
      f.puts "  - " + cat
    end
    if (back) then f.puts "background-image: " + back end
    f.puts "#date/lastupdated are optional"
    f.puts "#date: " + tstamp
    f.puts "#lastupdated: " + tstamp
    f.puts "---"
  end
end

patharg = Gem.win_platform? ? ".\\_drafts\\" + fname : "./_drafts/" + fname
puts "File created: " + patharg

#
# And, open it in an editor if specified
#

if (cfgfile['compose']['editor'])
  system cfgfile['compose']['editor'] + ' ' + patharg
end
