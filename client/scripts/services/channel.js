/*global angular, window */

'use strict';

angular.module('services').factory('Channel', function($routeParams) {
    return {
        getMenu: function() {
            var name = '';

            if($routeParams.name) {
                name = window.encodeURIComponent($routeParams.name);
            }

            return [
            {
                name: 'Details',
                path: '/channel/' + name
            },
            {
                name: 'Access List',
                path: '/channel/' + name + '/access'
            }];
        }
    };
});
