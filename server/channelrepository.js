'use strict';

var database = require('./database.js');

exports.getChannelsForAccount = function(id, callback) {
    var query = 'SELECT c.channel, ca.level ' +
                'FROM channel c ' +
                'INNER JOIN channel_access ca ON ca.channel_id = c.id ' +
                'INNER JOIN account a ON a.id = ca.account_id ' +
                'WHERE a.id = $1 ' +
                'ORDER BY c.channel';

    database.query(query, [id], function(result) {
        callback(result);
    });
};

exports.getByName = function(name, callback) {
    var query = 'SELECT id, channel, flag_private, flag_restricted, flag_topic_lock, ' +
                '   flag_verbose, flag_autolimit, flag_expirebans, flag_floodserv, ' +
                '   flag_autoop, flag_autovoice, flag_leaveops, flag_autosave, ' +
                '   description, url, email, entrymsg, topic, mlock, expirebans_lifetime, ' +
                '   reg_time, last_used ' +
                'FROM channel ' +
                'WHERE channel = $1';

    database.query(query, [name], function(result) {
        callback(result[0]);
    });
};

exports.getAccessList = function(name, callback) {
    var query = 'SELECT n.nick, ca.level ' +
                'FROM channel_access ca ' +
                'INNER JOIN account a ON ca.account_id = a.id ' +
                'INNER JOIN nickname n ON n.id = a.primary_nick ' +
                'INNER JOIN channel c ON c.id = ca.channel_id ' +
                'WHERE c.channel = $1 ' +
                'ORDER BY ca.level DESC';

    database.query(query, [name], function(result) {
        callback(result);
    });
};
