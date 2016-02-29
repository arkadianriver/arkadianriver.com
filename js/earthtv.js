---
# offering to jekyll to insert data
---
// Use of embedded EarthTV by permission
// Nice folks, contact them if interested
// http://www.earthtv.com/en/contact/
function between(val,min,max) { return val >= min && val <= max; }
function getLocations(day,hour) {
  var h = parseInt(hour);
  if (day == 'Sun') { if (between(h,14,23)) return locations.Mon; }
  if (day == 'Mon') { if (between(h,0,17)) return locations.Mon; }
  if (day == 'Mon') { if (between(h,18,23)) return locations.Tue; }
  if (day == 'Tue') { if (between(h,0,21)) return locations.Tue; }
  if (day == 'Tue') { if (between(h,22,23)) return locations.Wed; }
  if (day == 'Wed') { return locations.Wed; }
  if (day == 'Thu') { if (between(h,0,1)) return locations.Wed; }
  if (day == 'Thu') { if (between(h,2,23)) return locations.Thu; }
  if (day == 'Fri') { if (between(h,0,5)) return locations.Thu; }
  if (day == 'Fri') { if (between(h,6,23)) return locations.Fri; }
  if (day == 'Sat') { if (between(h,0,9)) return locations.Fri; }
  if (day == 'Sat') { if (between(h,10,23)) return locations.Sat; }
  if (day == 'Sun') { if (between(h,0,13)) return locations.Sat; }
}
var locations = {
  Sat: ['UDA','JEK','PHN','BKK','HKG','HND'],
  Fri: ['MEL','SYD','AU2'],
  Thu: ['YVR','LAV'],
  Wed: ['NIA','NY3','NYE','WAS','AGA','BA2','TEN','LO2'],
  Tue: ['MU2','KA4','KA5','LED','JED','MEC','MED','RIY',
        'CAP','WIE','GIB','PRA','ARC','CNS','PA2','STM',
        'BER','KOE','MUC','S21','BUD','VEN','AMS','WA2',
        'WAW','GEN','SAN','KIV','KA2'],
  Mon: ['UDA','JEK','PHN','BKK','HKG','HND']
};
var dt = new Date().toString();
var day = dt.substring(0,3);
var hour = dt.substring(16,18);
var locations = getLocations(day,hour);
var playerprops = {
  // required
  token: "{{ site.data.tokens.earthtv }}",
  layerid: "etvplayer",
  // optional
  location: locations[0],
  channel: "Latest",
  carousel: "true",
  menu: "true",
  autoplay: "true"
};
// initiate with first location
etv_create_player(playerprops);
// then loop through at timeout
(function myLoop(i) {
  setTimeout(function() {
    playerprops.location = locations[i];
    $("#etvplayer").empty();
    etv_create_player(playerprops);
    i++;
    if (i < locations.length) {
      myLoop(i);
    } else {
      myLoop(0); // start over at first location
    }
  }, 300000) // 5 min intervals
})(1); // after timeout, pick up at second location
