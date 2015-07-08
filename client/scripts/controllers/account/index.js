/*global angular */

'use strict';

angular.module('services').controller('AccountIndexController', function($scope, $http, $routeParams, Account) {
    $scope.getAccount = function() {
        $http.get('/api/account/' + ($routeParams.id || '')).success(function(data) {
            $scope.account = data;
        });
    };

    $scope.getAccount();
    $scope.$emit('sidebarmenu', Account.getMenu());
});
