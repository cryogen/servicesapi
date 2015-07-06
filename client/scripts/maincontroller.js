/*global angular */

'use strict';

var servicesApp = angular.module('services', ['ngRoute', 'ngResource', 'ngStorage']);

servicesApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'MainController'
    })
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    })
    .when('/account/:id', {
        templateUrl: 'account.html',
        controller: 'AccountController'
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
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
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
});

servicesApp.controller('MainController', function() {
});
