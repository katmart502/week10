var app = (function () {
    var client = require("./keys.js"),
        response = require("request-promise");
//get the tweet function started
    var tweet = function () {
        var params = {
            screen_name: 'POTUS',
            count: 20
        }

        client.key.get('statuses/user_timeline', params, function(error, tweets, response){
            for (var i = 0; i < tweets.length; i++){
                console.log((i+1) + "-" + tweets[i].text.replace('@_', ' '));
                console.log("________________________________________");
                console.log("________________________________________");
            }
        });
    }
//start of movie retrieval
    var movie = function (name) {
        console.log("name: " + name);
        var promise = response("http://www.omdbapi.com/?t=" + name + "&type=movie");

        promise.then(function(data){
            console.log(data.Title);
            console.log(data.Year);
            console.log(data.Rated);
            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);
            console.log(data.Ratings.Value);
        })
        .catch(function(err){
            console.log(err.message);
        });
    }

    return{
        tweet: tweet,
        movie: movie
    }
})();

switch(process.argv[2]){
    case 'my-tweets':
        app.tweet();
        break;
    case 'movie-this':
        app.movie(process.argv[3]);
        break;
}






