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

  //integer representation of journeyId
  let id = parseInt($route.current.params.id, 10),
  //string representation of journeyid
      journeyID = $routeParams.id

  //ng-show initializers
  $scope.active = true
  $scope.instructions = true
  $scope.quiz = false
  $scope.quizButton = false
  $scope.currentLesson = true
  $scope.next = false

  //get current journey
  JourneyFactory.getJourneyById(id)
    .then(journey => {
      $scope.topic = journey.destination
    })

    //get lesson based off of journey id
  $scope.getLesson = () => {
    $scope.instructions = false
    $scope.quizButton = true
    CelesteFactory.getLessons()
    .then(data => {
    // $scope.destination = data.map(d => d.journeyID)
    $scope.lessons = data.map(d => d.lesson)
    $scope.lesson = $scope.lessons[id - 1]
    })
  }

  //function that accepts question as arg, returns function that accepts
  //answer as argument, sets question.questionid to answer.questionid
  $scope.answerFilter = question => answer => question.questionsID = answer.questionsID

  //retrieve answers by journeyid. return only necess. info. randomly sort order of array
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

  //retrieve questions by journeyid
  QuestionsFactory.getQuestionsByJourneyID(journeyID)
  .then(data => {
    console.log(data)
    $scope.questions = data
  })

  //remove lesson, show quiz, show
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

  let checkAnswers = () => {
    let questionIDs = Object.keys($scope.answerValues)
    let answersBooleanArr = questionIDs.map(d => {
      let i = questionIDs.indexOf(d)
      if($scope.selectedAnswers[questionIDs[i]].includes("true")){
        return "true"
      } else {
        let listElement = document.getElementById(`${$scope.selectedAnswers[questionIDs[i]]}`)
        listElement.append(" this is wrong")
        return "false"
      }
    })
    if(!answersBooleanArr.includes("false")) {
      $scope.next = true
    }
  }

  $scope.selectedAnswers = {}

  $scope.formObj = () => {
    $scope.answerValues = {}
    for(let key in $scope.selectedAnswers){
      if(!$scope.selectedAnswers.hasOwnProperty(key)) continue
      $scope.answerValues[key] = $scope.selectedAnswers[key].includes('true')
    }
    checkAnswers()
    console.log($scope.answerValues)
  }


})