'use strict';

var servicesApp = angular.module('services', ['ngRoute', 'ngResource', 'ngStorage']);

servicesApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'MainController'
    })
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    });

    $locationProvider.html5Mode(true);
});

servicesApp.controller('MainController', function() {
});
