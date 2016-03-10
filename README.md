## arkadianriver.com

I'm in the process of re-vamping my web-site with Jekyll.

```sh
✔ pushd new-site
✔ human init new-site
✔ human apply-design
✔ human edit
✔ human backup existing-site
✔ human push new-site
* human cherry-pick -from existing-site
human ditch existing-site
> Are you sure? n
human ditch existing-site --force=true
popd
```

### How to

The framework is probably close to complete and I'll probably just be adding more posts and a portfolio from now on.

#### Customizing

If you clone or fork this repository for your own, you'll wanna...

- Edit the `_config.yml` file, add a `_data/tokens.yml` file with your IDs & mail program,
  and add author info for yourself in `_data/authors.yml`. (I have myself as author separate than
  owner for when the project is forked, the new owner doesn't also become the new author if my posts
  aren't deleted.)
- Delete my posts dated in this millenium (or if you keep earthtv, contact 'em first)
- Use the posts in the 31st century as guides for yours
- Provide your images and continue tweaking to your heart's desire, or not.


#### Building

If you're building your site on Windows (like me) and you use WinSCP to synch with your remote site, you can use the
`site.bat` file. To use that, first set up a properties file as described in the comments of `site.bat`. Then...

- `site dev` : runs `jekyll serve --future --drafts` in development mode
- `site preview` : runs `jekyll serve` in production mode
- `site prod` : simply builds with `jekyll build` in production mode (no serve)
- `site publish` : Uses WinSCP's `synchronize` feature to mirror to a remote site
