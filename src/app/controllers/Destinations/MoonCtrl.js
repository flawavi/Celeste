'use strict'

app.controller('MoonCtrl', function(
  $scope,
  $window,
  $location,
  TriviaFactory,
  JourneyFactory
  ){


  JourneyFactory.getJournies()
  .then(journies => {
    var journeyID = journies[0].journeyID
    TriviaFactory.getTriviaByJourneyID(journeyID)
    .then(data => {
      $scope.question = data.question
    })
  })

})