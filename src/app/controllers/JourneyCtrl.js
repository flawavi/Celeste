'use strict'

app.controller('JourneyCtrl', function($scope, $location, JourneyFactory, AuthFactory, ExplorerFactory){

  let explorerId = AuthFactory.getUser().uid
  $scope.explorer = ExplorerFactory.getExplorerById(explorerId)
})