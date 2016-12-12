"use strict"

app.factory("TriviaFactory", function($q, $http){

  let getAllTrivia = () => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/trivia.json`)
    .success((obj) => {
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  return {getAllTrivia}
})