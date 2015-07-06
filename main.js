'use strict';

var restify = require('restify');
var pg = require('pg');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var conString = 'postgres://ircservices:ircservices@localhost/ircservices';

function sendQuery(query, params, callback) {
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(query, params, function(err2, result) {
            done();

            if(err2) {
                return console.error('error running query', err2);
            }

            callback(result.rows);
        });
    });
}

function authenticate(req, res, next) {
    sendQuery('SELECT * FROM nickname n JOIN account a on a.primary_nick = n.id WHERE n.nick = $1',
              [req.body.nickname],
              function(result) {
                if(result.length === 0) {
                    res.json({ error: 'Invalid username/password' });
                    next();
                    return;
                }

                var shasum = crypto.createHash('sha1');
                shasum.update(req.body.password + result[0].salt);
                var hash = shasum.digest('hex').toUpperCase();
                if(hash !== result[0].password.toUpperCase()) {
                    res.json({ error: 'Invalid username/password' });
                    next();
                    return;
                }

                var nickname = {
                    id: result[0].id + '',
                    nickname: result[0].nick,
                    email: result[0].email
                 };

                nickname.token = jwt.sign(nickname, 'reallysecret');

                res.json(nickname);

                next();
            });
}

function ensureAuthorised(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];

        jwt.verify(bearerToken, 'reallysecret', function(err, decoded) {
            if(err) {
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

function accountGet(req, res, next) {
    if(!req.authObject) {
        console.warn('no auth object');
        res.send(403);
        return;
    }

    if(req.params.id !== req.authObject.id) {
        console.warn('ids didnt match : "' + req.params.id + '"' + ' "' + req.authObject.id + '"');
        res.send(403);
        return;
    }

    sendQuery('SELECT email, cloak, last_host as lastHost, last_quit_msg as lastQuitMessage, last_realname as lastRealname, reg_time as regTime FROM account WHERE id = $1', [req.params.id], function(result) {
        res.json(result[0]);
        next();
    });
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.post('/api/authenticate/', authenticate);
server.get('/api/account/:id', ensureAuthorised, accountGet);
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
