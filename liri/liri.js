require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keysTokens = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var spotify = new Spotify(keysTokens.spotify);
var client = new Twitter(keysTokens.twitter);


var liriCommand = process.argv[2];
var media = process.argv.slice(3).join(" ");

var tweetsLog = function (media) {
    var params = { "Eduardo84901572": 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            console.log("\n----------- TWEETS!! -----------\n");
            var i = 0;
            while (i < 20) {
                console.log("Tweet: " + tweets[i].text + ". Created on: " + tweets[i].created_at);
                i++;
            }
            console.log("\n----------- END OF TWEETS! -----------\n");
        }
    });
};
var spotifying = function (media) {
    spotify.search({ type: 'track', query: media, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items); 
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("\n-----------ONE RESULT---------------\n");
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song's name: " + data.tracks.items[i].name);
            console.log("Link (from Spotify): " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("\n-----------END OF RESULT---------------\n");
        }
    });
};
var omDB = function (media) {
    var queryUrl = "http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl)
        .then(function (response) {
            console.log("\n---------- MOVIE RESULT ----------");
            // console.log(response.data);
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("---------- END OF MOVIE RESULT ----------\n");

        })
        .catch(function (err) {
            console.error(err);
        })
};
var obey = function () {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            var array = data.split(",");
            liriCommand = array[0];
            media = array[1];
            if (array[0] === "my-tweets") {
                tweetsLog(array[1]);
            }
            else if (array[0] === "spotify-this-song") {
                spotifying(array[1]);
            }
            else if (array[0] === "movie-this") {
                omDB(array[1]);
            }
        }
    });
}
var appends = function (liriCommand, media) {
    fs.appendFile("./log.txt", liriCommand + ": " + media + ", ", function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("info added to log.txt");
        }
    });
};
if (liriCommand === "my-tweets" && !media) {
    tweetsLog(media);
    appends(liriCommand, media);
}
else if (liriCommand === "spotify-this-song") {
    if (!media) {
        spotify.search({ type: 'album', query: 'The Sign', limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data);
            console.log("\n---------\You Forgot to type in a song, so we recommend this classic---------");
            console.log("Artist: " + data.albums.items[3].artists[0].name);
            console.log("Album's name: " + data.albums.items[3].name);
            console.log("Link (from Spotify): " + data.albums.items[3].external_urls.spotify);
            console.log("----------------------------------------------------------------------------\n");
        });
    }
    else {
        spotifying(media);
        appends(liriCommand, media);
    }
}
else if (liriCommand === "movie-this") {
    if (!media) {
        omDB("Mr.Nobody");
    }
    else {
        omDB(media);
        appends(liriCommand, media);
    }
}
else if (liriCommand === "do-what-it-says") {
    obey();
    appends(liriCommand, media);
}
