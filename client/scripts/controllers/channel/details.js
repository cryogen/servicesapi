/*global angular, window */

'use strict';

angular.module('services')
.controller('ChannelDetailsController', function($scope, $http, $routeParams, Channel) {
    $scope.getChannel = function() {
        var name = '';

        if($routeParams.name) {
            name = window.encodeURIComponent($routeParams.name);
        }

        $http.get('/api/channel/' + name).success(function(data) {
            $scope.channel = data;
            $scope.loaded = true;

            $scope.$emit('sidebarmenu', $scope.loaded ? Channel.getMenu() : []);
        });
    };

    $scope.getChannel();
});
