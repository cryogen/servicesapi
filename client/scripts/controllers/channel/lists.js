/*global angular */

'use strict';

angular.module('services')
.controller('ChannelListsController', function($scope, $http, $routeParams, Channel) {
    $scope.getListValues = function() {
        var name = '';

        if($routeParams.name) {
            name = $routeParams.name;
        }

        $http.get('/api/channel/' + name + '/' + $routeParams.list).success(function(data) {
            $scope.values = data;
            $scope.loaded = true;
        });
    };

    $scope.getListValues();

    $scope.$emit('sidebarmenu', Channel.getMenu());
});
