'use strict';

var channelRepository = require('../channelrepository.js');

function channelGet(req, res) {
    channelRepository.getByName(req.params.name, function(result) {
        if(!result) {
            return res.send(404);
        }

        if((req.authObject && req.authObject.admin) || !result.flag_private) {
            var channel = {
                name: result.channel,
                description: result.description,
                topic: result.topic,
                entryMessage: result.entrymsg,
                modeLock: result.mlock,
                regTime: result.reg_time,
                email: result.email,
                lastUsed: result.last_used
            };

            return res.send(channel);
        }

        return res.send(404);
    });
}

function channelAccessList(req, res) {
    channelRepository.getAccessList(req.params.name, function(result) {
        if(!result) {
            return res.send(404);
        }

        if(req.authObject) {
            return res.send(result);
        }

        return res.send(404);
    });
}

module.exports.init = function(server) {
    server.get('/api/channel/:name', channelGet);
    server.get('/api/channel/:name/access', channelAccessList);
};
