'use strict'

app.factory('AnswersFactory', function($q, $http){

  let service

  let getAnswersByJourneyID = (JourneyID) => {
    return $q((resolve, reject) => {
      $http.get(`http://localhost:5000/answers/${JourneyID}`)
      .success(answers => {
        let answersArr = answers.map(d => {
          let answersObj = {
            answer: d.answer,
            answerId: d.answersID,
            questionId: d.questionsID,
            correct: d.real
          }
          return answersObj
        })
        resolve(answers)
      })
      .error(error => {
        reject(error)
      })
    })
  }

  service = {getAnswersByJourneyID}
  return service
})
