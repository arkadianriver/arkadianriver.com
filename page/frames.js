
function surrrrroundMe() {

  // Bail if: browser's stupid, you override frames, or in print window.
  if ((navigator.appCodeName != "Mozilla")
     || (parseInt(navigator.appVersion) < 3)
     || (document.location.href.indexOf("?noframe") != -1)
     || (document.layers && (self.innerHeight == 0 && self.innerWidth == 0))) {
    return;
  }

  if (top.arknav == null) // not in "my" frames, so proceed
  {

    // If single-frame filename is file.htm, load the frameset document
    // as index.htm#file using the same host and pathname.
    var docname = document.location.pathname;

    // forwards to backs for Windows testing
    while (docname.indexOf("\\") != -1) {
      docname = docname.substring(0,docname.indexOf("\\")) +
                "/" +
                docname.substring(docname.indexOf("\\")+1);
    }

    var docpath = docname.substring(0,docname.lastIndexOf("/")+1);

    // strip path down to lastdir/name.html
    var spos = docname.indexOf("/");
    while (spos > -1 && docname.lastIndexOf("/") != spos) {
      docname = docname.substring(spos+1,docname.length);
      spos = docname.indexOf("/");
    }

    if (docpath.substring(0,2)=="//") {
      docpath=docpath.substring(1,docpath.length);
    }

    var finalname = docpath + "../fopen.htm?docname=" + docname;

    top.location.replace(finalname);
  }
}

surrrrroundMe();
