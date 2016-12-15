"use strict"

app.controller("ExplorerProfileCtrl", function(
  $scope,
  $location,
  AuthFactory,
  currentProfile,
  ExplorerFactory
  ){

  $scope.explorer = currentProfile

  $scope.deleteProfile = () => {
    alert("Are you sure you want to delete your profile?")
    ExplorerFactory.deleteProfile($scope.explorer.id)
    .then(()=>{
      console.log("profile deleted")
      $location.url("/login")
    })
  }

  $scope.goToPartyForm = () => {
    $location.url("party-form")
  }
})