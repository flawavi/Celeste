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

  console.log(AuthFactory.getUser())
  let id = $routeParams.id

  JourneyFactory.getJournies()
  .then(data => {
    console.log('hello data?', data)
    $scope.journies = data
  })


    ExplorerFactory.getExplorerById(id)
    .then(explorerdata => {
      console.log(explorerdata)
      $scope.explorer = explorerdata
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