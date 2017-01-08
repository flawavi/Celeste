'use strict'

app.controller('JourneyCtrl', function(
  $scope,
  $route,
  $location,
  AuthFactory,
  JourneyFactory,
  ExplorerFactory){

  $scope.blackhole = true

  $scope.listJournies = () => {
    JourneyFactory.getJournies()
    .then(data => {
      $scope.journies = data
    })
  }

  $scope.startJourney = () => {
    $location.url('/destination/1')
  }

  AuthFactory.currentUser().then(user => {
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      console.log(explorer)
      $scope.isLoggedIn = true
      $scope.explorerName = explorer.username
      })
    })
})
