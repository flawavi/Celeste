'use strict'

app.controller('HomeCtrl', function(
  $scope,
  $location,
  ExplorerFactory
  ){

  $scope.message = 'Hello World!'
  $scope.goToLogin = () => {
    console.log('click')
    $location.url('/login')
  }

  $scope.getExplorers = () => {
    ExplorerFactory.getExplorers()
    .then((explorers) => {
      console.log(explorers)
      // explorers.forEach(){
      //   $scope.explorers = {
      //   firstName: explorers.firstName,
      //   lastName: explorers.lastName,
      //   age: explorers.age,
      //   username: explorers.userName,
      //   }
      // }

    })
  }

})