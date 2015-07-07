'use strict';

var accountRepository = require('../accountrepository.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

function accountLogin(req, res) {
    accountRepository.getByNick(req.body.nickname, function(result) {
        if(!result) {
            return res.json({ error: 'Invalid username or password' });
        }

        var shasum = crypto.createHash('sha1');
        shasum.update(req.body.password + result.salt);
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

    if(req.params.id !== req.authObject.id) {
        req.params.id = req.authObject.id;
    }

    accountRepository.getById(req.params.id, function(result) {
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

module.exports.init = function(server) {
    server.post('/api/account/login', accountLogin);
    server.get('/api/account/:id', accountGet);
};