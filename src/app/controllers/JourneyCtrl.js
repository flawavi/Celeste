'use strict'

app.controller('JourneyCtrl', function(
  $scope,
  $location,
  AuthFactory,
  JourneyFactory,
  ExplorerFactory){

  $scope.blackhole = true

  $scope.listJournies = () => {
    JourneyFactory.getJournies()
    .then(data => {
      console.log('hello data?', data)
      $scope.journies = data
    })
  }

  $scope.startJourney = () => {
    $location.url('/moon')
  }

AuthFactory.currentUser().then(user => {
  console.log(user.uid)
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      console.log(explorer)
      $scope.isLoggedIn = true
      $scope.explorerName = explorer.firstName
    })
  })
})
