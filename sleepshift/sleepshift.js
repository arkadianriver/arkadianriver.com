/**
 * sleepshift - SleepShift prints a week of sleeping and waking hours, plus other stuff.
 * @version v0.1
 * @link https://github.com/arkadianriver/sleepshift
 * @license MIT
 */
var SleepShift = {

  debug:          false,
  title:          "My 28-hour days (with world clock)",
  mytimezonename: "",
  sleepcolor:     "87a",
  cellstyles:     {},
  tzhash:         {},

  // defaults to the xkcd 28-hour schedule
  hrsperday:      28,
  waketime:       20,
  houroffset:     -6,

  totalCells:      0,

  init: function(obj)
  {
    $.each([ "debug", "title", "mytimezonename", "sleepcolor",
             "cellstyles", "tzhash",
             "hrsperday", "waketime", "houroffset"
           ], function(_,val){
      if (typeof obj[val] !== 'undefined') SleepShift[val] = obj[val];
    });
  },

  setupDom: function()
  {
    $("#sleepshift").html([
      "      <h1></h1>",
      "      <p>Time: <span id='timeasgmt'></span>",
      "         Local:",
      "         [ <span id='tz'></span>",
      "           <span id='geoloc'></span>",
      "           <span id='sun'>Sunrise/Sunset is available when you allow geolocation.</span>",
      "         ]</p>",
      "      <table id='weekview'>",
      "        <thead><tr id='rhdr'></tr></thead>",
      "        <tbody></tbody>",
      "      </table>",
      "      <p id='mytz'></p>",
      "      <div id='debug'></div>",
      "      <div id='colorkey'></div>",
      "      <div style='clear:both'></div>"
    ].join("\n"));
  },

  /**
   * Main, to draw table, drive other functions.
   */
  drawMyCal: function(hrsperday, waketime, houroffset)
  {
    hrsperday  = typeof hrsperday  !== 'undefined' ? hrsperday  : this.hrsperday;
    waketime   = typeof waketime   !== 'undefined' ? waketime   : this.waketime;
    houroffset = typeof houroffset !== 'undefined' ? houroffset : this.houroffset;
    SleepShift.setupDom();
    $("#sleepshift h1").html(this.title);
    var tzdisplay = this.mytimezonename ? "The table's times are in the "
                  + this.mytimezonename + " time zone." : "";
    $("#sleepshift #mytz").html(tzdisplay);
    var dhdr = ''; // for thead html
    var guts = ''; // for tbody html
    var dnames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var i = 0;
    this.cellstyles["sleep"] = [this.sleepcolor,[]]; // (re)init sleep color/cells
    for (hour = 0; hour < 24; hour++) { // 24 hours (rows)
      guts += "    <tr id=\"r" + this.pad(hour,2) + "\">&nbsp;</td>\n";
      for (day = 0; day < 7; day++) { // 7 days (columns)
        if (hour==0) {
          dhdr += '<th id="hdr'+ this.pad(day,2) +'">'+ dnames[day%7] +'<br />&nbsp;</th>';
        }
        // cells numbered 000-167 sequential hours in the week.
        // 'i' is that number, specified column-by-column in each row.
        // row0: 0 - 24 - 48 - 72 - 96 - 120 - 144
        // row1: 1 - 25 - 49 - 73 - 97 - 121 - 145
        // etc.
        i = hour + (day*24);
        // draw the cell...
        guts += "      <td id=\"td" + this.pad(i,3) + '" class="timeslot">';
        // ...and if debug is on, display the cell number 'i'; else not.
        guts += this.debug ? i +'-' + this.pad(hour,2) + ":00 <small></small></td>\n"
                           : this.pad(hour,2) + ":00 <small></small></td>\n";
      }
      guts +=  "    </tr>\n";
    }
    // we have all the cells, add 'em to DOM
    $("#sleepshift #weekview > thead > tr#rhdr").html(dhdr);
    $("#sleepshift #weekview > tbody").html(guts);

    totalCells = i+1; // total number of cells

    this.getLocationForSunriseSunset();
    this.sleepCalc(totalCells, hrsperday, waketime, houroffset);
    this.drawOverlays();
    this.setLocalTimezone();
    this.drawTimeZones();
    this.drawColorKey();
    if (this.debug) this.drawDebug(this.tzhash);
  },

  // from http://stackoverflow.com/a/6466243 @license MIT
  pad: function(str, max) {
    str = str.toString();
    return str.length < max ? SleepShift.pad("0" + str, max) : str;
  },

  /**
   * Apply sleep style to cells resulting from this calculation
   */
  sleepCalc: function (totalCells, hrsperday, waketime, houroffset)
  {
    i = 0;
    sleeptime = hrsperday - waketime;
    allcells: while (1) {
      for (w = 0; w < waketime; w++) {
        if (i++ >= totalCells) break allcells;
      }
      for (s = 0; s < sleeptime; s++) {
        this.cellstyles["sleep"][1].push(this._cellToApply(i, totalCells, houroffset));
        if (i++ >= totalCells) break allcells;
      }
    }
  },

  _cellToApply: function (i, totalCells, houroffset)
  {
    c = i + houroffset;
    return   c < 0           ? c + totalCells
           : c >= totalCells ? c - totalCells
           : c;
  },

  drawDebug: function(myobj)
  {
    $("#sleepshift #debug").css({
      "position":"absolute",
      "right":"0",
      "top":"0",
      "margin-top":"24px",
      "padding":"12px",
      "border":"solid 2px red",
      "background-color":"#fea",
      "white-space":"pre",
      "width":"200px"
    });
    $("#sleepshift #debug").text("SleepShift DEBUG:\n"+JSON.stringify(myobj, null, '\t'));
  },

  /**
   * Apply cellstyles{} backgrounds to its cell lists
   */
  drawOverlays: function() {
    var pad = this.pad;
    $("#sleepshift td").css("background-color",""); // clear all backgrounds for redraws
    $.each(this.cellstyles, function(cssclass, arr){
      var color = '#'+arr[0];
      $.each(arr[1], function(_, val) {
        var pval = pad(val,3);
        $("#sleepshift #td"+pval).css("background-color", color);
      });
    });
  },

  /**
   * Set local timezone in tzhash and header
   */
  setLocalTimezone: function() {
    var d = new Date().getTimezoneOffset();
    var tz = -(d/60);
    this.tzhash["LOCAL"] = tz;
    $("#sleepshift #tz").text('TZ Offset: ' + tz + ";");
  },

  /**
   * Write current GMT and each tzhash time zone to the table.
   */
  drawTimeZones: function() {
    // first clear all time zone borders and text
    $("#sleepshift td.timeslot").removeClass('gmtborder');
    $("#sleepshift td.timeslot").removeClass('timeborder');
    $("#sleepshift td.timeslot > small" ).text('');
    // get GMT human-readable string, stripping off seconds
    var gmtstr = new Date().toGMTString().replace(/....GMT$/," GMT");
    $("#sleepshift #timeasgmt").text('[ '+gmtstr+' ]');
    var weekday = gmtstr.substr(0,3); // e.g. 'Fri'
    var hr = gmtstr.substr(17,2); // e.g. '09'
    // e.g. shift to start of 'Fri' (4*24hrs) + hr in day, str-padded for cell id
    var dint = {'Mon':0,'Tue':1,'Wed':2,'Thu':3,'Fri':4,'Sat':5,'Sun':6};
    var gmtcell = SleepShift.pad((dint[weekday]*24)+parseInt(hr),3);
    // apply tzhash zones, offset from gmt
    $.each(SleepShift.tzhash, function(key,val){
      var tid = parseInt(gmtcell)+val;
      // when GMT+x times loop back to Mon
      tid = tid > totalCells - 1 ? tid - totalCells : tid;
      // when GMT-x times lag behind GMT on Mon
      tid = tid < 0 ? totalCells + tid : tid;
      tid = SleepShift.pad(tid,3);
      if (key.match(/^LOCAL/)) { // overwrites any text in same tzhash zone
        $("#sleepshift #td"+tid).addClass('timeborder');
        $("#sleepshift #td"+tid+" > small").text(key);
      } else {
        $("#sleepshift #td"+tid+" > small").text(key);
      }
    });
    // set gmtcell style afterward, overwriting any tzhash 0, say, London.
    $("#sleepshift #td"+gmtcell+" > small").text('GMT');
    $("#sleepshift #td"+gmtcell).addClass('gmtborder');
    setTimeout(SleepShift.drawTimeZones, 30000); // accurate to within 30 seconds
    // (no sense running it every second)
  },

  /**
   * Use cellstyles{} to print color key.
   */
  drawColorKey: function() {
    var guts = '<p><b>Color key:</b></p>';
    $.each(this.cellstyles,function(stylename, arr){
      var str = stylename.replace(/-/g, " ").replace(/\b\w+/g,function(s){
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
      });
      guts +=
        '<div class="colorkey" style="background-color:#'+ arr[0] + ';">'+ str +'</div>';
    });
    $("#sleepshift #colorkey").html(guts);
  },

  /**
   * Get geolocation and call chain of functions to eventually draw
   * sunrise/sunset on table.
   */
  getLocationForSunriseSunset: function() {
    if (window.location.protocol == 'file:') {
      $("#sleepshift #geoloc").text(
        "Sunrise/Sunset is available when page is hosted and you allow geolocation."
      );
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._onGeoSuccess);
    }
  },

  _onGeoSuccess: function(position) {
    $("#sleepshift #geoloc").text("Geo: " + position.coords.latitude +
    "," + position.coords.longitude + ";");
    SleepShift._getSunriseSunset(position.coords.latitude, position.coords.longitude);
  },

  // http://sunrise-sunset.org/api gives coord's sunrise/sunset in GMT
  _getSunriseSunset: function(lat,lng)
  {
    ssurl = "http://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lng
          + "&formatted=0";
    $.getJSON(ssurl, function(ss){
      if (ss.status == "OK") {
        var srisearry = SleepShift._toLocalTime(ss.results.sunrise.substr(11,5));
        var ssetarry = SleepShift._toLocalTime(ss.results.sunset.substr(11,5));
        // using full time (idx 0) for header
        $("#sleepshift #sun").text("Sunrise: " + srisearry[0] + ";" +
                      " Sunset: " + ssetarry[0] + ";");
        // using rounded hour (idx 1) for lines
        SleepShift._drawSun(srisearry[1],ssetarry[1]);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#sleepshift #sun").text("Cannot get sunrise/sunset: "+ textStatus +' '+ errorThrown + ";");
    });
  },

  // Converts GMTime provided by sunrise-sunset API to local using offset
  // @returns {arr} [local time string, local hour rounded by half]
  _toLocalTime: function(gmtime)
  {
    var offset = this.tzhash["LOCAL"];
    var gmhour = gmtime.substr(0,2);
    var gmmins = gmtime.substr(3);
    var lclhour = parseInt(gmhour) + offset;
    if (lclhour < 0) lclhour += 24;
    var lclrounded = gmmins > 30 ? lclhour+1 : lclhour;
    return [this.pad(lclhour,2) + ':' + gmmins, lclrounded ];
  },

   // Draws lines for sunrise and sunset hours
   // (_before_ both, since the sky starts changing before each).
  _drawSun: function(srise, sset)
  {
    // sunrise
    for (i=srise; i < totalCells; i += 24) {
      $("#sleepshift #td"+ this.pad(i,3)).css('border-top','solid 3px #daf');
    }
    // sunset
    for (i=sset; i < totalCells; i += 24) {
      $("#sleepshift #td"+ this.pad(i,3)).css('border-top','solid 3px #daf');
    }
  }

}
