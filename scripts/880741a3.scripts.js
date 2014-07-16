function pathRef(a){for(var b=0;b<a.length;b++)"object"==typeof a[b]&&(a[b]=pathRef(a[b]));return a.join("/")}moment.tz.add({zones:{"America/Chicago":["-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36","-6 US C%sT 1920 -6","-6 Chicago C%sT 1936_2_1_2 -6","-5 - EST 1936_10_15_2 -5","-6 Chicago C%sT 1942 -6","-6 US C%sT 1946 -6","-6 Chicago C%sT 1967 -6","-6 US C%sT"],"America/Denver":["-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56","-7 US M%sT 1920 -7","-7 Denver M%sT 1942 -7","-7 US M%sT 1946 -7","-7 Denver M%sT 1967 -7","-7 US M%sT"],"America/Los_Angeles":["-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58","-8 US P%sT 1946 -8","-8 CA P%sT 1967 -8","-8 US P%sT"],"America/New_York":["-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2","-5 US E%sT 1920 -5","-5 NYC E%sT 1942 -5","-5 US E%sT 1946 -5","-5 NYC E%sT 1967 -5","-5 US E%sT"]},rules:{US:["1918 1919 2 0 8 2 0 1 D","1918 1919 9 0 8 2 0 0 S","1942 1942 1 9 7 2 0 1 W","1945 1945 7 14 7 23 1 1 P","1945 1945 8 30 7 2 0 0 S","1967 2006 9 0 8 2 0 0 S","1967 1973 3 0 8 2 0 1 D","1974 1974 0 6 7 2 0 1 D","1975 1975 1 23 7 2 0 1 D","1976 1986 3 0 8 2 0 1 D","1987 2006 3 1 0 2 0 1 D","2007 9999 2 8 0 2 0 1 D","2007 9999 10 1 0 2 0 0 S"],Chicago:["1920 1920 5 13 7 2 0 1 D","1920 1921 9 0 8 2 0 0 S","1921 1921 2 0 8 2 0 1 D","1922 1966 3 0 8 2 0 1 D","1922 1954 8 0 8 2 0 0 S","1955 1966 9 0 8 2 0 0 S"],Denver:["1920 1921 2 0 8 2 0 1 D","1920 1920 9 0 8 2 0 0 S","1921 1921 4 22 7 2 0 0 S","1965 1966 3 0 8 2 0 1 D","1965 1966 9 0 8 2 0 0 S"],CA:["1948 1948 2 14 7 2 0 1 D","1949 1949 0 1 7 2 0 0 S","1950 1966 3 0 8 2 0 1 D","1950 1961 8 0 8 2 0 0 S","1962 1966 9 0 8 2 0 0 S"],NYC:["1920 1920 2 0 8 2 0 1 D","1920 1920 9 0 8 2 0 0 S","1921 1966 3 0 8 2 0 1 D","1921 1954 8 0 8 2 0 0 S","1955 1966 9 0 8 2 0 0 S"]},links:{}}),angular.module("shiftagentMeters",["shiftagentMeters.config","shiftagentMeters.routes","shiftagentMeters.filters","shiftagentMeters.services","shiftagentMeters.directives","shiftagentMeters.controllers","waitForAuth","routeSecurity","angucomplete","nvd3ChartDirectives"]).run(["loginService","$rootScope","FBURL","$timeout",function(a,b,c,d){b.auth=a.init("/login"),b.FBURL=c,d(function(){b.auth.$getCurrentUser().then(function(a){console.log(a),a&&b.$broadcast("$firebaseSimpleLogin:login")})},500)}]),angular.module("shiftagentMeters.config",[]).constant("version","0.6").constant("loginRedirectPath","/login").constant("FBURL","https://shiftagent-meters.firebaseio.com").constant("allowedGithubUsers",["mattrw89","jwkicklighter","airpez"]),angular.module("shiftagentMeters.controllers",[]).controller("HomeCtrl",["$scope","$rootScope","syncData","$timeout","loginService",function(a,b,c,d,e){b.auth.$getCurrentUser().then(function(b){a.currentUser=b}),a.email=null,a.pass=null,a.confirm=null,a.createMode=!1,a.login=function(b){a.err=null,e.login(function(c,d){a.err=c?c+"":null,c||b&&b(d)})},a.logout=function(){console.log("logout"),e.logout()},c("meters").$bind(a,"meters"),c("users").$bind(a,"users").then(function(){a.angucompleteUsers=_.map(a.users,function(a){return a})});var f=function(){a.newMeter={name:"",value:0,subject:"",active:!0},a.selectedEmployee=null};f(),a.createMeter=function(){a.newMeter.name&&(console.log(a.meters),a.meters.$add(a.newMeter),console.log(a.newMeter),f())},a.removeMeter=function(b){a.meters.$remove(b)},a.changeMeterValue=function(a,b){a&&(a.value?a.value+=b:a.value=b)},a.$watch("selectedEmployee",function(b){b&&(console.log(b.originalObject.uid),a.newMeter.subject=b.originalObject.uid,console.log(a.newMeter))})}]),angular.module("shiftagentMeters.directives",[]).directive("appVersion",["version",function(a){return function(b,c){c.text(a)}}]).directive("saMeter",["syncData","$rootScope",function(a){return{scope:{meter:"=saMeter",meterId:"@"},templateUrl:"partials/saMeter.html",link:function(b){b.endpoint=a("meters/"+b.meterId),b.dataPoints=b.endpoint.$child("dataPoints"),b.subject=void 0,a("users/"+b.meter.subject).$bind(b,"subject"),b.addDataPoint=function(a){b.dataPoints.$add({deltaValue:a,user:{username:b.subject.username,uid:b.subject.uid},dateCreated:moment.utc().unix()}).then(function(){c()})},b.removeMeter=function(){console.log(b.endpoint),b.meter.active=!1},b.xAxisTickFormatFunction=function(){return function(a){return moment.utc(a).tz("America/New_York").format("h:mma")}},b.yAxisTickFormatFunction=function(){return function(a){return Math.round(a)}},b.xFunction=function(){return function(a){return a[0]}},b.yFunction=function(){return function(a){return a[1]}};var c=function(){var a=0,c=[];_.each(b.meter.dataPoints,function(b){0!==b.deltaValue&&(c.push([1e3*b.dateCreated-1e3,a]),c.push([1e3*b.dateCreated,a+=b.deltaValue]))}),b.chartData=[{key:b.meter.name,values:c}],console.log(_.map(b.chartData[0].values,function(a){return a[1]}))};c(),b.$watchCollection("dataPoints",function(){console.log("WATCH DATAPOINTS"),b._calcValue=_.reduce(_.map(b.dataPoints,function(a){return _.has(a,"deltaValue")?a.deltaValue:0}),function(a,b){return a+b},0),c()},1)}}}]),angular.module("shiftagentMeters.filters",[]).filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]).filter("reverse",function(){function a(a){var b,c=[];if(a)if(angular.isArray(a))c=a;else if("object"==typeof a)for(b in a)a.hasOwnProperty(b)&&c.push(a[b]);return c}return function(b){return a(b).slice().reverse()}}),angular.module("shiftagentMeters.routes",["ngRoute"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"partials/home.html",controller:"HomeCtrl"}),a.when("/chat",{templateUrl:"partials/chat.html",controller:"ChatCtrl"}),a.when("/account",{authRequired:!0,templateUrl:"partials/account.html",controller:"AccountCtrl"}),a.when("/login",{templateUrl:"partials/login.html",controller:"LoginCtrl"}),a.otherwise({redirectTo:"/home"})}]),function(){"use strict";angular.module("shiftagentMeters.services",["shiftagentMeters.service.login","shiftagentMeters.service.firebase"])}(),angular.module("shiftagentMeters.service.login",["firebase","shiftagentMeters.service.firebase"]).factory("loginService",["$rootScope","$firebaseSimpleLogin","firebaseRef","profileCreator","$timeout","allowedGithubUsers",function(a,b,c,d,e,f){function g(){if(null===h)throw new Error("Must call loginService.init() before using its methods")}var h=null;return{init:function(){return h=b(c())},login:function(b){g(),h.$login("github").then(function(d){console.log(d),_.contains(f,d.username)?c("users/"+d.uid).set({username:d.username,displayName:d.displayName,uid:d.uid,id:d.id,avatar_url:d.avatar_url},function(c){c?console.log("err in login"):(a.$broadcast("$firebaseSimpleLogin:login"),b&&e(function(){b(null,d)}))}):h.$logout()},b)},logout:function(){g(),h.$logout(),a.$broadcast("$firebaseSimpleLogin:logout")},createAccount:function(a,b,c){g(),h.$createUser(a,b).then(function(a){c&&c(null,a)},c)},createProfile:d}}]).factory("profileCreator",["firebaseRef","$timeout",function(a,b){return function(c,d,e){function f(a){return g(a.substr(0,a.indexOf("@"))||"")}function g(a){a+="";var b=a.charAt(0).toUpperCase();return b+a.substr(1)}a("users/"+c).set({email:d,name:f(d)},function(a){e&&b(function(){e(a)})})}}]),angular.module("shiftagentMeters.service.firebase",["firebase"]).factory("firebaseRef",["Firebase","FBURL",function(a,b){return function(){return new a(pathRef([b].concat(Array.prototype.slice.call(arguments))))}}]).service("syncData",["$firebase","firebaseRef",function(a,b){return function(c,d){var e=b(c);return d&&(e=e.limit(d)),console.log(a(e)),a(e)}}]),angular.module("waitForAuth",[]).service("waitForAuth",["$rootScope","$q","$timeout",function(a,b,c){function d(b){a.auth&&(a.auth.error=b instanceof Error?b.toString():null);for(var d=0;d<f.length;d++)f[d]();c(function(){e.resolve()})}var e=b.defer(),f=[];return f.push(a.$on("$firebaseSimpleLogin:login",d)),f.push(a.$on("$firebaseSimpleLogin:logout",d)),f.push(a.$on("$firebaseSimpleLogin:error",d)),e.promise}]).directive("ngCloakAuth",["waitForAuth",function(a){return{restrict:"A",compile:function(b){b.addClass("hide"),a.then(function(){b.removeClass("hide")})}}}]).directive("ngShowAuth",["$rootScope",function(a){function b(a,b){var c=!1;return angular.forEach(b,function(b){return b===a?(c=!0,!0):!1}),c}function c(a){if(!a)throw new Error("ng-show-auth directive must be login, logout, or error (you may use a comma-separated list)");var c=(a||"").split(",");return angular.forEach(c,function(a){if(!b(a,["login","logout","error"]))throw new Error('Invalid state "'+a+'" for ng-show-auth directive, must be one of login, logout, or error')}),!0}var d;return a.$on("$firebaseSimpleLogin:login",function(){d="login"}),a.$on("$firebaseSimpleLogin:logout",function(){d="logout"}),a.$on("$firebaseSimpleLogin:error",function(){d="error"}),{restrict:"A",compile:function(e,f){function g(a){d=a;var c=!b(a,h);e.toggleClass("hide",c)}c(f.ngShowAuth);var h=(f.ngShowAuth||"").split(",");g(d),a.$on("$firebaseSimpleLogin:login",function(){g("login")}),a.$on("$firebaseSimpleLogin:logout",function(){g("logout")}),a.$on("$firebaseSimpleLogin:error",function(){g("error")})}}}]),function(a){function b(a,b,c,d){this._route=c,this._location=a,this._rootScope=b,this._loginPath=d,this._redirectTo=null,this._authenticated=!(!b.auth||!b.auth.user),this._init()}a.module("routeSecurity",[]).run(["$injector","$location","$rootScope","loginRedirectPath",function(a,c,d,e){a.has("$route")&&new b(c,d,a.get("$route"),e)}]),b.prototype={_init:function(){var b=this;this._checkCurrent(),b._rootScope.$on("$routeChangeStart",function(a,c){b._authRequiredRedirect(c,b._loginPath)}),b._rootScope.$on("$firebaseSimpleLogin:login",a.bind(this,this._login)),b._rootScope.$on("$firebaseSimpleLogin:logout",a.bind(this,this._logout)),b._rootScope.$on("$firebaseSimpleLogin:error",a.bind(this,this._error))},_checkCurrent:function(){this._route.current&&this._authRequiredRedirect(this._route.current,this._loginPath)},_login:function(){this._authenticated=!0,this._redirectTo?(this._redirect(this._redirectTo),this._redirectTo=null):this._location.path()===this._loginPath&&(this._location.replace(),this._location.path("/"))},_logout:function(){this._authenticated=!1,this._checkCurrent()},_error:function(){this._rootScope.auth&&this._rootScope.auth.user||(this._authenticated=!1),this._checkCurrent()},_redirect:function(a){this._location.replace(),this._location.path(a)},_authRequiredRedirect:function(a,b){a.authRequired&&!this._authenticated?(this._redirectTo=void 0===a.pathTo?this._location.path():a.pathTo===b?"/":a.pathTo,this._redirect(b)):this._authenticated&&this._location.path()===this._loginPath&&this._redirect("/")}}}(angular);