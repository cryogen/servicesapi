'use strict';

var channelRepository = require('../channelrepository.js');

function addPrivateProperties(channel, result) {
    channel.topic = result.topic;
    channel.entryMessage = result.entrymsg;
    channel.modeLock = result.mlock;

    return channel;
}

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
            lastUsed: result.last_used,
            private: result.flag_private,
            restricted: result.flag_restricted,
            topicLock: result.flag_topic_lock,
            verbose: result.flag_verbose,
            autoLimit: result.flag_autolimit,
            expireBans: result.flag_expirebans,
            floodserv: result.flag_floodserv,
            autoOp: result.flag_autoop,
            autoVoice: result.flag_autovoice,
            leaveOps: result.flag_leaveops,
            autoSave: result.flag_autosave
        };

        if(!req.authObject) {
            return res.send(channel);
        }

        if(req.authObject.admin) {
            channel = addPrivateProperties(channel, result);

            return res.send(channel);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                channel = addPrivateProperties(channel, result);
            }

            return res.send(channel);
        });
    });
}

function channelAccessList(req, res) {
    channelRepository.getAccessList('#' + req.params.name, function(result) {
        if(!result || !req.authObject) {
            return res.send(404);
        }

        if(req.authObject.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.send(result);
            }

            return res.send(404);
        });
    });
}

function channelAkickList(req, res) {
    channelRepository.getList('#' + req.params.name, 0, function(result) {
        if(!result || !req.authObject) {
            return res.send(404);
        }

        if(req.authObject.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.send(result);
            }

            return res.send(404);
        });
    });
}

function channelQuietList(req, res) {
    channelRepository.getList('#' + req.params.name, 4, function(result) {
        if(!result || !req.authObject) {
            return res.send(404);
        }

        if(req.authObject.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.send(result);
            }

            return res.send(404);
        });
    });
}

function channelInvexList(req, res) {
    channelRepository.getList('#' + req.params.name, 2, function(result) {
        if(!result || !req.authObject) {
            return res.send(404);
        }

        if(req.authObject.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.send(result);
            }

            return res.send(404);
        });
    });
}

function channelExceptList(req, res) {
    channelRepository.getList('#' + req.params.name, 3, function(result) {
        if(!result || !req.authObject) {
            return res.send(404);
        }

        if(req.authObject.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.send(result);
            }

            return res.send(404);
        });
    });
}

module.exports.init = function(server) {
    server.get('/api/channel/:name', channelGet);
    server.get('/api/channel/:name/access', channelAccessList);
    server.get('/api/channel/:name/akicks', channelAkickList);
    server.get('/api/channel/:name/quiets', channelQuietList);
    server.get('/api/channel/:name/invexes', channelInvexList);
    server.get('/api/channel/:name/excepts', channelExceptList);
};
