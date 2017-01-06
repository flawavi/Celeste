"use strict"

app.factory("JourneyFactory", function($q, $http){

  let service

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

  let getJourneyById = journeyId => {
    return $q((resolve, reject) => {
      $http.get(`http://localhost:5000/journey/${journeyId}`)
      .success(obj => {
        resolve(obj)
      })
      .error(error => {
        reject(error)
      })
    })
  }

  service = {getJournies, getJourneyById}
  return service
})