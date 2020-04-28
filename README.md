# LIRI Node App

### Demo
This app must be run through Node.js.  The repository must be downloaded and the dependencies listed in the package.json file must be installed.  Additionally, the user will need to supply Spotify API keys for features to work. Key information can be entered in the keys.js file on the lines for `id:` and `secret:`
![Screenshot of keys.js file](/assets/keys.PNG)

Or, if concerned about security, a .env file can be created with keys stored as:
![Screenshot of env file](/assets/env.PNG)

### General
This is a Node.js application that recognizes user commands and executes them.  Descriptions of allowed commands and instructions how to use them are shown below.  ***All commands must be preceeded by*** `node liri.js`.

#### Concert Search
To search for information about the next concert for a specific artist, use the `concert-this` command followed by the artist name.  Information will be displayed regarding where and when the next concert will take place.

For example, typing `node liri.js concert-this garth brooks` will retrieve information about the next Garth Brooks concert.
![Screenshot of concert-this command](/assets/concertThis.PNG)

If there are no upcoming concerts for the artist you search for, an error message will be generated.
![Screenshot of concert-this error message](/assets/concertError.PNG)

#### Song Search
To search for a song, use the `spotify-this-song` command followed by the name of the song.  The song name, album, artist, and a URL to sample audio will be retrieved.  

For example, typing `node liri.js spotify-this-song rock away` will retrieve information about the song "Rock Away" by Beres Hammond.
![Screenshot of spotify-this-song command](/assets/spotify.PNG)

If a song is not entered, information for "The Sign" by Ace of Base will be retrieved.
![Screenshot of spotify-this-song default](/assets/spotifyDefault.PNG)

#### Movie Search
To search for information about a movie, use the `movie-this` command followed by the title of the movie.  The movie title, release year, IMDB and Rotten Tomatoes ratings, country of production, language, plot, and main actors will be retrieved. 

For example, typing `node liri.js movie-this the lion king` will retrieve information about "The Lion King."
![Screenshot of movie-this command](/assets/movieThis.PNG)

If a movie title is not entered, information for the movie "Up" will be retrieved.
![Screenshot of movie-this default](/assets/movieDefault.PNG)

#### External File Search
The command `do-what-it-says` will read the content of an external file named random.txt.  Whatever is written in that file will be executed.

For example, if random.txt says `spotify-this-song,"I Want it That Way"`, the output will be as shown below.
![Screenshot of do-what-it-says case 1](/assets/random1.PNG)

If random.txt says `movie-this, toy story`, the output will be as shown below.
![Screenshot of do-what-it-says case 2](/assets/random2.PNG)

If random.txt says `concert-this, morgan heritage`, the output will be as shown below.
![Screenshot of do-what-it-says case 3](/assets/random3.PNG)

### Technical Information
This app was made using Node.js with the following packages:
* axios 0.19.2
* chalk 4.0.0
* dotenv 8.2.0
* figlet 1.4.0
* moment 2.24.0
* node-spotify-api 1.1.1

API keys are stored in a .env file that is not uploaded to GitHub in order to maintain security.  Keys are read into the liri.js file from the .env file via the keys.js file.

The following APIs are used:
* [Bands in Town for Artists API](https://www.artists.bandsintown.com/login)
* [Node Spotify API](https://developer.spotify.com/dashboard/)
* [OMBb API](http://www.omdbapi.com/)


