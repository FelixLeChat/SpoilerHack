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
console.log("websocket server created")


// Twitter stuff
var AccessToken = "2985068194-snwpcRuZIl34Z52Rf4IzHXlhagO4vCBu4FgVLVa";
var AccessSecret = "nsOFR4Nj2gnkCeozw9Q9CvwjKLUbjmT6BP1HMN5EXZ2yi";

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) 
  { 
    // On Message
    wss.clients.forEach(function each(client) 
    {
      client.send(JSON.stringify(message));
    });
  });

});


// Query twitter and send result to all
/*setInterval(function()
{
    wss.clients.forEach(function each(client) 
    {
      client.send(JSON.stringify("New tweets"));
    });
}, 5000);*/