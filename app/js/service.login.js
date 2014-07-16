angular.module('shiftagentMeters.service.login', ['firebase', 'shiftagentMeters.service.firebase'])

.factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', 'profileCreator', '$timeout', 'allowedGithubUsers',
  function($rootScope, $firebaseSimpleLogin, firebaseRef, profileCreator, $timeout, allowedGithubUsers) {
    var auth = null;
    return {
      init: function() {
        return auth = $firebaseSimpleLogin(firebaseRef());
      },

      /**
       * @param {string} email
       * @param {string} pass
       * @param {Function} [callback]
       * @returns {*}
       */
      login: function(callback) {
        assertAuth();
        auth.$login('github').then(function(user) {
          console.log(user);

          if (_.contains(allowedGithubUsers, user.username)) {

            firebaseRef('users/' + user.uid).set({
              username: user.username,
              displayName: user.displayName,
              uid: user.uid,
              id: user.id,
              avatar_url: user.avatar_url
            }, function(err) {
              if (!err) {
                $rootScope.$broadcast('$firebaseSimpleLogin:login');
                if (callback) {
                  //todo-bug https://github.com/firebase/angularFire/issues/199
                  $timeout(function() {
                    callback(null, user);
                  });
                }

              } else {
                console.log('err in login');
              }
            });
          } else {
            auth.$logout();
          }

        }, callback);
      },

      logout: function() {
        assertAuth();
        auth.$logout();
        $rootScope.$broadcast('$firebaseSimpleLogin:logout');
      },

      createAccount: function(email, pass, callback) {
        assertAuth();

        auth.$createUser(email, pass).then(function(user) {
          callback && callback(null, user)
        }, callback);
      },

      createProfile: profileCreator
    };

    function assertAuth() {
      if (auth === null) {
        throw new Error('Must call loginService.init() before using its methods');
      }
    }
  }
])

.factory('profileCreator', ['firebaseRef', '$timeout',
  function(firebaseRef, $timeout) {
    return function(id, email, callback) {
      firebaseRef('users/' + id).set({
        email: email,
        name: firstPartOfEmail(email)
      }, function(err) {
        //err && console.error(err);
        if (callback) {
          $timeout(function() {
            callback(err);
          })
        }
      });

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@')) || '');
      }

      function ucfirst(str) {
        // credits: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }
    }
  }
]);
