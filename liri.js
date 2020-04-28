require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var figlet = require("figlet");
var chalk = require("chalk");

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
    
    case "do-what-it-says":
        doSay();
        break;
};

function concertThis() {
    var artist = process.argv.slice(3).join("+");

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            var venueName = response.data[0].venue.name;
            var venueLocation = response.data[0].venue.location;
            var eventDate = moment().format(response.data[0].datetime, "MM/DD/YYYY");

            console.log(chalk.keyword("orange")(figlet.textSync("Next Concert", {horizontalLayout: "full"})));
            console.log(chalk`{blueBright Venue Name: } {cyanBright ${venueName}}`);
            console.log(chalk`{blueBright Location: } {cyanBright ${venueLocation}}`);
            console.log(chalk`{blueBright Concert Date: } {cyanBright ${eventDate}}`);
      })
        .catch(function(error) {
            console.log(error);
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

            console.log(chalk.keyword("orange")(figlet.textSync("Song Info", {horizontalLayout: "full"})));
            console.log(chalk`{blueBright Song: } {cyanBright ${songTitle}}`);
            console.log(chalk`{blueBright Album: } {cyanBright ${songAlbum}}`);
            console.log(chalk`{blueBright Artist: } {cyanBright ${songArtist}}`);
            console.log(chalk`{blueBright Preview URL: } {cyanBright ${songPreview}}`);
        })
        .catch(function(error) {
            console.log(error);
        });
};

function movieThis() {
    var movie = process.argv.slice(3).join(" ");

    if (movie === "") {
        movie = "up"
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

            console.log(chalk.keyword("orange")(figlet.textSync("Movie Info", {horizontalLayout: "full"})));
            console.log(chalk`{blueBright Movie Title: } {cyanBright ${movieTitle}}`);
            console.log(chalk`{blueBright Year Released: } {cyanBright ${movieYear}}`);
            console.log(chalk`{blueBright IMDB Rating: } {cyanBright ${imdbRating}}`);
            console.log(chalk`{blueBright Rotten Tomatoes Rating: } {cyanBright ${tomatoRating}}`);
            console.log(chalk`{blueBright Produced in: } {cyanBright ${movieCountry}}`);
            console.log(chalk`{blueBright Language: } {cyanBright ${movieLanguage}}`);
            console.log(chalk`{blueBright Plot: } {cyanBright ${moviePlot}}`);
            console.log(chalk`{blueBright Starring: } {cyanBright ${movieActors}}`);
        })
        .catch(function(error) {
            console.log(error);
       });
};

function doSay() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var txtArr = data.split(",");

        switch(txtArr[0]) {
            case "concert-this":
                axios
                    .get("https://rest.bandsintown.com/artists/" + txtArr[1].trim() + "/events?app_id=codingbootcamp")
                    .then(function(response) {
                        var venueName = response.data[0].venue.name;
                        var venueLocation = response.data[0].venue.location;
                        var eventDate = moment().format(response.data[0].datetime, "MM/DD/YYYY");

                        console.log(chalk.keyword("orange")(figlet.textSync("Next Concert", {horizontalLayout: "full"})));
                        console.log(chalk`{blueBright Venue Name: } {cyanBright ${venueName}}`);
                        console.log(chalk`{blueBright Location: } {cyanBright ${venueLocation}}`);
                        console.log(chalk`{blueBright Concert Date: } {cyanBright ${eventDate}}`);
                })
                    .catch(function(error) {
                        console.log(error);
                });
                break;

            case "spotify-this-song":
                spotify
                    .search({type: "track", query: txtArr[1]})
                    .then(function(response) {
                        var songTitle = JSON.stringify(response.tracks.items[0].name);
                        var songArtist = JSON.stringify(response.tracks.items[0].artists[0].name);
                        var songAlbum = JSON.stringify(response.tracks.items[0].album.name);
                        var songPreview = JSON.stringify(response.tracks.items[0].external_urls.spotify);
            
                        console.log(chalk.keyword("orange")(figlet.textSync("Song Info", {horizontalLayout: "full"})));
                        console.log(chalk`{blueBright Song: } {cyanBright ${songTitle}}`);
                        console.log(chalk`{blueBright Album: } {cyanBright ${songAlbum}}`);
                        console.log(chalk`{blueBright Artist: } {cyanBright ${songArtist}}`);
                        console.log(chalk`{blueBright Preview URL: } {cyanBright ${songPreview}}`);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                break;

            case "movie-this":   
                axios
                    .get("https://www.omdbapi.com/?t=" + txtArr[1].trim() + "&apikey=trilogy")
                    .then(function(response) {
                        var movieTitle = response.data.Title;
                        var movieYear = response.data.Year;
                        var imdbRating = response.data.Ratings[0].Value;
                        var tomatoRating = response.data.Ratings[1].Value;
                        var movieCountry = response.data.Country;
                        var movieLanguage = response.data.Language;
                        var moviePlot = response.data.Plot;
                        var movieActors = response.data.Actors;

                        console.log(chalk.keyword("orange")(figlet.textSync("Movie Info", {horizontalLayout: "full"})));
                        console.log(chalk`{blueBright Movie Title: } {cyanBright ${movieTitle}}`);
                        console.log(chalk`{blueBright Year Released: } {cyanBright ${movieYear}}`);
                        console.log(chalk`{blueBright IMDB Rating: } {cyanBright ${imdbRating}}`);
                        console.log(chalk`{blueBright Rotten Tomatoes Rating: } {cyanBright ${tomatoRating}}`);
                        console.log(chalk`{blueBright Produced in: } {cyanBright ${movieCountry}}`);
                        console.log(chalk`{blueBright Language: } {cyanBright ${movieLanguage}}`);
                        console.log(chalk`{blueBright Plot: } {cyanBright ${moviePlot}}`);
                        console.log(chalk`{blueBright Starring: } {cyanBright ${movieActors}}`);
                    })
                    .catch(function(error) {
                        console.log(error);
                });
                break;
            };
    });
};