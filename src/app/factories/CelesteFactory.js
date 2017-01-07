'use strict'

app.factory("CelesteFactory", function($q, $http, AuthFactory){

  let service

  let getLessons = () => {
    return $q((resolve, reject) => {
      $http.get(`http://localhost:5000/celesteHost`)
      .success(obj => {
      resolve(obj)
    })
    .error(error => {
      reject(error)
      })
    })
  }

  service = {getLessons}

  return service

})
