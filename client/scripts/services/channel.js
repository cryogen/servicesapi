/*global angular, window */

'use strict';

angular.module('services').factory('Channel', function($routeParams) {
    return {
        getMenu: function() {
            var name = '';

            if($routeParams.name) {
                name = $routeParams.name;
            }

            return [
            {
                name: 'Details',
                path: '/channel/' + name
            },
            {
                name: 'Access List',
                path: '/channel/' + name + '/access'
            },
            {
                name: 'Auto Kick List',
                path: '/channel/' + name + '/akicks'
            },
            {
                name: 'Quiet List',
                path: '/channel/' + name + '/quiets'
            },
            {
                name: 'Invite Exception List',
                path: '/channel/' + name + '/invexes'
            },
            {
                name: 'Ban Exception List',
                path: '/channel/' + name + '/excepts'
            }];
        }
    };
});
