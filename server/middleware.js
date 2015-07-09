'use strict';

var jwt = require('jsonwebtoken');
var config = require('./config.js');

exports.ensureAuthorised = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];

        jwt.verify(bearerToken, config.tokenSecret, function(err, decoded) {
            if(err) {
                console.info(err);
                res.send(403);
                return;
            }

            req.token = bearerToken;
            req.authObject = decoded;
            next();
        });
    }
    else {
        res.send(403);
    }
};
