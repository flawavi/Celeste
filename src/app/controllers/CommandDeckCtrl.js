"use strict"

app.controller("CommandDeckCtrl", function(
  $scope,
  $window,
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
          if($scope.nextJourney.journeyID === 1){
            $scope.noCompletedJourniesMsg = "Looks like you haven't completed any journies, yet. What are you waiting for!?"
          }
        })
      })
    })
  })

  $scope.deleteProfile = () => {
    alert("Are you sure you want to delete your profile?")
    ExplorerFactory.deleteProfile($scope.explorer.id)
    .then(() => {
      console.log("profile deleted")
      $location.url("/login")
    })
  }

  $scope.startJourney = () => {
    $window.location.href = `/#/destination/${$scope.nextJourney.journeyID}`
  }
})
