'use strict';

var restify = require('restify');
var fs = require('fs');
var config = require('./config.js');

var controllers = require('./controllers');
var middleware = require('./middleware.js');

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

function logRequests(req, res, next) {
    console.info('Request: from: ', req.connection.remoteAddress + ' to: ' + req.path());

    return next();
}

server.use(logRequests);

server.use(restify.bodyParser());
server.use(middleware.checkAuthorised);

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

server.listen(config.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
