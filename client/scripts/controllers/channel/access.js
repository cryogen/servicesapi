/*global angular, window */

'use strict';

angular.module('services')
.controller('ChannelAccessController', function($scope, $http, $routeParams, Channel) {
    $scope.getAccessList = function() {
        var name = '';

        if($routeParams.name) {
            name = window.encodeURIComponent($routeParams.name);
        }

        $http.get('/api/channel/' + name + '/access').success(function(data) {
            $scope.accessList = data;
            $scope.loaded = true;
        });
    };

    $scope.getAccessList();

    $scope.$emit('sidebarmenu', Channel.getMenu());
});
