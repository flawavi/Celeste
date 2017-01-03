'use strict'

app.controller('DestinationCtrl', function(
  $scope,
  $route,
  $window,
  $location,
  $routeParams,
  JourneyFactory,
  AnswersFactory,
  CelesteFactory,
  ExplorerFactory,
  QuestionsFactory
  ){


  $scope.id = $routeParams.id
  let id = parseInt($route.current.params.id, 10),
      journeyID = $routeParams.id

  $scope.active = true
  $scope.hide = true
  $scope.quiz = false
  $scope.quizButton = false
  $scope.currentLesson = true

  JourneyFactory.getJourneyById(id)
    .then(journey => {
      $scope.topic = journey.destination
    })

  $scope.getLesson = () => {
    $scope.hide = false
    $scope.quizButton = true
    CelesteFactory.getLessons()
    .then(data => {
    // $scope.destination = data.map(d => d.journeyID)
    $scope.lessons = data.map(d => d.lesson)
    $scope.lesson = $scope.lessons[id - 1]
    })
  }

  $scope.answerFilter = question => answer => question.questionsID = answer.questionsID

  AnswersFactory.getAnswersByJourneyID(journeyID)
  .then(data => {
    $scope.answers = data.map(d => {
      return {
        answer: d.answer,
        answerId: d.answersID,
        questionId: d.questionsID,
        correct: d.real
      }
    }).sort(() => 0.5 - Math.random())
  })

  QuestionsFactory.getQuestionsByJourneyID(journeyID)
  .then(data => {
    console.log(data)
    $scope.questions = data
  })

  $scope.takeQuiz = () => {
    $scope.quiz = true
    $scope.currentLesson = false
    $scope.quizButton = false
  }

  $scope.nextDestination = nextDestination => {
    if(id === 9){
      nextDestination = "/theend"
      $location.url(`${nextDestination}`)
    } else {
        nextDestination = id + 1
        $location.url(`/destination/${nextDestination}`)
      }
    }


  $scope.prevDestination = prevDestination => {
    if(id <= 1) return
    prevDestination = id - 1
    $location.url(`/destination/${prevDestination}`)
  }

  $scope.selectedAnswer = {}

  $scope.checkAnswers = () => {
    console.log($scope.selectedAnswer)
  }

})