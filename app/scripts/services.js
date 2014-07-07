'use strict';
angular.module('UHCCalendar.services', ['ngResource'])

    .factory( 'RedditPostsService', ['$http', '$q', function( $http, $q ) {
        var uri = 'http://www.reddit.com/r/ultrahardcore/search.json?q=flair%3AUpcoming_Match&restrict_sr=on';

        return {
            query: function (limit, sort) {
                var deferred = $q.defer();
                limit = limit || 100;
                sort = sort || 'new';

                $http.get(uri + '&limit=' + limit + '&sort=' + sort).then(
                    function(data) {
                        console.log(data);
                        deferred.resolve(data.data.data.children);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
        };
    }]);