"use strict"

app.controller("CommandDeckCtrl", function(
  $scope,
  $location,
  AuthFactory,
  ExplorerFactory
  ){

  AuthFactory.currentUser()
  .then(data => {
    console.log(data)
    ExplorerFactory.getExplorerById(data.uid)
    .then(explorer => {
      console.log(explorer)
      $scope.explorer = explorer
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
})