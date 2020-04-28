require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);
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
    var artist = process.argv.slice(3).join("+");

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            var venueName = response.data[0].venue.name;
            var venueLocation = response.data[0].venue.location;
            var eventDate = moment().format(response.data[0].datetime, "MM/DD/YYYY");

            console.log("Venue Name: " + venueName);
            console.log("Location: " + venueLocation);
            console.log("Concert Date: " + eventDate);
      })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error: ", error.message);
            }
            console.log(error.config);
       });
};

function spotifySong() {
    var song = process.argv.slice(3).join(" ");

    if (song === "") {
        song = "the sign"
    }

    spotify
        .search({type: "track", query: song})
        .then(function(response) {
            var songTitle = JSON.stringify(response.tracks.items[0].name);
            var songArtist = JSON.stringify(response.tracks.items[0].artists[0].name);
            var songAlbum = JSON.stringify(response.tracks.items[0].album.name);
            var songPreview = JSON.stringify(response.tracks.items[0].external_urls.spotify);

            console.log("Song: " + songTitle);
            console.log("Album: " + songAlbum);
            console.log("Artist: " + songArtist);
            console.log("Preview URL: " + songPreview);
        })
        .catch(function(error) {
            console.log(error);
        });
};

function movieThis() {
    var movie = process.argv.slice(3).join(" ");

    if (movie === "") {
        movie = "mr.nobody"
    }

    axios
        .get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
        .then(function(response) {
            var movieTitle = response.data.Title;
            var movieYear = response.data.Year;
            var imdbRating = response.data.Ratings[0].Value;
            var tomatoRating = response.data.Ratings[1].Value;
            var movieCountry = response.data.Country;
            var movieLanguage = response.data.Language;
            var moviePlot = response.data.Plot;
            var movieActors = response.data.Actors;

            console.log("Movie Title: " + movieTitle);
            console.log("Year Released: " + movieYear);
            console.log("IMDB Rating: " + imdbRating);
            console.log("Rotten Tomatoes Rating: " + tomatoRating);
            console.log("Produced in: " + movieCountry);
            console.log("Language: " + movieLanguage);
            console.log("Plot: " + moviePlot);
            console.log("Starring: " + movieActors);
        })
        .catch(function(error) {
            console.log(error);
       });
}