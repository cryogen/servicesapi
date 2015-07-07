/*global angular */

'use strict';

angular.module('services').controller('AccountIndexController', function($scope, $http, $routeParams) {
    $scope.getAccount = function() {
        $http.get('/api/account/' + $routeParams.id).success(function(data) {
            $scope.account = data;
        });
    };

    $scope.getAccount();
});
