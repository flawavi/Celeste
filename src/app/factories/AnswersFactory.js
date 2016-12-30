'use strict'

app.factory('AnswersFactory', function($q, $http){

  let service

  let getAnswersByJourneyID = (JourneyID) => {
    return $q ((resolve, reject) => {
      $http.get(`http://localhost:5000/answers/${JourneyID}`)
      .success(answers => {
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