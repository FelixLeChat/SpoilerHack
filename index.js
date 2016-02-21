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
var AccessToken = "2985068194-snwpcRuZIl34Z52Rf4IzHXlhagO4vCBu4FgVLVa";
var AccessSecret = "nsOFR4Nj2gnkCeozw9Q9CvwjKLUbjmT6BP1HMN5EXZ2yi";

var request = require('request'),
    url = "https://api.twitter.com/1.1/search/tweets.json?q=",
    auth = "Bearer " + AccessToken;


wss.on('connection', function connection(ws) {
  console.log("User connected");
  ws.on('message', function incoming(message) 
  { 
    console.log("Message received");
    /*var idsObj = JSON.parse(message);
    var ids = message.ids;
    var query = ids[0];

    for (var i = ids.length - 1; i >= 0; i--) {
      ids[i]
    };*/

    request(
        {
            url : url + "%40twitterapi",
            headers : {
                "Authorization" : auth
            }
        },
        function (error, response, body) {
            ws.send(JSON.stringify(error + response + body));
            console.log(error + response + body);
        }
    );

    // On Message
    /*console.log("Message : "+ message);
    wss.clients.forEach(function each(client) 
    {
      client.send(JSON.stringify(message));
    });*/
  });

});


// Query twitter and send result to all
/*setInterval(function()
{
    wss.clients.forEach(function each(client) 
    {
      client.send(JSON.stringify("New tweets"));
    });
}, 1000);*/