'use strict';

var accountRepository = require('../accountrepository.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var middleware = require('../middleware.js');

function accountLogin(req, res) {
    accountRepository.getByNick(req.params.nickname, function(result) {
        if(!result) {
            return res.json({ error: 'Invalid username or password' });
        }

        var shasum = crypto.createHash('sha1');
        shasum.update(req.params.password + result.salt);
        var hash = shasum.digest('hex').toUpperCase();

        if(hash !== result.password.toUpperCase()) {
            return res.json({ error: 'Invalid username or password' });
        }

        var nickname = {
            id: result.id + '',
            nickname: result.nick,
            email: result.email
        };

        nickname.token = jwt.sign(nickname, config.tokenSecret);

        return res.json(nickname);
    });
}

function accountGet(req, res) {
    if(!req.authObject) {
        return res.send(403);
    }

    var id = req.params.id || req.authObject.id;

    accountRepository.getById(id, function(result) {
        return res.json({
            cloak: result.cloak,
            email: result.email,
            lastHost: result.last_host,
            lastQuitMessage: result.last_quit_message,
            lastRealname: result.last_realname,
            regTime: result.reg_time
        });
    });
}

function accountNicknames(req, res) {
    if(!req.authObject) {
        return res.send(403);
    }

    accountRepository.getNicknames(req.authObject.id, function(result) {
        return res.json(result);
    });
}

function accountCertificates(req, res) {
    if(!req.authObject) {
        return res.send(403);
    }

    accountRepository.getCertificates(req.authObject.id, function(result) {
        return res.json(result);
    });
}

module.exports.init = function(server) {
    server.post('/api/account/login', accountLogin);
    server.get('/api/account/nicknames', middleware.ensureAuthorised, accountNicknames);
    server.get('/api/account/certificates', middleware.ensureAuthorised, accountCertificates);
    server.get('/api/account/:id', middleware.ensureAuthorised, accountGet);
};
