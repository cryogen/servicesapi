/*global angular */

'use strict';

angular.module('services').controller('LoginController', function($scope, $http, $localStorage, $location) {
    $scope.authenticate = function() {
        $http.post('/authenticate', {
            nickname: $scope.nickname,
            password: $scope.password
        })
        .success(function(res) {
            if(res.error) {
                $scope.errorMessage = res.error;
            }
            else {
                $scope.errorMessage = undefined;
            }

            $localStorage.token = res.token;
            $location.path('/account/' + res.id);
        });
    };
});
