/*global angular */

'use strict';

var servicesApp = angular.module('services', ['ngRoute', 'ngResource', 'ngStorage']);

servicesApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'MainController'
    })
    .when('/account/login', {
        templateUrl: 'login.html',
        controller: 'AccountLoginController'
    })
    .when('/account/logout', {
        template: ' ',
        controller: 'AccountLogoutController'
    })
    .when('/account/:id?', {
        templateUrl: 'account.html',
        controller: 'AccountIndexController'
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/account/login');
                    }
                    return $q.reject(response);
                }
            };
        });
});

servicesApp.controller('MainController', function($scope, $localStorage) {
    if($localStorage.token) {
        $scope.loggedIn = true;
    }

    $scope.$on('tokenChanged', function() {
        if($localStorage.token) {
            $scope.loggedIn = true;
        }
        else {
            $scope.loggedIn = false;
        }
    });
});
