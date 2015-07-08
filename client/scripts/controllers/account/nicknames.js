/*global angular */

'use strict';

angular.module('services')
.controller('AccountNicknamesController', function($scope, $http, $routeParams, Account) {
    $scope.getNicknames = function() {
        $http.get('/api/account/' + ($routeParams.id || '') + '/nicknames').success(function(data) {
            $scope.nicknames = data;
        });
    };

    $scope.getNicknames();

    $scope.$emit('sidebarmenu', Account.getMenu());
});
