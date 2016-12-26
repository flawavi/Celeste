"use strict"

app.factory("QuestionsFactory", function($q, $http){

  let getAllQuestions = () => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/questions.json`)
    .success((obj) => {
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  let getQuestionsByJourneyID = (id) => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/questions/${id}`)
    .success(obj => {
      resolve(obj)
    })
    .error(error => {
      reject(error)
      })
    })
  }

  return {getAllQuestions, getQuestionsByJourneyID}
})