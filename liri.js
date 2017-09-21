var fs = require("fs");
var keys = require("./keys");
var Twitter = require('twitter');

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var client = new Twitter ({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret	
});

var action = process.argv[2];
var value = process.argv[3];

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


// function songs(){
// 	fs.readFile("random.txt", ", "+ value, function(err, data){
// 		if (err){
// 			return console.log(err);
// 		}

// console.log("Artist(s): " + data.);
// console.log("The song's name: " + data);
// console.log("A preview link of the song from Spotify: " + data.);
// console.log("The album that the song is from: " + data.);
// 	}

// }

// function movie(){


// }

// function says(){

// }