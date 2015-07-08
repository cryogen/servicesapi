/*global angular */

'use strict';

angular.module('services').controller('HomeController', function($scope) {
    $scope.$emit('sidebarmenu', []);
});
