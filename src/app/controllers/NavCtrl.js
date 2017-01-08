"use strict"

app.controller("NavCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ExplorerFactory
  ){

  $scope.isLoggedIn = false
  $scope.notLoggedIn = true
  AuthFactory.currentUser().then(user => {
    if(user === null){
      $scope.pleaseCreateAccount = 'No one is currently exploring the universe. That makes me sad.'
      return $scope.pleaseCreateAccount
    }
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      $scope.notLoggedIn = false
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
