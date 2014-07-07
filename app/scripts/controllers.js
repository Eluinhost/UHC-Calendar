'use strict';
angular.module('UHCCalendar.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LatestCtrl', ['$scope', 'RedditPostsService', function($scope, SearchPostsService) {
    SearchPostsService.query().then(function(valid, invalid) {
        $scope.posts = valid;
        $scope.unparsed = invalid;
    });
}]);