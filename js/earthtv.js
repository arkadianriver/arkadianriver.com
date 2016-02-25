---
# offering to jekyll to insert data
---
//<script> an html block for kramdown to passthrough
  // Use of embedded EarthTV by permission
  // Nice folks, contact them if interested
  // http://www.earthtv.com/en/contact/
  var playerprops = {
    // required
    token: "{{ site.data.tokens.earthtv }}",
    layerid: "etvplayer",
    // optional
    location: "BER",
    channel: "Latest",
    carousel: "true",
    menu: "true",
    autoplay: "true"
  };
  etv_create_player(playerprops);
  var locations = ["PRA", "WIE", "BER", "TOK"];
  (function myLoop(i) {
    setTimeout(function() {
      playerprops.location = locations[i];
      $("#etvplayer").empty();
      etv_create_player(playerprops);
      i++;
      if (i < locations.length) {
        myLoop(loc);
      } else {
        myLoop(0);
      }
    }, 180000)
  })(0);
//</script>
