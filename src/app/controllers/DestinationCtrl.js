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

  $scope.id = parseInt($route.current.params.id, 10)
  let imgId = $route.current.params.id
  //integer representation of journeyId
  const id = parseInt($route.current.params.id, 10),
  //string representation of journeyId
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
    $scope.lessons = data.map(d => d.lesson)
    $scope.lesson = $scope.lessons[id - 1]
    })
  }


  if(imgId === '1' || imgId === '4' || imgId === '6' || imgId === '9'){
    console.log(imgId)
    let fileType = '.png'
    $scope.imagePath = `/imgs/${imgId}${fileType}`
  } else if(imgId === '7'){
    let fileType = '.jpg'
    $scope.imagePath = `/imgs/${imgId}${fileType}`
  } else {
    let fileType = '.svg'
    $scope.imagePath = `/imgs/${imgId}${fileType}`
  }

  // /src/imgs/1.png


  //function that accepts question as arg, returns function that accepts
  //answer as argument, sets question.questionsID to answer.questionsID
  //this makes the ng-repeat filter functionality work properly
  $scope.answerFilter = question => answer => question.questionsID = answer.questionsID

  //retrieve answers by journeyID. return only necess. info.
  //randomly sort order of array
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

  //retrieve questions by journeyID
  QuestionsFactory.getQuestionsByJourneyID(journeyID)
  .then(data => {
    $scope.questions = data
  })

  //remove lesson, show quiz, show
  $scope.takeQuiz = () => {
    $scope.quiz = true
    $scope.currentLesson = false
    $scope.quizButton = false
  }

  //affordance to move to next destination (only works if all answers are correct)
  $scope.nextDestination = nextDestination => {
    if(id === 9){
      nextDestination = "/theend"
      $location.url(`${nextDestination}`)
    } else {
        nextDestination = id + 1
        $location.url(`/destination/${nextDestination}`)
      }
    }

  //affordance to go back to previous destination (available at all times)
  $scope.prevDestination = prevDestination => {
    if(id <= 1) return
    prevDestination = id - 1
    $location.url(`/destination/${prevDestination}`)
  }

  //takes answers from user and determines if they are true or false,
  //then applies styling to indicate as much.
  //If all answers are true, the next destination button ng-show is set to true.
  const formObj = () => {
    let questionIDs = Object.keys($scope.answerValues)
    let answersBooleanArr = questionIDs.map(d => {
      let i = questionIDs.indexOf(d),
          questionElement = document.getElementById(`${d}`),
          answerElement = document.getElementById(`${$scope.selectedAnswers[questionIDs[i]]}`)
      if($scope.selectedAnswers[questionIDs[i]].includes("true")){
        questionElement.style.setProperty("color", "green")
        questionElement.style.setProperty("font-weight", "bold")
        questionElement.innerHTML = "Correct!"
        return "true"
      } else {
        let choice = answerElement.innerText
        answerElement.style.setProperty("text-decoration", "line-through")
        questionElement.innerText = `${choice} is not the right answer. Please make another selection.`
        questionElement.style.setProperty("color", "red")
        return "false"
      }
    })
    if(!answersBooleanArr.includes("false")) {
      $scope.next = true
    }
  }

  //ng-model
  $scope.selectedAnswers = {}

  //
  $scope.checkAnswers = () => {
    $scope.answerValues = {}
    for(let key in $scope.selectedAnswers){
      if(!$scope.selectedAnswers.hasOwnProperty(key)) continue
      $scope.answerValues[key] = $scope.selectedAnswers[key].includes("true")
    }
    console.log("answerValues", $scope.answerValues, "selectedAnswers", $scope.selectedAnswers)
    formObj()
  }
})