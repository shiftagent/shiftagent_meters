'use strict';

/* Controllers */

angular.module('shiftagentMeters.controllers', [])
    .controller('HomeCtrl', ['$scope', '$rootScope', 'syncData', '$timeout', function ($scope, $rootScope, syncData, $timeout) {
      $rootScope.auth.$getCurrentUser().then(function(user) {
        $scope.currentUser = user;
      });

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
    }])

    .controller('ChatCtrl', ['$scope', 'syncData', function ($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function () {
        if ($scope.newMessage) {
          $scope.messages.$add({text: $scope.newMessage});
          $scope.newMessage = null;
        }
      };
    }])

    .controller('LoginCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {
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

      $scope.createAccount = function () {
        $scope.err = null;
        loginService.createAccount(function (err, user) {
          if (err) {
            $scope.err = err ? err + '' : null;
          }
          else {
            // must be logged in before I can write to my profile
            $scope.login(function () {
              loginService.createProfile(user.uid, user.email);
              $location.path('/account');
            });
          }
        });
      };
    }])

    .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function ($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.logout = function () {
        loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function () {
        $scope.err = null;
        $scope.msg = null;
      };

      $scope.updatePassword = function () {
        $scope.reset();
        loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
        return {
          email: $scope.auth.user.email,
          oldpass: $scope.oldpass,
          newpass: $scope.newpass,
          confirm: $scope.confirm,
          callback: function (err) {
            if (err) {
              $scope.err = err;
            }
            else {
              $scope.oldpass = null;
              $scope.newpass = null;
              $scope.confirm = null;
              $scope.msg = 'Password updated!';
            }
          }
        }
      }

    }]);