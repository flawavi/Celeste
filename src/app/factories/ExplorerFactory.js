"use strict"

app.factory("ExplorerFactory", function($q, $http, AuthFactory, Celeste_API_URL){

  let service = {}

  let getExplorers = () => {
    return $q((resolve, reject) => {
    $http.get(`${Celeste_API_URL}explorer`)
    .success(resolve)
    .error(reject)
    })
  }

  let getExplorerById = (explorerId) => {
    return $q((resolve, reject) => {
    $http.get(`${Celeste_API_URL}explorer/${explorerId}`)
    .success(resolve)
    .error(reject)
    })
  }

  let postExplorer = (newProfile) => {
    newProfile.firebaseID = AuthFactory.getUser().uid
    return $q((resolve, reject) => {
    $http({
      method: 'POST',
      url: `${Celeste_API_URL}explorer`,
      data: newProfile,
      headers: {
        'Content-type': 'application/json'
      }
    })
    .success(resolve)
    .error(reject)
    })
  }

  let deleteCurrentExplorer = (explorerId) => {
    explorerId = AuthFactory.getUser().uid
    return $q((resolve, reject) => {
      $http.delete(`${Celeste_API_URL}explorer/${explorerId}`)
      .success(resolve)
      .error(reject)
    })
  }

  service = {getExplorers, postExplorer, getExplorerById, deleteCurrentExplorer}
  return service
})
