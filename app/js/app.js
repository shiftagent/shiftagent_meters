'use strict';

// Declare app level module which depends on filters, and services
angular.module('shiftagentMeters', ['shiftagentMeters.config', 'shiftagentMeters.routes', 'shiftagentMeters.filters',
  'shiftagentMeters.services', 'shiftagentMeters.directives', 'shiftagentMeters.controllers',
  'waitForAuth', 'routeSecurity', 'angucomplete', 'nvd3ChartDirectives'
])

.run(['loginService', '$rootScope', 'FBURL', '$timeout',
  function(loginService, $rootScope, FBURL, $timeout) {
    $rootScope.auth = loginService.init('/login');
    $rootScope.FBURL = FBURL;

    $timeout(function() {
      $rootScope.auth.$getCurrentUser().then(function(user) {
        console.log(user);
        if(user) {
          $rootScope.$broadcast('$firebaseSimpleLogin:login');
        }
      });
    }, 500);
  }
]);
