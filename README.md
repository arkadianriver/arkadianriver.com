## [Wolford or Gifsack Wedding Site](https://mgifford.github.io/wolford-or-gifsack/)

My wedding web site, based off the http://html5up.net/spectral, initial design by
[@ajlkn](http://twitter.com/ajlkn).

The site uses jekyll, a method of creating and maintaining a web site,
which works by using local templates to generate static files that you upload
and sync with your remote site.

### If you clone or fork this repo to use it:

0. Install [Jekyll](https://jekyllrb.com/) (version 3.1.2 or higher).

0. Tweak the site to make it your own. Jekyll uses [YAML files](http://www.yaml.org/start.html)
   for its site variables:

   a. Edit the `_config.yml` file, replacing the values for each key with your info.

   b. Add a `_data/tokens.yml` file with your IDs & mail program.
      See the `_data/tokens-template.yml.` file for example entries.

   c. Add author info for yourself in `_data/authors.yml` as the first
      author entry in the file.

   d. Provide your own images.
   
   e. Continue tweaking to your heart's desire, or not.

0. Create your posts:

   a. Use the posts in the 31st century as guides for yours. They're built by jekyll only when
      the `--future` option is used.

   b. You can run `ruby compose.rb` to create new draft posts.

0. Test and publish your site:

   If you're building your site on Windows (like me) and you use WinSCP to sync with your
   remote site, you can use the `site.bat` file. Set up a `_site.env` file
   as described in the comments of `site.bat` and change the excludes list for your site.

   `site dev` runs `jekyll serve --future --drafts` in development mode.  
   `site devnof` runs `jekyll serve --drafts` in development mode.  
   `site preview` runs `jekyll serve` in production mode.  
   `site prod` simply builds with `jekyll build` in production mode (no serve).  
   `site publish` uses WinSCP's `synchronize` feature to mirror to a remote site.
