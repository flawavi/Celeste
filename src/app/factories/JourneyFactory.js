"use strict"

app.factory("JourneyFactory", function($q, $http){

  let getJournies = () => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/journey`)
    .success((obj) => {
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  return {getJournies}
})