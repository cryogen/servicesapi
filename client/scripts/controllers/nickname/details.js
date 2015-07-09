/*global angular */

'use strict';

angular.module('services')
.controller('NicknameDetailsController', function($scope, $http, $routeParams) {
    $scope.getNickname = function() {
        $http.get('/api/nickname/' + ($routeParams.name || '')).success(function(data) {
            $scope.nickname = data;
        });
    };

    $scope.getNickname();

    $scope.$emit('sidebarmenu', []);
});
