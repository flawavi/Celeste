'use strict'

app.controller('JourneyCtrl', function($scope, $location, JourneyFactory, AuthFactory, ExplorerFactory){


  // $scope.listJournies = () => {
    JourneyFactory.getJournies()
    .then(data => {
      console.log(data)
      $scope.journies = data
    })
  // }

  // $scope.explorer = ExplorerFactory.getExplorerById(explorerId)
  AuthFactory.currentUser().then(user => {
    console.log(user.uid)
      ExplorerFactory.getExplorerById(user.uid)
      .then(explorer => {
        console.log(explorer)
        $scope.isLoggedIn = true
        $scope.explorerName = explorer.firstName
      })
    })
  })
