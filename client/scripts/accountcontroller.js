/*global angular */

'use strict';

angular.module('services').controller('AccountController', function($scope, $http, $routeParams) {
    $http.get('/api/account/' + $routeParams.id).success(function(data) {
        $scope.account = data;
    });
});
