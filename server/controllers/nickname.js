'use strict';

var nicknameRepository = require('../nicknamerepository.js');

function nicknameGet(req, res) {
    nicknameRepository.getByName(req.params.name, function(result) {
        if(!result) {
            return res.send(404);
        }

        var nick = {
            nick: result.nick,
            lastHost: result.last_host,
            lastRealname: result.last_realname,
            lastQuitMessage: result.last_quit_msg,
            lastQuitTime: result.last_quit_time,
            regTime: result.reg_time
        };

        if(!result.flag_private) {
            nick.email = result.email;
        }

        res.send(nick);
    });
}

module.exports.init = function(server) {
    server.get('/api/nickname/:name', nicknameGet);
};
