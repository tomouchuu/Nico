'use strict'

angular.module('nicoApp')
  .controller 'MainCtrl', ($scope, $http, $log) ->
    $scope.submit = () ->
      $http.get('/api/download/'+$scope.code).success (download) ->
        $scope.download = download
