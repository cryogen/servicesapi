/*global angular */

'use strict';

angular.module('services').controller('AccountController', function($scope, $http, $routeParams) {
    $http.get('/account/' + $routeParams.id).success(function(data, status) {
        $scope.account = data;
    });
});
