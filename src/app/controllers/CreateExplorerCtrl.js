"use strict"

app.controller("CreateExplorerCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ExplorerFactory
  ){

  $scope.title = "Explorer Profile"
  console.log('CurrentUser', AuthFactory.currentUser().then(user => user.uid))

  $scope.newExplorerProfile = {
    firstName: "",
    lastName: "",
    userName: "",
    age: ""
  }

  $scope.createExplorer = () => {
    ExplorerFactory.postExplorer($scope.newExplorerProfile)
    .then((data) => {
      console.log(data)
      $location.url("/command_deck")
      $window.location.reload()
    })
  }

})
