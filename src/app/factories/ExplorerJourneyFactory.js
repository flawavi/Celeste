'use strict'

app.factory('ExplorerJourneyFactory', function($q, $http, Celeste_API_URL){

  let service = {}

  let postCompletedJourney = (explorerId, journeyId) => {
    return $q((resolve, reject) => {
      let data = {
        ExplorerID: explorerId,
        JourneyID: journeyId
      }
      $http.post(`${Celeste_API_URL}explorerJourney`,
        data)
      .success(resolve)
      .error(reject)
    })
  }

  let getExplorerJournies = explorerId => {
    return $q((resolve, reject) => {
      $http.get(`${Celeste_API_URL}explorerJourney/${explorerId}`)
      .success(resolve)
      .error(reject)
    })
  }

  service = {postCompletedJourney, getExplorerJournies}
  return service
})
