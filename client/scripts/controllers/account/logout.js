/*global angular */
'use strict';

angular.module('services').controller('AccountLogoutController', function($scope, $localStorage, $location) {
    $scope.logout = function() {
        delete $localStorage.token;
        $scope.$emit('tokenChanged', $localStorage.token);
        $location.path('/');
    };

    $scope.logout();
});
