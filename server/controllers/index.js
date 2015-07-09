'use strict';

var account = require('./account.js');
var nickname = require('./nickname.js');

module.exports.init = function(server) {
    account.init(server);
    nickname.init(server);
};
