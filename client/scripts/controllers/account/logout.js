/*global angular */
'use strict';

angular.module('services').controller('AccountLogoutController', function($scope, $localStorage) {
    $scope.logout = function() {
        delete $localStorage.token;
        $scope.$emit('tokenChanged', $localStorage.token);
    };

    $scope.logout();
});
