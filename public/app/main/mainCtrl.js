'use strict';

(function () {
    angular.module('app').controller('mainCtrl', function ($scope, mvAuth, mvNotifier, $location, mvIdentity) {
        $scope.identity = mvIdentity;

        $scope.signout = function () {
            mvAuth.logoutUser().then(function () {
                $scope.username = "";
                $scope.password = "";
                mvNotifier.notify('You have successfully signed out!');
                $location.path('/');
            });
        };
    });
})();