'use strict'

app.controller('HomeCtrl', function($scope, $location){

  $scope.message = 'Hello World!'
  $scope.goToLogin = () => {
    console.log('click')
    $location.url('/login')
  }

})