# arkadianriver.com

My personal web site, using the design of http://html5up.net/spectral by
[@ajlkn](http://twitter.com/ajlkn).

I made this Jekyll theme for blog and portfolio content. The blog can contain both
personal entries and entries by syndicated authors.
[Jekyll](https://jekyllrb.com) is a static-site-generator, which
works by using local templates to generate all the content in static
HTML files that you publish (as opposed to something like WordPress, which
pulls from a database).
This repo is the exact same code I use for my site (excluding my posts and
some data files created from templates where noted).

## If you like it

You can clone or fork this repo as a [theme](#theme-note) for your own blog.
Because it doesn't use any plugins, you can easily
[host it on GitHub Pages](https://jekyllrb.com/docs/github-pages/#deploying-jekyll-to-github-pages).
Even so, I recommend cloning your fork locally to create and preview your posts,
regardless of where you choose to publish.

With it downloaded and with Ruby, RubyGems, and Jekyll 3.1.2 or higher installed, you can use the post-creation script,
preview how your site looks and functions, and properly view the theme's User Guide.

1. Tweak the site to make it your own. Jekyll uses [YAML files](http://www.yaml.org/start.html)
   for its site variables:

   1. Edit the `_config.yml` file, replacing the values for each key with your info.

   1. Add a `_data/tokens.yml` file with your IDs & mail program.
      See the `_data/tokens-template.yml.` file for example entries.

   1. Add author info for yourself in `_data/authors.yml` as the first
      author entry in the file.

   1. Provide your own images.
   
   1. Continue tweaking to your heart's desire, or not.

1. Create your posts:

   1. Get Jekyll started to preview as you write:
   
      1. In the repo's root directory, run `site dev` if you're on Windows (or `jekyll serve --future --drafts`).
      
      1. Open a browser to http://localhost:4000 (or the URL that jekyll indicates to open).

   1. Use the posts in the 31st century as guides for yours: http://localhost:4000/topics/user-guide/
      (They're built by jekyll only when the `--future` option is used.)

   1. You can run `ruby compose.rb` to create new draft posts.

1. Test and publish your site:

   If you're building your site on Windows (like me) and you use WinSCP to sync with your
   remote site, you can use the `site.bat` file. Set up a `_site.env` file
   as described in the comments of `site.bat`.
   CAREFUL with that `synchronize -delete` flag and be _sure_ you've listed your site excludes correctly.

   `site dev` runs `jekyll serve --future --drafts` in development mode.  
   `site devnof` runs `jekyll serve --drafts` in development mode.  
   `site preview` runs `jekyll serve` in production mode.  
   `site prod` simply builds with `jekyll build` in production mode (no serve).  
   `site publish` uses WinSCP's `synchronize` feature to mirror to a remote site.

## theme note
This is a theme in the old sense of the word. This is not a newer _gem-based_ theme (yet).

## License
MIT
