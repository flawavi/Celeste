'use strict'

const IMG_PATH = {
  '1': '/imgs/moon.jpg',
  '2': '/imgs/mars.svg',
  '3': '/imgs/jupiter-image.jpg',
  '4': '/imgs/saturn-mosaic-natural-light.jpg',
  '5': '/imgs/our-sun.jpg',
  '6': '/imgs/6.png',
  '7': '/imgs/7.jpg',
  '8': '/imgs/8.svg',
  '9': '/imgs/9.png'
}

app.controller('DestinationCtrl', function(
  $scope,
  $route,
  $window,
  $location,
  AuthFactory,
  $routeParams,
  JourneyFactory,
  AnswersFactory,
  CelesteFactory,
  ExplorerFactory,
  QuestionsFactory,
  ExplorerJourneyFactory
  ){


  $scope.id = parseInt($route.current.params.id, 10)
  let imgId = $route.current.params.id
  //integer representation of journeyId
  const id = parseInt($route.current.params.id, 10),
  //string representation of journeyId
      journeyID = $routeParams.id

  $scope.imagePath = IMG_PATH[imgId]

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
      console.log(data)
    $scope.lessons = data.map(d => d.lesson)
    $scope.lesson = $scope.lessons[id - 1]
    })
  }


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
        questionElement.style.setProperty("color", "lightgreen")
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
      AuthFactory.currentUser().then(user => {
        console.log(user.uid)
        return ExplorerJourneyFactory.postCompletedJourney(user.uid, id).then(data => {
          console.table(data)
          $scope.next = true
        })
      })
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
    formObj()
  }
})
