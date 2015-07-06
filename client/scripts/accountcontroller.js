/*global angular */

'use strict';

angular.module('services').controller('AccountController', function($scope, $http, $routeParams) {
    $scope.account = $http.get('/account/' + $routeParams.id);
});
