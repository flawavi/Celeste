'use strict'

app.controller('LoginCtrl', function(
  $scope,
  $route,
  $window,
  $location,
  AuthFactory,
  ExplorerFactory){

  $scope.greeting = 'Hello, Explorer!'
  $scope.galonzo = 'Or as we say on my home planet: Galonzo, Explorer!'
  $scope.message = ' I\'m Celeste. I\'d Like to teach you about space.'

  $scope.account = {
    email: "",
    password: ""
  }

    let loginFirstTime = () => {
    AuthFactory.loginUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then(userData => {
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

  $scope.register = () => {
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      console.log("REGISTER IS WORKING", userData)
      loginFirstTime()
    },
    (error) => {
      console.log(error)
    })
  }


  $scope.login = () => {
    AuthFactory.loginUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then(userData => {
      if(userData) {
        $window.location.href = `#/command_deck`
      console.log('USERDATA', userData)
      } else {
        $window.location.href = "#/login"
      }
    },
    (error) => {
      console.log(error)
    })
  }
})
