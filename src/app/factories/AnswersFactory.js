'use strict'

app.factory('AnswersFactory', function($q, $http){

  let service

  let getAnswersByQuestionsID = (QuestionsID) => {
    return $q ((resolve, reject) => {
      $http.get(`http://localhost:5000/answers/${QuestionsID}`)
      .success(answers => {
        resolve(answers)
      })
      .error(error => {
        reject(error)
      })
    })
  }

  service = {getAnswersByQuestionsID}
  return service
})