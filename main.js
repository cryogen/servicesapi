'use strict';

var restify = require('restify');
var pg = require('pg');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var conString = 'postgres://postgres:postgres@localhost/postgres';

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
                            [req.body.nickname], function(result) {
                                if(result.length === 0) {
                                    res.json({ error: 'Invalid username/password' });
                                    next();
                                    return;
                                }
                                var shasum = crypto.createHash('sha1');
                                shasum.update(req.body.password + result[0].salt);
                                if(shasum.digest('hex') !== result[0].password) {
                                    res.json({ error: 'Invalid username/password' });
                                    next();
                                    return;
                                }

                                var nickname = {
                                    id: result[0].id,
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
        req.token = bearerToken;

        console.info(req.token);
        next();
    }
    else {
        res.send(403);
    }
}

function accountGet(req, res, next) {
    res.send('hi');
    next();
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.post('/authenticate/', authenticate);
server.get('/account/:id', ensureAuthorised, accountGet);
server.get('\/.*', restify.serveStatic({
    'directory': './client',
    'default': 'index.html'
}));

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
