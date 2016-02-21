## arkadianriver.com

web-site redesign

```sh
pushd new-site
human init new-site
human apply-design
human edit
human cherry-pick -from existing-site
human ditch existing-site
> Are you sure? n
human ditch existing-site --force=true
human push new-site
popd
```
