'use strict';

/* Controllers */

angular.module('shiftagentMeters.controllers', [])
    .controller('HomeCtrl', ['$scope', '$rootScope', 'syncData', '$timeout', 'loginService', function ($scope, $rootScope, syncData, $timeout, loginService) {
      $rootScope.auth.$getCurrentUser().then(function(user) {
        $scope.currentUser = user;
      });

      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function (cb) {
        $scope.err = null;

        loginService.login(function (err, user) {
          $scope.err = err ? err + '' : null;
          if (!err) {
            cb && cb(user);
          }
        });
      };

      $scope.logout = function () {
        console.log('logout');
        loginService.logout();
      };

      syncData('meters').$bind($scope, 'meters');


      syncData('users').$bind($scope, 'users').then(function() {
        $scope.angucompleteUsers = _.map($scope.users, function(u) {
          return u;
        });
      });

      var initNewMeter = function() {
        $scope.newMeter = {
          name: '',
          value: 0,
          subject: '',
          active: true
        };

        $scope.selectedEmployee = null;
      };

      initNewMeter();

      $scope.createMeter = function() {
        if ($scope.newMeter.name) {
          console.log($scope.meters);
          $scope.meters.$add($scope.newMeter);
          console.log($scope.newMeter);
          initNewMeter();
        }
      };

      $scope.removeMeter = function(meterId) {
        $scope.meters.$remove(meterId);
      };

      $scope.changeMeterValue = function(meter, num) {
        if (meter) {
          if (!meter.value) {
            meter.value = num;
          } else {
            meter.value += num;
          }
        }
      };

      $scope.$watch('selectedEmployee', function(emp) {
        if (emp) {
          console.log(emp.originalObject.uid);
          $scope.newMeter.subject = emp.originalObject.uid;
          console.log($scope.newMeter);
        }
      });
    }]);