'use strict';

(function () {
    angular.module('app').controller('loginCtrl', function ($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
        $scope.signin = function (username, password) {
            mvAuth.authenticateUser(username, password).then(function (success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in!');
                    $location.path('/');
                } else {
                    mvNotifier.notify('Username/Password combination incorrect');
                }
            });
        };
    });
})();