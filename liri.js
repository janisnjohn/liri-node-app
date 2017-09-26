var fs = require("fs");
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var client = new Twitter ({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret	
});

var spotify = new Spotify({
  id: spotifyKeys.client_id,
  secret: spotifyKeys.client_secret
});

var action = process.argv[2];
var value = "";
var nodeArgs = process.argv;
var queryURL ="";

for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the value.
  value = value + " " + nodeArgs[i];
}


switch (action) {
	case "my-tweets":
	tweets();
	break;

	case "spotify-this-song":
	songs();
	break;

	case "movie-this":
	movie();
	break;

	case "do-what-it-says":
	says();
	break;
}
// writing function for tweets.
function tweets(){
	var params = {screen_name: 'johnnelsonlee'};
	client.get("statuses/user_timeline", params, function(err, tweets, response){
			if (err){
				console.log(err);
			} else {
				for (var key in tweets){
					console.log(tweets[key].text);
				}
			}
		});
	}
// writing function for songs

function songs(){

spotify
  .search({ type: 'track', query: value })
  .then(function(response) {	
  	var obj = response.tracks.items;
  	value = value.trim();
  	if (obj[0].name = value){
  	console.log("Artist(s): " + obj[0].artists[0].name);
  	console.log("The song's name: " + obj[0].name);
	for (var key in obj[0].artists[0].external_urls) {
	console.log("A preview link of the song from Spotify: " + obj[0].artists[0].external_urls[key]);
}
  	console.log("The album that the song is from: " + obj[0].album.name);
	} else{
		console.log("Sorry, no matches found");
	}
  })
  .catch(function(err) {
    console.log(err);
  });
    	}

function movie(){

	if (value === ""){
	queryURL = "http://www.omdbapi.com/?t=Mr.NoBody&apikey=40e9cece";
	console.log("this works" + value);
	movieOut();
	} else {
	queryURL = "http://www.omdbapi.com/?t=" + value +"&apikey=40e9cece";
	movieOut();
}

function movieOut(){
	request(queryURL, function(err, response, body){
		if (err) {
			console.log(err);
		}else {
   // * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Rotten Tomatoes Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			var rotten = JSON.parse(body).Ratings
			for (var key in rotten){
				if (rotten[key].Source === "Rotten Tomatoes"){
				console.log("Rotten Tomato Rating: " + rotten[key].Value);
				}
			}
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Languages: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);				
			}
		});
	}
}
		
function says(){
fs.readFile("random.txt", "utf-8", function(err, data){
	if (err){
		return console.log(err);
	}
	var output = data.split(",");
		for (var i=0; i<output.length; i++){
		}
	action = output[0];
	// console.log(output[0]);
	value = output[1];
	// console.log(output[1]);
	songs();

	});
}
