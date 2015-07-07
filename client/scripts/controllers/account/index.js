/*global angular */

'use strict';

angular.module('services').controller('AccountIndexController', function($scope, $http, $routeParams) {
    $scope.getAccount = function() {
        $http.get('/api/account/' + ($routeParams.id || '')).success(function(data) {
            $scope.account = data;
        });
    };

    $scope.getAccount();
    $scope.$emit('sidebarmenu', [
        {
            name: 'Details',
            path: '/account'
        },
        {
            name: 'Nicknames',
            path: '/account/nicknames'
        },
        {
            name: 'Certificates',
            path: '/account/certificates'
        }
    ]);
});
