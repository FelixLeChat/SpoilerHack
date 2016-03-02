var request = require('request');

module.exports = {
    predict_one: predict_one
};

const THRESHOLD = 0.35; // This is determined after having trained the model.
const MLDB_ADDRESS = 'http://localhost:8080';

/**
 * Route handler that calls the mldb api properly and clean up the response to return true or false instead
 * of a score weirdly formated.
 */
function predict_one(req, res, next) {
    var param = JSON.stringify(req.body);
    var path = MLDB_ADDRESS+"/v1/functions/spoiler_classifier_api/application?input="+param;
    request(path, function(error, response, body) {
        var output  = JSON.parse(body).output;
        var score = output[Object.keys(output)[0]][0][1][0]; // Yeah, the score gives a pretty ugly response
        var classification = score > THRESHOLD; // If the score is greater then the threshold => its a spoiler
        res.send(classification);
    });
    next();
}
