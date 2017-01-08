"use strict"

app.controller("CommandDeckCtrl", function(
  $scope,
  $window,
  $route,
  $location,
  AuthFactory,
  $routeParams,
  JourneyFactory,
  ExplorerFactory,
  ExplorerJourneyFactory
  ){

  AuthFactory.currentUser().then(user => {
    ExplorerFactory.getExplorerById(user.uid)
    .then(explorer => {
      // $scope.isLoggedIn = true
      $scope.explorer = explorer
      ExplorerJourneyFactory.getExplorerJournies(user.uid)
      .then(explorerJournies => {
        JourneyFactory.getJournies()
        .then(journies => {
          let journeyMap = journies.reduce((journies, journey) => {
            return Object.assign(journies, {[journey.journeyID]: journey})
          }, {})
          console.log(journeyMap)
          $scope.journies = explorerJournies.map(ej => journeyMap[ej.journeyID])
          let nextJourneyId = $scope.journies.reduce((maxId, journey) => {
            return journey.journeyID > maxId ? journey.journeyID : maxId
          }, 0)
          $scope.nextJourney = journeyMap[(nextJourneyId === 8 ? 0 : nextJourneyId) + 1]
          if($scope.nextJourney.destination === "Moon" || $scope.nextJourney.destination === "Sun" || $scope.nextJourney.destination === "Milky Way Black Hole" ){
            $scope.destination = `The ` + $scope.nextJourney.destination
          } else {
            $scope.destination = $scope.nextJourney.destination
          }
          if($scope.nextJourney.journeyID === 1){
            $scope.nameAndDestination = false
            $scope.noCompletedJourniesMsg = "Looks like you haven't completed any journies, yet. What are you waiting for!?"
            $scope.instructions = "Hit the green Explore button under your profile to begin your journey to the Moon."
          } else {
            $scope.nameAndDestination = true
          }
        })
      })
    })
  })

  $scope.deleteExplorer = () => {
    confirm("Are you sure you want to delete your profile?")
    ExplorerFactory.deleteCurrentExplorer()
    .then(user => {
      console.log(user)
      firebase.auth().currentUser.delete()
      .then(() => {
        $window.location.href = `/#/login`
        // User deleted.
      }, error => {
        console.log(error)
        // An error happened.
      })
    })
  }

  $scope.editExplorer = () => {
    $window.location.href = "/#/editExplorer"
    }

  $scope.startJourney = () => {
    $window.location.href = `/#/destination/${$scope.nextJourney.journeyID}`
  }

})
