/*global angular */

'use strict';

angular.module('services').factory('Account', function() {
    return {
        getMenu: function() {
            return [
            {
                name: 'Details',
                path: '/account'
            },
            {
                name: 'Nicknames',
                path: '/account/nicknames'
            },
            {
                name: 'Certificates',
                path: '/account/certificates'
            }];
        }
    };
});
