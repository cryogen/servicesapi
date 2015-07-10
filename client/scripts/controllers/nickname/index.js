/*global angular */

'use strict';

angular.module('services')
.controller('NicknameIndexController', function($scope, $http) {
    $scope.nick = '';
    $scope.nickname = undefined;

    $scope.search = function(nick) {
        $http.get('/api/nickname/' + nick).success(function(data) {
            $scope.nickname = data;
            $scope.loaded = true;
        }).error(function() {
        });
    };

    $scope.$emit('sidebarmenu', []);
});
