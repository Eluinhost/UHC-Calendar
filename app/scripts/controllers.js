'use strict';
angular.module('UHCCalendar.controllers', [])

    .controller('AppCtrl', function($scope) {
    })

    .controller('LatestCtrl', ['$scope', 'RedditPostsService', function($scope, SearchPostsService) {
        $scope.posts = [];
        $scope.unparsed = [];

        $scope.updatePosts = function() {
            SearchPostsService.query().then(function (valid, invalid) {
                $scope.posts = valid;
                $scope.unparsed = invalid;
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.updatePosts();
    }]);