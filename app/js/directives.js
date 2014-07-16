'use strict';

/* Directives */


angular.module('shiftagentMeters.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('saMeter', ['syncData', '$rootScope', '$timeout', function(syncData, $rootScope, $timeout) {
      return {
        scope: {
          meter: '=saMeter',
          meterId: '@'
        },
        templateUrl: 'partials/saMeter.html',
        link: function(scope, elem, attrs) {
          var flashTimeout;

          scope.endpoint = syncData('meters/' +  scope.meterId);
          scope.dataPoints = scope.endpoint.$child('dataPoints');

          scope.$watch(function() {
            return _.size(scope.meter.dataPoints);
          }, function() {
            if (!_.isUndefined(flashTimeout)) {
              $timeout.cancel(flashTimeout);
            };

            $(elem).addClass('flash');

            flashTimeout = $timeout(function() {
              $(elem).removeClass('flash');
            }, 5000);

          });

          scope.subject = undefined;
          syncData('users/' + scope.meter.subject).$bind(scope, 'subject');

          scope.addDataPoint = function(change) {
            scope.dataPoints.$add({
              deltaValue: change,
              user: {
               username: scope.subject.username,
               uid: scope.subject.uid
              },
              dateCreated: moment.utc().unix()
            })
                .then(function() {
                  updateChartData();
                });
          };

          scope.removeMeter = function() {
            console.log(scope.endpoint);
            scope.meter.active = false;
          };

          scope.xAxisTickFormatFunction = function() {
            return function(val, i) {
              return moment.utc(val).tz('America/New_York').format('h:mma');
            };
          };

          scope.yAxisTickFormatFunction = function() {
            return function(val, i) {
              return Math.round(val);;
            }
          };

          scope.xFunction = function() {
            return function(val) {
              return val[0];
            };
          };

          scope.yFunction = function() {
            return function(val) {
              return val[1];
            };
          };

          var updateChartData = function() {
            var value = 0;

            var values = [];
            _.each(scope.meter.dataPoints, function(dp) {
              if (dp.deltaValue !== 0) {
                values.push([
                    dp.dateCreated * 1000 - 1000,
                    value
                  ]);
                values.push([
                    dp.dateCreated * 1000,
                    value += dp.deltaValue
                  ]);
              }
            });

            scope.chartData = [{
              key: scope.meter.name,
              values: values
            }];

            console.log(_.map(scope.chartData[0].values, function(v) {return v[1];}));
          };

          updateChartData();

          scope.$watchCollection('dataPoints', function() {
            console.log('WATCH DATAPOINTS');
            scope._calcValue = _.reduce(_.map(scope.dataPoints, function(dp) {
              if (_.has(dp, 'deltaValue')) {
                return dp.deltaValue;
              } else {
                return 0;
              }
            }), function(sum, num) {
              return sum + num;
            }, 0);

            updateChartData();
          }, 1);

        }
      }
    }]);
