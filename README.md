# arkadianriver.com

My personal web site, using the awesome design of http://html5up.net/spectral by
the talented [@ajlkn](http://twitter.com/ajlkn).

I morphed that design into this Jekyll [theme](#theme-note) for blog and portfolio entries.
[Jekyll](https://jekyllrb.com) is a static site generator, which
uses templates to generate all the publishable content as static
HTML files (as opposed to something like WordPress, which has files that pull
data from a database at runtime).
This repo is the exact same code I use for my site (excluding my posts and
some data files created from templates where noted).

- [Features](https://arkadianriver.github.io/arkadianriver.com/topics/user-guide/features.html)
- [Authoring Guide](https://arkadianriver.github.io/arkadianriver.com/topics/user-guide/)

## If you like it

You can clone or fork this repo as a [theme](#theme-note) for your own blog.
Because it doesn't use any plugins, you can easily
[host it on GitHub Pages](https://jekyllrb.com/docs/github-pages/#deploying-jekyll-to-github-pages).
Even so, I recommend cloning your fork locally to create and preview your posts,
regardless of where you choose to publish.

With it downloaded and with Ruby, RubyGems, and Jekyll 3.1.2 or higher installed, you can use the post-creation script,
preview how your site looks and functions, and properly view the theme's User Guide.

1. Personalize the information in the [YAML files](http://www.yaml.org/start.html).

   File | Action
   -----|-------
   **`_config.yml`** | Replace the values for each key with your info.
   **`_data/tokens.yml`** | Create this file, using `_data/tokens-template.yml` as an example.
   **`_data/authors.yml`** | Add author info for yourself as the first entry in the file.

1. Personalize the images with your own, and change the attribution for your new banner
   at the bottom of `_data/credits.yml`.

   Image | Description
   ------|------------
   **`banner.jpg`** | The main large image on the front page
   **`pic01.jpg`** | The topics image
   **`pic02.jpg`** | The works image

1. From the repo's root directory, start Jekyll to preview as you write.
   
   ```
   bundle exec jekyll serve --future --drafts
   ```
      
1. Open a browser to http://localhost:4000 (or the port number that jekyll indicates to open).


1. Compose your first post!

   ```
   ruby compose.rb
   ```

   The User Guide describes some features that might be useful: http://localhost:4000/topics/user-guide/

1. Test and publish your site:

   If you're building your site on Windows (like me) you can use the `site.bat` file;
   otherwise, just use the Jekyll commands as indicated in the site command reference below.
   
   If you use WinSCP to sync with your remote site, you can use the _publish_ option.
   To publish with WinSCP, set up a `_site.env` file as described in the comments of `site.bat`,
   being _particularly careful_ to list your site remote path and excludes correctly because the
   script uses the `syncronize -delete` option to mirror the entire remote folder to the local one.
   Otherwise, see the [various publishing options](https://jekyllrb.com/docs/deployment-methods/)
   in Jekyll's documentation.

   ```bash
   site {dev|devnof|preview|prod|publish}

     dev     Runs Jekyll in development watch mode:
               jekyll serve --future --drafts

     devnof  Runs Jekyll in development watch mode without future posts:
               jekyll serve --drafts

     preview Runs Jekyll in production watch mode:
               jekyll serve

     prod    Builds production content without watch mode:
               jekyll build

     publish Uses WinSCP's synchronize feature to mirror to a remote site.
   ```

## Theme note
This is a theme in the old sense of the word. This is not a newer _gem-based_ theme (yet).

## License
MIT

