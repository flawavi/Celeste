'use strict'

app.controller('JourneyCtrl', function(
  $scope,
  $location,
  AuthFactory,
  JourneyFactory,
  ExplorerFactory){

  ExplorerFactory.getExplorers()
  .then(explorers => $scope.explorerName = explorers[0].firstName)
  // $scope.explorer = ExplorerFactory.getExplorerById(explorerId)
})