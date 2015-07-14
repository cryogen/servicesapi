'use strict';

var channelRepository = require('../channelrepository.js');

function channelGet(req, res) {
    channelRepository.getByName('#' + req.params.name, function(result) {
        if(!result) {
            return res.send(404);
        }

        if(!req.authObject && result.flag_private) {
            return res.send(404);
        }

        var channel = {
            name: result.channel,
            description: result.description,
            regTime: result.reg_time,
            email: result.email,
            lastUsed: result.last_used
        };

        if(!req.authObject) {
            return res.send(channel);
        }

        if(req.authObject.admin) {
            channel.topic = result.topic;
            channel.entryMessage = result.entrymsg;
            channel.modeLock = result.mlock;

            return res.send(channel);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                channel.topic = result.topic;
                channel.entryMessage = result.entrymsg;
                channel.modeLock = result.mlock;
            }

            return res.send(channel);
        });
    });
}

function channelAccessList(req, res) {
    channelRepository.getAccessList('#' + req.params.name, function(result) {
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
