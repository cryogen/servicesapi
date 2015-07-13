/*global angular, window */

'use strict';

angular.module('services')
.controller('AccountChannelsController', function($scope, $http, $routeParams, Account) {
    $scope.getChannels = function() {
        $http.get('/api/account/' + ($routeParams.id || '') + '/channels').success(function(data) {
            $scope.channels = data;
        });
    };

    $scope.getChannels();

    $scope.$emit('sidebarmenu', Account.getMenu());
});

angular.module('services').filter('chanaccess', function() {
    return function(input) {
        switch(input) {
            case 2:
                return 'Member';
            case 3:
                return 'ChanOp';
            case 4:
                return 'Master';
        }
    };
});

angular.module('services').filter('urlEncode', [function() {
    return window.encodeURIComponent;
}]);
