'use strict';

// Declare app level module which depends on filters, and services
angular.module('shiftagentMeters',
      ['shiftagentMeters.config', 'shiftagentMeters.routes', 'shiftagentMeters.filters', 'shiftagentMeters.services', 'shiftagentMeters.directives', 'shiftagentMeters.controllers',
         'waitForAuth', 'routeSecurity', 'angucomplete', 'nvd3ChartDirectives']
   )

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
   }]);
