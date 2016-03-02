var restify = require('restify');
var fs = require('fs');
var handlers = require('./route_handlers.js');

const DEFAULT_PORT = 8989;

var server = restify.createServer({
    certificate: fs.readFileSync('./certs/fullchain.pem'),
    key: fs.readFileSync("./certs/privkey.pem"),
    name: 'spoilerhax'
});
server.use(restify.bodyParser()); // At the moment, we only need to parse the body
//server.use(restify.queryParser());
server.use(restify.gzipResponse()); // why not

// That's the only route we need!
server.post('/is-spoiler', handlers.predict_one);

server.listen(DEFAULT_PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
