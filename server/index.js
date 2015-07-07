'use strict';

var restify = require('restify');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var controllers = require('./controllers');

function ensureAuthorised(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers.authorization;

    console.info('Request: from: ', req.connection.remoteAddress + ' to: ' + req.path());

    // XXX hardcoded path
    if(req.path().indexOf('/api/') === -1 || req.path() === '/api/account/login') {
        return next();
    }

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];

        jwt.verify(bearerToken, 'reallysecret', function(err, decoded) {
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
}

var server = restify.createServer();

server.on('uncaughtException', function(req, res, route, err) {
    return res.send(err.code || 500, {
        code: err.code || 500,
        errorDescription: err.status || err.message || err.description ||
        'Internal Server Error',
        reqBody: req.params,
        stack: err.stack
    });
});

server.use(restify.bodyParser());
server.use(ensureAuthorised);

controllers.init(server);

server.get('\/content/.*', restify.serveStatic({
    'directory': './client',
    'default': 'index.html'
}));

server.get('\/scripts/.*', restify.serveStatic({
    'directory': './client',
    'default': 'index.html'
}));

server.get('\/.*.html', restify.serveStatic({
    'directory': './client',
    'default': 'index.html'
}));

server.get('\/.*', function(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream('./client/index.html').pipe(res).on('finish', next);
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
