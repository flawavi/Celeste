"use strict"

app.controller("EditExplorerCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ExplorerFactory
  ){

  $scope.title = "Please fill out entire form"

  $scope.updatedExplorer = {
    firstName: "",
    lastName: "",
    userName: "",
    age: ""
  }

  $scope.editExplorer = (id) => {
    id = AuthFactory.getUser().uid
    ExplorerFactory.editCurrentExplorer(id, $scope.updatedExplorer)
    .then((data) => {
      console.log(data)
      $location.url("/command_deck")
    })
  }

})
