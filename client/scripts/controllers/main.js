/*global angular */

'use strict';

var servicesApp = angular.module('services', ['ngRoute', 'ngResource', 'ngStorage']);

servicesApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .when('/404', {
        templateUrl: '404.html',
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
    .when('/account/:id?/nicknames', {
        templateUrl: 'nicknames.html',
        controller: 'AccountNicknamesController'
    })
    .when('/account/:id?/certificates', {
        templateUrl: 'certificates.html',
        controller: 'AccountCertificatesController'
    })
    .when('/account/:id?', {
        templateUrl: 'account.html',
        controller: 'AccountIndexController'
    })
    .when('/nickname/:name', {
        templateUrl: 'nickname/details.html',
        controller: 'NicknameDetailsController'
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
                    else if(response.status === 404) {
                        $location.path('/404');
                    }
                    return $q.reject(response);
                }
            };
        });
});

servicesApp.controller('MainController', function($scope, $localStorage, $location) {
    if($localStorage.token) {
        $scope.loggedIn = true;
    }

    $scope.menu = [];

    $scope.$on('tokenChanged', function() {
        if($localStorage.token) {
            $scope.loggedIn = true;
        }
        else {
            $scope.loggedIn = false;
        }
    });

    $scope.$on('sidebarmenu', function(event, menu) {
        $scope.menu = menu;
    });

    $scope.isActive = function(path, exact) {
        var locationPath = $location.path();
        var useExactMatch = exact || false;

        if (path === locationPath) {
            return true;
        }
        else if(useExactMatch) {
            return false;
        }

        if(locationPath.length === 1 || path.length === 1) {
            return false;
        }

        if(locationPath.substr(0, path.length) === path) {
            return true;
        }
        else {
            return false;
        }
    };
});
