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

        setInterval(function() {
            function updateTime(element) {
                element.uhccalendar.timeLeft = element.uhccalendar.time.fromNow();
            }
            angular.forEach($scope.posts, updateTime);
            angular.forEach($scope.unparsed, updateTime);
            $scope.$apply();
        }, 1000);
    }]);