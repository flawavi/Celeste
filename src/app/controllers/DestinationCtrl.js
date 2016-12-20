'use strict'

app.controller('DestinationCtrl', function(
  $scope,
  $window,
  $location,
  $routeParams,
  TriviaFactory,
  JourneyFactory,
  CelesteFactory,
  ExplorerFactory
  ){

  CelesteFactory.getLessons()
  .then(data => {
    $scope.destination = data.map(d => d.journeyID)
    $scope.lessons = data.map(d => d.lesson)
    console.log('destination', $scope.destination, "lessons", $scope.lessons)
  })

  let journeyID = $routeParams.id
  console.log($routeParams.id)
  $scope.nextDestination = (nextDestination) => {
    nextDestination = $routeParams + 1
    $location.url(`/destination/${nextDestination}`)
  }


  JourneyFactory.getJournies()
  .then(journies => {
    console.log(journies)
    TriviaFactory.getTriviaByJourneyID(journeyID)
    .then(data => {
      console.log(data)
      $scope.questions = [data[0].question, data[1].question, data[2].question, data[3].question, data[4].question]
      $scope.question1 = $scope.questions[0]
      $scope.question2 = $scope.questions[1]
      $scope.question3 = $scope.questions[2]
      $scope.question4 = $scope.questions[3]
      $scope.question5 = $scope.questions[4]
      $scope.answers = [data[0].answer, data[1].answer, data[2].answer, data[3].answer, data[4].answer]
      $scope.answer1 = $scope.answers[0]
      $scope.answer2 = $scope.answers[1]
      $scope.answer3 = $scope.answers[2]
      $scope.answer4 = $scope.answers[3]
      $scope.answer5 = $scope.answers[4]
    })
  })

  $scope.theEnd = () => {
    $window.location.href = '/#/theend'
  }

})