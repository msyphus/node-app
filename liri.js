require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

var spotify = new spotify(keys.spotify);
var userCmd = process.argv[2];

switch(userCmd) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;
    
    case "do-what-it-say":
        doSay();
        break;
}

function concertThis() {
    var artist = process.argv[3];
    axios
      .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function(response) {
          var venueName = response.venue.name;
          var venueLocation = response.venue.location;
          var eventDate = moment().format(response.datetime, "MM/DD/YYYY");
          
      })
}
