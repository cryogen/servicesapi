/*global angular */

'use strict';

angular.module('services').controller('AccountLoginController',
function($scope, $http, $localStorage, $location) {
    $scope.login = function() {
        $http.post('/api/account/login', {
            nickname: $scope.nickname,
            password: $scope.password
        })
        .success(function(res) {
            if(res.error) {
                $scope.errorMessage = res.error;
            }
            else {
                $scope.errorMessage = undefined;
                $localStorage.token = res.token;
                $scope.$emit('tokenChanged', res.token);
                $location.path('/account/' + res.id);
            }
        });
    };
});
