/*global angular */

'use strict';

angular.module('services')
.controller('NicknameIndexController', function($scope, $location) {
    $scope.nick = '';

    $scope.search = function(nick) {
        $location.path('/nickname/' + nick);
    };

    $scope.$emit('sidebarmenu', []);
});
