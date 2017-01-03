"use strict"

app.factory("ExplorerFactory", function($q, $http, AuthFactory){

  let service

  let getExplorers = () => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/explorer`)
    .success((obj) => {
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  let getExplorerById = (explorerId) => {
    return $q((resolve, reject) => {
    $http.get(`http://localhost:5000/explorer/${explorerId}`)
    .success((obj) => {
      console.log(obj, "explorer object")
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  let postExplorer = (newProfile) => {
    newProfile.firebaseID = AuthFactory.getUser().uid
    return $q((resolve, reject) => {
    $http({
      method: 'POST',
      url: `http://localhost:5000/explorer`,
      data: newProfile,
      headers: {
        'Content-type': 'application/json'
      }
    })
    .success((obj) => {
      console.log(obj)
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }
  service = {getExplorers, postExplorer, getExplorerById}
  return service
})