"use strict"

app.factory("ExplorerFactory", function($q, $http, AuthFactory){

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

  let postExplorer = (newProfile) => {
    newProfile.uid = AuthFactory.getUser().uid
    return $q((resolve, reject) => {
    $http.post(`http://localhost:5000/explorer`)
    .success((obj) => {
      console.log(obj)
      resolve(obj)
    })
    .error((error) => {
      reject(error)
      })
    })
  }

  return {getExplorers, postExplorer}
})