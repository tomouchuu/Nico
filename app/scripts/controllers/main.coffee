'use strict'

angular.module('nicoApp')
  .controller 'MainCtrl', ($scope, $http, $log) ->
    $scope.search = () ->
      $scope.searching = true;
      $http.get('/api/search/'+$scope.code).success (info) ->
        $scope.info = info
        $scope.searching = false;

        $http.get('/api/downloaded/'+$scope.code).success (file) ->
          $scope.file = file;

    $scope.download = (smcode) ->
      $scope.loading = true;
      $http.get('/api/download/'+smcode).success (file) ->
        $scope.file = file
        $scope.loading = false;

    $scope.convert = (smcode, format) ->
      $scope.loading = true;
      $http.get('/api/convert/' + smcode + '?format=' + format).success (file) ->
        $scope.file = file
        $scope.loading = false;
