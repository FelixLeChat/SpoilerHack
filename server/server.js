var restify = require('restify');
var handlers = require('./route_handlers.js');

const DEFAULT_PORT = 3000;

var server = restify.createServer();
server.use(restify.bodyParser()); // At the moment, we only need to parse the body
//server.use(restify.queryParser());
server.use(restify.gzipResponse()); // why not

// That's the only route we need!
server.post('/is-spoiler', handlers.predict_one);

server.listen(DEFAULT_PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
