'use strict';

var jwt = require('jsonwebtoken');
var config = require('./config.js');

exports.checkAuthorised = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];

        jwt.verify(bearerToken, config.tokenSecret, function(err, decoded) {
            if(err) {
                return next();
            }

            req.token = bearerToken;
            req.authObject = decoded;
            return next();
        });
    }
    else {
        return next();
    }
};

exports.ensureAuthorised = function(req, res, next) {
    if(!req.authObject) {
        return res.send(403);
    }

    return next();
};
