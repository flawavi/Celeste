"use strict"

app.factory("JourneyFactory", function($q, $http, Celeste_API_URL){

  let service = {}

  let getJournies = () => {
    return $q((resolve, reject) => {
    $http.get(`${Celeste_API_URL}journey`)
    .success(resolve)
    .error(reject)
    })
  }

  let getJourneyById = journeyId => {
    return $q((resolve, reject) => {
      $http.get(`${Celeste_API_URL}journey/${journeyId}`)
      .success(resolve)
      .error(reject)
    })
  }

  service = {getJournies, getJourneyById}
  return service
})
