"use strict"

app.controller("CommandDeckCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  JourneyFactory,
  ExplorerFactory
  ){

  JourneyFactory.getJournies()
  .then(data => {
    console.log('hello data?', data)
    $scope.journies = data
  })

  console.log(AuthFactory.getUser())

  AuthFactory.currentUser()
  .then(data => {
    console.log(data)
    ExplorerFactory.getExplorerById(data.uid)
    .then(explorerdata => {
      console.log(explorerdata)
      $scope.explorer = explorerdata
    })
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