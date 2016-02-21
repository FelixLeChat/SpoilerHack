var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created ???")

// Twitter stuff
//var Twitter = require('twitter');
 
/*var client = new Twitter({
  consumer_key: 'WxX5Ko3tcueI0Wn4gChWwGoe4',
  consumer_secret: 'kADoUdCOKQibcTIMDypY2Q3kLxOqWwYGYbcaiNHRuymAIDJ5pb',
  access_token_key: '2985068194-snwpcRuZIl34Z52Rf4IzHXlhagO4vCBu4FgVLVa',
  access_token_secret: 'nsOFR4Nj2gnkCeozw9Q9CvwjKLUbjmT6BP1HMN5EXZ2yi'
});
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
   for (var i = tweets.statuses.length - 1; i >= 0; i--) {
     console.log(tweets.statuses[i].text);
   };
});*/


wss.on('connection', function connection(ws) {
  console.log("User connected");
  ws.on('message', function incoming(message) 
  { 

  });

});