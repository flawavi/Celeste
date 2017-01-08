"use strict"

app.factory("QuestionsFactory", function($q, $http, Celeste_API_URL){

  let service

  let getAllQuestions = () => {
    return $q((resolve, reject) => {
    $http.get(`${Celeste_API_URL}questions.json`)
    .success(resolve)
    .error(reject)
    })
  }

  let getQuestionsByJourneyID = (id) => {
    return $q((resolve, reject) => {
    $http.get(`${Celeste_API_URL}questions/${id}`)
    .success(resolve)
    .error(reject)
    })
  }

  service = {getAllQuestions, getQuestionsByJourneyID}
  return service

})
