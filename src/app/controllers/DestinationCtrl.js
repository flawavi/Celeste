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


  AnswersFactory.getAnswersByJourneyID(journeyID)
  .then(data => {
    console.log(data)
    var answers = data.map(d => {
      let answersObj = {
        answer: d.answer,
        questionId: d.questionsID,
        answerId: d.answersID,
        correct: d.real
      }
      $scope.answers = answers
      console.log($scope.answers)
      return $scope.answers
    })
    return data
  })

  QuestionsFactory.getQuestionsByJourneyID(journeyID)
  .then(data => {
    console.log(data)
    $scope.questions = data

    // $scope.answers = [data[0].answer, data[1].answer, data[2].answer, data[3].answer, data[4].answer]
    // $scope.answer1 = $scope.answers[0]
    // $scope.answer2 = $scope.answers[1]
    // $scope.answer3 = $scope.answers[2]
    // $scope.answer4 = $scope.answers[3]
    // $scope.answer5 = $scope.answers[4]
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