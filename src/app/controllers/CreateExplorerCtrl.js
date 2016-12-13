"use strict"

app.controller("CreateExplorerCtrl", function($scope, $location, ExplorerFactory, AuthFactory){

  console.log("CurrentUser", AuthFactory.currentUser())
  $scope.title = "Explorer Profile"

  $scope.newExplorerProfile = {
    firstName: "",
    lastName: "",
    userName: "",
    age: ""
  }

  $scope.createExplorer = () => {
    ExplorerFactory.postProfile($scope.newExplorerProfile)
    .then((data) => {
      console.log(data)
      // $location.url("/somewhere")
    })
  }

})