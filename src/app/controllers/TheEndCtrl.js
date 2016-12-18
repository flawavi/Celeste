'use strict'

app.controller("TheEndCtrl", function($scope, $window){
  $scope.galonzo = 'Galonzo!'
  $scope.message = 'You made it to the outskirts of our local cluster of galaxies! I bet you thought you\'d gotten to the edge of the universe. Not so! There are literally hundreds of billions of galaxies, each with billions of stars to explore. Pretty crazy, huh? Here are some great resources about space, astronomy and the cosmos. Learn some shit.'

  $scope.nextDestination = () => {
    $window.location.href = ('/#/moon')
  }
})