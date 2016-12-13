'use strict'

app.controller('LoginCtrl', function($scope, $location, AuthFactory, ExplorerFactory){

  $scope.greeting = 'Hello, Explorer.'
  $scope.message = ' I\'m Celeste. I\'d Like to teach you about space.'

  $scope.account = {
    email: "",
    password: ""
  }
  $scope.register = () => {
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      console.log("REGISTER IS WORKING", userData)
      $scope.loginFirstTime()
    },
    (error) => {
      console.log(error)
    })
  }

    $scope.loginFirstTime = () => {
    AuthFactory.loginUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData) => {
      if(userData) {
        $window.location.href = "#/createExplorer"
      } else {
        $window.location.href = "#/login"
      }
    },
    (error) => {
      console.log(error)
    })
  }
})