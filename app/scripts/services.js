'use strict';
angular.module('UHCCalendar.services', [])

    .factory( 'RedditPostsService', ['$http', '$q', '$filter', function( $http, $q, $filter ) {
        var uri = 'http://www.reddit.com/r/ultrahardcore/search.json?q=flair%3AUpcoming_Match&restrict_sr=on';

        return {
            query: function (limit, sort) {
                var deferred = $q.defer();
                limit = limit || 100;
                sort = sort || 'new';

                var currentTime = moment();

                $http.get(uri + '&limit=' + limit + '&sort=' + sort).then(
                    function(data) {
                        var unparsed = [];
                        var parsed = $filter('filter')(data.data.data.children, function(element) {
                            var time = moment.utc(/[\w]+ [\d]+ [\d]+:[\d]+/.exec(element.data.title), 'MMM DD HH:mm', 'en');
                            if(!time.isValid() || time.diff(currentTime) < 0) {
                                unparsed.push(element);
                                return false;
                            }
                            element.data.title = element.data.title.substring(element.data.title.indexOf('-')+2);
                            element.uhccalendar = {
                                time: time
                            };
                            return true;
                        });
                        var filteredParsed = $filter('orderBy')(parsed, function(element) {
                            return element.uhccalendar.time.format('X');
                        });
                        deferred.resolve(filteredParsed, unparsed);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
        };
    }]);