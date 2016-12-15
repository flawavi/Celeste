"use strict"

app.controller("NavCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ExplorerFactory
  ){

  $scope.isLoggedIn = false
  AuthFactory.currentUser().then(user => {
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      $scope.isLoggedIn = true
      $scope.explorer = explorer
    })
  })

  $scope.logout = () => {
    AuthFactory.logoutUser().then(data => {
      $scope.isLoggedIn = false;
      if(data) {
        $window.location.href = "#/"
      } else {
        $window.location.href = "#/login"
      }
      $location.url("/login")
    })
  }

  $scope.isActive = viewLocation => viewLocation === $location.path();
});