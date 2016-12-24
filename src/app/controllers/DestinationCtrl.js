'use strict'

app.controller('DestinationCtrl', function(
  $scope,
  $route,
  $window,
  $location,
  $routeParams,
  TriviaFactory,
  JourneyFactory,
  CelesteFactory,
  ExplorerFactory
  ){

  let id = parseInt($route.current.params.id, 10),
      journeyID = $routeParams.id

  $scope.active = true
  $scope.hide = true
  $scope.quiz = false
  $scope.currentLesson = true

  JourneyFactory.getJourneyById(id)
    .then(journey => {
      $scope.topic = journey.destination
    })

  $scope.getLesson = () => {
    $scope.hide = false
    CelesteFactory.getLessons()
    .then(data => {
    // $scope.destination = data.map(d => d.journeyID)
    $scope.lessons = data.map(d => d.lesson)
    $scope.lesson = $scope.lessons[id - 1]
    })
  }


  TriviaFactory.getTriviaByJourneyID(journeyID)
  .then(data => {
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

  $scope.userAnswers = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: ""
  }

  $scope.takeQuiz = () => {
    $scope.quiz = true
    $scope.currentLesson = false
  }

  $scope.postAnswers = () => {

    if($scope.userAnswers.answer1 >= 0.9 * $scope.answer1 || $scope.userAnswers.answer1 <= 1.1 * $scope.answer1 || $scope.userAnswers.answer1 === $scope.answer1) {
      console.log(`Question 1 is correct.`)
    }
    else if ($scope.userAnswers.answer2 >= 0.9 * $scope.answer2 || $scope.userAnswers.answer2 <= 1.1 * $scope.answer2 || $scope.userAnswers.answer2 === $scope.answer2) {
      console.log(`Question 2 is correct.`)
      }
    else if ($scope.userAnswers.answer3 >= 0.9 * $scope.answer3 || $scope.userAnswers.answer3 <= 1.1 * $scope.answer3 || $scope.userAnswers.answer3 === $scope.answer3) {
      console.log(`Question 3 is correct.`)
    }
    else if ($scope.userAnswers.answer3 >= 0.9 * $scope.answer4 || $scope.userAnswers.answer4 <= 1.1 * $scope.answer4 || $scope.userAnswers.answer4 === $scope.answer4) {
      console.log(`Question 4 is correct.`)
    }
    else if ($scope.userAnswers.answer5 >= 0.9 * $scope.answer5 || $scope.userAnswers.answer5 <= 1.1 * $scope.answer5 || $scope.userAnswers.answer5 === $scope.answer5) {
      console.log(`Question 5 is correct.`)
    }
    else {
      console.log(`At least one of your answers in incorrect.`)
    }
  }


  $scope.nextDestination = nextDestination => {
    if(id === 9){
      nextDestination = "/theend"
      $location.url(`${nextDestination}`)
    }
    else {
      nextDestination = id + 1
      $location.url(`/destination/${nextDestination}`)
    }

  }

  $scope.prevDestination = prevDestination => {
    if(id <= 1) return
    prevDestination = id - 1
    $location.url(`/destination/${prevDestination}`)
  }

})