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
