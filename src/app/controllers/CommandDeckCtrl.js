"use strict"

app.controller("CommandDeckCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  $routeParams,
  JourneyFactory,
  ExplorerFactory
  ){

  AuthFactory.currentUser().then(user => {
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      // $scope.isLoggedIn = true
      $scope.explorer = explorer
    })
  })

  JourneyFactory.getJournies()
  .then(data => {
    console.log('hello data?', data)
    $scope.journies = data
  })

  $scope.deleteProfile = () => {
    alert("Are you sure you want to delete your profile?")
    ExplorerFactory.deleteProfile($scope.explorer.id)
    .then(()=>{
      console.log("profile deleted")
      $location.url("/login")
    })
  }
  $scope.startJourney = () => {
    $window.location.href = '/#/journey'
  }
})