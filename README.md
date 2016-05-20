## arkadianriver.com

```sh
✔ pushd new-site
✔ human init new-site
✔ human apply-design
✔ human edit
✔ human backup existing-site
✔ human push new-site
✔ human cherry-pick -from existing-site
✔ human ditch existing-site
✔ > Are you sure? n
* human considers "meaning of life"
  > "meaning of life" unknown.
  human ditch existing-site --force=true
  popd
```
### How to

If you clone or fork this repository for your own, you'll want to..

0. Edit the `_config.yml` file.
1. Add a `_data/tokens.yml` file with your IDs & mail program.
2. Add author info for yourself in `_data/authors.yml`.
3. Provide your images and continue tweaking to your heart's desire, or not.

Use the posts in the 31st century as guides for yours. They're built by jekyll only when
the `--future` option is used.

You can run `ruby compose.rb` to create new draft posts.

If you're building your site on Windows (like me) and you use WinSCP to sync with your
remote site, you can use the `site.bat` file. Set up a `_site.env` file
as described in the comments of `site.bat` and change the excludes list for your site.

`site dev` runs `jekyll serve --future --drafts` in development mode.  
`site devnof` runs `jekyll serve --drafts` in development mode.  
`site preview` runs `jekyll serve` in production mode.  
`site prod` simply builds with `jekyll build` in production mode (no serve).  
`site publish` uses WinSCP's `synchronize` feature to mirror to a remote site.
