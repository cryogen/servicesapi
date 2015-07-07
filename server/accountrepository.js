var pg = require('pg');

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

exports.getByNick = function(nick, callback) {
    var query = 'SELECT a.id, a.primary_nick, a.password, a.salt, a.url, ' +
                '   a.email, a.cloak, a.flag_enforce, a.flag_secure, ' + 
                '   a.flag_verified, a.flag_cloak_enabled, a.flag_admin, ' +
                '   a.flag_email_verified, a.flag_private, a.language, ' +
                '   a.last_host, a.last_realname, a.last_quit_msg, ' + 
                '   a.last_quit_time, a.reg_time ' +
                'FROM account a ' +
                'INNER JOIN nickname n ON a.id = n.account_id ' +
                'WHERE n.nick = $1';

    sendQuery(query, [nick], function(result) {
              if(result.length === 0) {
                  return callback(undefined);
              }

              callback(result[0]);
              });
}

exports.getById = function(id, callback) {
    var query = 'SELECT a.id, a.primary_nick, a.password, a.salt, a.url, ' +
                '   a.email, a.cloak, a.flag_enforce, a.flag_secure, ' + 
                '   a.flag_verified, a.flag_cloak_enabled, a.flag_admin, ' +
                '   a.flag_email_verified, a.flag_private, a.language, ' +
                '   a.last_host, a.last_realname, a.last_quit_msg, ' + 
                '   a.last_quit_time, a.reg_time ' +
                'FROM account a ' +
                'WHERE a.id = $1';

    sendQuery(query, [id], function(result) {
        if(result.length === 0) {
            return callback(undefined);
        }

        callback(result[0]);
    });
}
