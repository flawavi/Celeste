"use strict"

app.factory("ExplorerFactory", function($q, $http){

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

  return {getExplorers}
})