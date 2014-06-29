'use strict'

angular.module('nicoApp')
  .controller 'MainCtrl', ($scope, $http, $log) ->
    $scope.search = () ->
      $http.get('/api/search/'+$scope.code).success (info) ->
        $scope.info = info
    $scope.download = (smcode) ->
      $scope.loading = true;
      $http.get('/api/download/'+smcode).success (files) ->
        $scope.files = files
