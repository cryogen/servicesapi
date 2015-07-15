'use strict';

var jwt = require('jsonwebtoken');
var config = require('./config.js');
var restify = require('restify');

exports.checkAuthorised = function(req, res, next) {
    if (req.authorization) {
        jwt.verify(req.authorization.credentials, config.tokenSecret, function(err, decoded) {
            if(err) {
                return next();
            }

            req.token = req.authorization.credentials;
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
        return next(new restify.ForbiddenError());
    }

    return next();
};
