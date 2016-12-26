'use strict'

app.factory('FakeAnswersFactory', function($q, $http){

  let service

  let getFakeAnswersByQuestionsID = QuestionsID => {
    return $q((resolve, reject) => {
      $http.get(`http://localhost:5000/fakeanswers/${QuestionsID}.json`)
      .success(fakeanswers => {
        resolve(fakeanswers)
      })
      .error(error => {
        reject(error)
      })
    })
  }

  service = {getFakeAnswersByQuestionsID}
  return service

})