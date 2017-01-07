'use strict'

app.factory('ExplorerJourneyFactory', function($q, $http, Celeste_API_URL){

  let service = {}


  let postCompletedJourney = (explorerId, journeyId) => {
    return $q((resolve, reject) => {
      let data = {
        ExplorerID: explorerId,
        JourneyID: journeyId
      }
      $http.post(`http://localhost:5000/explorerJourney/`,
        data)
      .success(obj => {
        resolve(obj)
      })
      .error(err => {
        reject(err)
      })
    })
  }

  let getExplorerJournies = explorerId => {
    return $q((resolve, reject) => {
      $http.get(`${Celeste_API_URL}ExplorerJourney/${explorerId}`)
      .success(resolve)
      .error(reject)
    })
  }

  service = {postCompletedJourney, getExplorerJournies}
  return service
})
