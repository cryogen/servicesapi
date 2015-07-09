/*global angular */

'use strict';

angular.module('services')
.controller('AccountCertificatesController', function($scope, $http, $routeParams, Account) {
    $scope.getCertificates = function() {
        $http.get('/api/account/' + ($routeParams.id || '') + '/certificates').success(function(data) {
            $scope.certificates = data;
        });
    };

    $scope.getCertificates();

    $scope.$emit('sidebarmenu', Account.getMenu());
});
